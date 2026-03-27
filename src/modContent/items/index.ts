import { G } from '../constants';
import { craftingTechniqueNames } from '../techniques/crafting';
import { herbGardenEstateSeal, azurelineSanctuarySeal } from './transportSeals';

// ─── Crafting Technique Action Items ─────────────────────────────────────────
// These items teach the player a crafting technique when acquired.
// They are sold at the Liang Tiao Village sect favour exchange (coreFormation).

const transcendentCyclingRefineItem = {
  technique: craftingTechniqueNames.transcendentCyclingRefine,
  kind: 'action' as const,
  name: craftingTechniqueNames.transcendentCyclingRefine,
  description: {
    _translatable: true as const,
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: craftingTechniqueNames.transcendentCyclingRefine },
  },
  icon: `${G}cyclingRefine.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

const heavensEfficientFusionItem = {
  technique: craftingTechniqueNames.heavensEfficientFusion,
  kind: 'action' as const,
  name: craftingTechniqueNames.heavensEfficientFusion,
  description: {
    _translatable: true as const,
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: craftingTechniqueNames.heavensEfficientFusion },
  },
  icon: `${G}efficientFusion.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

const heavensForcefulStabilizeItem = {
  technique: craftingTechniqueNames.heavensForcefulStabilize,
  kind: 'action' as const,
  name: craftingTechniqueNames.heavensForcefulStabilize,
  description: {
    _translatable: true as const,
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: craftingTechniqueNames.heavensForcefulStabilize },
  },
  icon: `${G}forcefulStabilize.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeItems(): void {
  // Register items with the game
  window.modAPI.actions.addItem(transcendentCyclingRefineItem);
  window.modAPI.actions.addItem(heavensEfficientFusionItem);
  window.modAPI.actions.addItem(heavensForcefulStabilizeItem);

  // Add to sect favour exchange at Liang Tiao Village (coreFormation, favour cost 3)
  window.modAPI.actions.addItemToShop(transcendentCyclingRefineItem, 1, 'Liang Tiao Village', 'coreFormation', 3);
  window.modAPI.actions.addItemToShop(heavensEfficientFusionItem,    1, 'Liang Tiao Village', 'coreFormation', 3);
  window.modAPI.actions.addItemToShop(heavensForcefulStabilizeItem,  1, 'Liang Tiao Village', 'coreFormation', 3);

  // Transport seals available at Nine Mountain Sect shop (replenishable supply)
  window.modAPI.actions.addItemToShop(herbGardenEstateSeal,   3, 'Liang Tiao Village', 'qiCondensation', 1.5);
  window.modAPI.actions.addItemToShop(azurelineSanctuarySeal,  3, 'Liang Tiao Village', 'qiCondensation', 1.5);
}
