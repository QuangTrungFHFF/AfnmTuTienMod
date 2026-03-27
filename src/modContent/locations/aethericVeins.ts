import { GameLocation } from 'afnm-types';
import { G } from '../constants';

// ─── Aetheric Veins ───────────────────────────────────────────────────────────
// The deep tunnels and ore veins beneath the Azureline Sanctuary.
// Awakened by Linshu in Quest 3.3 — the mine hums with resonant silver
// and long-dormant earth qi. A short walk from the estate courtyard.
//
// Unlock: tuTien_mineUnlocked == 1 (set by Linshu's Quest 3.3 delivery)
// Link:   Azureline Sanctuary → Aetheric Veins (distance 1)
//
// Lore note: "Deep beneath us, there are veins of ore that haven't 'vibrated'
// since the Empire fell. Resonating Silver acts as a tuning fork for the earth."

export const aethericVeins: GameLocation = {
  name: 'Aetheric Veins',
  description:
    'Carved tunnels spiral deep beneath the Azureline Sanctuary, their walls ' +
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
  // Positioned northwest of Azureline Sanctuary (1567, -630)
  // Close enough to feel like a sub-location of the estate grounds.
  position: { x: 1500, y: -800 },
  size: 'small',
  reputationName: undefined,
  explorationCountOverride: 999,
  unlocks: [],
  buildings: [
    // ── Mine — the whole reason this location exists ──────────────────────────
    // Moved here from Azureline Sanctuary because herbField and mine
    // auto-stack on top of each other and the offset property has no effect.
    {
      kind: 'mine',
      condition: 'tuTien_mineUnlocked == 1',
    },
  ],
};

export function initializeAethericVeins(): void {
  window.modAPI.actions.addLocation(aethericVeins);

  // Both link directions live here so the sanctuary→veins link only runs
  // AFTER the veins have been registered (avoiding undefined location error).

  // Azureline Sanctuary → Aetheric Veins (visible once mine is unlocked)
  window.modAPI.actions.linkLocations('Azureline Sanctuary', {
    location: aethericVeins,
    distance: 1,
    condition: 'tuTien_mineUnlocked == 1',
  });

  // Return link — always accessible once veins exist
  window.modAPI.actions.linkLocations('Aetheric Veins', {
    location: window.modAPI.gameData.locations['Azureline Sanctuary'],
    distance: 1,
    condition: '1',
  });

  console.log('✅ Aetheric Veins registered.');
}
