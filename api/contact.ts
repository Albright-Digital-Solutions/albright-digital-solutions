import { clean, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, escapeHtml, getResendClient } from './_email';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

function contactEmailHtml(payload: ContactPayload) {
  const rows = [
    ['Name', `${clean(payload.firstName)} ${payload.lastName?.trim() || ''}`.trim()],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['Interested service', payload.service],
    ['Project details', payload.message],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #171717; line-height: 1.5;">
      <h1 style="margin: 0 0 8px;">New contact form submission</h1>
      <p style="margin: 0 0 20px; color: #555;">Submitted from albrightdigitalsolutions.com/contact</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 760px;">
        ${rows.map(([label, value]) => `
          <tr>
            <td style="border: 1px solid #e5e5e5; font-weight: bold; width: 180px; background: #fafafa;">${escapeHtml(label)}</td>
            <td style="border: 1px solid #e5e5e5;">${escapeHtml(clean(value))}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body as ContactPayload;

  if (!payload?.email || !payload?.message) {
    return res.status(400).json({ error: 'Please include your email and project details.' });
  }

  try {
    const resend = getResendClient();
    const fullName = `${payload.firstName || ''} ${payload.lastName || ''}`.trim() || 'Website visitor';

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: `New website inquiry — ${fullName}`,
      html: contactEmailHtml(payload),
    });

    if (error) {
      return res.status(502).json({ error: 'Unable to send contact request right now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(503).json({
      error: error instanceof Error ? error.message : 'Email service is not configured.',
    });
  }
}
