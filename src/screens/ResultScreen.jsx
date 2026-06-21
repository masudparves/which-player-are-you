import { useEffect, useState } from "react";
import { ARCHETYPES } from "../data/archetypes.js";
import { addToHallOfFame } from "../components/HallOfFame.jsx";
import AdSlot from "../components/AdSlot.jsx";
import {
  buildResultShareText, buildChallengeText, platformLinks,
  copyLink, nativeShare, siteUrl,
} from "../lib/share.js";
import { Sound } from "../lib/sound.js";

const RARITY_CLASS = { COMMON: "r-common", RARE: "r-rare", EPIC: "r-epic", LEGENDARY: "r-legendary" };

export default function ResultScreen({ result, userName, onBack, onAlternateDestiny, onHallOfFame }) {
  const [revealing, setRevealing] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    addToHallOfFame(userName, result);
    if (result.isLegend) Sound.legend(); else Sound.reveal();
    const t = setTimeout(() => setRevealing(false), 1600);
    return () => clearTimeout(t);
  }, [result, userName]);

  const archLabel = result.nickname || ARCHETYPES[result.archetype].label;
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const text = buildResultShareText(result);
  const links = platformLinks(text);
  const open = (url) => { Sound.click(); window.open(url, "_blank", "noopener"); };

  // Native share — tries to attach the actual player card image + text + link.
  const shareNative = async () => {
    Sound.click();
    try {
      const res = await fetch(result.image);
      const blob = await res.blob();
      const file = new File([blob], `which-player-${result.id}.jpg`, { type: blob.type || "image/jpeg" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text, url: siteUrl() });
        return;
      }
    } catch { /* fall through */ }
    const ran = await nativeShare(text);
    if (!ran) { await copyLink(text); flash("Share text copied!"); }
  };

  const challenge = async () => {
    Sound.click();
    const ok = await copyLink(buildChallengeText(result));
    flash(ok ? "Challenge copied — paste to a friend!" : "Copy failed — share manually.");
  };

  const copyShareLink = async () => {
    Sound.click();
    const ok = await copyLink(text);
    flash(ok ? "Link copied — paste it anywhere!" : "Copy failed — long-press to copy.");
  };

  if (revealing) {
    return (
      <div className="screen center reveal">
        <div className="reveal-spinner" />
        <div className="reveal-text">Calculating your football DNA…</div>
      </div>
    );
  }

  // Other action buttons (below the share box). Even count → clean 2 columns.
  const actions = [
    { label: "Challenge 🤝", cls: "g-chal", onClick: challenge },
    { label: "Alternate Destiny ✨", cls: "g-alt", onClick: onAlternateDestiny },
    { label: "Hall of Fame 🏆", cls: "g-hof", onClick: onHallOfFame },
    { label: "Play Again 🔄", cls: "g-again", onClick: onBack },
  ];
  const oddFirst = actions.length % 2 === 1;

  return (
    <div className="screen fit result-v2">
      <div className="you-are">YOU ARE…</div>

      <div
        className="result-card jersey-card"
        style={{ borderColor: result.jersey, boxShadow: `0 0 22px ${result.jersey}77` }}
      >
        <img src={result.image} alt={result.name} decoding="async" />
      </div>

      <div className="result-head">
        <span className={"rarity " + (RARITY_CLASS[result.rarity] || "r-common")}>{result.rarity}</span>
        <h2 className="result-name">{result.name}</h2>
        <div className="result-arch">{archLabel}</div>
      </div>

      <p className="result-desc">{result.description}</p>

      {/* Phone share — sends the actual player card + text + link */}
      <button className="grid-btn g-share share-phone" onClick={shareNative}>
        📲 Share from Phone
      </button>

      {/* PC share — link + text only (preview image comes from the page) */}
      <div className="pc-share">
        <span className="pc-share-tag">For PC Sharing</span>
        <div className="pc-grid">
          <button className="grid-btn g-fb" onClick={() => open(links.facebook)}>Facebook</button>
          <button className="grid-btn g-x" onClick={() => open(links.x)}>X</button>
          <button className="grid-btn g-wa" onClick={() => open(links.whatsapp)}>WhatsApp</button>
          <button className="grid-btn g-copy" onClick={copyShareLink}>Copy Link</button>
        </div>
      </div>

      <div className="btn-grid">
        {actions.map((b, i) => (
          <button
            key={i}
            className={"grid-btn " + b.cls + (oddFirst && i === 0 ? " span2" : "")}
            onClick={b.onClick}
          >
            {b.label}
          </button>
        ))}
      </div>

      <AdSlot />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
