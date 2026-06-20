import { useMemo, useState } from "react";
import Banner, { randomBanner } from "../components/Banner.jsx";
import { QUESTION_BANK, GOAT_QUESTION } from "../data/questions.js";
import { Sound } from "../lib/sound.js";

const QUESTIONS_PER_PLAY = 5;

function pickFive() {
  const a = [...QUESTION_BANK];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(QUESTIONS_PER_PLAY, a.length));
}

export default function QuizScreen({ onComplete, onBack }) {
  const questions = useMemo(pickFive, []);
  const banners = useMemo(() => questions.map(() => randomBanner()).concat(randomBanner()), [questions]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [scores, setScores] = useState({});
  const [goat, setGoat] = useState(false);      // GOAT Easter-egg phase
  const [goatPick, setGoatPick] = useState(null);

  const q = questions[qi];

  const choose = (opt, idx) => {
    if (picked !== null) return;
    setPicked(idx);
    Sound.click();
    const next = { ...scores };
    Object.entries(opt.s).forEach(([k, v]) => (next[k] = (next[k] || 0) + v));
    setTimeout(() => {
      if (qi + 1 < questions.length) {
        setScores(next);
        setPicked(null);
        setQi(qi + 1);
      } else {
        setScores(next);
        setGoat(true); // show the fun Easter-egg, then finish
      }
    }, 300);
  };

  const chooseGoat = (idx) => {
    if (goatPick !== null) return;
    setGoatPick(idx);
    Sound.click();
    setTimeout(() => onComplete(scores), 600); // NON-scoring — just for fun
  };

  // ---- GOAT Easter-egg screen ----
  if (goat) {
    return (
      <div className="screen">
        <Banner src={banners[banners.length - 1]} />
        <div className="pad">
          <div className="q-count">JUST FOR FUN ⚡</div>
          <h2 className="q-text">{GOAT_QUESTION.q}</h2>
          <div className="options">
            {GOAT_QUESTION.options.map((opt, i) => (
              <button
                key={i}
                className={"option" + (goatPick === i ? " picked" : "")}
                onClick={() => chooseGoat(i)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button className="btn-link back" onClick={onBack}>← Back To Start</button>
        </div>
      </div>
    );
  }

  // ---- regular question ----
  return (
    <div className="screen">
      <Banner src={banners[qi]} />
      <div className="pad">
        <div className="progress">
          {questions.map((_, i) => (
            <span key={i} className={"dot" + (i <= qi ? " on" : "")} />
          ))}
        </div>
        <div className="q-count">QUESTION {qi + 1} OF {questions.length}</div>
        <h2 className="q-text">{q.q}</h2>
        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={"option" + (picked === i ? " picked" : "")}
              onClick={() => choose(opt, i)}
            >
              {opt.t}
            </button>
          ))}
        </div>
        <button className="btn-link back" onClick={onBack}>← Back To Start</button>
      </div>
    </div>
  );
}
