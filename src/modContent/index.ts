import { Technique, TechniqueMasteryRarityMap, UpgradeTechniqueMastery, CraftingTechnique } from 'afnm-types';
import { Buff, CraftingBuff } from 'afnm-types';
import { CraftingTechniqueMasteryRarityMap, UpgradeCraftingTechniqueMastery } from 'afnm-types';

// ─── Game Asset Path ──────────────────────────────────────────────────────────
const G = `file:///G:/SteamLibrary/steamapps/common/Ascend From Nine Mountains/resources/app.asar/dist-electron/`;

// ─── Reuse Pre-defined Game Buffs ─────────────────────────────────────────────
const fistBuffs = window.modAPI.gameData.techniqueBuffs.fist;
// Available: flow, deadlyFocus, rippleForce, transcendentFocus, weakness, goldenAura

// ─── Mastery Helpers ──────────────────────────────────────────────────────────
// Shorthand for creating an upgrade mastery entry
function upg(
  upgradeKey: string,
  change: number,
  tooltip: string,
  shouldMultiply = false
): UpgradeTechniqueMastery {
  return { kind: 'upgrade', upgradeKey, change, tooltip, shouldMultiply };
}

// Creates a full TechniqueMasteryRarityMap (all 6 tiers required by TypeScript)
function masteryMap(
  rarity: 'mundane' | 'qitouched' | 'empowered' | 'resplendent' | 'incandescent' | 'transcendent',
  entries: {
    mundane?: UpgradeTechniqueMastery;
    qitouched?: UpgradeTechniqueMastery;
    empowered?: UpgradeTechniqueMastery;
    resplendent?: UpgradeTechniqueMastery;
    incandescent?: UpgradeTechniqueMastery;
    transcendent?: UpgradeTechniqueMastery;
  }
): TechniqueMasteryRarityMap {
  return {
    rarity,
    mundane: entries.mundane,
    qitouched: entries.qitouched,
    empowered: entries.empowered,
    resplendent: entries.resplendent,
    incandescent: entries.incandescent,
    transcendent: entries.transcendent,
  };
}

// Standard full power upgrade (mundane → transcendent)
function powerMastery(upgradeKey = 'power', label = 'power'): TechniqueMasteryRarityMap {
  return masteryMap('empowered', {
    mundane: upg(upgradeKey, 0.05, `Increase ${label} by <num>5%</num>.`, true),
    qitouched: upg(upgradeKey, 0.1, `Increase ${label} by <num>10%</num>.`, true),
    empowered: upg(upgradeKey, 0.15, `Increase ${label} by <num>15%</num>.`, true),
    resplendent: upg(upgradeKey, 0.2, `Increase ${label} by <num>20%</num>.`, true),
    incandescent: upg(upgradeKey, 0.25, `Increase ${label} by <num>25%</num>.`, true),
    transcendent: upg(upgradeKey, 0.3, `Increase ${label} by <num>30%</num>.`, true),
  });
}

// ─── Crafting Mastery Helpers ─────────────────────────────────────────────────

function cupg(
  upgradeKey: string,
  change: number,
  tooltip: string,
  shouldMultiply = false
): UpgradeCraftingTechniqueMastery {
  return { kind: 'upgrade', upgradeKey, change, tooltip, shouldMultiply };
}

function craftingMasteryMap(
  rarity: 'mundane' | 'qitouched' | 'empowered' | 'resplendent' | 'incandescent' | 'transcendent',
  entries: {
    mundane?: UpgradeCraftingTechniqueMastery;
    qitouched?: UpgradeCraftingTechniqueMastery;
    empowered?: UpgradeCraftingTechniqueMastery;
    resplendent?: UpgradeCraftingTechniqueMastery;
    incandescent?: UpgradeCraftingTechniqueMastery;
    transcendent?: UpgradeCraftingTechniqueMastery;
  }
): CraftingTechniqueMasteryRarityMap {
  return {
    rarity,
    mundane:      entries.mundane,
    qitouched:    entries.qitouched,
    empowered:    entries.empowered,
    resplendent:  entries.resplendent,
    incandescent: entries.incandescent,
    transcendent: entries.transcendent,
  };
}

function craftingPowerMastery(upgradeKey: string, label: string): CraftingTechniqueMasteryRarityMap {
  return craftingMasteryMap('empowered', {
    mundane:      cupg(upgradeKey, 0.05, `Increase ${label} by <num>5%</num>.`,  true),
    qitouched:    cupg(upgradeKey, 0.1,  `Increase ${label} by <num>10%</num>.`, true),
    empowered:    cupg(upgradeKey, 0.15, `Increase ${label} by <num>15%</num>.`, true),
    resplendent:  cupg(upgradeKey, 0.2,  `Increase ${label} by <num>20%</num>.`, true),
    incandescent: cupg(upgradeKey, 0.25, `Increase ${label} by <num>25%</num>.`, true),
    transcendent: cupg(upgradeKey, 0.3,  `Increase ${label} by <num>30%</num>.`, true),
  });
}

// ─── Custom Buff Definitions ──────────────────────────────────────────────────

// Stabilised Infusion — prevents infusion removal this round
const stabilisedInfusionBuff: Buff = {
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

// Dragon Infusion buff (+30% power, removed end of round unless stabilised)
const dragonInfusionBuff: Buff = {
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

// Phoenix Infusion buff (+15% crit chance, +50% crit multiplier)
const phoenixInfusionBuff: Buff = {
  name: 'Phoenix Infusion',
  icon: `${G}phoenixInfusion.webp`,
  canStack: false,
  buffType: 'Infusion',
  stats: {
    critchance: { value: 15, stat: undefined },
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

// Focused Footwork buff (+50% DR, +0.5 power — removed after next technique)
const focusedFootworkBuff: Buff = {
  name: 'Focused Footwork',
  icon: `${G}backstep.webp`,
  canStack: true,
  afterTechnique: true,
  maxStacks: 3,
  stats: {
    dr: { value: 50, stat: undefined },
    power: { value: 0.5, stat: 'power' },
  },
  tooltip: 'Removed after the next technique.',
  onTechniqueEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  onRoundEffects: [],
  stacks: 1,
};

// Sealed Meridian buff (+30 weakness, decays 1/round)
const sealedMeridianBuff: Buff = {
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

// Golden Tortoise Shell buff (+30% protection, +15% DR, lasts N rounds via stacks)
const goldenTortoiseShellBuff: Buff = {
  name: 'Golden Tortoise Shell',
  icon: `${G}turtleInfusion.webp`,
  canStack: true,
  stats: {
    protection: { value: 30, stat: undefined },
    dr: { value: 15, stat: undefined },
  },
  onTechniqueEffects: [],
  onRoundEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  stacks: 5,
};

const innerWoundBuff: Buff = {
  name: 'Inner Wound',
  icon: `${G}focusBlast.webp`,
  canStack: true,
  stats: { vulnerability: { value: 50, stat: undefined } },
  afterTechnique: true,
  onTechniqueEffects: [{ kind: 'add', amount: { value: -1, stat: undefined } }],
  onRoundEffects: [],
  stacks: 2,
};

// Permanent power buff gained after explosion — no decay
const heavensResonanceBuff: Buff = {
  name: "Heaven's Resonance",
  icon: `${G}goldenAura.webp`,
  canStack: true,
  maxStacks: 8,
  stats: {
    power: { value: 0.5, stat: 'power' }, // +50% power per stack
  },
  tooltip: 'Permanently increases power by <num>50%</num> per stack. Max 8 stacks.',
  onTechniqueEffects: [],
  onRoundEffects: [], // no decay — permanent
  stacks: 1,
};

const heavensWoundBuff: Buff = {
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
    // ← use buff name as string instead of 'self' as any
    {
      kind: 'consumeSelf',
      buff: "Heaven's Wound",  // ✅ string is valid per buff.d.ts
      condition: {
        kind: 'buff',
        buff: 'self',
        count: 99,
        mode: 'more',
      },
      amount: { value: 100, stat: undefined },
    },
    // Normal decay
    {
      kind: 'add',
      amount: { value: -3, stat: undefined },
    },
  ],
  stacks: 1,
};

// ─── Crafting Buff Definitions ────────────────────────────────────────────────

const cyclingRefineBuff: CraftingBuff = {
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

const refiningRestorationBuff: CraftingBuff = {
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

// ─── 1. Golden Tortoise War Preparation ──────────────────────────────────────
// coreFormation | opener
// Upgrade of Turtle Infusion: shell lasts 5 rounds + 1x barrier + 10 Flow
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
// Dragon Infusion + Phoenix Infusion + double Flow (max 7) + 5 Deadly Focus
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
    // Flashing Footwork mechanic: double current Flow stacks (capped)
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
      resplendent: upg('maxFlow', 1, 'Increase maximum <name>Flow</name> gain by <num>1</num>.'),
      incandescent: upg('maxFlow', 2, 'Increase maximum <name>Flow</name> gain by <num>2</num>.'),
      transcendent: upg('maxFlow', 3, 'Increase maximum <name>Flow</name> gain by <num>3</num>.'),
    }),
    focusStacks: masteryMap('empowered', {
      empowered: upg('focusStacks', 1, 'Gain <num>1</num> more <name>Deadly Focus</name>.'),
      resplendent: upg('focusStacks', 2, 'Gain <num>2</num> more <name>Deadly Focus</name>.'),
      incandescent: upg('focusStacks', 3, 'Gain <num>3</num> more <name>Deadly Focus</name>.'),
      transcendent: upg('focusStacks', 4, 'Gain <num>4</num> more <name>Deadly Focus</name>.'),
    }),
  },
};

// ─── 3. Heaven-Cleaving Mountain Strike ──────────────────────────────────────
// qiCondensation | requires 5 Deadly Focus
// 0.825 dmg + 0.825 barrier + 2 Flow + 2 Ripple Force
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
    power: powerMastery('power', 'damage'),
    barrier: powerMastery('barrier', 'barrier'),
    rippleStacks: masteryMap('empowered', {
      incandescent: upg('rippleStacks', 1, 'Gain <num>1</num> more <name>Ripple Force</name>.'),
      transcendent: upg('rippleStacks', 2, 'Gain <num>2</num> more <name>Ripple Force</name>.'),
    }),
  },
};

// ─── 4. Nine Heavens Destruction Palm ────────────────────────────────────────
// coreFormation | costs 25 Flow | maxInstances 1
// 11x dmg + 3 Sealed Meridian + 1.5x power heal
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
    {
      kind: 'convertSelf',
      source: fistBuffs.rippleForce,
      target: fistBuffs.flow,
      amount: {
        value: 0.5,
        stat: undefined,
        scaling: fistBuffs.rippleForce.name, // ← 0.5 × current Ripple Force stacks
      },
    },
  ],
  upgradeMasteries: {
    power: powerMastery('power', 'damage'),
    cost: masteryMap('empowered', {
      resplendent: upg('cost', -2, 'Reduce <name>Flow</name> cost by <num>2</num>.'),
      incandescent: upg('cost', -4, 'Reduce <name>Flow</name> cost by <num>4</num>.'),
      transcendent: upg('cost', -6, 'Reduce <name>Flow</name> cost by <num>6</num>.'),
    }),
    sealStacks: masteryMap('empowered', {
      incandescent: upg('sealStacks', 1, 'Inflict <num>1</num> more <name>Sealed Meridian</name>.'),
      transcendent: upg('sealStacks', 2, 'Inflict <num>2</num> more <name>Sealed Meridian</name>.'),
    }),
    heal: masteryMap('empowered', {
      empowered: upg('heal', 0.1, 'Increase heal by <num>10%</num>.', true),
      resplendent: upg('heal', 0.2, 'Increase heal by <num>20%</num>.', true),
      incandescent: upg('heal', 0.3, 'Increase heal by <num>30%</num>.', true),
      transcendent: upg('heal', 0.4, 'Increase heal by <num>40%</num>.', true),
    }),
  },
};

// ─── 5. Starfall Evasion ──────────────────────────────────────────────────────
// qiCondensation | costs 3 Deadly Focus
// 1.375x barrier + 3 Focused Footwork stacks
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
      resplendent: upg('footworkStacks', 1, 'Gain <num>1</num> more <name>Focused Footwork</name>.'),
      incandescent: upg('footworkStacks', 2, 'Gain <num>2</num> more <name>Focused Footwork</name>.'),
      transcendent: upg('footworkStacks', 3, 'Gain <num>3</num> more <name>Focused Footwork</name>.'),
    }),
  },
};

// ─── 6. Heaven-Rooted Stance ──────────────────────────────────────────────────
// qiCondensation | costs 2 Flow
// 2 Deadly Focus + 3 Ripple Force + Stabilised Infusion
const heavenRootedStance: Technique = {
  name: 'Heaven-Rooted Stance',
  icon: `${G}visualiseSuccess.webp`,
  type: 'fist',
  realm: 'qiCondensation',
  maxInstances: 2,
  costs: [
    { buff: fistBuffs.flow, amount: 2 },
  ],
  tooltip: 'Gain <num>1</num> <name>Flow</name> and <name>Deadly Focus</name> for each <name>Weakness</name>, then consume all <name>Weakness</name>. Gain <num>2</num> <name>Deadly Focus</name> and <num>2</num> <name>Ripple Force</name>. Gain <num>0.3x</num> power as barrier and inflict <name>Heaven\'s Wound</name> on the enemy.',
  effects: [
    // ── Barrier first so {barrier.amount} resolves correctly ──
    {
      kind: 'barrier',
      amount: { value: 0.3, stat: 'power', upgradeKey: 'barrier' },
    },
    // ── Stabilize Footing mechanic ──────────────────────────
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
    // ── Fixed buffs (always) ────────────────────────────────
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
    // ── DoT ─────────────────────────────────────────────────
    {
      kind: 'buffTarget',
      buff: heavensWoundBuff,
      amount: { value: 17, stat: undefined, upgradeKey: 'dotStacks' },
    },
  ],
  upgradeMasteries: {
    focusStacks: masteryMap('empowered', {
      empowered: upg('focusStacks', 1, 'Gain <num>1</num> more <name>Deadly Focus</name>.'),
      resplendent: upg('focusStacks', 2, 'Gain <num>2</num> more <name>Deadly Focus</name>.'),
      incandescent: upg('focusStacks', 3, 'Gain <num>3</num> more <name>Deadly Focus</name>.'),
      transcendent: upg('focusStacks', 4, 'Gain <num>4</num> more <name>Deadly Focus</name>.'),
    }),
    rippleStacks: masteryMap('empowered', {
      resplendent: upg('rippleStacks', 1, 'Gain <num>1</num> more <name>Ripple Force</name>.'),
      incandescent: upg('rippleStacks', 2, 'Gain <num>2</num> more <name>Ripple Force</name>.'),
      transcendent: upg('rippleStacks', 3, 'Gain <num>3</num> more <name>Ripple Force</name>.'),
    }),
    barrier: masteryMap('empowered', {
      empowered: upg('barrier', 0.05, 'Increase barrier by <num>5%</num>.', true),
      resplendent: upg('barrier', 0.1, 'Increase barrier by <num>10%</num>.', true),
      incandescent: upg('barrier', 0.15, 'Increase barrier by <num>15%</num>.', true),
      transcendent: upg('barrier', 0.2, 'Increase barrier by <num>20%</num>.', true),
    }),
    dotStacks: masteryMap('empowered', {
      resplendent: upg('dotStacks', 1, 'Apply <num>1</num> more <name>Heaven\'s Wound</name> stack.'),
      incandescent: upg('dotStacks', 2, 'Apply <num>2</num> more <name>Heaven\'s Wound</name> stacks.'),
      transcendent: upg('dotStacks', 3, 'Apply <num>3</num> more <name>Heaven\'s Wound</name> stacks.'),
    }),
  },
};

const heavenOrdainingFinger: Technique = {
  name: 'Heaven-Ordaining Finger',
  icon: `${G}pinpointDetonation.webp`,
  type: 'fist',
  realm: 'pillarCreation',
  maxInstances: 1,
  costs: [
    { buff: fistBuffs.flow, amount: 180, upgradeKey: 'cost' },
  ],
  tooltip: 'Inflict <name>Inner Wound</name>. Deal damage based on your <name>Deadly Focus</name> stacks, then consume them all.',
  effects: [
    // 5 stacks of Inner Wound on target
    {
      kind: 'buffTarget',
      buff: innerWoundBuff,
      amount: { value: 5, stat: undefined },
    },
    // Base damage: 11x power (Reality Splitter level) — always applies
    {
      kind: 'damage',
      amount: { value: 10, stat: 'power', upgradeKey: 'basePower' },
    },
    // Bonus damage: 0.25x power per Deadly Focus stack, capped at 40x bonus
    // At 100 stacks → +25x (total 36x) | at cap 160 stacks → +40x (total 51x)
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
    // Consume ALL Deadly Focus stacks after damage is calculated
    {
      kind: 'consumeSelf',
      buff: fistBuffs.deadlyFocus,
      amount: { value: 100, stat: undefined },
    },
  ],
  upgradeMasteries: {
    basePower: powerMastery('basePower', 'base damage'),
    cost: masteryMap('empowered', {
      mundane: undefined,
      qitouched: undefined,
      empowered: undefined,
      resplendent: upg('cost', -10, 'Reduce <name>Flow</name> cost by <num>10</num>.'),
      incandescent: upg('cost', -20, 'Reduce <name>Flow</name> cost by <num>20</num>.'),
      transcendent: upg('cost', -30, 'Reduce <name>Flow</name> cost by <num>30</num>.'),
    }),
    bonusPower: masteryMap('empowered', {
      mundane: undefined,
      qitouched: undefined,
      empowered: upg('bonusPower', 0.02, 'Increase bonus damage per stack by <num>2%</num>.', true),
      resplendent: upg('bonusPower', 0.04, 'Increase bonus damage per stack by <num>4%</num>.', true),
      incandescent: upg('bonusPower', 0.06, 'Increase bonus damage per stack by <num>6%</num>.', true),
      transcendent: upg('bonusPower', 0.08, 'Increase bonus damage per stack by <num>8%</num>.', true),
    }),
    maxBonusPower: masteryMap('empowered', {
      mundane: undefined,
      qitouched: undefined,
      empowered: undefined,
      resplendent: upg('maxBonusPower', 5, 'Increase maximum bonus damage by <num>5x</num> power.'),
      incandescent: upg('maxBonusPower', 10, 'Increase maximum bonus damage by <num>10x</num> power.'),
      transcendent: upg('maxBonusPower', 15, 'Increase maximum bonus damage by <num>15x</num> power.'),
    }),
  },
};

// ─── Crafting Techniques ──────────────────────────────────────────────────────

// ─── 1. Transcendent Cycling Refine ──────────────────────────────────────────
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
      incandescent: cupg('stacks', 1, 'Gain <num>1</num> more <name>Cycling Refine</name> stack.'),
      transcendent: cupg('stacks', 2, 'Gain <num>2</num> more <name>Cycling Refine</name> stacks.'),
    }),
    buffPower: craftingMasteryMap('resplendent', {
      resplendent:  cupg('buffPower', 0.15, 'Increase intensity gained by <num>15%</num>.'),
      incandescent: cupg('buffPower', 0.2,  'Increase intensity gained by <num>20%</num>.'),
      transcendent: cupg('buffPower', 0.25, 'Increase intensity gained by <num>25%</num>.'),
    }),
  },
};

// ─── 2. Heaven's Efficient Fusion ────────────────────────────────────────────
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
      resplendent:  cupg('buffStacks', 2, 'Gain <num>2</num> more <name>Refining Restoration</name> stacks.'),
      incandescent: cupg('buffStacks', 4, 'Gain <num>4</num> more <name>Refining Restoration</name> stacks.'),
      transcendent: cupg('buffStacks', 6, 'Gain <num>6</num> more <name>Refining Restoration</name> stacks.'),
    }),
    buffStability: craftingPowerMastery('buffStability', 'stability per refine'),
  },
};


// ─── Register All Techniques ──────────────────────────────────────────────────
window.modAPI.actions.addTechnique(goldenTortoiseWarPrep);
window.modAPI.actions.addTechnique(twinSovereigns);
window.modAPI.actions.addTechnique(heavenCleavingMountainStrike);
window.modAPI.actions.addTechnique(nineHeavensDestructionPalm);
window.modAPI.actions.addTechnique(starfallEvasion);
window.modAPI.actions.addTechnique(heavenRootedStance);
window.modAPI.actions.addTechnique(heavenOrdainingFinger);
window.modAPI.actions.addCraftingTechnique(transcendentCyclingRefine);
window.modAPI.actions.addCraftingTechnique(heavensEfficientFusion);
window.modAPI.actions.addCraftingTechnique(heavensForcefulStabilize);

// ─── Crafting Technique Action Items ─────────────────────────────────────────

const transcendentCyclingRefineItem = {
  technique: 'Transcendent Cycling Refine',
  kind: 'action' as const,
  name: 'Transcendent Cycling Refine',
  description: {
    _translatable: true as const,  // ← add "as const"
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: 'Transcendent Cycling Refine' },
  },
  icon: `${G}cyclingRefine.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

const heavensEfficientFusionItem = {
  technique: "Heaven's Efficient Fusion",
  kind: 'action' as const,
  name: "Heaven's Efficient Fusion",
  description: {
    _translatable: true as const,  // ← add "as const"
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: "Heaven's Efficient Fusion" },
  },
  icon: `${G}efficientFusion.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

const heavensForcefulStabilizeItem = {
  technique: "Heaven's Forceful Stabilize",
  kind: 'action' as const,
  name: "Heaven's Forceful Stabilize",
  description: {
    _translatable: true as const,  // ← add "as const"
    key: "The knowledge of how to perform the '{e_name}' crafting action.",
    variables: { e_name: "Heaven's Forceful Stabilize" },
  },
  icon: `${G}forcefulStabilize.webp`,
  stacks: 1,
  rarity: 'incandescent' as const,
  realm: 'coreFormation' as const,
};

// Register items
window.modAPI.actions.addItem(transcendentCyclingRefineItem);
window.modAPI.actions.addItem(heavensEfficientFusionItem);
window.modAPI.actions.addItem(heavensForcefulStabilizeItem);

// Add to sect favour exchange (location: 'Liang Tiao Village', realm: coreFormation)
window.modAPI.actions.addItemToShop(transcendentCyclingRefineItem, 1, 'Liang Tiao Village', 'coreFormation', 3);
window.modAPI.actions.addItemToShop(heavensEfficientFusionItem,    1, 'Liang Tiao Village', 'coreFormation', 3);
window.modAPI.actions.addItemToShop(heavensForcefulStabilizeItem,  1, 'Liang Tiao Village', 'coreFormation', 3);