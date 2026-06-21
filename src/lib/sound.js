// ============================================================
//  SOUND — synthesized with Web Audio (no audio files, no copyright).
//  Ambient "duff" loop swells from normal up to ~4x tempo & volume,
//  then back down, on a continuous loop. Button press = football shot.
//  Everything no-ops silently if audio is blocked/unsupported.
//  Must start after a user gesture (browser autoplay rule).
// ============================================================

let ctx = null;
let master = null;
let ambGain = null;
let ambientTimer = null;
let ambientStartMs = 0;
let enabled = true;

function ensure() {
  if (ctx) return true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    return true;
  } catch {
    return false;
  }
}

function noiseBuffer(seconds = 0.2) {
  const n = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

// one low "duff" drum hit into a destination node
function duffInto(dest, t0 = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + t0;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(55, t + 0.16);
  g.gain.setValueAtTime(0.9, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
  o.connect(g); g.connect(dest);
  o.start(t); o.stop(t + 0.24);
}

// triangle 0→1→0 across the cycle
function triPhase(elapsedMs, cycleMs) {
  const p = (elapsedMs % cycleMs) / cycleMs;
  return p < 0.5 ? p * 2 : (1 - p) * 2;
}

function startAmbient() {
  if (!ctx || ambientTimer) return;
  ambGain = ctx.createGain();
  ambGain.gain.value = 0.04;
  ambGain.connect(master);

  ambientStartMs = Date.now();
  const CYCLE_MS = 5000;       // one full normal→4x→normal swell
  const BASE_INTERVAL = 0.46;  // seconds at normal tempo ("double speed = normal")
  const BASE_VOL = 0.035;

  const step = () => {
    if (!ctx) return;
    const phase = triPhase(Date.now() - ambientStartMs, CYCLE_MS); // 0..1
    const factor = 1 + 3 * phase; // 1x .. 4x (tempo AND volume)
    try { ambGain.gain.setTargetAtTime(BASE_VOL * factor, ctx.currentTime, 0.06); } catch {}
    if (enabled) duffInto(ambGain);
    const intervalMs = (BASE_INTERVAL / factor) * 1000;
    ambientTimer = setTimeout(step, intervalMs);
  };
  step();
}

export const Sound = {
  async start() {
    if (!ensure()) return;
    try { await ctx.resume(); } catch {}
    startAmbient();
  },
  setEnabled(on) {
    enabled = on;
    if (master) master.gain.value = on ? 0.9 : 0;
  },
  isEnabled() {
    return enabled;
  },

  // Button press = football shot: a crisp "thwack" + a low "boom".
  click() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    // thwack — short high-passed noise (boot striking the ball)
    const n = ctx.createBufferSource();
    n.buffer = noiseBuffer(0.09);
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 1100;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.5, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    n.connect(hp); hp.connect(ng); ng.connect(master);
    n.start(t); n.stop(t + 0.09);
    // boom — fast low sine drop (the thump of contact)
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.13);
    g.gain.setValueAtTime(0.6, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.17);
  },

  reveal() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(1.2);
    const filt = ctx.createBiquadFilter();
    filt.type = "bandpass";
    filt.frequency.setValueAtTime(500, t);
    filt.frequency.linearRampToValueAtTime(1600, t + 0.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.35, t + 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    src.connect(filt); filt.connect(g); g.connect(master);
    src.start(t); src.stop(t + 1.2);
  },

  legend() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.3, t + i * 0.12 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.5);
      o.connect(g); g.connect(master);
      o.start(t + i * 0.12); o.stop(t + i * 0.12 + 0.5);
    });
    this.reveal();
  },

  tick() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.09);
  },

  success() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    [660, 880, 1320].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + i * 0.09);
      g.gain.exponentialRampToValueAtTime(0.32, t + i * 0.09 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.32);
      o.connect(g); g.connect(master);
      o.start(t + i * 0.09); o.stop(t + i * 0.09 + 0.34);
    });
  },

  error() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    [220, 160].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(f, t + i * 0.16);
      o.frequency.exponentialRampToValueAtTime(f * 0.7, t + i * 0.16 + 0.14);
      g.gain.setValueAtTime(0.28, t + i * 0.16);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.16 + 0.15);
      o.connect(g); g.connect(master);
      o.start(t + i * 0.16); o.stop(t + i * 0.16 + 0.16);
    });
  },
};
