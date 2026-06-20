import { useEffect, useState } from "react";
import Banner from "../components/Banner.jsx";
import logo from "../assets/logo/mmp-logo.png";
import { readCounter } from "../lib/counters.js";
import { CONFIG, ARCHETYPES } from "../data/archetypes.js";
import { legendByCode } from "../data/players.js";
import { playerOfTheDay } from "../lib/rotation.js";
import { Sound } from "../lib/sound.js";

export default function StartScreen({ banner, onStart, onUnlock, onGetCode, unlocked, name, setName }) {
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [plays, setPlays] = useState(null);
  const potd = playerOfTheDay();

  useEffect(() => {
    let alive = true;
    readCounter("result").then((r) => { if (alive && r.value > 0) setPlays(r.value); });
    return () => { alive = false; };
  }, []);

  const tryCode = () => {
    const lg = legendByCode(code);
    if (lg) {
      onUnlock(lg);
      setMsg(`✅ Secret Player Unlocked: ${lg.name}. Now Start Play.`);
      Sound.legend();
    } else {
      setMsg("That code did not unlock a legend. Try again.");
    }
  };

  return (
    <div className="screen">
      <Banner src={banner} />
      <div className="pad center">
        <img className="brand-logo" src={logo} alt="MMP" />
        <h1 className="title">WHICH PLAYER ARE YOU?</h1>
        <p className="subtitle">Discover your football personality in under 1 minute.</p>
        {plays != null && <div className="social-proof">🔥 {plays} results revealed today</div>}

        <div className="field">
          <label>Your Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
          />
          <span className="hint">Optional · letters, numbers & spaces</span>
        </div>

        <div className="potd">
          <div className="potd-tag">🔥 Today's Featured Player</div>
          <div className="potd-name">{potd.name}</div>
          <div className="potd-arch">{ARCHETYPES[potd.archetype].label}</div>
        </div>

        {unlocked && (
<div className="unlocked-note"><span className="twinkle-star">⭐</span> Legend ready: <b>{unlocked.name}</b> — press Start Play.</div>        )}

        <button className="btn-primary" onClick={onStart}>Start Play ⚽</button>

        {!showCode ? (
          <button className="btn-link" onClick={() => setShowCode(true)}>🔓 Got A Secret Code?</button>
        ) : (
          <div className="code-panel">
            <div className="code-row">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryCode()}
                placeholder="Enter secret code"
              />
              <button className="btn-unlock" onClick={tryCode}>Unlock</button>
            </div>
            {msg && <div className={"code-msg" + (msg.startsWith("✅") ? " ok" : "")}>{msg}</div>}
            <button className="btn-link gold" onClick={onGetCode}>🎁 Get Secret Code</button>
          </div>
        )}

        {CONFIG.SHOW_YOUTUBE_LINK && CONFIG.YOUTUBE_CHANNEL_URL && (
          <a className="btn-link" href={CONFIG.YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">▶ YouTube</a>
        )}
      </div>
    </div>
  );
}
