// ============================================================
//  SOUND  — all synthesized with the Web Audio API.
//  No audio files, no copyrighted music. If audio is blocked or
//  unsupported, every function silently no-ops; the app still works.
//  Must be started after a user gesture (browser autoplay rule).
// ============================================================

let ctx = null;
let master = null;
let ambientTimer = null;
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

// low "duff" drum hit
function duff(time = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + time;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(55, t + 0.18);
  g.gain.setValueAtTime(0.6, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + 0.26);
}

// soft ambient stadium loop (gentle filtered noise swells + a slow duff pulse)
function startAmbient() {
  if (!ctx || ambientTimer) return;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(2);
  src.loop = true;
  const filt = ctx.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = 900;
  filt.Q.value = 0.6;
  const g = ctx.createGain();
  g.gain.value = 0.05;
  src.connect(filt); filt.connect(g); g.connect(master);
  src.start();
  let step = 0;
  ambientTimer = setInterval(() => {
    if (!enabled) return;
    duff(0);
    if (step % 2 === 1) duff(0.28);
    step++;
  }, 900);
  // keep a handle to stop noise if needed
  startAmbient._src = src;
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
  click() {
    if (!ctx || !enabled) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(420, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 0.08);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.11);
  },
  reveal() {
    // crowd-roar style swell
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
    // special shimmer for a legend unlock
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
};
