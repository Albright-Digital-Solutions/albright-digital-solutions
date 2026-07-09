import { Resend } from 'resend';

export const CONTACT_TO_EMAIL = 'Jason@albrightdigitalsolutions.com';
export const CONTACT_FROM_EMAIL = 'Albright Digital Solutions <hello@albrightdigitalsolutions.com>';

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  return new Resend(apiKey);
}

export function escapeHtml(value?: string) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function clean(value?: string) {
  return value?.trim() || 'Not provided';
}
