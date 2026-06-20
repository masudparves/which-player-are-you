import { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { randomRevealableCode } from "../data/players.js";
import { bumpCounter } from "../lib/counters.js";
import { Sound } from "../lib/sound.js";
import { copyLink } from "../lib/share.js";

// mode: "code"  -> reveal a secret legend code after the countdown
// mode: "alternate" -> after countdown, auto-return with an alternate-destiny player
export default function VideoCodeScreen({ banner, mode = "code", onBack, onPlayAgain, onAlternateReady }) {
  const [count, setCount] = useState(null);
  const [revealed, setRevealed] = useState([]);
  const [running, setRunning] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(-1);
  const timer = useRef(null);

  const copyCode = async (codeText, idx) => {
    await copyLink(codeText);
    setCopiedIdx(idx);
    Sound.click();
    setTimeout(() => setCopiedIdx((c) => (c === idx ? -1 : c)), 1800);
  };

  useEffect(() => { bumpCounter("video"); }, []);
  useEffect(() => () => clearInterval(timer.current), []);

  // auto-start the countdown in alternate mode (it's a sponsor gate, not optional)
  useEffect(() => { if (mode === "alternate") watch(); /* eslint-disable-next-line */ }, []);

  function watch() {
    if (running) return;
    setRunning(true);
    setCount(5);
    let c = 5;
    Sound.tick();
    timer.current = setInterval(() => {
      c -= 1;
      setCount(c);
      if (c > 0) {
        Sound.tick();
      } else {
        clearInterval(timer.current);
        setRunning(false);
        if (mode === "alternate") {
          Sound.reveal();
          onAlternateReady();
        } else {
          const lg = randomRevealableCode();
          setRevealed((r) => [...r, { name: lg.name, code: lg.code }]);
          Sound.legend();
        }
      }
    }, 1000);
  }

  const isAlt = mode === "alternate";

  return (
    <div className="screen">
      <Banner src={banner} />
      <div className="pad center">
        <h2 className="vc-title">{isAlt ? "Your Alternate Destiny" : "Unlock A Football Legend"}</h2>
        <p className="vc-sub">
          {isAlt
            ? "Watch the short sponsor clip to reveal your alternate destiny…"
            : "Watch the sponsor video completely to receive a secret code."}
        </p>

        <div className="video-box">
          <div className="ad-tag">AD</div>
          {count === null && <div className="video-play">▶</div>}
          {running && count > 0 && <div className="countdown">{count}</div>}
          {count === 0 && !running && !isAlt && <div className="video-done">✓ Ad complete</div>}
        </div>

        {!isAlt && !running && revealed.map((r, i) => (
          <div className="code-reveal" key={i}>
            <div className="cr-top">🎁 Secret Code Unlocked</div>
            <div className="cr-name">for {r.name}</div>
            <div className="cr-code-row">
              <span className="cr-code">{r.code}</span>
              <button className="cr-copy" onClick={() => copyCode(r.code, i)}>
                {copiedIdx === i ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="cr-hint">Try it in the game.</div>
          </div>
        ))}

        {!isAlt && (
          <button className="btn-primary" onClick={watch} disabled={running}>
            {running ? "Watching…" : revealed.length === 0 ? "▶ Watch video to get a code" : "Unlock Another Legend? Watch another ad ▶"}
          </button>
        )}

        <AdSlot kind="video" />

        {!isAlt && <button className="btn-secondary" onClick={onPlayAgain}>Play Again</button>}
        <button className="btn-link" onClick={onBack}>← Back To Start</button>
      </div>
    </div>
  );
}
