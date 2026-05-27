import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const { data, error } = await resend.emails.send({
      from: 'TyCal K9 <hello@tycalk9.com>',
      to: ['tycal0308@gmail.com', 'jason@founditmarketing.com'],
      replyTo: email,
      subject: `New TyCal K9 Inquiry: ${service} — ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; border: 1px solid #222;">
          <!-- Header -->
          <div style="background-color: #f2b536; padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #0a0a0a;">
              New Contact Form Submission
            </h1>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #f2b536; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; width: 120px; vertical-align: top;">
                  Name
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #e5e5e5; font-size: 15px;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #f2b536; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; vertical-align: top;">
                  Email
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #e5e5e5; font-size: 15px;">
                  <a href="mailto:${email}" style="color: #f2b536; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #f2b536; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; vertical-align: top;">
                  Phone
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #e5e5e5; font-size: 15px;">
                  <a href="tel:${phone}" style="color: #f2b536; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #f2b536; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; vertical-align: top;">
                  Service
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #e5e5e5; font-size: 15px;">
                  ${service}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #f2b536; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; vertical-align: top;">
                  Message
                </td>
                <td style="padding: 12px 0; color: #e5e5e5; font-size: 15px; line-height: 1.6;">
                  ${message}
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="background-color: #111; padding: 16px 32px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              This message was sent from the TyCal K9 website contact form.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
}
