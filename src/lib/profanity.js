// Basic name sanitizing + light profanity filter.
// Letters, numbers, spaces only · max 20 chars · "Football Fan" if blank.
const BAD = ["fuck", "shit", "bitch", "asshole", "bastard", "dick", "cunt", "nigger", "nigga", "slut", "whore", "fag", "rape"];

export function sanitizeName(raw) {
  let s = (raw || "").replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, " ").trim().slice(0, 20);
  const lower = s.toLowerCase();
  if (BAD.some((w) => lower.includes(w))) s = "";
  return s || "Football Fan";
}

// Hall of Fame shows only the first 12 characters.
export function displayName(name) {
  return (name || "Football Fan").slice(0, 12);
}
