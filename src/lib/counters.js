// ============================================================
//  VISITOR COUNTERS
//  - If Firebase env vars are present AND firebase is installed,
//    use REAL shared counters (Firestore).
//  - Otherwise, fall back to per-day LOCAL counters automatically.
//  The site NEVER breaks if Firebase is missing/blocked/errors.
// ============================================================
import { lsGet, lsSet } from "./storage.js";

const todayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

// ---- LOCAL fallback ----
function localBump(name) {
  const key = `count_${name}_${todayKey()}`;
  const n = (lsGet(key, 0) || 0) + 1;
  lsSet(key, n);
  return n;
}
function localGet(name) {
  return lsGet(`count_${name}_${todayKey()}`, 0) || 0;
}

// ---- FIREBASE (optional, lazy-loaded) ----
const env = import.meta.env || {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};
const firebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let dbPromise = null;
async function getDb() {
  if (!firebaseConfigured) return null;
  if (dbPromise) return dbPromise;
  dbPromise = (async () => {
    try {
      // These imports only resolve if you've run: npm install firebase
      const { initializeApp } = await import("firebase/app");
      const { getFirestore } = await import("firebase/firestore");
      const app = initializeApp(firebaseConfig);
      return getFirestore(app);
    } catch (e) {
      return null; // firebase not installed → fall back to local
    }
  })();
  return dbPromise;
}

// Increment a counter; returns the best number we can show.
export async function bumpCounter(name) {
  const local = localBump(name); // always keep a local number too
  const db = await getDb();
  if (!db) return { value: local, source: "local" };
  try {
    const { doc, runTransaction } = await import("firebase/firestore");
    const ref = doc(db, "counters", `${name}_${todayKey()}`);
    const value = await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const next = (snap.exists() ? snap.data().value || 0 : 0) + 1;
      tx.set(ref, { value: next, day: todayKey() });
      return next;
    });
    return { value, source: "firebase" };
  } catch (e) {
    return { value: local, source: "local" };
  }
}

// Read a counter without incrementing.
export async function readCounter(name) {
  const db = await getDb();
  if (!db) return { value: localGet(name), source: "local" };
  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const snap = await getDoc(doc(db, "counters", `${name}_${todayKey()}`));
    return { value: snap.exists() ? snap.data().value || 0 : 0, source: "firebase" };
  } catch (e) {
    return { value: localGet(name), source: "local" };
  }
}

export const COUNTER_LABELS = {
  site: "visits today",
  result: "results revealed today",
  video: "video views today",
};
