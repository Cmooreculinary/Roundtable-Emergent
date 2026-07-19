// /app/frontend/src/lib/scenes.js
// Shared scene catalog — used by both standalone /gather demo and real /table/:id pages.
// Backend stores only the IDs; this file resolves IDs to visuals.
// Iteration 18 — single source of truth.

export const ROOMS = [
  { id: "skyline", name: "Skyline Suite", image: "/scenes/skyline-suite.webp", gradient: "#111820", accent: "#76A9FF", description: "A private high-rise room above the city at blue hour." },
  { id: "dining", name: "Family Garden Room", image: "/scenes/family-dining.webp", gradient: "#8A684D", accent: "#E7B76A", description: "A warm contemporary home opening onto a landscaped garden." },
  { id: "studio", name: "Coastal Bay Room", image: "/scenes/coastal-bay.webp", gradient: "#8CA7B5", accent: "#83C7E8", description: "A bright, refined room overlooking open water." },
  { id: "library", name: "Fireside Library", image: "/scenes/fireside-library.webp", gradient: "#2A160D", accent: "#D9A34A", description: "Dark walnut, leather, firelight, and quiet conversation." },
  { id: "church", name: "Mountain Lodge", image: "/scenes/mountain-lodge.webp", gradient: "#2B211C", accent: "#E8A95C", description: "A timber lodge above snow-covered mountain country." },
  { id: "terrace", name: "Garden Terrace", image: "/scenes/garden-terrace.webp", gradient: "#243222", accent: "#E9AD54", description: "An open-air gathering lawn under mature trees and warm lights." },
];

export const TABLES = [
  { id: "mahogany", name: "Heritage Mahogany Round", image: "/tables/mahogany-round.png", color: "#6b2f17", wood: "#6b2f17" },
  { id: "executive", name: "Walnut Executive Board", image: "/tables/executive-board.png", color: "#3b1f14", wood: "#3b1f14" },
  { id: "family", name: "Black Oak Round", image: "/tables/black-round.png", color: "#151515", wood: "#151515" },
  { id: "drafting", name: "Pale Oak Farm Table", image: "/tables/farmhouse-long.png", color: "#c79a62", wood: "#c79a62" },
  { id: "luncheon", name: "Formal Linen Oval", image: "/tables/formal-oval.png", color: "#f1eadc", wood: "#f1eadc" },
  { id: "strategy", name: "Charcoal Strategy Round", image: "/tables/strategy-round.png", color: "#232323", wood: "#232323" },
];

// Anchor 2 — fixed seat counts per table type
export const SEAT_COUNTS = {
  mahogany: 8,
  executive: 10,
  family: 6,
  drafting: 8,
  luncheon: 6,
  strategy: 12,
};

export const TABLETOPS = [
  { id: "meeting", name: "Meeting Set", desc: "Notebooks, pens, water glasses", icon: "📓" },
  { id: "coffee", name: "Coffee & Snacks", desc: "Mugs, pastries, napkins", icon: "☕" },
  { id: "luncheon", name: "Luncheon Set", desc: "Plates, salads, breadbaskets", icon: "🥗" },
  { id: "formal", name: "Formal Dinner", desc: "Fine china, candles, wine glasses", icon: "🍷" },
  { id: "planning", name: "Planning Set", desc: "Documents, blueprints, tablets", icon: "📋" },
  { id: "chef", name: "Premium Chef Table", desc: "Tasting plates, chef tools, wine pairing", icon: "👨‍🍳" },
];

export const FOODS = [
  { id: "none", name: "None" },
  { id: "coffee", name: "Coffee / Tea / Water" },
  { id: "snacks", name: "Snacks" },
  { id: "hors", name: "Hors d'oeuvres" },
  { id: "lunch", name: "Luncheon" },
  { id: "dinner", name: "Dinner" },
  { id: "chef", name: "Ultra High-End Chef" },
];

export const AMBIANCES = [
  { id: "bright", name: "Business Bright", color: "#f0f0f0", overlay: "rgba(255,255,255,0.05)" },
  { id: "warm", name: "Warm Dinner", color: "#ff9500", overlay: "rgba(255,150,0,0.08)" },
  { id: "fireside", name: "Fireside Calm", color: "#ffcc00", overlay: "rgba(255,200,0,0.06)" },
  { id: "jazz", name: "Evening Jazz", color: "#af52de", overlay: "rgba(175,82,222,0.06)" },
  { id: "focus", name: "Focus Mode", color: "#007aff", overlay: "rgba(0,122,255,0.04)" },
  { id: "celebrate", name: "Celebration", color: "#ff2d55", overlay: "rgba(255,45,85,0.06)" },
];

export const MUSICS = [
  { id: "off", name: "Off" },
  { id: "jazz", name: "Soft Jazz" },
  { id: "acoustic", name: "Acoustic" },
  { id: "ambient", name: "Ambient Focus" },
  { id: "worship", name: "Worship / Reflection" },
  { id: "event", name: "Private Event Mix" },
];

// Anchor 1 — default scene applied to new tables and old tables without a scene doc
export const DEFAULT_SCENE = {
  room: "library",
  table: "mahogany",
  tabletop: "meeting",
  food: "none",
  ambiance: "warm",
  music: "off",
};

// Avatar tiers — only `stylized` is implemented this iteration. Others reserve namespace per Anchor 3.
export const AVATAR_TIERS = [
  { id: "preset", label: "Preset", available: true, hint: "Initials & color" },
  { id: "stylized", label: "Stylized", available: true, hint: "DiceBear illustrated portraits" },
  { id: "premium_illustrated", label: "Premium Illustrated", available: false, hint: "Coming Iteration 20" },
  { id: "photoreal", label: "Photoreal", available: false, hint: "Coming Iteration 21" },
];

// ── Lookup helpers ──────────────────────────────────
const byId = (list) => Object.fromEntries(list.map((x) => [x.id, x]));
const ROOMS_BY_ID = byId(ROOMS);
const TABLES_BY_ID = byId(TABLES);
const TABLETOPS_BY_ID = byId(TABLETOPS);
const FOODS_BY_ID = byId(FOODS);
const AMBIANCES_BY_ID = byId(AMBIANCES);
const MUSICS_BY_ID = byId(MUSICS);

export function resolveScene(scene) {
  const s = scene || DEFAULT_SCENE;
  return {
    room: ROOMS_BY_ID[s.room] || ROOMS_BY_ID[DEFAULT_SCENE.room],
    table: TABLES_BY_ID[s.table] || TABLES_BY_ID[DEFAULT_SCENE.table],
    tabletop: TABLETOPS_BY_ID[s.tabletop] || TABLETOPS_BY_ID[DEFAULT_SCENE.tabletop],
    food: FOODS_BY_ID[s.food] || FOODS_BY_ID[DEFAULT_SCENE.food],
    ambiance: AMBIANCES_BY_ID[s.ambiance] || AMBIANCES_BY_ID[DEFAULT_SCENE.ambiance],
    music: MUSICS_BY_ID[s.music] || MUSICS_BY_ID[DEFAULT_SCENE.music],
  };
}

export function seatCountForTable(tableId) {
  return SEAT_COUNTS[tableId] || 8;
}
