import { TalismanItem, MountItem } from 'afnm-types';
import { G } from '../constants';
import bronzering from '../../assets/items/bronzering.webp';
import fadingazureCloud3 from '../../assets/items/fadingazureCloud3.webp';
import fadingazureCloud4 from '../../assets/items/fadingazureCloud4.webp';
import fadingazureCloud5 from '../../assets/items/fadingazureCloud5.webp';
import fadingazureCloud6 from '../../assets/items/fadingazureCloud6.webp';

const I = (file: string) => `${G}${file}`;
const CLOUD_TRANSFORM = 'translate3d(-10px, 50px, 0) scaleX(-1)';
const SEAL_ICON = I('powerTalisman.webp');

// ─── Quest/Story tokens ───────────────────────────────────────────────────────
export const wornGlassBead = {
  kind: 'token' as const,
  name: 'Worn Glass Bead',
  description:
    'A clouded glass bead—the only thing you saved from your burned home. ' +
    'There is nothing remarkable about it. Yet sometimes, in quiet moments, you think it might be breathing.',
  icon: I('feicuimanEgg.webp'),
  stacks: 1,
  rarity: 'mundane' as const,
  realm: 'mundane' as const,
};

export const celestialKeystone = {
  kind: 'token' as const,
  name: 'Celestial Keystone',
  description:
    'A perfectly geometrical prism that hums with a frequency matching your heartbeat. ' +
    'It is the anchor of something vast and patient, a place that has waited in a fold of the world for two thousand years.',
  icon: I('stoneGardenSigil.webp'),
  stacks: 1,
  rarity: 'resplendent' as const,
  realm: 'meridianOpening' as const,
};

export const scratchedBronzeRing = {
  kind: 'token' as const,
  name: 'Scratched Bronze Ring',
  description:
    "A battered ring found deep in a Jingdi bird's nest. Every surface is scored with claw marks, " +
    'yet a stubborn amber glow refuses to die. Something lives inside this ring, and it sounds furious.',
  icon: bronzering,
  stacks: 1,
  rarity: 'empowered' as const,
  realm: 'qiCondensation' as const,
};

// ─── Cloud Shroud buff factory ────────────────────────────────────────────────
function makeCloudShroud(iconFile: string, barrierFraction: number) {
  return {
    buff: {
      name: 'Cloud Shroud',
      icon: I(iconFile),
      canStack: false as const,
      stats: undefined,
      stacks: 1,
      onTechniqueEffects: [] as any[],
      onRoundEffects: [] as any[],
      onCombatStartEffects: [
        { kind: 'barrier' as const, amount: { value: barrierFraction, stat: 'maxbarrier' as const } },
      ],
    },
    buffStacks: { value: 1, stat: undefined },
  };
}

// ─── Mount chain ──────────────────────────────────────────────────────────────
// Quest 4.1 reward: Azure Wisp. Upgrades through 6 tiers to Aetheric Zenith.

export const azureWisp: MountItem = {
  kind: 'mount',
  name: 'Azure Wisp',
  description: 'A faint wisp of azure vapor that recognises your bloodline. It is humble, but already faster than common clouds.',
  icon: I('fadingCloud1.webp'), stacks: 1, rarity: 'incandescent', realm: 'bodyForging',
  speed: 122, charisma: 123, explorationBonus: 1,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud1.webp', 0.05)],
  minimumPotential: 2,
};

export const cobaltGlide: MountItem = {
  kind: 'mount',
  name: 'Cobalt Glide',
  description: 'The cloud has solidified into a steady cobalt platform. It moves with a rhythmic hum that calms the mind.',
  icon: I('fadingCloud2.webp'), stacks: 1, rarity: 'incandescent', realm: 'meridianOpening',
  speed: 342, charisma: 222, explorationBonus: 1,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud2.webp', 0.1)],
  minimumPotential: 3,
  upgradedFrom: azureWisp,
};

export const ceruleanSovereign: MountItem = {
  kind: 'mount',
  name: 'Cerulean Sovereign',
  description: 'A majestic cerulean mount that leaves a trail of starlight. It radiates the authority of the ancient Star-Gazers.',
  icon: fadingazureCloud3, stacks: 1, rarity: 'incandescent', realm: 'qiCondensation',
  speed: 776, charisma: 333, explorationBonus: 1,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud3.webp', 0.1)],
  minimumPotential: 4,
  upgradedFrom: cobaltGlide,
};

export const indigoNimbus: MountItem = {
  kind: 'mount',
  name: 'Indigo Nimbus',
  description: "A dense, indigo storm-cloud. It doesn't just fly; it commands the atmosphere to bend to the Young Master's will.",
  icon: fadingazureCloud4, stacks: 1, rarity: 'incandescent', realm: 'coreFormation',
  speed: 1448, charisma: 404, explorationBonus: 1,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud4.webp', 0.15)],
  minimumPotential: 5,
  upgradedFrom: ceruleanSovereign,
};

export const sapphireFirmament: MountItem = {
  kind: 'mount',
  name: 'Sapphire Firmament',
  description: 'A piece of the high heavens brought down to earth. Its speed is terrifying to those who watch from below.',
  icon: fadingazureCloud5, stacks: 1, rarity: 'incandescent', realm: 'pillarCreation',
  speed: 2896, charisma: 555, explorationBonus: 1,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud5.webp', 0.2)],
  minimumPotential: 6,
  upgradedFrom: indigoNimbus,
};

export const aethericZenith: MountItem = {
  kind: 'mount',
  name: 'Aetheric Zenith',
  description: 'The ultimate manifestation of starlight travel. To ride this cloud is to walk upon the boundaries of the universe.',
  icon: fadingazureCloud6, stacks: 1, rarity: 'incandescent', realm: 'lifeFlourishing',
  speed: 5792, charisma: 666, explorationBonus: 2,
  customTransform: CLOUD_TRANSFORM,
  buffs: [makeCloudShroud('fadingCloud5.webp', 0.25)],
  upgradedFrom: sapphireFirmament,
};

// ─── Registration ─────────────────────────────────────────────────────────────
export function initializeStoryItems(): void {

  // ── Fetch Stone Garden Sigil S buff from native game data ────────────────
  // This is the cleanest approach: reference the existing game buff rather than
  // redefining its complex internals (Metal Shard / Fragrant Blossom conversion).
  const gameItems = window.modAPI.gameData.items;
  const stoneGardenItem = gameItems['Stone Garden Sigil S'] as TalismanItem | undefined;
  const sealBuff = stoneGardenItem?.buffs ?? [];

  if (!stoneGardenItem) {
    console.warn("⚠️ Stone Garden Sigil S not found in gameData — Linshu's Seal will have no buff.");
  }

  // ── Fetch Building Fury Talisman+ (I) buff from native game data ─────────
  // The Fractured Azurite Sigil inherits this buff so the player has a working
  // talisman from the moment the bloodline awakens (bodyForging, empowered).
  const buildingFuryItem = gameItems['Building Fury Talisman+ (I)'] as TalismanItem | undefined;
  const buildingFuryBuff = buildingFuryItem?.buffs ?? [];

  if (!buildingFuryItem) {
    console.warn('⚠️ Building Fury Talisman+ (I) not found in gameData — Fractured Azurite Sigil will have no buff.');
  }

  // ── Fractured Azurite Sigil ───────────────────────────────────────────────
  // Defined here (not at module level) so the buff can be fetched at runtime.
  const fracturedAzuriteSigil: TalismanItem = {
    kind: 'talisman',
    name: 'Fractured Azurite Sigil',
    description:
      'An ancient sigil bearing the fractured seal of the Azurite Empire. Though broken, it pulses with ' +
      'cold blue light whenever you hold it. The needle etched into its face points, always, in one direction.',
    icon: I('refinedTalismanIII.webp'),
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    buffs: buildingFuryBuff as any,
  };

  // ── Linshu's Seal chain — Quest 4.2 gives the starting Tier II ───────────
  // Stats mirror the Refined Talisman progression per realm tier.
  // Buff: Stone Garden Sigil S (weapon ↔ blossom qi conversion).
  // Icon: powerTalisman.webp (all tiers, per design spec).

  const linshuWornSeal: TalismanItem = {
    kind: 'talisman',
    name: "Linshu's Worn Seal",
    description:
      'A faded bronze stamp that once belonged to Linshu. ' +
      'Though its surface is scratched, it pulses with a nostalgic warmth when it touches your skin.',
    icon: SEAL_ICON, stacks: 1, rarity: 'incandescent', realm: 'meridianOpening',
    combatStats: { power: 537, defense: 783 },
    buffs: sealBuff as any,
    minimumPotential: 3,
  };

  const linshuResonantSeal: TalismanItem = {
    kind: 'talisman',
    name: "Linshu's Resonant Seal",
    description:
      'The seal has begun to absorb your Qi, clearing away centuries of spatial rust. ' +
      'It hums with a protective melody, sharpening your focus in the heat of battle.',
    icon: SEAL_ICON, stacks: 1, rarity: 'incandescent', realm: 'qiCondensation',
    combatStats: { power: 1150, defense: 1535 },
    buffs: sealBuff as any,
    minimumPotential: 4,
    upgradedFrom: linshuWornSeal,
  };

  const linshuRadiantSeal: TalismanItem = {
    kind: 'talisman',
    name: "Linshu's Radiant Seal",
    description:
      'Fully restored by starlight, this seal glows with an inner fire. ' +
      'It acts as a beacon, drawing spiritual energy from the heavens to empower your every strike.',
    icon: SEAL_ICON, stacks: 1, rarity: 'incandescent', realm: 'coreFormation',
    combatStats: { power: 2082, defense: 2874 },
    buffs: sealBuff as any,
    minimumPotential: 5,
    upgradedFrom: linshuResonantSeal,
  };

  const linshuSovereignSeal: TalismanItem = {
    kind: 'talisman',
    name: "Linshu's Sovereign Seal",
    description:
      'This seal carries the weight of a forgotten empire. ' +
      "By Linshu's command, it imposes your royal will upon the world, forcing the surrounding Qi into total obedience.",
    icon: SEAL_ICON, stacks: 1, rarity: 'incandescent', realm: 'pillarCreation',
    combatStats: { power: 3380, defense: 4042 },
    buffs: sealBuff as any,
    minimumPotential: 6,
    upgradedFrom: linshuRadiantSeal,
  };

  const linshuPerfectedSeal: TalismanItem = {
    kind: 'talisman',
    name: "Linshu's Perfected Seal",
    description:
      'The final form of the seal, representing your deep bond with your Senior Sister. ' +
      "It allows you to draw directly upon the estate's ancient foundations to bolster your presence in the world.",
    icon: SEAL_ICON, stacks: 1, rarity: 'incandescent', realm: 'lifeFlourishing',
    combatStats: { power: 7677, defense: 6909 },
    buffs: sealBuff as any,
    upgradedFrom: linshuSovereignSeal,
  };

  // Quest/story tokens
  window.modAPI.actions.addItem(wornGlassBead);
  window.modAPI.actions.addItem(fracturedAzuriteSigil);
  window.modAPI.actions.addItem(celestialKeystone);
  window.modAPI.actions.addItem(scratchedBronzeRing);

  // Mount chain (all tiers so upgrade UI recognises them)
  window.modAPI.actions.addItem(azureWisp);
  window.modAPI.actions.addItem(cobaltGlide);
  window.modAPI.actions.addItem(ceruleanSovereign);
  window.modAPI.actions.addItem(indigoNimbus);
  window.modAPI.actions.addItem(sapphireFirmament);
  window.modAPI.actions.addItem(aethericZenith);

  // Seal chain (all tiers so upgrade UI recognises them)
  window.modAPI.actions.addItem(linshuWornSeal);
  window.modAPI.actions.addItem(linshuResonantSeal);
  window.modAPI.actions.addItem(linshuRadiantSeal);
  window.modAPI.actions.addItem(linshuSovereignSeal);
  window.modAPI.actions.addItem(linshuPerfectedSeal);

  console.log("✅ Story items: 4 tokens, 6 mounts, 5 seal tiers registered.");
}
