import { useEffect, useState } from "react";
import { ARCHETYPES } from "../data/archetypes.js";
import { addToHallOfFame } from "../components/HallOfFame.jsx";
import { buildChallengeText, buildShareText, copyLink, nativeShare } from "../lib/share.js";
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

  const share = async () => {
    const ran = await nativeShare(buildShareText(userName, result));
    if (!ran) { await copyLink(buildShareText(userName, result)); flash("Share text copied!"); }
  };
  const challenge = async () => {
    const ok = await copyLink(buildChallengeText(result));
    flash(ok ? "Challenge copied — paste to a friend!" : "Copy failed — share manually.");
  };
  const saveCard = async () => {
    try {
      const res = await fetch(result.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `which-player-${result.id}.jpg`; a.click();
      URL.revokeObjectURL(url);
    } catch { flash("Long-press the image to save it."); }
  };

  if (revealing) {
    return (
      <div className="screen center reveal">
        <div className="reveal-spinner" />
        <div className="reveal-text">Calculating your football DNA…</div>
      </div>
    );
  }

  // All result buttons. If the count is ODD, the last one spans both columns.
  const buttons = [
    { label: "Share 📲", cls: "g-share", onClick: share },
    { label: "Save Card ⬇", cls: "g-save", onClick: saveCard },
    { label: "Challenge 🤝", cls: "g-chal", onClick: challenge },
    { label: "Hall of Fame 🏆", cls: "g-hof", onClick: onHallOfFame },
    { label: "Alternate Destiny ✨", cls: "g-alt", onClick: onAlternateDestiny },
    { label: "Play Again 🔄", cls: "g-again", onClick: onBack },
  ];
  const oddLast = buttons.length % 2 === 1;

  return (
    <div className="screen fit result-v2">
      <div className="you-are">YOU ARE…</div>

      <div className={"result-card " + (RARITY_CLASS[result.rarity] || "r-common")}>
        <img src={result.image} alt={result.name} decoding="async" />
      </div>

      <div className="result-head">
        <span className={"rarity " + (RARITY_CLASS[result.rarity] || "r-common")}>{result.rarity}</span>
        <h2 className="result-name">{result.name}</h2>
        <div className="result-arch">{archLabel}</div>
      </div>

      <p className="result-desc">{result.description}</p>

      <div className="btn-grid">
        {buttons.map((b, i) => (
          <button
            key={i}
            className={"grid-btn " + b.cls + (oddLast && i === buttons.length - 1 ? " span2" : "")}
            onClick={b.onClick}
          >
            {b.label}
          </button>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
