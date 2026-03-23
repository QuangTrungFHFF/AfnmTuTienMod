import { CraftingTechnique } from 'afnm-types';
import { G } from '../constants';
import { cupg, craftingMasteryMap, craftingPowerMastery } from '../helpers/mastery';
import { cyclingRefineBuff, refiningRestorationBuff } from '../buffs/crafting';

// ─── 1. Transcendent Cycling Refine ──────────────────────────────────────────
// type: refine | coreFormation
// Restores 20 stability, grants 2.25x control as perfection, and creates
// 5 stacks of Cycling Refine (each adds 0.4 intensity per refine action).
const transcendentCyclingRefine: CraftingTechnique = {
  name: 'Transcendent Cycling Refine',
  icon: `${G}cyclingRefine.webp`,
  type: 'refine',
  realm: 'coreFormation',
  poolCost: 10,
  stabilityCost: 0,
  noMaxStabilityLoss: true,
  successChance: 1,
  cooldown: 0,
  currentCooldown: 0,
  effects: [
    {
      kind: 'stability',
      amount: { value: 20, stat: undefined, upgradeKey: 'stability' },
    },
    {
      kind: 'perfection',
      amount: { value: 2.25, stat: 'control', upgradeKey: 'perfection' },
    },
    {
      kind: 'createBuff',
      buff: cyclingRefineBuff,
      stacks: { value: 5, stat: undefined, upgradeKey: 'stacks' },
    },
  ],
  upgradeMasteries: {
    stability:  craftingPowerMastery('stability',  'stability restored'),
    perfection: craftingPowerMastery('perfection', 'perfection gained'),
    stacks: craftingMasteryMap('incandescent', {
      incandescent: cupg('stacks', 1, 'Gain <num>1</num> more <n>Cycling Refine</n> stack.'),
      transcendent: cupg('stacks', 2, 'Gain <num>2</num> more <n>Cycling Refine</n> stacks.'),
    }),
    buffPower: craftingMasteryMap('resplendent', {
      resplendent:  cupg('buffPower', 0.15, 'Increase intensity gained by <num>15%</num>.'),
      incandescent: cupg('buffPower', 0.2,  'Increase intensity gained by <num>20%</num>.'),
      transcendent: cupg('buffPower', 0.25, 'Increase intensity gained by <num>25%</num>.'),
    }),
  },
};

// ─── 2. Heaven's Efficient Fusion ────────────────────────────────────────────
// type: fusion | coreFormation
// Restores 2 max stability and grants 2.25x intensity as completion.
const heavensEfficientFusion: CraftingTechnique = {
  name: "Heaven's Efficient Fusion",
  icon: `${G}efficientFusion.webp`,
  type: 'fusion',
  realm: 'coreFormation',
  poolCost: 5,
  stabilityCost: 5,
  successChance: 1,
  cooldown: 0,
  currentCooldown: 0,
  effects: [
    {
      kind: 'maxStability',
      amount: { value: 2, stat: undefined, upgradeKey: 'maxStability' },
    },
    {
      kind: 'completion',
      amount: { value: 2.25, stat: 'intensity', upgradeKey: 'completion' },
    },
  ],
  upgradeMasteries: {
    maxStability: craftingMasteryMap('empowered', {
      empowered:    cupg('maxStability', 1, 'Restore <num>1</num> more max stability.'),
      resplendent:  cupg('maxStability', 2, 'Restore <num>2</num> more max stability.'),
      incandescent: cupg('maxStability', 3, 'Restore <num>3</num> more max stability.'),
      transcendent: cupg('maxStability', 4, 'Restore <num>4</num> more max stability.'),
    }),
    completion: craftingPowerMastery('completion', 'completion gained'),
  },
};

// ─── 3. Heaven's Forceful Stabilize ──────────────────────────────────────────
// type: stabilize | coreFormation
// Restores 40 current stability (no max loss) and creates 10 stacks of
// Refining Restoration (each restores 5 stability on refine).
const heavensForcefulStabilize: CraftingTechnique = {
  name: "Heaven's Forceful Stabilize",
  icon: `${G}forcefulStabilize.webp`,
  type: 'stabilize',
  realm: 'coreFormation',
  poolCost: 8,
  stabilityCost: 0,
  noMaxStabilityLoss: true,
  successChance: 1,
  cooldown: 0,
  currentCooldown: 0,
  effects: [
    {
      kind: 'stability',
      amount: { value: 40, stat: undefined, upgradeKey: 'stability' },
    },
    {
      kind: 'createBuff',
      buff: refiningRestorationBuff,
      stacks: { value: 10, stat: undefined, upgradeKey: 'buffStacks' },
    },
  ],
  upgradeMasteries: {
    stability: craftingPowerMastery('stability', 'stability restored'),
    buffStacks: craftingMasteryMap('resplendent', {
      resplendent:  cupg('buffStacks', 2, 'Gain <num>2</num> more <n>Refining Restoration</n> stacks.'),
      incandescent: cupg('buffStacks', 4, 'Gain <num>4</num> more <n>Refining Restoration</n> stacks.'),
      transcendent: cupg('buffStacks', 6, 'Gain <num>6</num> more <n>Refining Restoration</n> stacks.'),
    }),
    buffStability: craftingPowerMastery('buffStability', 'stability per refine'),
  },
};

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeCraftingTechniques(): void {
  window.modAPI.actions.addCraftingTechnique(transcendentCyclingRefine);
  window.modAPI.actions.addCraftingTechnique(heavensEfficientFusion);
  window.modAPI.actions.addCraftingTechnique(heavensForcefulStabilize);
}

// Export technique references so items/index.ts can reference names without
// duplicating strings.
export const craftingTechniqueNames = {
  transcendentCyclingRefine: transcendentCyclingRefine.name,
  heavensEfficientFusion:    heavensEfficientFusion.name,
  heavensForcefulStabilize:  heavensForcefulStabilize.name,
} as const;
