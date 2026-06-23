import { ARCHETYPES } from "../data/archetypes.js";
import AdSlot from "../components/AdSlot.jsx";
import ShareBox from "../components/ShareBox.jsx";

const RARITY_CLASS = { COMMON: "r-common", RARE: "r-rare", EPIC: "r-epic", LEGENDARY: "r-legendary" };

export default function AltScreen({ alternate, onBack }) {
  if (!alternate) {
    return (
      <div className="screen fit subpage">
        <h2 className="sub-title">✨ Alternate Destiny</h2>
        <div className="sub-sub">Something went wrong — play again.</div>
        <button className="btn-secondary play-again" onClick={onBack}>Play Again 🔄</button>
      </div>
    );
  }
  const archLabel = alternate.nickname || ARCHETYPES[alternate.archetype].label;

  return (
    <div className="screen fit subpage">
      <h2 className="sub-title">✨ Your Alternate Destiny</h2>

      <div
        className="result-card jersey-card alt-card-v2"
        style={{ borderColor: alternate.jersey, boxShadow: `0 0 22px ${alternate.jersey}77` }}
      >
        <img src={alternate.image} alt={alternate.name} decoding="async" />
      </div>

      <div className="result-head">
        <span className={"rarity " + (RARITY_CLASS[alternate.rarity] || "r-common")}>{alternate.rarity}</span>
        <h2 className="result-name">{alternate.name}</h2>
        <div className="result-arch">{archLabel}</div>
      </div>

      <ShareBox result={alternate} />

      <p className="result-desc">{alternate.description}</p>

      <AdSlot />

      <button className="btn-secondary play-again" onClick={onBack}>Play Again 🔄</button>
    </div>
  );
}
