import { useEffect, useMemo, useState } from "react";
import { ARCHETYPES, CONFIG } from "../data/archetypes.js";
import { PLAYERS } from "../data/players.js";
import ShareButtons from "../components/ShareButtons.jsx";
import HallOfFame, { addToHallOfFame } from "../components/HallOfFame.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { buildChallengeText, copyLink } from "../lib/share.js";
import { Sound } from "../lib/sound.js";

const RARITY_CLASS = { COMMON: "r-common", RARE: "r-rare", EPIC: "r-epic", LEGENDARY: "r-legendary" };

export default function ResultScreen({ result, userName, onBack, onAlternateDestiny, alternate }) {
  const [revealing, setRevealing] = useState(true);

  useEffect(() => {
    addToHallOfFame(userName, result);
    if (result.isLegend) Sound.legend(); else Sound.reveal();
    const t = setTimeout(() => setRevealing(false), 1600);
    return () => clearTimeout(t);
  }, [result, userName]);

  const siblings = useMemo(
    () => PLAYERS.filter((p) => p.archetype === result.archetype && p.id !== result.id),
    [result]
  );
  const archLabel = result.nickname || ARCHETYPES[result.archetype].label;

  const challenge = async () => {
    const ok = await copyLink(buildChallengeText(result));
    alert(ok ? "Challenge copied! Paste it to a friend." : "Could not copy — share manually.");
  };

  const saveCard = async () => {
    try {
      const res = await fetch(result.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `which-player-${result.id}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Couldn't save automatically — long-press the image to save it.");
    }
  };

  if (revealing) {
    return (
      <div className="screen center reveal">
        <div className="reveal-spinner" />
        <div className="reveal-text">Calculating your football DNA…</div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="pad center result">
        <div className="you-are">YOU ARE…</div>

        <div className={"result-card " + (RARITY_CLASS[result.rarity] || "r-common")}>
          <img src={result.image} alt={result.name} decoding="async" />
        </div>

        <div className={"rarity " + (RARITY_CLASS[result.rarity] || "r-common")}>{result.rarity}</div>
        <h2 className="result-name">{result.name}</h2>
        <div className="result-arch">{archLabel}</div>

        <p className="result-desc">{result.description}</p>

        {siblings.length > 0 && (
          <div className="siblings">
            <div className="siblings-title">Other Players In This Archetype</div>
            <div className="siblings-names">{siblings.map((s) => s.name).join(" · ")}</div>
          </div>
        )}

        <ShareButtons userName={userName} result={result} />

        <button className="btn-secondary" onClick={challenge}>Challenge A Friend 🤝</button>
        <button className="btn-secondary" onClick={saveCard}>⬇ Save My Card</button>

        {/* Alternate Destiny */}
        {!alternate ? (
          <button className="btn-alt" onClick={onAlternateDestiny}>✨ Discover Your Alternate Destiny</button>
        ) : (
          <div className="alt-card">
            <div className="alt-title">Your Alternate Destiny</div>
            <img src={alternate.image} alt={alternate.name} loading="lazy" decoding="async" />
            <div className="alt-name">{alternate.name}</div>
            <div className="alt-arch">{alternate.nickname || ARCHETYPES[alternate.archetype].label}</div>
          </div>
        )}

        {CONFIG.FOLLOW_URL && (
          <a className="btn-follow" href={CONFIG.FOLLOW_URL} target="_blank" rel="noreferrer">＋ Follow For More</a>
        )}

        <AdSlot kind="result" />

        <HallOfFame />

        <button className="btn-link" onClick={onBack}>← Back To Start</button>
      </div>
    </div>
  );
}
