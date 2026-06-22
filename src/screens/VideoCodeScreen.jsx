import { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { randomRevealableCode } from "../data/players.js";
import { bumpCounter } from "../lib/counters.js";
import { Sound } from "../lib/sound.js";
import { copyLink } from "../lib/share.js";

// mode: "code" -> reveal ONE secret legend code after the countdown (previous hidden)
// mode: "alternate" -> after countdown, auto-return with an alternate-destiny player
export default function VideoCodeScreen({ banner, mode = "code", onBack, onPlayAgain, onAlternateReady }) {
  const [count, setCount] = useState(null);
  const [current, setCurrent] = useState(null); // the single code currently shown
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const cycleRef = useRef([]); // codes shown in the current no-repeat cycle

  const copyCode = async (codeText) => {
    await copyLink(codeText);
    setCopied(true);
    Sound.click();
    setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => { bumpCounter("video"); }, []);
  useEffect(() => () => clearInterval(timer.current), []);
  useEffect(() => { if (mode === "alternate") watch(); /* eslint-disable-next-line */ }, []);

  function watch() {
    if (running) return;
    setRunning(true);
    setCurrent(null);   // hide the previous code while the new video plays
    setCopied(false);
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
          const lg = randomRevealableCode(cycleRef.current);
          cycleRef.current.push(lg.code);
          if (cycleRef.current.length >= 3) cycleRef.current = []; // reset after all 3 shown
          setCurrent({ name: lg.name, code: lg.code }); // replaces previous → only one on screen
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

        {!isAlt && !running && current && (
          <div className="code-reveal">
            <div className="cr-top">🎁 Secret Code Unlocked</div>
            <div className="cr-name">for {current.name}</div>
            <div className="cr-code-row">
              <span className="cr-code">{current.code}</span>
              <button className="cr-copy" onClick={() => copyCode(current.code)}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="cr-hint">Try it in the game.</div>
          </div>
        )}

        {!isAlt && (
          <button className="btn-primary" onClick={watch} disabled={running}>
            {running ? "Watching…" : !current ? "▶ Watch video to get a code" : "Unlock Another Legend? Watch another ad ▶"}
          </button>
        )}

        <AdSlot adType="video" />

        {!isAlt && <button className="btn-secondary" onClick={onPlayAgain}>Back to Start</button>}
      </div>
    </div>
  );
}
