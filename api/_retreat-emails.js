// Email templates for the Bon Vivant Summer interest list, styled like the postcard on /retreats.
// Email clients ignore most modern CSS, so these use tables, inline styles and a few small images
// (public/email/*), with Georgia standing in wherever Cormorant Garamond can't load.

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Images must be publicly reachable. Production serves them from the live site; previews are behind
// Vercel login, so they load from the public GitHub repo on the deployed branch instead.
function assetBase() {
  if (process.env.RETREAT_EMAIL_ASSET_BASE) return process.env.RETREAT_EMAIL_ASSET_BASE.replace(/\/$/, '');
  if (process.env.VERCEL_ENV === 'production') return 'https://emmyrener.com';
  const branch = process.env.VERCEL_GIT_COMMIT_REF || 'retreats';
  return `https://raw.githubusercontent.com/sigurvegaris/emmyrener/${encodeURIComponent(branch)}/public`;
}

const C = {
  page: '#efe6d8',
  paper: '#fbf6ee',
  ink: '#3a2e22',
  soft: '#5a4a3c',
  rose: '#8c5c50',
  navy: '#2c3550',
  rule: '#d9c7b0',
};
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

function frame({ preheader, inner, img }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
<style>
  @media (max-width: 620px) {
    .card { width: 100% !important; }
    .pad { padding-left: 24px !important; padding-right: 24px !important; }
    .title { font-size: 34px !important; }
    .postage { width: 120px !important; height: auto !important; }
    .kick { letter-spacing: 2px !important; font-size: 11px !important; }
    .pad-top { padding-top: 16px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.paper}" style="width:600px;max-width:600px;background:${C.paper};border:1px solid #e3d5c0;">
      <tr><td style="line-height:0;font-size:0;"><img src="${img}/email/airmail.png" width="600" height="7" alt="" style="display:block;width:100%;height:7px;border:0;"></td></tr>
      <tr><td style="line-height:0;font-size:0;padding:6px 0 0;"><img src="${img}/email/roses-garland.png" width="600" height="72" alt="" style="display:block;width:100%;height:auto;border:0;"></td></tr>
      ${inner}
      <tr><td style="line-height:0;font-size:0;padding:0 0 6px;"><img src="${img}/email/roses-garland-bottom.png" width="600" height="72" alt="" style="display:block;width:100%;height:auto;border:0;"></td></tr>
      <tr><td style="line-height:0;font-size:0;"><img src="${img}/email/airmail.png" width="600" height="7" alt="" style="display:block;width:100%;height:7px;border:0;"></td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const kicker = (text) =>
  `<p class="kick" style="margin:0 0 6px;font-family:${SERIF};font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${C.rose};">${text}</p>`;

const para = (html) =>
  `<p style="margin:0 0 16px;font-family:${SERIF};font-size:18px;line-height:1.6;color:${C.soft};">${html}</p>`;

function detailRows(rows) {
  return rows
    .map(
      ([label, value], i) => `
      <tr>
        <td width="34%" valign="top" style="padding:11px 0;${i ? `border-top:1px dotted ${C.rule};` : ''}font-family:${SERIF};font-size:12px;letter-spacing:3px;text-transform:uppercase;color:${C.rose};">${label}</td>
        <td valign="top" style="padding:9px 0;${i ? `border-top:1px dotted ${C.rule};` : ''}font-family:${SERIF};font-size:18px;font-style:italic;color:${C.ink};">${value}</td>
      </tr>`
    )
    .join('');
}

const divider = (img) =>
  `<img src="${img}/email/roses-divider.png" width="200" height="34" alt="" style="display:block;margin:0 auto;border:0;width:200px;height:34px;">`;

function button(href, label) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px;">
    <tr><td bgcolor="${C.rose}" style="border-radius:999px;background:${C.rose};">
      <a href="${esc(href)}" style="display:inline-block;padding:13px 30px;font-family:${SERIF};font-size:16px;letter-spacing:2px;text-transform:uppercase;color:#fbf3ea;text-decoration:none;border-radius:999px;">${label}</a>
    </td></tr>
  </table>`;
}

function confirmationHtml({ name, room, questionnaire }) {
  const img = assetBase();
  const inner = `
      <tr><td class="pad" style="padding:4px 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="middle" style="font-family:${SERIF};white-space:nowrap;">
            <span style="display:inline-block;background:${C.navy};color:#fbf6ee;font-size:11px;letter-spacing:4px;padding:5px 10px;text-transform:uppercase;">Par avion</span>
            <span style="font-style:italic;font-size:15px;color:${C.navy};padding-left:8px;">By air mail</span>
          </td>
          <td align="right" valign="top"><img class="postage" src="${img}/email/postage.png" width="220" height="72" alt="" style="display:block;border:0;width:220px;height:72px;"></td>
        </tr></table>
      </td></tr>

      <tr><td class="pad" style="padding:20px 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          ${[
            ['strip-lavender.jpg', 'Lavender fields in Provence'],
            ['strip-rose.jpg', 'Friends clinking glasses of rosé'],
            ['strip-lunch.jpg', 'A table set for lunch in the garden'],
          ]
            .map(
              ([file, alt], i) =>
                `${i ? '<td width="8" style="width:8px;font-size:0;line-height:0;">&nbsp;</td>' : ''}<td width="168" valign="top" style="width:32%;"><img src="${img}/email/${file}" width="168" height="168" alt="${alt}" style="display:block;width:100%;height:auto;border:0;"></td>`
            )
            .join('')}
        </tr></table>
      </td></tr>

      <tr><td class="pad" style="padding:26px 40px 4px;">
        ${kicker('Bon Vivant Summer &middot; Provence &middot; May 2027')}
        <h1 class="title" style="margin:0 0 18px;font-family:${SERIF};font-weight:400;font-style:italic;font-size:42px;line-height:1.15;color:${C.ink};">Merci, ${esc(name)}!</h1>
        ${para(`Thank you for joining the list for <strong style="color:${C.ink};font-weight:600;">Bon Vivant Summer</strong>, our week in Provence this May. Your letter made our day.`)}
        ${para("Your seat isn't official until booking opens, but you're one step closer to seeing your name on it, and you'll be the very first to know when it does, along with all the details.")}
        ${para('Until then, picture yourself wandering the morning markets, lingering over a three-hour lunch in the garden, and raising a glass of rosé with new friends as the sun goes down. We can\'t wait to share it with you.')}
      </td></tr>

      <tr><td class="pad" style="padding:6px 60px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding:8px;background:#ffffff;border:1px solid #e6d9c6;">
            <img src="${img}/email/hosts.jpg" width="464" alt="Emmy and Hannah in a blue doorway covered in red roses" style="display:block;width:100%;height:auto;border:0;">
          </td>
        </tr></table>
        <p style="margin:10px 0 0;text-align:center;font-family:${SERIF};font-style:italic;font-size:15px;color:${C.rose};">Your hosts, Emmy &amp; Hannah</p>
      </td></tr>

      <tr><td class="pad" style="padding:22px 40px 6px;">
        <div style="padding-bottom:18px;">${divider(img)}</div>
        ${kicker('The details so far')}
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 22px;">
          ${detailRows([
            ['Where', 'Just outside Aix-en-Provence'],
            ['When', 'May 2027, exact dates coming soon'],
            ['Length', '5 nights, 6 days'],
            ['The group', '8 to 10 women, under one roof'],
            ['Your room', esc(room)],
          ])}
        </table>
        ${
          questionnaire
            ? `${para("If you're seriously dreaming of joining, this short questionnaire (dates, budget, and what you're hoping for) helps us plan the week around you.")}
               ${button(questionnaire, 'Tell us about you')}`
            : ''
        }
        <div style="padding:6px 0 4px;">${divider(img)}</div>
        <p style="margin:18px 0 4px;font-family:${SERIF};font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${C.rose};text-align:center;">Next step</p>
        <p style="margin:0 0 4px;text-align:center;font-family:${SERIF};font-style:italic;font-size:19px;color:${C.ink};">Come along for the ride on Instagram</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:10px auto 24px;">
          <tr><td bgcolor="${C.navy}" style="border-radius:999px;background:${C.navy};">
            <a href="https://instagram.com/emmyrener" style="display:inline-block;padding:12px 28px;font-family:${SERIF};font-size:15px;letter-spacing:2px;color:#fbf6ee;text-decoration:none;border-radius:999px;">@EMMYRENER</a>
          </td></tr>
        </table>
        ${para('A little favor: if this note landed in Promotions or spam, drag it to your inbox so you never miss a letter from us. Joining the list is free and doesn\'t commit you to booking, and if you have a question, simply reply.')}
      </td></tr>

      <tr><td class="pad" style="padding:4px 40px 30px;">
        <p style="margin:0;font-family:${SERIF};font-style:italic;font-size:18px;color:${C.soft};">À très bientôt,</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="bottom"><img src="${img}/email/signature.png" width="230" height="51" alt="Emmy &amp; Hannah" style="display:block;border:0;width:230px;height:51px;margin-top:4px;"></td>
          <td valign="bottom" style="padding-left:4px;"><img src="${img}/email/roses-sprig.png" width="64" height="44" alt="" style="display:block;border:0;width:64px;height:44px;"></td>
        </tr></table>
      </td></tr>

      <tr><td class="pad" style="padding:0 40px 22px;">
        <p style="margin:0;padding-top:14px;border-top:1px solid ${C.rule};font-family:${SANS};font-size:11px;line-height:1.6;color:#9a8a78;text-align:center;">
          You're receiving this because you joined the Bon Vivant Summer interest list on emmyrener.com.
        </p>
      </td></tr>`;
  return frame({ preheader: "You're on the list, and we're saving a seat at the long table for you.", inner, img });
}

function notificationHtml({ name, email, room, receivedAt }) {
  const img = assetBase();
  const mailto = `mailto:${email}?subject=${encodeURIComponent('Bon Vivant Summer')}`;
  const inner = `
      <tr><td align="center" class="pad" style="padding:30px 40px 6px;text-align:center;">
        <img src="${img}/email/seal.png" width="64" height="65" alt="" style="display:block;margin:0 auto 16px;border:0;width:64px;height:65px;">
        ${kicker('A new letter for the long table')}
        <h1 class="title" style="margin:0 0 8px;font-family:${SERIF};font-weight:400;font-style:italic;font-size:40px;line-height:1.15;color:${C.ink};">${esc(name)} wants a seat</h1>
        <p style="margin:0 0 6px;font-family:${SERIF};font-style:italic;font-size:17px;color:${C.soft};">Someone new just joined the Bon Vivant Summer interest list.</p>
      </td></tr>

      <tr><td class="pad" style="padding:16px 40px 6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;">
          ${detailRows([
            ['Name', esc(name)],
            ['Email', `<a href="${esc(mailto)}" style="color:${C.navy};text-decoration:underline;">${esc(email)}</a>`],
            ['Dreaming of', esc(room)],
            ['Received', esc(receivedAt)],
          ])}
        </table>
      </td></tr>

      <tr><td align="center" class="pad" style="padding:0 40px 8px;">
        <div style="padding-bottom:16px;">${divider(img)}</div>
        ${button(mailto, `Write back to ${esc(name)}`)}
      </td></tr>

      <tr><td class="pad" style="padding:0 40px 22px;">
        <p style="margin:0;padding-top:14px;border-top:1px solid ${C.rule};font-family:${SANS};font-size:11px;line-height:1.6;color:#9a8a78;text-align:center;">
          Tip: hitting Reply on this email writes straight to ${esc(name)}. They already got a welcome note from you.
        </p>
      </td></tr>`;
  return frame({ preheader: `${name} (${email}) joined the Bon Vivant Summer list.`, inner, img });
}

function confirmationText({ name, room, questionnaire }) {
  return [
    `Merci, ${name}!`,
    '',
    'Thank you for joining the list for Bon Vivant Summer, our week in Provence this May. Your letter made our day.',
    '',
    "Your seat isn't official until booking opens, but you're one step closer to seeing your name on it, and you'll be the very first to know when it does, along with all the details.",
    '',
    "Until then, picture yourself wandering the morning markets, lingering over a three-hour lunch in the garden, and raising a glass of rosé with new friends as the sun goes down. We can't wait to share it with you.",
    '',
    'The details so far',
    'Where: just outside Aix-en-Provence',
    'When: May 2027, exact dates coming soon',
    'Length: 5 nights, 6 days',
    'The group: 8 to 10 women, under one roof',
    `Your room: ${room}`,
    ...(questionnaire
      ? ['', `If you're seriously dreaming of joining, this short questionnaire helps us plan: ${questionnaire}`]
      : []),
    '',
    'Next step: come along for the ride on Instagram, https://instagram.com/emmyrener',
    '',
    "A little favor: if this note landed in Promotions or spam, drag it to your inbox so you never miss a letter from us. Joining the list is free and doesn't commit you to booking, and if you have a question, simply reply.",
    '',
    'À très bientôt,',
    'Emmy & Hannah',
  ].join('\n');
}

function notificationText({ name, email, room, receivedAt }) {
  return [
    `${name} wants a seat at the long table.`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Dreaming of: ${room}`,
    `Received: ${receivedAt}`,
    '',
    `Hit Reply to write straight to ${name}.`,
  ].join('\n');
}

module.exports = { confirmationHtml, confirmationText, notificationHtml, notificationText };
