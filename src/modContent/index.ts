// ─── Tu Tien Mod — Main Entry Point ──────────────────────────────────────────
// Initialization order:
//   transport seals → characters → locations (reference seals + characters)
//     → techniques → items (shop listings)

import { initializeTransportSeals }     from './items/transportSeals';
import { initializeEstateCaretaker }    from './characters/estateCaretaker';
import { initializeHerbGardenEstate }   from './locations/herbGardenEstate';
import { initializeObservatoryEstate }  from './locations/observatoryEstate';
import { initializeFistTechniques }     from './techniques/fist';
import { initializeCraftingTechniques } from './techniques/crafting';
import { initializeItems }              from './items/index';

function initializeMod(): void {
  console.log('🏯 Initializing Tu Tien Mod...');

  initializeTransportSeals();     // 1. items with no deps
  initializeEstateCaretaker();    // 2. characters (before locations reference them)
  initializeHerbGardenEstate();   // 3. locations
  initializeObservatoryEstate();  // 4. locations
  initializeFistTechniques();     // 5. techniques
  initializeCraftingTechniques(); // 6. techniques
  initializeItems();              // 7. shop listings

  console.log('✅ Tu Tien Mod loaded successfully!');
}

initializeMod();
