// Cloudflare Pages Function — handles /r/:id
// Social crawlers (Facebook, Messenger, WhatsApp, X) fetch this URL to build a
// link preview. We return a tiny page whose og:image IS that player's card, so the
// correct card shows in the preview. Real human visitors are redirected to the game.

const PLAYERS = {
  haaland:    { name: "Erling Haaland",     title: "The Goal Machine",   img: "Haaland.jpg" },
  kane:       { name: "Harry Kane",         title: "The Goal Machine",   img: "Harry_Kane.jpg" },
  musiala:    { name: "Jamal Musiala",      title: "The Magician",       img: "Jamal.jpg" },
  wirtz:      { name: "Florian Wirtz",      title: "The Magician",       img: "Florian.jpg" },
  bellingham: { name: "Jude Bellingham",    title: "The General",        img: "Jude.jpg" },
  debruyne:   { name: "Kevin De Bruyne",    title: "The General",        img: "Kevin.jpg" },
  rodri:      { name: "Rodri",              title: "The General",        img: "Rodri.jpg" },
  mbappe:     { name: "Kylian Mbappe",      title: "The Cheetah",        img: "Mbappe.jpg" },
  saka:       { name: "Bukayo Saka",        title: "The Speed Demon",    img: "Saka.jpg" },
  hakimi:     { name: "Achraf Hakimi",      title: "The Flash With Ball",img: "Hakimi.jpg" },
  yamal:      { name: "Lamine Yamal",       title: "The Showman",        img: "Yamal.jpg" },
  vinicius:   { name: "Vinicius Jr",        title: "The True Showman",   img: "Vinicious.jpg" },
  neymar:     { name: "Neymar Jr",          title: "The Talisman",       img: "Neymar.jpg" },
  salah:      { name: "Mohamed Salah",      title: "The Talisman",       img: "Salah.jpg" },
  messi:      { name: "Lionel Messi",       title: "The GOAT",           img: "Messi.jpg" },
  ronaldo:    { name: "Cristiano Ronaldo",  title: "The Talisman",       img: "christiano.jpg" },
  zidane:     { name: "Zinedine Zidane",    title: "Zizou",              img: "Zidane.jpg" },
  pele:       { name: "Pele",               title: "The King",           img: "Pele.jpg" },
  maradona:   { name: "Diego Maradona",     title: "El Diego",           img: "Maradona.jpg" },
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const origin = url.origin;
  const id = (context.params.id || "").toString().toLowerCase();
  const p = PLAYERS[id];

  // Unknown id → just send them to the game.
  if (!p) return Response.redirect(origin + "/", 302);

  const img = `${origin}/cards/${p.img}`;
  const shareUrl = `${origin}/r/${id}`;
  const title = esc(`I am ${p.name} (${p.title})!`);
  const desc = esc(`Hey, look — I took a small quiz and found out I am ${p.name} (${p.title})! Try it yourself.`);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="880">
<meta property="og:image:height" content="1120">
<meta property="og:url" content="${shareUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">
<meta http-equiv="refresh" content="0; url=/">
<script>window.location.replace("/");</script>
</head>
<body style="background:#0a0e1a;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:40px">
<p>Loading the game… <a href="/" style="color:#FFD166">Tap here if it doesn't open.</a></p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
