import { getHallOfFame } from "../components/HallOfFame.jsx";
import AdSlot from "../components/AdSlot.jsx";

export default function HallScreen({ onBack }) {
  const list = getHallOfFame().slice(0, 10);

  return (
    <div className="screen fit subpage">
      <h2 className="sub-title">🏆 Hall of Fame</h2>
      <div className="sub-sub">Last 10 results</div>

      <div className="hof-box">
        {list.length === 0 ? (
          <div className="hof-empty">No results yet — play to be the first!</div>
        ) : (
          <ul className="hof-list">
            {list.map((r, i) => (
              <li key={i}>
                <span className="hof-rank">{i + 1}</span>
                <span className="hof-name">{r.name}</span>
                <span className="hof-arrow">→</span>
                <span className={"hof-player" + (r.legend ? " legend" : "")}>{r.player}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AdSlot kind="result" />

      <button className="btn-link sub-back" onClick={onBack}>← Back To Start</button>
    </div>
  );
}
