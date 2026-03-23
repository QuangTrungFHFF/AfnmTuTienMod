import { Technique } from 'afnm-types';
import { G } from '../constants';
import { upg, masteryMap, powerMastery } from '../helpers/mastery';
import {
  dragonInfusionBuff,
  phoenixInfusionBuff,
  focusedFootworkBuff,
  sealedMeridianBuff,
  goldenTortoiseShellBuff,
  innerWoundBuff,
  heavensWoundBuff,
} from '../buffs/combat';

// Resolved once at module load — safe since modAPI is available before the mod runs.
const fistBuffs = window.modAPI.gameData.techniqueBuffs.fist;
// Available: flow, deadlyFocus, rippleForce, transcendentFocus, weakness, goldenAura

// ─── 1. Golden Tortoise War Preparation ──────────────────────────────────────
// coreFormation | opener
// Grants barrier (1x power) + 15 Flow + Golden Tortoise Shell (5 rounds).
const goldenTortoiseWarPrep: Technique = {
  name: 'Golden Tortoise War Preparation',
  icon: `${G}turtleInfusion.webp`,
  type: 'fist',
  realm: 'coreFormation',
  stanceRestriction: 'opener',
  effects: [
    {
      kind: 'barrier',
      amount: { value: 1.0, stat: 'power', upgradeKey: 'barrier' },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.flow,
      amount: { value: 15, stat: undefined },
    },
    {
      kind: 'buffSelf',
      buff: goldenTortoiseShellBuff,
      amount: { value: 5, stat: undefined, upgradeKey: 'shellDuration' },
    },
  ],
  upgradeMasteries: {
    barrier: powerMastery('barrier', 'barrier'),
    shellDuration: masteryMap('empowered', {
      incandescent: upg('shellDuration', 1, 'Increase <name>Golden Tortoise Shell</name> duration by <num>1</num> round.'),
      transcendent: upg('shellDuration', 2, 'Increase <name>Golden Tortoise Shell</name> duration by <num>2</num> rounds.'),
    }),
  },
};

// ─── 2. Twin Sovereigns ───────────────────────────────────────────────────────
// qiCondensation | opener
// Grants Dragon Infusion + Phoenix Infusion + doubles current Flow (capped) + 5 Deadly Focus.
const twinSovereigns: Technique = {
  name: 'Twin Sovereigns',
  icon: `${G}dragonInfusion.webp`,
  type: 'fist',
  realm: 'qiCondensation',
  stanceRestriction: 'opener',
  effects: [
    {
      kind: 'buffSelf',
      buff: dragonInfusionBuff,
      amount: { value: 1, stat: undefined },
    },
    {
      kind: 'buffSelf',
      buff: phoenixInfusionBuff,
      amount: { value: 1, stat: undefined },
    },
    // Doubles current Flow stacks up to the cap.
    {
      kind: 'buffSelf',
      buff: fistBuffs.flow,
      amount: {
        value: 1,
        stat: undefined,
        scaling: fistBuffs.flow.name,
        max: { value: 12, stat: undefined, upgradeKey: 'maxFlow' },
      },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.deadlyFocus,
      amount: { value: 5, stat: undefined, upgradeKey: 'focusStacks' },
    },
  ],
  upgradeMasteries: {
    maxFlow: masteryMap('empowered', {
      resplendent:  upg('maxFlow', 1, 'Increase maximum <name>Flow</name> gain by <num>1</num>.'),
      incandescent: upg('maxFlow', 2, 'Increase maximum <name>Flow</name> gain by <num>2</num>.'),
      transcendent: upg('maxFlow', 3, 'Increase maximum <name>Flow</name> gain by <num>3</num>.'),
    }),
    focusStacks: masteryMap('empowered', {
      empowered:    upg('focusStacks', 1, 'Gain <num>1</num> more <name>Deadly Focus</name>.'),
      resplendent:  upg('focusStacks', 2, 'Gain <num>2</num> more <name>Deadly Focus</name>.'),
      incandescent: upg('focusStacks', 3, 'Gain <num>3</num> more <name>Deadly Focus</name>.'),
      transcendent: upg('focusStacks', 4, 'Gain <num>4</num> more <name>Deadly Focus</name>.'),
    }),
  },
};

// ─── 3. Heaven-Cleaving Mountain Strike ──────────────────────────────────────
// qiCondensation | requires 5 Deadly Focus
// 0.825x damage + 0.825x barrier + 2 Flow + 5 Ripple Force.
const heavenCleavingMountainStrike: Technique = {
  name: 'Heaven-Cleaving Mountain Strike',
  icon: `${G}fistStrike.webp`,
  type: 'fist',
  realm: 'qiCondensation',
  requirements: [
    { buff: fistBuffs.deadlyFocus, amount: 5 },
  ],
  effects: [
    {
      kind: 'damage',
      amount: { value: 0.825, stat: 'power', upgradeKey: 'power' },
    },
    {
      kind: 'barrier',
      amount: { value: 0.825, stat: 'power', upgradeKey: 'barrier' },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.flow,
      amount: { value: 2, stat: undefined },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.rippleForce,
      amount: { value: 5, stat: undefined, upgradeKey: 'rippleStacks' },
    },
  ],
  upgradeMasteries: {
    power:        powerMastery('power',  'damage'),
    barrier:      powerMastery('barrier', 'barrier'),
    rippleStacks: masteryMap('empowered', {
      incandescent: upg('rippleStacks', 1, 'Gain <num>1</num> more <name>Ripple Force</name>.'),
      transcendent: upg('rippleStacks', 2, 'Gain <num>2</num> more <name>Ripple Force</name>.'),
    }),
  },
};

// ─── 4. Nine Heavens Destruction Palm ────────────────────────────────────────
// coreFormation | costs 25 Flow | maxInstances 1
// 11x damage + 4 Sealed Meridian + 0.75x heal + converts Ripple Force → Flow.
const nineHeavensDestructionPalm: Technique = {
  name: 'Nine Heavens Destruction Palm',
  icon: `${G}crashingMountain.webp`,
  type: 'fist',
  realm: 'coreFormation',
  maxInstances: 1,
  costs: [
    { buff: fistBuffs.flow, amount: 25, upgradeKey: 'cost' },
  ],
  effects: [
    {
      kind: 'damage',
      amount: { value: 11, stat: 'power', upgradeKey: 'power' },
    },
    {
      kind: 'buffTarget',
      buff: sealedMeridianBuff,
      amount: { value: 4, stat: undefined, upgradeKey: 'sealStacks' },
    },
    {
      kind: 'heal',
      amount: { value: 0.75, stat: 'power', upgradeKey: 'heal' },
    },
    // Convert 0.5x current Ripple Force stacks into Flow.
    {
      kind: 'convertSelf',
      source: fistBuffs.rippleForce,
      target: fistBuffs.flow,
      amount: {
        value: 0.5,
        stat: undefined,
        scaling: fistBuffs.rippleForce.name,
      },
    },
  ],
  upgradeMasteries: {
    power: powerMastery('power', 'damage'),
    cost: masteryMap('empowered', {
      resplendent:  upg('cost', -2, 'Reduce <name>Flow</name> cost by <num>2</num>.'),
      incandescent: upg('cost', -4, 'Reduce <name>Flow</name> cost by <num>4</num>.'),
      transcendent: upg('cost', -6, 'Reduce <name>Flow</name> cost by <num>6</num>.'),
    }),
    sealStacks: masteryMap('empowered', {
      incandescent: upg('sealStacks', 1, 'Inflict <num>1</num> more <name>Sealed Meridian</name>.'),
      transcendent: upg('sealStacks', 2, 'Inflict <num>2</num> more <name>Sealed Meridian</name>.'),
    }),
    heal: masteryMap('empowered', {
      empowered:    upg('heal', 0.1, 'Increase heal by <num>10%</num>.', true),
      resplendent:  upg('heal', 0.2, 'Increase heal by <num>20%</num>.', true),
      incandescent: upg('heal', 0.3, 'Increase heal by <num>30%</num>.', true),
      transcendent: upg('heal', 0.4, 'Increase heal by <num>40%</num>.', true),
    }),
  },
};

// ─── 5. Starfall Evasion ──────────────────────────────────────────────────────
// qiCondensation | costs 3 Deadly Focus
// 1.375x barrier + 3 Focused Footwork stacks.
const starfallEvasion: Technique = {
  name: 'Starfall Evasion',
  icon: `${G}backstep.webp`,
  type: 'fist',
  realm: 'qiCondensation',
  costs: [
    { buff: fistBuffs.deadlyFocus, amount: 3 },
  ],
  effects: [
    {
      kind: 'barrier',
      amount: { value: 1.375, stat: 'power', upgradeKey: 'power' },
    },
    {
      kind: 'buffSelf',
      buff: focusedFootworkBuff,
      amount: { value: 3, stat: undefined, upgradeKey: 'footworkStacks' },
    },
  ],
  upgradeMasteries: {
    power: powerMastery('power', 'barrier'),
    footworkStacks: masteryMap('empowered', {
      resplendent:  upg('footworkStacks', 1, 'Gain <num>1</num> more <name>Focused Footwork</name>.'),
      incandescent: upg('footworkStacks', 2, 'Gain <num>2</num> more <name>Focused Footwork</name>.'),
      transcendent: upg('footworkStacks', 3, 'Gain <num>3</num> more <name>Focused Footwork</name>.'),
    }),
  },
};

// ─── 6. Heaven-Rooted Stance ──────────────────────────────────────────────────
// qiCondensation | costs 2 Flow | maxInstances 2
// Converts Weakness into Flow/Focus, then grants fixed Focus + Ripple Force +
// barrier (0.3x power) + applies Heaven's Wound to enemy.
const heavenRootedStance: Technique = {
  name: 'Heaven-Rooted Stance',
  icon: `${G}visualiseSuccess.webp`,
  type: 'fist',
  realm: 'qiCondensation',
  maxInstances: 2,
  costs: [
    { buff: fistBuffs.flow, amount: 2 },
  ],
  tooltip:
    'Gain <num>1</num> <name>Flow</name> and <name>Deadly Focus</name> for each <name>Weakness</name>, then consume all <name>Weakness</name>. ' +
    'Gain <num>2</num> <name>Deadly Focus</name> and <num>2</num> <name>Ripple Force</name>. ' +
    'Gain <num>0.3x</num> power as barrier and inflict <name>Heaven\'s Wound</name> on the enemy.',
  effects: [
    // Barrier resolved first so the amount is visible in the tooltip.
    {
      kind: 'barrier',
      amount: { value: 0.3, stat: 'power', upgradeKey: 'barrier' },
    },
    // Convert each Weakness stack into 1 Flow + 1 Deadly Focus, then consume them.
    {
      kind: 'buffSelf',
      buff: fistBuffs.flow,
      amount: { value: 1, stat: undefined, scaling: fistBuffs.weakness.name },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.deadlyFocus,
      amount: { value: 1, stat: undefined, scaling: fistBuffs.weakness.name },
    },
    {
      kind: 'consumeSelf',
      buff: fistBuffs.weakness,
      amount: { value: 1, stat: undefined, scaling: fistBuffs.weakness.name },
    },
    // Fixed buffs.
    {
      kind: 'buffSelf',
      buff: fistBuffs.deadlyFocus,
      amount: { value: 2, stat: undefined, upgradeKey: 'focusStacks' },
    },
    {
      kind: 'buffSelf',
      buff: fistBuffs.rippleForce,
      amount: { value: 2, stat: undefined, upgradeKey: 'rippleStacks' },
    },
    // Apply Heaven's Wound DoT to the enemy.
    {
      kind: 'buffTarget',
      buff: heavensWoundBuff,
      amount: { value: 17, stat: undefined, upgradeKey: 'dotStacks' },
    },
  ],
  upgradeMasteries: {
    focusStacks: masteryMap('empowered', {
      empowered:    upg('focusStacks', 1, 'Gain <num>1</num> more <name>Deadly Focus</name>.'),
      resplendent:  upg('focusStacks', 2, 'Gain <num>2</num> more <name>Deadly Focus</name>.'),
      incandescent: upg('focusStacks', 3, 'Gain <num>3</num> more <name>Deadly Focus</name>.'),
      transcendent: upg('focusStacks', 4, 'Gain <num>4</num> more <name>Deadly Focus</name>.'),
    }),
    rippleStacks: masteryMap('empowered', {
      resplendent:  upg('rippleStacks', 1, 'Gain <num>1</num> more <name>Ripple Force</name>.'),
      incandescent: upg('rippleStacks', 2, 'Gain <num>2</num> more <name>Ripple Force</name>.'),
      transcendent: upg('rippleStacks', 3, 'Gain <num>3</num> more <name>Ripple Force</name>.'),
    }),
    barrier: masteryMap('empowered', {
      empowered:    upg('barrier', 0.05, 'Increase barrier by <num>5%</num>.',  true),
      resplendent:  upg('barrier', 0.1,  'Increase barrier by <num>10%</num>.', true),
      incandescent: upg('barrier', 0.15, 'Increase barrier by <num>15%</num>.', true),
      transcendent: upg('barrier', 0.2,  'Increase barrier by <num>20%</num>.', true),
    }),
    dotStacks: masteryMap('empowered', {
      resplendent:  upg('dotStacks', 1, 'Apply <num>1</num> more <name>Heaven\'s Wound</name> stack.'),
      incandescent: upg('dotStacks', 2, 'Apply <num>2</num> more <name>Heaven\'s Wound</name> stacks.'),
      transcendent: upg('dotStacks', 3, 'Apply <num>3</num> more <name>Heaven\'s Wound</name> stacks.'),
    }),
  },
};

// ─── 7. Heaven-Ordaining Finger ───────────────────────────────────────────────
// pillarCreation | costs 180 Flow | maxInstances 1
// Inflicts Inner Wound. Deals 10x base + 0.5x per Deadly Focus (cap: 80x),
// then consumes all Deadly Focus.
const heavenOrdainingFinger: Technique = {
  name: 'Heaven-Ordaining Finger',
  icon: `${G}pinpointDetonation.webp`,
  type: 'fist',
  realm: 'pillarCreation',
  maxInstances: 1,
  costs: [
    { buff: fistBuffs.flow, amount: 180, upgradeKey: 'cost' },
  ],
  tooltip:
    'Inflict <name>Inner Wound</name>. Deal damage based on your <name>Deadly Focus</name> stacks, then consume them all.',
  effects: [
    {
      kind: 'buffTarget',
      buff: innerWoundBuff,
      amount: { value: 5, stat: undefined },
    },
    // Base damage — always applies.
    {
      kind: 'damage',
      amount: { value: 10, stat: 'power', upgradeKey: 'basePower' },
    },
    // Bonus damage: 0.5x power per Deadly Focus stack, capped at 80x.
    {
      kind: 'damage',
      amount: {
        value: 0.5,
        stat: 'power',
        scaling: fistBuffs.deadlyFocus.name,
        max: { value: 80, stat: 'power', upgradeKey: 'maxBonusPower' },
        upgradeKey: 'bonusPower',
      },
    },
    // Consume ALL Deadly Focus after damage is calculated.
    {
      kind: 'consumeSelf',
      buff: fistBuffs.deadlyFocus,
      amount: { value: 100, stat: undefined },
    },
  ],
  upgradeMasteries: {
    basePower: powerMastery('basePower', 'base damage'),
    cost: masteryMap('empowered', {
      resplendent:  upg('cost', -10, 'Reduce <name>Flow</name> cost by <num>10</num>.'),
      incandescent: upg('cost', -20, 'Reduce <name>Flow</name> cost by <num>20</num>.'),
      transcendent: upg('cost', -30, 'Reduce <name>Flow</name> cost by <num>30</num>.'),
    }),
    bonusPower: masteryMap('empowered', {
      empowered:    upg('bonusPower', 0.02, 'Increase bonus damage per stack by <num>2%</num>.',  true),
      resplendent:  upg('bonusPower', 0.04, 'Increase bonus damage per stack by <num>4%</num>.',  true),
      incandescent: upg('bonusPower', 0.06, 'Increase bonus damage per stack by <num>6%</num>.',  true),
      transcendent: upg('bonusPower', 0.08, 'Increase bonus damage per stack by <num>8%</num>.',  true),
    }),
    maxBonusPower: masteryMap('empowered', {
      resplendent:  upg('maxBonusPower', 5,  'Increase maximum bonus damage by <num>5x</num> power.'),
      incandescent: upg('maxBonusPower', 10, 'Increase maximum bonus damage by <num>10x</num> power.'),
      transcendent: upg('maxBonusPower', 15, 'Increase maximum bonus damage by <num>15x</num> power.'),
    }),
  },
};

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeFistTechniques(): void {
  window.modAPI.actions.addTechnique(goldenTortoiseWarPrep);
  window.modAPI.actions.addTechnique(twinSovereigns);
  window.modAPI.actions.addTechnique(heavenCleavingMountainStrike);
  window.modAPI.actions.addTechnique(nineHeavensDestructionPalm);
  window.modAPI.actions.addTechnique(starfallEvasion);
  window.modAPI.actions.addTechnique(heavenRootedStance);
  window.modAPI.actions.addTechnique(heavenOrdainingFinger);
}
