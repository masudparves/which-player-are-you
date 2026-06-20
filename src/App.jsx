import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFX from "./components/BackgroundFX.jsx";
import SoundToggle from "./components/SoundToggle.jsx";
import StartScreen from "./screens/StartScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import ResultScreen from "./screens/ResultScreen.jsx";
import VideoCodeScreen from "./screens/VideoCodeScreen.jsx";
import HallScreen from "./screens/HallScreen.jsx";
import AltScreen from "./screens/AltScreen.jsx";
import { randomBanner } from "./components/Banner.jsx";
import { PLAYERS } from "./data/players.js";
import { ARCHETYPES } from "./data/archetypes.js";
import { Sound } from "./lib/sound.js";
import { bumpCounter } from "./lib/counters.js";
import { sanitizeName } from "./lib/profanity.js";
import { lsGet, lsSet } from "./lib/storage.js";

// pick the result from quiz scores (fair across archetypes)
function pickResult(scores) {
  let top = -1;
  Object.values(scores).forEach((v) => { if (v > top) top = v; });
  if (top < 0) {
    // no scores → random archetype
    const ids = Object.keys(ARCHETYPES).filter((a) => a !== "legend");
    const arch = ids[Math.floor(Math.random() * ids.length)];
    const pool = PLAYERS.filter((p) => p.archetype === arch);
    return pool[Math.floor(Math.random() * pool.length)];
  }
  const tied = Object.entries(scores).filter(([, v]) => v === top).map(([k]) => k);
  const arch = tied[Math.floor(Math.random() * tied.length)]; // random among tied archetypes
  const pool = PLAYERS.filter((p) => p.archetype === arch);
  return pool[Math.floor(Math.random() * pool.length)] || PLAYERS[0];
}

export default function App() {
  const [screen, setScreen] = useState("start");
  const [name, setName] = useState(() => lsGet("user_name", "") || "");
  const [soundOn, setSoundOn] = useState(true);
  const [unlocked, setUnlocked] = useState(null); // forced legend from a code
  const [result, setResult] = useState(null);
  const [alternate, setAlternate] = useState(null);
  const [banner, setBanner] = useState(() => randomBanner());
  const [videoMode, setVideoMode] = useState("code");
  const audioStarted = useRef(false);

  // count a site visit once
  useEffect(() => { bumpCounter("site"); }, []);

  // start audio on first interaction
  const kickAudio = async () => {
    if (audioStarted.current) return;
    audioStarted.current = true;
    await Sound.start();
    Sound.setEnabled(soundOn);
  };

  const toggleSound = async () => {
    await kickAudio();
    const next = !soundOn;
    setSoundOn(next);
    Sound.setEnabled(next);
  };

  const newBanner = () => setBanner(randomBanner());

  const startQuiz = async () => {
    await kickAudio();
    lsSet("user_name", name);
    setAlternate(null);
    setScreen("quiz");
  };

  const onQuizComplete = (scores) => {
    bumpCounter("result");
    const r = unlocked ? unlocked : pickResult(scores);
    setUnlocked(null); // one-time use
    setResult(r);
    setScreen("result");
  };

  // Alternate Destiny → its own screen (different archetype than the result)
  const goAlternate = () => {
    let pool = PLAYERS.filter((p) => !result || p.archetype !== result.archetype);
    if (!pool.length) pool = PLAYERS.filter((p) => !result || p.id !== result.id);
    setAlternate(pool[Math.floor(Math.random() * pool.length)]);
    newBanner();
    setScreen("alt");
  };

  const goHallOfFame = () => setScreen("hall");

  const finalName = useMemo(() => sanitizeName(name), [name, screen]);

  return (
    <div className="app" onClickCapture={kickAudio}>
      <BackgroundFX />
      <SoundToggle on={soundOn} onToggle={toggleSound} />
      <div className="frame">
        {screen === "start" && (
          <StartScreen
            banner={banner}
            name={name}
            setName={setName}
            unlocked={unlocked}
            onStart={startQuiz}
            onUnlock={(lg) => setUnlocked(lg)}
            onGetCode={() => { setVideoMode("code"); newBanner(); setScreen("video"); }}
          />
        )}
        {screen === "quiz" && (
          <QuizScreen onComplete={onQuizComplete} onBack={() => { newBanner(); setScreen("start"); }} />
        )}
        {screen === "result" && result && (
          <ResultScreen
            result={result}
            userName={finalName}
            onAlternateDestiny={goAlternate}
            onHallOfFame={goHallOfFame}
            onBack={() => { newBanner(); setAlternate(null); setScreen("start"); }}
          />
        )}
        {screen === "hall" && (
          <HallScreen onBack={() => { newBanner(); setScreen("start"); }} />
        )}
        {screen === "alt" && (
          <AltScreen alternate={alternate} onBack={() => { newBanner(); setAlternate(null); setScreen("start"); }} />
        )}
        {screen === "video" && (
          <VideoCodeScreen
            banner={banner}
            mode={videoMode}
            onBack={() => { newBanner(); setScreen("start"); }}
            onPlayAgain={() => { newBanner(); setScreen("start"); }}
          />
        )}
      </div>
    </div>
  );
}
