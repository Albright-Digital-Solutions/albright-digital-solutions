import { Resend } from 'resend';

const CONTACT_TO_EMAIL = 'Jason@albrightdigitalsolutions.com';
const CONTACT_FROM_EMAIL = 'Albright Digital Solutions <hello@albrightdigitalsolutions.com>';

type QuotePayload = {
  quoteNumber?: string;
  quoteDate?: string;
  validUntil?: string;
  client?: Record<string, string>;
  selectedItems?: Array<{
    name: string;
    category: string;
    summary?: string;
    oneTime?: number;
    monthly?: number;
    term?: string;
  }>;
  totals?: {
    oneTime: number;
    monthly: number;
  };
};

const money = (value = 0) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  return new Resend(apiKey);
}

function escapeHtml(value?: string) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function clean(value?: string) {
  return value?.trim() || 'Not provided';
}

function buildEmailHtml(payload: QuotePayload) {
  const client = payload.client || {};
  const items = payload.selectedItems || [];
  const totals = payload.totals || { oneTime: 0, monthly: 0 };

  const detailRows = [
    ['Name', client.name],
    ['Business', client.business],
    ['Email', client.email],
    ['Phone', client.phone],
    ['Business type', client.industry],
    ['Years in business', client.yearsInBusiness],
    ['Website / profile', client.website],
    ['Service area', client.location],
    ['Team size', client.teamSize],
    ['Customer type', client.customerType],
    ['Timeline', client.timeline],
    ['Budget comfort range', client.budgetRange],
    ['Current setup', client.currentSetup],
    ['Primary goals', client.goals],
    ['Additional notes', client.notes],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #171717; line-height: 1.5;">
      <h1 style="margin: 0 0 8px;">Custom quote request ${escapeHtml(payload.quoteNumber || '')}</h1>
      <p style="margin: 0 0 20px; color: #555;">Submitted from albrightdigitalsolutions.com/quote</p>

      <h2 style="font-size: 18px; margin: 24px 0 10px;">Business details</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 760px;">
        ${detailRows.map(([label, value]) => `
          <tr>
            <td style="border: 1px solid #e5e5e5; font-weight: bold; width: 190px; background: #fafafa;">${escapeHtml(label)}</td>
            <td style="border: 1px solid #e5e5e5;">${escapeHtml(clean(value))}</td>
          </tr>
        `).join('')}
      </table>

      <h2 style="font-size: 18px; margin: 24px 0 10px;">Selected services</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 760px;">
        <tr>
          <th align="left" style="border: 1px solid #e5e5e5; background: #111; color: #fff;">Service</th>
          <th align="left" style="border: 1px solid #e5e5e5; background: #111; color: #fff;">Category</th>
          <th align="right" style="border: 1px solid #e5e5e5; background: #111; color: #fff;">One-time</th>
          <th align="right" style="border: 1px solid #e5e5e5; background: #111; color: #fff;">Monthly</th>
        </tr>
        ${items.map((item) => `
          <tr>
            <td style="border: 1px solid #e5e5e5;"><strong>${escapeHtml(item.name)}</strong><br><span style="color: #666;">${escapeHtml(item.summary || '')}</span></td>
            <td style="border: 1px solid #e5e5e5;">${escapeHtml(item.category)}</td>
            <td align="right" style="border: 1px solid #e5e5e5;">${item.oneTime ? money(item.oneTime) : '—'}</td>
            <td align="right" style="border: 1px solid #e5e5e5;">${item.monthly ? `${money(item.monthly)}/mo` : '—'}</td>
          </tr>
        `).join('')}
      </table>

      <h2 style="font-size: 18px; margin: 24px 0 10px;">Estimate totals</h2>
      <p><strong>Estimated one-time:</strong> ${money(totals.oneTime)}</p>
      <p><strong>Estimated monthly:</strong> ${money(totals.monthly)}/month</p>
      <p style="color: #666; font-size: 13px;">Estimate valid through ${escapeHtml(payload.validUntil || '30 days from submission')}.</p>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body as QuotePayload;

  if (!payload?.selectedItems?.length) {
    return res.status(400).json({ error: 'Please select at least one service.' });
  }

  try {
    const resend = getResendClient();
    const client = payload.client || {};
    const subjectName = clean(client.business || client.name);

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: client.email || undefined,
      subject: `Custom quote request — ${subjectName}`,
      html: buildEmailHtml(payload),
    });

    if (error) {
      return res.status(502).json({ error: 'Unable to send quote request right now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(503).json({
      error: error instanceof Error ? error.message : 'Email service is not configured.',
    });
  }
}
