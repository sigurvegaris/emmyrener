// Vercel serverless function: Bon Vivant Summer interest list.
// Sends the subscriber a confirmation and notifies Emmy. Uses Resend's REST API.
//
// Environment variables (Vercel > Project Settings > Environment Variables):
//   RESEND_API_KEY              required
//   RETREAT_FROM_EMAIL          e.g. "Emmy Rener <retreats@yourdomain.com>" (domain verified in Resend)
//   RETREAT_NOTIFY_EMAIL        defaults to emmy@sophisticatedsocial.net
//   RETREAT_QUESTIONNAIRE_URL   link to the questionnaire (optional until Emmy has one)

const { confirmationHtml, confirmationText, notificationHtml, notificationText } = require('./_retreat-emails');

const NOTIFY_DEFAULT = 'emmy@sophisticatedsocial.net';
const ROOM_OPTIONS = ['Private room', 'Shared room', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // Honeypot: real visitors never fill this in. Pretend success so bots move on.
  if (body.website) return res.status(200).json({ ok: true });

  const name = String(body.name || '').trim().slice(0, 80);
  const email = String(body.email || '').trim().slice(0, 200);
  const room = ROOM_OPTIONS.includes(body.room) ? body.room : 'Not sure yet';

  if (!name || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter your first name and a valid email.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RETREAT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('retreat-signup: RESEND_API_KEY or RETREAT_FROM_EMAIL is not set');
    return res.status(500).json({ error: 'Sign-ups are not available right now.' });
  }

  const notify = process.env.RETREAT_NOTIFY_EMAIL || NOTIFY_DEFAULT;
  const questionnaire = process.env.RETREAT_QUESTIONNAIRE_URL;
  // Preview/test deployments are tagged so they are never mistaken for real sign-ups.
  const tag = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' ? '[TEST] ' : '';

  const receivedAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' (Paris)';
  const data = { name, email, room, questionnaire, receivedAt };

  try {
    await sendEmail(apiKey, {
      from,
      to: [email],
      reply_to: notify,
      subject: `${tag}You're on the list for Bon Vivant Summer`,
      html: confirmationHtml(data),
      text: confirmationText(data),
    });
    await sendEmail(apiKey, {
      from,
      to: [notify],
      reply_to: email,
      subject: `${tag}New retreat sign-up: ${name}`,
      html: notificationHtml(data),
      text: notificationText(data),
    });
  } catch (err) {
    console.error('retreat-signup failed', err);
    return res.status(502).json({ error: 'Something went wrong. Please try again in a moment.' });
  }

  return res.status(200).json({ ok: true });
};
