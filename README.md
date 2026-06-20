# ⚽ Which Player Are You? — MMP

A mobile-first viral football personality quiz (React + Vite). Built for World Cup season.

This README is written for a **first-time developer**. Take it one step at a time.

---

## 1) Run it on your computer

You need **Node.js** installed first (the LTS version). Get it from https://nodejs.org → download → install → restart your terminal.

Then, in a terminal, inside this project folder:

```bash
npm install     # downloads what the project needs (one time)
npm run dev     # starts a local preview
```

It will print a link like `http://localhost:5173` — open that in your browser. Edit any file, save, and the page updates instantly.

To make the final files for publishing:

```bash
npm run build   # creates a "dist" folder — that's your website
npm run preview # (optional) preview the built version
```

> Sound starts only after the first tap/click — every browser requires that. Not a bug.

---

## 2) Put it online (free)

You're publishing the **`dist`** folder (after `npm run build`), OR connecting your GitHub repo so the host builds it for you. Pick one host:

### Netlify (easiest drag-and-drop)
1. Run `npm run build`.
2. Go to https://app.netlify.com/drop
3. Drag the **`dist`** folder onto the page. Done — you get a live link.

### Vercel
1. Push this project to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. It auto-detects Vite. Click Deploy.

### Cloudflare Pages
1. Push to GitHub.
2. Cloudflare Pages → Create project → connect repo.
3. Build command: `npm run build` · Output directory: `dist` · Deploy.

**After deploying:** open `src/data/archetypes.js` and set `SITE_URL` to your real link, then rebuild/redeploy so share links point to your site.

**For rich link previews** (the image that shows when your link is shared on WhatsApp/Facebook): open `index.html` and change the two `og:image` / `twitter:image` lines from `./og-image.jpg` to your full address, e.g. `https://your-site.netlify.app/og-image.jpg`. Replace `public/og-image.jpg` with your own 1200×630 promo image anytime.

---

## 3) Everyday edits (no deep coding)

All the easy settings live in **`src/data/archetypes.js`** (the `CONFIG` block) and the data files:

| Want to change… | File |
|---|---|
| Your live web address, WhatsApp number, Follow link | `src/data/archetypes.js` → `CONFIG` |
| Player names, nicknames, rarity, **which image** | `src/data/players.js` |
| Secret codes | `src/data/players.js` (the `code:` fields) |
| Questions & answers | `src/data/questions.js` |
| Colors / styling | `src/index.css` |

**Golden rule:** only edit text **inside "quotes"**. Don't delete commas, brackets, or braces. If something breaks, undo (Ctrl+Z / Cmd+Z).

---

## 4) Replace a player photo

Your card images live in `src/assets/cards/` with the exact names you uploaded
(`Messi.jpg`, `Mbappe.jpg`, `christiano.jpg`, etc.).

To swap a photo, just **replace the file** in that folder with a new image of the **same name**. That's it — no code change.

To use a *different* filename, open `src/data/players.js`, find that player's `import` line at the top, and change the filename there to match.

- **Card image size:** portrait, around **880 × 1120** (that's what the design expects). Keep faces centered.

> ⚠️ **Important:** these images show real footballers, club kits, and sponsor logos. On a public, money-making site that is real legal risk (player likeness + brand trademarks). Use only images you have the right to use. This is your responsibility, not the code's.

---

## 5) Replace / add banners

Banners live in `src/assets/banners/`. The app automatically uses **every image** in that folder and shows a random one per screen — so you can add or remove banners freely, any filename works.

- **Banner size:** landscape, around **1400 × 480**.

---

## 6) The secret codes

Typed on the Start page (or the result page) via "🔓 Got A Secret Code?".

| Legend | Code |
|---|---|
| Lionel Messi | `MAGICIANMMP` |
| Cristiano Ronaldo | `TALISMANMMP` |
| Zinedine Zidane | `MAESTROMMP` |
| Pele | `KINGMMP2026` |
| Diego Maradona | `GODFATHERMMP2026` |

The **video "Get Secret Code" page** only ever reveals the first three (Messi / Ronaldo / Zidane). The two `...MMP2026` codes (Pele, Maradona) are **never** revealed by the video — share those yourself, by hand, for special promos.

To change a code, edit the `code:` value for that legend in `src/data/players.js`.

---

## 7) The video "ad" is a placeholder

The "Get Secret Code" page plays a built-in **5-second countdown**, not a real paid ad. It earns nothing yet — it's there so the unlock flow works and so you can show advertisers the spot. To run a **real** rewarded video later you must sign up with an ad network (e.g. Google AdMob), follow their rules, and replace the countdown box in `src/screens/VideoCodeScreen.jsx`. That's an advanced step for when you have traffic.

---

## 8) Add Firebase later (for REAL shared visitor counters)

By default the site shows **local** counters (each visitor's own browser). To show a **global** number shared by all visitors, add Firebase — the code is already written, it just needs your keys.

1. Go to https://console.firebase.google.com → create a project (free "Spark" plan).
2. Build → **Firestore Database** → Create database → Start in **production mode**.
3. In Firestore Rules, allow the counters to be read/updated. For a simple public counter:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /counters/{doc} {
         allow read, write: if true;
       }
     }
   }
   ```
   (This is wide-open and fine for a non-sensitive visit counter. Don't store private data here.)
4. Project Settings → "Your apps" → Web app → copy the config values.
5. Install firebase: `npm install firebase`
6. Copy `.env.example` to a new file named `.env` and paste your values in.
7. Rebuild/redeploy. The counters now use Firebase automatically; if it ever fails, it silently falls back to local.

> The local fallback is labelled neutrally ("visits today") and is per-browser, so it does not pretend to be a global number.

---

## 9) Enable the YouTube link later

In `src/data/archetypes.js`:
```js
SHOW_YOUTUBE_LINK: true,
YOUTUBE_CHANNEL_URL: "https://youtube.com/@yourchannel",
```
When `false` (default), no button and no empty space appears.

---

## 10) Sponsor / ad areas

Both the result page and the video page have an "advertise here" card linking to your WhatsApp (`https://wa.me/8801700703620`). Change the number in `src/data/archetypes.js` (`CONFIG.WHATSAPP`). When a real advertiser signs up, you can replace the card's contents in `src/components/AdSlot.jsx`.

---

## Project structure

```
src/
  App.jsx              ← screen routing + scoring + secret-legend logic
  main.jsx, index.css
  data/
    archetypes.js      ← CONFIG + archetype labels
    players.js         ← 14 players + 5 legends (images, codes, rarity)
    questions.js       ← question bank (placeholder; Prompt 2 fills 60)
  lib/
    counters.js        ← Firebase + localStorage fallback
    sound.js           ← synthesized sounds (no copyrighted audio)
    rotation.js        ← Player of the Day
    share.js           ← share text + links
    profanity.js       ← name sanitizing
    storage.js         ← safe localStorage
  screens/             ← Start, Quiz, Result, VideoCode
  components/          ← Banner, BackgroundFX, SoundToggle, HallOfFame, AdSlot
  assets/
    banners/           ← your 9 banners
    cards/             ← your 19 player/legend cards
```

---

## A note on expectations

Going viral is a lottery, and ad money only comes after real traffic. Treat this as a fun experiment that *might* take off. The best free growth tool is the "Follow For More" link — point it at a page you control and grow an audience. Keep it clearly fan-made (no official FIFA/sponsor endorsement) and use only licensed images and sounds. Good luck! ⚽
