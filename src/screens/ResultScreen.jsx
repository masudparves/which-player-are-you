import { useEffect, useState } from "react";
import { ARCHETYPES } from "../data/archetypes.js";
import { addToHallOfFame } from "../components/HallOfFame.jsx";
import AdSlot from "../components/AdSlot.jsx";
import ShareBox from "../components/ShareBox.jsx";
import { Sound } from "../lib/sound.js";

const RARITY_CLASS = { COMMON: "r-common", RARE: "r-rare", EPIC: "r-epic", LEGENDARY: "r-legendary" };

export default function ResultScreen({ result, userName, onBack, onAlternateDestiny, onHallOfFame }) {
  const [revealing, setRevealing] = useState(true);

  useEffect(() => {
    addToHallOfFame(userName, result);
    Sound.crowd();
    if (result.isLegend) Sound.legend(); else Sound.reveal();
    const t = setTimeout(() => setRevealing(false), 1600);
    return () => clearTimeout(t);
  }, [result, userName]);

  const archLabel = result.nickname || ARCHETYPES[result.archetype].label;

  if (revealing) {
    return (
      <div className="screen center reveal">
        <div className="reveal-spinner" />
        <div className="reveal-text">Calculating your football DNA…</div>
      </div>
    );
  }

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

      <div className="btn-grid">
        <button className="grid-btn g-alt" onClick={onAlternateDestiny}>Alternate Destiny ✨</button>
        <button className="grid-btn g-hof" onClick={onHallOfFame}>Hall of Fame 🏆</button>
      </div>

      <ShareBox result={result} />

      <AdSlot />

      <button className="btn-secondary play-again" onClick={onBack}>Play Again 🔄</button>
    </div>
  );
}
