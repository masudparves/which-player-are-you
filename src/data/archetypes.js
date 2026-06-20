// ============================================================
//  GLOBAL CONFIG  — the things you'll most likely edit
// ============================================================
export const CONFIG = {
  SITE_URL: "https://YOUR-SITE.netlify.app", // ← change after you deploy
  WHATSAPP: "8801700703620",                 // ad enquiries (digits only, no +)
  FOLLOW_URL: "",                            // optional: your IG/FB page for "Follow for more" ("" hides it)

  // YouTube — hidden in Version 1
  SHOW_YOUTUBE_LINK: false,
  YOUTUBE_CHANNEL_URL: "",

  // Visitor counter labels
  SHOW_VISITOR_COUNT: true, // shows count text; uses Firebase if configured, else local fallback
};

// ============================================================
//  ARCHETYPES
// ============================================================
export const ARCHETYPES = {
  machine:  { id: "machine",  label: "The Goal Machine" },
  magician: { id: "magician", label: "The Magician" },
  general:  { id: "general",  label: "The General" },
  speed:    { id: "speed",    label: "The Speed Demon" },
  showman:  { id: "showman",  label: "The Showman" },
  talisman: { id: "talisman", label: "The Talisman" },
  legend:   { id: "legend",   label: "Living Legend" },
};
