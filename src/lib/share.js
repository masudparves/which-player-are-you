import { CONFIG } from "../data/archetypes.js";

// Use the configured SITE_URL once it's set; otherwise fall back to the LIVE
// address the page is actually served from. This means share links always point
// to the real site even if you forget to edit SITE_URL after deploying.
export function siteUrl() {
  const u = (CONFIG.SITE_URL || "").trim();
  const looksUnset = !u || u.includes("YOUR-SITE");
  if (looksUnset && typeof window !== "undefined" && window.location && window.location.origin) {
    return window.location.origin;
  }
  return u || "";
}

const HASHTAGS = "#WorldCup2026 #WhichPlayerAreYou";

export function buildShareText(userName, result) {
  const title = result.nickname || result.archetype;
  return `🔥 ${userName} got ${result.name}

${title}

Can you get someone better?

Play now:
${siteUrl()}

${HASHTAGS}`;
}

export function buildChallengeText(result) {
  return `⚽ I got ${result.name}

Can you beat my result?

Play now:
${siteUrl()}

${HASHTAGS}`;
}

const enc = encodeURIComponent;

export function platformLinks(text) {
  const url = siteUrl();
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(text)}`,
    messenger: `https://www.facebook.com/dialog/send?link=${enc(url)}&redirect_uri=${enc(url)}`,
    whatsapp: `https://wa.me/?text=${enc(text)}`,
    x: `https://twitter.com/intent/tweet?text=${enc(text)}`,
  };
}

// Try the native share sheet first (best on mobile — shows WhatsApp, Messenger, etc).
// If unavailable (most desktops), open WhatsApp web share as a sensible fallback.
export async function nativeShare(text) {
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ text, url: siteUrl() });
      return true;
    }
  } catch {
    /* user cancelled or unsupported — fall through */
  }
  try {
    window.open(`https://wa.me/?text=${enc(text)}`, "_blank", "noopener");
    return true;
  } catch {
    return false;
  }
}

export async function copyLink(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // very old browsers / insecure context
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}
