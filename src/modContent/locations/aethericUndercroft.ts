import { GameLocation } from 'afnm-types';
import { G } from '../constants';

// ─── Aetheric Undercroft ──────────────────────────────────────────────────────
// The deep tunnels and ore veins beneath the Observatory Estate.
// Awakened by Linshu in Quest 3.3 — the mine hums with resonant silver
// and long-dormant earth qi. A short walk from the estate courtyard.
//
// Unlock: tuTien_mineUnlocked == 1 (set by Linshu's Quest 3.3 delivery)
// Link:   Observatory Estate → Aetheric Undercroft (distance 1)
//
// Lore note: "Deep beneath us, there are veins of ore that haven't 'vibrated'
// since the Empire fell. Resonating Silver acts as a tuning fork for the earth."

export const aethericUndercroft: GameLocation = {
  name: 'Aetheric Undercroft',
  description:
    'Carved tunnels spiral deep beneath the Observatory Estate, their walls ' +
    'threaded with veins of silver ore that hum at a frequency only cultivators can feel. ' +
    'The pickaxes here move on their own — exactly as Linshu warned.',
  // Using the Crypt background as a placeholder — both are ancient underground vaults.
  // Replace with a dedicated mine/cave background when available.
  image: `${G}crystalShore2.webp`,
  // Using Spirit Mine icon from the base game — appropriate for a mine location.
  icon:  `${G}boilingPool.webp`,
  screenEffect: 'dust',
  music: 'Crypt',
  ambience: 'Crypt',
  // Positioned northwest of Observatory Estate (1567, -630)
  // Close enough to feel like a sub-location of the estate grounds.
  position: { x: 1500, y: -800 },
  size: 'small',
  reputationName: undefined,
  explorationCountOverride: 999,
  unlocks: [],
  buildings: [
    // ── Mine — the whole reason this location exists ──────────────────────────
    // Moved here from Observatory Estate because herbField and mine
    // auto-stack on top of each other and the offset property has no effect.
    {
      kind: 'mine',
      condition: 'tuTien_mineUnlocked == 1',
    },
  ],
};

export function initializeAethericUndercroft(): void {
  window.modAPI.actions.addLocation(aethericUndercroft);

  // Both link directions live here so the estate→undercroft link only runs
  // AFTER the undercroft has been registered (avoiding undefined location error).

  // Observatory Estate → Aetheric Undercroft (visible once mine is unlocked)
  window.modAPI.actions.linkLocations('Observatory Estate', {
    location: aethericUndercroft,
    distance: 1,
    condition: 'tuTien_mineUnlocked == 1',
  });

  // Return link — always accessible once undercroft exists
  window.modAPI.actions.linkLocations('Aetheric Undercroft', {
    location: window.modAPI.gameData.locations['Observatory Estate'],
    distance: 1,
    condition: '1',
  });

  console.log('✅ Aetheric Undercroft registered.');
}
