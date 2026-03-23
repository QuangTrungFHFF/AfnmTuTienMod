import { G } from '../constants';
import { herbGardenEstateSeal } from '../items/transportSeals';

// ─── Herb Garden Estate ───────────────────────────────────────────────────────
// Adds a player house building to the existing Spirit Herb Garden location.

export function initializeHerbGardenEstate(): void {
  const herbGarden = window.modAPI.gameData.locations['Spirit Herb Garden'];

  if (!herbGarden) {
    console.warn('⚠️ Spirit Herb Garden location not found — skipping house building.');
    return;
  }

  if (!herbGarden.buildings) {
    herbGarden.buildings = [];
  }

  herbGarden.buildings.push({
    kind: 'house',
    unlockCondition: '1',
    // unlockCondition: 'herbGardenHouseUnlocked == 1', // ← swap once you have a quest
    houseDef: {
      name: 'Herb Garden Estate',
      description:
        'Your personal estate nestled within the Spirit Herb Garden. ' +
        'The air is thick with the fragrance of rare herbs, and the silence ' +
        'is broken only by the rustling of leaves.',
      background: `${G}jiaoRestStop2.webp`,
      screenEffect: 'driftingLeaves',
      qiDensity: 4000,
      fixedRooms: [],
      freeRooms: '4',
      transportSeal: herbGardenEstateSeal,
    },
  });

  console.log('✅ Added Herb Garden Estate house to Spirit Herb Garden.');
}
