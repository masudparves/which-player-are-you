import { PLAYERS } from "../data/players.js";

// Deterministic "Player of the Day": same player for everyone on a given date,
// rotates every 24h. No backend needed.
export function playerOfTheDay() {
  const now = new Date();
  const dayNumber = Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86400000
  );
  return PLAYERS[dayNumber % PLAYERS.length];
}
