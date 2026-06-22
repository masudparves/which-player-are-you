import { useEffect, useState } from "react";
import { CONFIG } from "../data/archetypes.js";
import { readCounter } from "../lib/counters.js";

// adType: "banner" (default) on Result/HoF/Alt, or "video" on the Unlock-Legend page.
export default function AdSlot({ adType = "banner" }) {
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
  const adLabel = adType === "video" ? "Video Ad in this page" : "banner ad here";

  return (
    <div className="ad-slot">
      <div className="ad-tag">ADVERTISEMENT</div>
      <div className="ad-text">
        {visits != null
          ? `This page was visited ${visits} times today. `
          : "This spot reaches every player. "}
        To show your {adLabel},{" "}
        <a href={wa} target="_blank" rel="noreferrer" className="ad-wa">contact us on WhatsApp →</a>
      </div>
    </div>
  );
}
