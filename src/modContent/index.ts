// ─── Tu Tien Mod — Main Entry Point ──────────────────────────────────────────
// Imports all subsystems and initialises them in dependency order:
//   techniques (no external deps) → items (reference technique names)
//
// To add new content:
//   1. Create/edit the appropriate file under buffs/, techniques/, or items/
//   2. Export an initializeX() function from that file
//   3. Import and call it here in the correct order

import { initializeFistTechniques }     from './techniques/fist';
import { initializeCraftingTechniques } from './techniques/crafting';
import { initializeItems }              from './items/index';

function initializeMod(): void {
  console.log('🏯 Initializing Tu Tien Mod...');

  initializeFistTechniques();
  initializeCraftingTechniques();
  initializeItems();

  console.log('✅ Tu Tien Mod loaded successfully!');
}

initializeMod();
