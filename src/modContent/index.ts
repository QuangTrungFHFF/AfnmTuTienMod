// ─── Tu Tien Mod — Main Entry Point ──────────────────────────────────────────
// Initialization order matters:
//   1. story items         — no deps
//   2. transport seals     — no deps
//   3. characters          — depend on items being registered
//   4. crypt location      — standalone, linked to Ancestral Barrows
//   5. herb garden         — standalone estate
//   6. observatory estate  — references characters by name
//   7. techniques          — no deps on locations
//   8. story quests        — registered before triggered events reference them
//   9. story triggers      — reference items, locations, characters by name
//  10. items (shop)        — references locations that must already exist

import { initializeTransportSeals } from './items/transportSeals';
import { initializeStoryItems } from './items/storyItems';

import { initializeEstateCaretaker } from './characters/estateCaretaker';
import { initializeLinshu } from './characters/linshu';
import { initializeAethericSentinel } from './characters/aethericSentinel';

import { initializeCryptOfAethericChart } from './locations/cryptOfAethericChart';
import { initializeHerbGardenEstate } from './locations/herbGardenEstate';
import { initializeObservatoryEstate } from './locations/observatoryEstate';
import { initializeAethericUndercroft } from './locations/aethericUndercroft';

import { initializeFistTechniques } from './techniques/fist';
import { initializeCraftingTechniques } from './techniques/crafting';

import { initializeStoryQuests } from './quests/storyQuests';
import { initializeStoryTriggers } from './events/storyTriggers';

import { initializeItems } from './items/index';

function initializeMod(): void {
  console.log('🏯 Initializing Tu Tien Mod...');

  // ── 1. Items (no dependencies) ────────────────────────────────────────────
  initializeStoryItems();      // Bead, Sigil, Keystone, Ring, Linshu's Seal
  initializeTransportSeals();  // Transport seals

  // ── 2. Characters (before locations reference them) ───────────────────────
  initializeEstateCaretaker(); // Supply quest acceptance NPC
  initializeLinshu();          // Estate spirit / primary story NPC
  initializeAethericSentinel(); // Crypt boss

  // ── 3. Locations ──────────────────────────────────────────────────────────
  initializeCryptOfAethericChart(); // Links to Ancestral Barrows
  initializeHerbGardenEstate();
  initializeObservatoryEstate();    // Modified: story-gated buildings
  initializeAethericUndercroft();   // Mine sub-location, linked from estate

  // ── 4. Techniques ─────────────────────────────────────────────────────────
  initializeFistTechniques();     // Includes 'Twin Sovereigns' (unlocked via quest 3.4)
  initializeCraftingTechniques();

  // ── 5. Quests (registered before triggered events add them to log) ─────────
  initializeStoryQuests(); // 9 side quests across chains 3–5

  // ── 6. Triggered events ───────────────────────────────────────────────────
  initializeStoryTriggers(); // Bead delivery, fever, third silence, veil lifts

  // ── 7. Shop items (locations must be registered first) ────────────────────
  initializeItems(); // Crafting technique action items + transport seals at shops

  console.log('✅ Tu Tien Mod loaded successfully!');
}

initializeMod();
