import { CONFIG } from "../data/archetypes.js";

export function buildShareText(userName, result) {
  const title = result.nickname || result.archetype;
  return `🔥 ${userName} got ${result.name}

${title}

Can you get someone better?

Play now:
${CONFIG.SITE_URL}`;
}

export function buildChallengeText(result) {
  return `⚽ I got ${result.name}

Can you beat my result?

Play now:
${CONFIG.SITE_URL}`;
}

const enc = encodeURIComponent;

export function platformLinks(text) {
  const url = CONFIG.SITE_URL;
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(text)}`,
    messenger: `fb-messenger://share/?link=${enc(url)}`,
    whatsapp: `https://wa.me/?text=${enc(text)}`,
    x: `https://twitter.com/intent/tweet?text=${enc(text)}`,
  };
}

// Try native share sheet first (best on mobile); returns true if it ran.
export async function nativeShare(text) {
  try {
    if (navigator.share) {
      await navigator.share({ text, url: CONFIG.SITE_URL });
      return true;
    }
  } catch {
    /* user cancelled or unsupported */
  }
  return false;
}

export async function copyLink(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
