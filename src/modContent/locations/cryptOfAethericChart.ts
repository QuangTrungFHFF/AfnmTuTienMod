import { GameLocation } from 'afnm-types';
import { G } from '../constants';

// ─── Crypt of the Aetheric Chart ──────────────────────────────────────────────
// A pocket-sealed vault hidden beneath the Ancestral Barrows.
// Invisible on the map until the "Third Silence" triggered event unlocks it
// by setting tuTien_cryptDiscovered = 1.
//
// Contains: the Aetheric Sentinel (enemy character, one-time boss).
// After the Sentinel is defeated, this becomes a quiet trophy location.
//
// IMPORTANT: Exact position (x, y) needs adjustment to sit near Ancestral Barrows
// on the actual world map. Set to approximate Shou Plains coordinates for now.
// TODO: Open the in-game map, hover over Ancestral Barrows, note coordinates,
//       update the position below.

export const cryptOfAethericChart: GameLocation = {
  name: 'Crypt of the Aetheric Chart',
  description:
    'A hidden vault sealed beneath the Ancestral Barrows for two thousand years. ' +
    'The walls are etched with aetheric formation diagrams so intricate they seem ' +
    'to breathe. A faint metallic hum fills the air — the last heartbeat of a dead empire.',
  // TODO: Replace with proper crypt/ruin background image from game assets
  // Suggested: ancientCrypt.webp, ruinedVault.webp, cryptInterior.webp
  image: `${G}altarRuin12.webp`,
  icon:  `${G}cryptOfTheBlossom.webp`,
  screenEffect: 'mist',
  music: 'Crypt',
  ambience: 'Crypt',
  // Approximate position — adjust after checking map coordinates
  // Ancestral Barrows is in the Shou Plains. Crypt sits just east of it.
  position: { x: 320, y: -210 },
  size: 'small',
  reputationName: undefined,  
  unlocks: [],
  buildings: [], // No buildings — purely a combat/narrative area
};

export function initializeCryptOfAethericChart(): void {
  window.modAPI.actions.addLocation(cryptOfAethericChart);

  // Link from Ancestral Barrows — only visible after the crypt is discovered.
  // The "Third Silence" triggered event sets tuTien_cryptDiscovered = 1
  // AND calls unlockLocation, making it accessible on the map.
  window.modAPI.actions.linkLocations('Ancestral Barrows', {
    location: cryptOfAethericChart,
    distance: 1,
    condition: 'tuTien_cryptDiscovered == 1',
  });

  // Return link — always available once location is unlocked
  window.modAPI.actions.linkLocations('Crypt of the Aetheric Chart', {
    location: window.modAPI.gameData.locations['Ancestral Barrows'],
    distance: 1,
    condition: '1',
  });

  console.log('✅ Crypt of the Aetheric Chart registered.');
}
