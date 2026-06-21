import { useEffect, useState } from "react";
import { CONFIG } from "../data/archetypes.js";
import { readCounter } from "../lib/counters.js";

// One shared ad box used on Result, Hall of Fame, Alternate Destiny and the
// Unlock-Legend pages. Shows the TOTAL site-visit count + a WhatsApp contact CTA.
export default function AdSlot() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    if (CONFIG.SHOW_VISITOR_COUNT) {
      readCounter("site").then((r) => { if (alive) setCount(r.value); });
    }
    return () => { alive = false; };
  }, []);

  const wa = `https://wa.me/${CONFIG.WHATSAPP}`;
  const visits = CONFIG.SHOW_VISITOR_COUNT && count != null && count > 0 ? count : null;

  return (
    <div className="ad-slot">
      <div className="ad-tag">ADVERTISEMENT</div>
      <div className="ad-text">
        {visits != null
          ? `This page was visited ${visits} times today. `
          : "This spot reaches every player. "}
        To show your banner ad here,{" "}
        <a href={wa} target="_blank" rel="noreferrer" className="ad-wa">contact us on WhatsApp →</a>
      </div>
    </div>
  );
}
