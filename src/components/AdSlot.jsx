import { useEffect, useState } from "react";
import { CONFIG } from "../data/archetypes.js";
import { readCounter, COUNTER_LABELS } from "../lib/counters.js";

// kind: "result" | "video"
export default function AdSlot({ kind }) {
  const [count, setCount] = useState(null);
  const counterName = kind === "video" ? "video" : "result";

  useEffect(() => {
    let alive = true;
    if (CONFIG.SHOW_VISITOR_COUNT) {
      readCounter(counterName).then((r) => { if (alive) setCount(r.value); });
    }
    return () => { alive = false; };
  }, [counterName]);

  const wa = `https://wa.me/${CONFIG.WHATSAPP}`;
  const headline = kind === "video" ? "📢 Show your video ad here" : "📢 Show your banner here";
  const icon = kind === "video" ? "🎥" : "⚽";
  const label = COUNTER_LABELS[counterName];

  return (
    <a className="ad-slot" href={wa} target="_blank" rel="noreferrer">
      <div className="ad-tag">ADVERTISEMENT</div>
      {CONFIG.SHOW_VISITOR_COUNT && count != null && (
        <div className="ad-count">{icon} {count} {label}</div>
      )}
      <div className="ad-headline">{headline}</div>
      <div className="ad-cta">WhatsApp Us →</div>
    </a>
  );
}
