import { Resend } from 'resend';

const CAREERS_TO_EMAIL = 'Jason@albrightdigitalsolutions.com';
const CAREERS_FROM_EMAIL = 'Albright Digital Solutions LLC <hello@albrightdigitalsolutions.com>';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/rtf',
  'text/rtf',
]);

type UploadedFile = {
  fieldName: string;
  filename: string;
  contentType: string;
  content: Buffer;
};

type CareersPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  cityState?: string;
  salesExperience?: string;
  whySales?: string;
  message?: string;
};

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

function readRequestBody(req: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;

    req.on('data', (chunk: Buffer) => {
      total += chunk.length;
      if (total > MAX_UPLOAD_BYTES + 1024 * 1024) {
        reject(new Error('Resume upload is too large. Please upload a file under 5 MB.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function parseMultipart(contentType: string, body: Buffer) {
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  const boundary = boundaryMatch?.[1] || boundaryMatch?.[2];

  if (!boundary) {
    throw new Error('Resume form boundary was missing.');
  }

  const delimiter = Buffer.from(`--${boundary}`);
  const fields: CareersPayload = {};
  const files: UploadedFile[] = [];
  let offset = 0;

  while (offset < body.length) {
    const start = body.indexOf(delimiter, offset);
    if (start === -1) break;

    const next = body.indexOf(delimiter, start + delimiter.length);
    if (next === -1) break;

    let part = body.subarray(start + delimiter.length, next);
    if (part.subarray(0, 2).toString() === '--') break;
    if (part.subarray(0, 2).toString() === '\r\n') part = part.subarray(2);
    if (part.subarray(part.length - 2).toString() === '\r\n') part = part.subarray(0, part.length - 2);

    const headerEnd = part.indexOf(Buffer.from('\r\n\r\n'));
    if (headerEnd !== -1) {
      const rawHeaders = part.subarray(0, headerEnd).toString('utf8');
      const content = part.subarray(headerEnd + 4);
      const disposition = rawHeaders.match(/content-disposition:\s*([^\r\n]+)/i)?.[1] || '';
      const name = disposition.match(/name="([^"]+)"/i)?.[1];
      const filename = disposition.match(/filename="([^"]*)"/i)?.[1];
      const contentTypeHeader = rawHeaders.match(/content-type:\s*([^\r\n]+)/i)?.[1]?.trim() || 'application/octet-stream';

      if (name && filename) {
        if (content.length > 0) {
          files.push({ fieldName: name, filename, contentType: contentTypeHeader, content });
        }
      } else if (name) {
        fields[name as keyof CareersPayload] = content.toString('utf8').trim();
      }
    }

    offset = next;
  }

  return { fields, files };
}

function applicationEmailHtml(payload: CareersPayload, resume?: UploadedFile) {
  const rows = [
    ['Name', payload.fullName],
    ['Email', payload.email],
    ['Phone', payload.phone],
    ['City / State', payload.cityState],
    ['Sales experience', payload.salesExperience],
    ['Why this sales role', payload.whySales],
    ['Additional message', payload.message],
    ['Resume attached', resume?.filename || 'No resume attached'],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #171717; line-height: 1.5;">
      <h1 style="margin: 0 0 8px;">New careers application</h1>
      <p style="margin: 0 0 20px; color: #555;">Submitted from albrightdigitalsolutions.com/careers</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 760px;">
        ${rows.map(([label, value]) => `
          <tr>
            <td style="border: 1px solid #e5e5e5; font-weight: bold; width: 190px; background: #fafafa;">${escapeHtml(label)}</td>
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

  const contentType = String(req.headers['content-type'] || '');

  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return res.status(400).json({ error: 'Please submit the careers form with a resume upload field.' });
  }

  try {
    const body = await readRequestBody(req);
    const { fields, files } = parseMultipart(contentType, body);
    const resume = files.find((file) => file.fieldName === 'resume');

    if (!fields.email || !fields.fullName || !fields.whySales) {
      return res.status(400).json({ error: 'Please include your name, email, and why you are interested in sales.' });
    }

    if (resume) {
      if (resume.content.length > MAX_UPLOAD_BYTES) {
        return res.status(400).json({ error: 'Resume upload is too large. Please upload a file under 5 MB.' });
      }
      if (!ALLOWED_MIME_TYPES.has(resume.contentType)) {
        return res.status(400).json({ error: 'Please upload a PDF, DOC, DOCX, TXT, or RTF resume.' });
      }
    }

    const resend = getResendClient();

    const { error } = await resend.emails.send({
      from: CAREERS_FROM_EMAIL,
      to: CAREERS_TO_EMAIL,
      replyTo: fields.email,
      subject: `Careers application — ${clean(fields.fullName)}`,
      html: applicationEmailHtml(fields, resume),
      attachments: resume ? [{
        filename: resume.filename,
        content: resume.content,
        contentType: resume.contentType,
      }] : undefined,
    });

    if (error) {
      return res.status(502).json({ error: 'Unable to send the careers application right now.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(503).json({
      error: error instanceof Error ? error.message : 'Careers email service is not configured.',
    });
  }
}
