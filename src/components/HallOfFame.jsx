import { lsGet, lsSet } from "../lib/storage.js";
import { displayName } from "../lib/profanity.js";

const KEY = "hall_of_fame_v1";

export function addToHallOfFame(userName, result) {
  const list = lsGet(KEY, []) || [];
  list.unshift({
    name: displayName(userName),
    player: result.name,
    legend: !!result.isLegend,
    at: Date.now(),
  });
  lsSet(KEY, list.slice(0, 20)); // keep last 20
}

export default function HallOfFame() {
  const list = lsGet(KEY, []) || [];
  if (!list.length) return null;
  const legends = list.filter((r) => r.legend).slice(0, 5);

  return (
    <div className="hof">
      <h3>🏆 Hall of Fame</h3>
      <div className="hof-sub">Recent Results</div>
      <ul className="hof-list">
        {list.slice(0, 10).map((r, i) => (
          <li key={i}>
            <span className="hof-name">{r.name}</span>
            <span className="hof-arrow">→</span>
            <span className={"hof-player" + (r.legend ? " legend" : "")}>{r.player}</span>
          </li>
        ))}
      </ul>
      {legends.length > 0 && (
        <>
          <div className="hof-sub">Latest Legends ✨</div>
          <ul className="hof-list">
            {legends.map((r, i) => (
              <li key={i}>
                <span className="hof-name">{r.name}</span>
                <span className="hof-arrow">→</span>
                <span className="hof-player legend">{r.player}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
