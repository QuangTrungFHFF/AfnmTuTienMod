import { CraftingBuff } from 'afnm-types';
import { G } from '../constants';

// ─── Cycling Refine ───────────────────────────────────────────────────────────
// Grants +0.4 intensity per stack. Consumed 1 stack per refine action.
export const cyclingRefineBuff: CraftingBuff = {
  name: 'Cycling Refine',
  icon: `${G}cyclingRefine.webp`,
  canStack: true,
  stats: {
    intensity: { value: 0.4, stat: 'intensity', upgradeKey: 'buffPower' },
  },
  effects: [
    { kind: 'addStack', stacks: { value: -1, stat: undefined } },
  ],
  onFusion: [],
  onRefine: [],
  stacks: 1,
  displayLocation: 'completionRight',
};

// ─── Refining Restoration ─────────────────────────────────────────────────────
// Restores 5 stability on each refine action. Consumed 1 stack per refine.
export const refiningRestorationBuff: CraftingBuff = {
  name: 'Refining Restoration',
  icon: `${G}refiningRestoration.webp`,
  canStack: true,
  stats: undefined,
  effects: [],
  onRefine: [
    {
      kind: 'stability',
      amount: { value: 5, stat: undefined, upgradeKey: 'buffStability' },
    },
    {
      kind: 'addStack',
      stacks: { value: -1, stat: undefined },
    },
  ],
  stacks: 1,
  displayLocation: 'stabilityLeft',
};
