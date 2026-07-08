const fallbackRecipient = 'jason@albrightdigitalsolutions.com';

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

const clean = (value?: string) => value?.trim() || 'Not provided';

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
      <h1 style="margin: 0 0 8px;">Custom quote request ${payload.quoteNumber || ''}</h1>
      <p style="margin: 0 0 20px; color: #555;">Submitted from albrightdigitalsolutions.com/quote</p>

      <h2 style="font-size: 18px; margin: 24px 0 10px;">Business details</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 760px;">
        ${detailRows.map(([label, value]) => `
          <tr>
            <td style="border: 1px solid #e5e5e5; font-weight: bold; width: 190px; background: #fafafa;">${label}</td>
            <td style="border: 1px solid #e5e5e5;">${clean(value)}</td>
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
            <td style="border: 1px solid #e5e5e5;"><strong>${item.name}</strong><br><span style="color: #666;">${item.summary || ''}</span></td>
            <td style="border: 1px solid #e5e5e5;">${item.category}</td>
            <td align="right" style="border: 1px solid #e5e5e5;">${item.oneTime ? money(item.oneTime) : '—'}</td>
            <td align="right" style="border: 1px solid #e5e5e5;">${item.monthly ? `${money(item.monthly)}/mo` : '—'}</td>
          </tr>
        `).join('')}
      </table>

      <h2 style="font-size: 18px; margin: 24px 0 10px;">Estimate totals</h2>
      <p><strong>Estimated one-time:</strong> ${money(totals.oneTime)}</p>
      <p><strong>Estimated monthly:</strong> ${money(totals.monthly)}/month</p>
      <p style="color: #666; font-size: 13px;">Estimate valid through ${payload.validUntil || '30 days from submission'}.</p>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body as QuotePayload;
  const recipient = process.env.QUOTE_TO_EMAIL || fallbackRecipient;
  const from = process.env.QUOTE_FROM_EMAIL || 'Albright Digital Solutions <quotes@albrightdigitalsolutions.com>';
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!payload?.selectedItems?.length) {
    return res.status(400).json({ error: 'Please select at least one service.' });
  }

  if (!resendApiKey) {
    return res.status(503).json({
      error: 'Quote submissions are not configured yet. Please add RESEND_API_KEY in Vercel.',
    });
  }

  const client = payload.client || {};
  const subjectName = clean(client.business || client.name);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: recipient,
      reply_to: client.email || undefined,
      subject: `Custom quote request — ${subjectName}`,
      html: buildEmailHtml(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return res.status(502).json({
      error: 'Unable to send quote request right now.',
      detail,
    });
  }

  return res.status(200).json({ ok: true });
}
