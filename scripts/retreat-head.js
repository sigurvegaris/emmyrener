// Runs after `react-scripts build`. Writes build/retreats.html: the same app shell with
// the retreat's own title, description and share image, so a link to /retreats sent by
// text or posted on Instagram previews as Bon Vivant Summer instead of the Paris guides.
// vercel.json serves it for /retreats and /retreats/merci.
const fs = require('fs');
const path = require('path');

const SITE = 'https://emmyrener.com';
const TITLE = 'Bon Vivant Summer in Provence | Emmy Rener';
const DESCRIPTION =
  'Join Emmy & Hannah for market mornings, long lunches in the garden and rosé at sunset in Provence, May 2027. Join the list to be first to know when booking opens.';
const IMAGE = `${SITE}/videos/og-retreats.jpg`;

const build = path.join(__dirname, '..', 'build');
let html = fs.readFileSync(path.join(build, 'index.html'), 'utf8');

const swaps = [
  [/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`],
  [/(<meta name="description" content=")[^"]*/, `$1${DESCRIPTION}`],
  [/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`],
  [/(<meta property="og:description" content=")[^"]*/, `$1${DESCRIPTION}`],
  [/(<meta property="og:url" content=")[^"]*/, `$1${SITE}/retreats`],
  [/(<meta property="og:image" content=")[^"]*/, `$1${IMAGE}`],
];
for (const [re, to] of swaps) {
  if (!re.test(html)) throw new Error(`retreat-head: ${re} not found in build/index.html`);
  html = html.replace(re, to);
}
html = html.replace(
  /(<meta property="og:image" content="[^"]*"\s*\/?>)/,
  '$1<meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="Bon Vivant Summer, Provence, May 2027, a retreat with Emmy and Hannah"/>'
);

fs.writeFileSync(path.join(build, 'retreats.html'), html);
console.log('retreat-head: wrote build/retreats.html');
