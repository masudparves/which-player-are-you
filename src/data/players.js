// ============================================================
//  PLAYERS & LEGENDS  (Phase 2 — final content)
//  Images imported by your EXACT uploaded filenames.
//  `jersey` = the card's border/glow colour (matches each kit).
// ============================================================

// --- regular player card images ---
import imgHaaland from "../assets/cards/Haaland.jpg";
import imgKane from "../assets/cards/Harry_Kane.jpg";
import imgMusiala from "../assets/cards/Jamal.jpg";
import imgWirtz from "../assets/cards/Florian.jpg";
import imgBellingham from "../assets/cards/Jude.jpg";
import imgDeBruyne from "../assets/cards/Kevin.jpg";
import imgRodri from "../assets/cards/Rodri.jpg";
import imgMbappe from "../assets/cards/Mbappe.jpg";
import imgSaka from "../assets/cards/Saka.jpg";
import imgHakimi from "../assets/cards/Hakimi.jpg";
import imgYamal from "../assets/cards/Yamal.jpg";
import imgVinicius from "../assets/cards/Vinicious.jpg";
import imgNeymar from "../assets/cards/Neymar.jpg";
import imgSalah from "../assets/cards/Salah.jpg";

// --- legend card images ---
import imgPele from "../assets/cards/Pele.jpg";
import imgMaradona from "../assets/cards/Maradona.jpg";
import imgZidane from "../assets/cards/Zidane.jpg";
import imgMessi from "../assets/cards/Messi.jpg";
import imgRonaldo from "../assets/cards/christiano.jpg";

// ---------- 14 REGULAR PLAYERS (quiz results only) ----------
export const PLAYERS = [
  { id: "haaland", name: "Erling Haaland", archetype: "machine", nickname: "The Goal Machine", rarity: "RARE", jersey: "#D81E2C", image: imgHaaland,
    description: "You are relentless. Once you decide on a goal, very little can stop you. You believe action beats excuses and results speak louder than words." },
  { id: "kane", name: "Harry Kane", archetype: "machine", nickname: "The Goal Machine", rarity: "COMMON", jersey: "#E8EDF5", image: imgKane,
    description: "Reliable, disciplined and calm. People trust you because you consistently deliver when it matters most." },
  { id: "musiala", name: "Jamal Musiala", archetype: "magician", nickname: "The Magician", rarity: "RARE", jersey: "#E8EDF5", image: imgMusiala,
    description: "Creative minds fascinate you. You see opportunities others miss and enjoy surprising people with your imagination." },
  { id: "wirtz", name: "Florian Wirtz", archetype: "magician", nickname: "The Magician", rarity: "RARE", jersey: "#E8EDF5", image: imgWirtz,
    description: "You are intelligent, adaptable and quietly brilliant. You do not need attention to influence the game." },
  { id: "bellingham", name: "Jude Bellingham", archetype: "general", nickname: "The General", rarity: "EPIC", jersey: "#E8EDF5", image: imgBellingham,
    description: "Natural leader. Even when nobody officially puts you in charge, people instinctively follow your direction." },
  { id: "debruyne", name: "Kevin De Bruyne", archetype: "general", nickname: "The General", rarity: "EPIC", jersey: "#E2231A", image: imgDeBruyne,
    description: "You think three steps ahead. Strategic, analytical and efficient, you prefer smart solutions over flashy ones." },
  { id: "rodri", name: "Rodri", archetype: "general", nickname: "The General", rarity: "COMMON", jersey: "#C60B1E", image: imgRodri,
    description: "Calm under pressure. While others panic, you stay composed and quietly take control." },
  { id: "mbappe", name: "Kylian Mbappe", archetype: "speed", nickname: "The Cheetah", rarity: "LEGENDARY", jersey: "#2B4FA0", image: imgMbappe,
    description: "Bold, ambitious and fearless. You thrive when moving fast and taking opportunities before others react." },
  { id: "saka", name: "Bukayo Saka", archetype: "speed", nickname: "The Speed Demon", rarity: "RARE", jersey: "#E8EDF5", image: imgSaka,
    description: "Positive, energetic and dependable. People enjoy having you around because you bring enthusiasm everywhere." },
  { id: "hakimi", name: "Achraf Hakimi", archetype: "speed", nickname: "The Flash With Ball", rarity: "COMMON", jersey: "#C1272D", image: imgHakimi,
    description: "Always moving forward. Adventurous, spontaneous and rarely afraid to take risks." },
  { id: "yamal", name: "Lamine Yamal", archetype: "showman", nickname: "The Showman", rarity: "EPIC", jersey: "#C60B1E", image: imgYamal,
    description: "Confident, expressive and entertaining. You love creating memorable moments." },
  { id: "vinicius", name: "Vinicius Jr", archetype: "showman", nickname: "The True Showman", rarity: "EPIC", jersey: "#FFD400", image: imgVinicius,
    description: "Life is meant to be experienced. You bring excitement and energy wherever you go." },
  { id: "neymar", name: "Neymar Jr", archetype: "talisman", nickname: "The Talisman", rarity: "EPIC", jersey: "#FFD400", image: imgNeymar,
    description: "Charismatic and influential. People pay attention when you walk into a room." },
  { id: "salah", name: "Mohamed Salah", archetype: "talisman", nickname: "The Talisman", rarity: "RARE", jersey: "#C8102E", image: imgSalah,
    description: "Humble, hardworking and inspiring. You lead through actions, not words." },
];

// ---------- 5 SECRET LEGENDS (secret code only) ----------
export const LEGENDS = [
  { id: "messi", name: "Lionel Messi", archetype: "legend", nickname: "The GOAT", rarity: "LEGENDARY", jersey: "#F7B5CD", image: imgMessi, code: "MAGICIANMMP", revealable: true,
    description: "Rarely available. You combine intelligence, creativity and consistency. People remember your impact long after the game ends.", isLegend: true },
  { id: "ronaldo", name: "Cristiano Ronaldo", archetype: "legend", nickname: "The Talisman", rarity: "LEGENDARY", jersey: "#D81E2C", image: imgRonaldo, code: "TALISMANMMP", revealable: true,
    description: "You believe limitations exist to be broken. Discipline and ambition define your approach to life.", isLegend: true },
  { id: "zidane", name: "Zinedine Zidane", archetype: "legend", nickname: "Zizou", rarity: "LEGENDARY", jersey: "#2747C0", image: imgZidane, code: "MAESTROMMP", revealable: true,
    description: "Elegant and composed. You make difficult things look effortless.", isLegend: true },
  { id: "pele", name: "Pele", archetype: "legend", nickname: "The King", rarity: "LEGENDARY", jersey: "#FFD400", image: imgPele, code: "KINGMMP2026", revealable: false,
    description: "Your influence extends beyond your achievements. You inspire future generations.", isLegend: true },
  { id: "maradona", name: "Diego Maradona", archetype: "legend", nickname: "El Diego", rarity: "LEGENDARY", jersey: "#75AADB", image: imgMaradona, code: "GODFATHERMMP2026", revealable: false,
    description: "Passionate, unpredictable and unforgettable. You leave an impression wherever you go.", isLegend: true },
];

export const ALL_RESULTS = [...PLAYERS, ...LEGENDS];

export function legendByCode(raw) {
  const c = (raw || "").trim().toUpperCase();
  return LEGENDS.find((l) => l.code.toUpperCase() === c) || null;
}

export function randomRevealableCode(excludeCodes = []) {
  const all = LEGENDS.filter((l) => l.revealable);
  let pool = all.filter((l) => !excludeCodes.includes(l.code));
  if (pool.length === 0) pool = all; // all used this cycle → reset
  return pool[Math.floor(Math.random() * pool.length)];
}
