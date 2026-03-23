import { Buff } from 'afnm-types';
import { G } from '../constants';

// ─── Stabilised Infusion ──────────────────────────────────────────────────────
// Prevents infusion removal this round. Referenced by Dragon and Phoenix Infusion.
export const stabilisedInfusionBuff: Buff = {
  name: 'Stabilised Infusion',
  icon: `${G}stabilizeFooting.webp`,
  canStack: false,
  stats: undefined,
  tooltip: 'Prevents <name>Infusions</name> from being removed this round. Removed at the end of the round.',
  onTechniqueEffects: [],
  onRoundEffects: [{ kind: 'negate' }],
  stacks: 1,
  priority: 999,
};

// ─── Dragon Infusion ──────────────────────────────────────────────────────────
// +30% power. Removed at end of round unless Stabilised Infusion is active.
export const dragonInfusionBuff: Buff = {
  name: 'Dragon Infusion',
  icon: `${G}dragonInfusion.webp`,
  canStack: false,
  buffType: 'Infusion',
  stats: { power: { value: 0.3, stat: 'power' } },
  onTechniqueEffects: [],
  onRoundEffects: [
    {
      kind: 'negate',
      condition: {
        kind: 'buff',
        buff: stabilisedInfusionBuff,
        mode: 'equal',
        count: 0,
        hideBuff: true,
      },
    },
  ],
  stacks: 1,
};

// ─── Phoenix Infusion ─────────────────────────────────────────────────────────
// +15% crit chance, +50% crit multiplier. Removed end of round unless stabilised.
export const phoenixInfusionBuff: Buff = {
  name: 'Phoenix Infusion',
  icon: `${G}phoenixInfusion.webp`,
  canStack: false,
  buffType: 'Infusion',
  stats: {
    critchance:    { value: 15, stat: undefined },
    critmultiplier: { value: 50, stat: undefined },
  },
  onTechniqueEffects: [],
  onRoundEffects: [
    {
      kind: 'negate',
      condition: {
        kind: 'buff',
        buff: stabilisedInfusionBuff,
        mode: 'equal',
        count: 0,
        hideBuff: true,
      },
    },
  ],
  stacks: 1,
};

// ─── Focused Footwork ─────────────────────────────────────────────────────────
// +50% DR, +0.5x power. Removed after the next technique. Max 3 stacks.
export const focusedFootworkBuff: Buff = {
  name: 'Focused Footwork',
  icon: `${G}backstep.webp`,
  canStack: true,
  afterTechnique: true,
  maxStacks: 3,
  stats: {
    dr:    { value: 50,  stat: undefined },
    power: { value: 0.5, stat: 'power' },
  },
  tooltip: 'Removed after the next technique.',
  onTechniqueEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  onRoundEffects: [],
  stacks: 1,
};

// ─── Sealed Meridian ──────────────────────────────────────────────────────────
// +30 weakness on target. Decays 1 stack per round.
export const sealedMeridianBuff: Buff = {
  name: 'Sealed Meridian (1st)',
  icon: `${G}sealMeridian.webp`,
  canStack: true,
  type: 'fist',
  buffType: 'Sealed Meridian',
  stats: { weakness: { value: 30, stat: undefined } },
  onTechniqueEffects: [],
  onRoundEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  stacks: 1,
  combatImage: {
    position: 'overlay',
    image: `${G}weaknessOverlay.webp`,
    baseOpacity: 0.2,
    stacksOpacity: 0.05,
  },
};

// ─── Golden Tortoise Shell ────────────────────────────────────────────────────
// +30% protection, +15% DR. Lasts N rounds (stacks = duration).
export const goldenTortoiseShellBuff: Buff = {
  name: 'Golden Tortoise Shell',
  icon: `${G}turtleInfusion.webp`,
  canStack: true,
  stats: {
    protection: { value: 30, stat: undefined },
    dr:         { value: 15, stat: undefined },
  },
  onTechniqueEffects: [],
  onRoundEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  stacks: 5,
};

// ─── Inner Wound ──────────────────────────────────────────────────────────────
// +50% vulnerability on target. Removed after the next technique. Max 2 stacks.
export const innerWoundBuff: Buff = {
  name: 'Inner Wound',
  icon: `${G}focusBlast.webp`,
  canStack: true,
  stats: { vulnerability: { value: 50, stat: undefined } },
  afterTechnique: true,
  onTechniqueEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  onRoundEffects: [],
  stacks: 2,
};

// ─── Heaven's Resonance ───────────────────────────────────────────────────────
// Permanent +50% power per stack (max 8). Granted after Heaven's Wound explodes.
export const heavensResonanceBuff: Buff = {
  name: "Heaven's Resonance",
  icon: `${G}goldenAura.webp`,
  canStack: true,
  maxStacks: 8,
  stats: {
    power: { value: 0.5, stat: 'power' },
  },
  tooltip: 'Permanently increases power by <num>50%</num> per stack. Max 8 stacks.',
  onTechniqueEffects: [],
  onRoundEffects: [], // permanent — no decay
  stacks: 1,
};

// ─── Heaven's Wound ───────────────────────────────────────────────────────────
// DoT that stacks on the enemy. At 100 stacks: explodes for 15x power damage,
// grants Heaven's Resonance, then consumes all stacks. Decays 3/round.
export const heavensWoundBuff: Buff = {
  name: "Heaven's Wound",
  icon: `${G}sealMeridian.webp`,
  canStack: true,
  maxStacks: 100,
  stats: undefined,
  tooltip: "Deals 0.01x power per stack after each enemy technique. At 100 stacks: explodes at end of round for 15x power damage, then grants Heaven's Resonance.",
  onTechniqueEffects: [
    {
      kind: 'damageSelf',
      amount: { value: 0.01, stat: 'power', scaling: 'stacks' },
    },
  ],
  onRoundEffects: [
    // Explosion damage at 100 stacks
    {
      kind: 'damageSelf',
      condition: {
        kind: 'buff',
        buff: 'self',
        count: 99,
        mode: 'more',
      },
      amount: { value: 15, stat: 'power' },
    },
    // Grant Heaven's Resonance at 100 stacks
    {
      kind: 'buffTarget',
      condition: {
        kind: 'buff',
        buff: 'self',
        count: 99,
        mode: 'more',
      },
      buff: heavensResonanceBuff,
      amount: { value: 1, stat: undefined },
    },
    // Consume all stacks after explosion (string ref is valid for buff.consumeSelf)
    {
      kind: 'consumeSelf',
      buff: "Heaven's Wound",
      condition: {
        kind: 'buff',
        buff: 'self',
        count: 99,
        mode: 'more',
      },
      amount: { value: 100, stat: undefined },
    },
    // Normal decay: -3 stacks per round
    {
      kind: 'add',
      amount: { value: -3, stat: undefined },
    },
  ],
  stacks: 1,
};
