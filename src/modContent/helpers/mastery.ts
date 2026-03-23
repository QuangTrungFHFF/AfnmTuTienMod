import {
  Rarity,
  TechniqueMasteryRarityMap,
  UpgradeTechniqueMastery,
  CraftingTechniqueMasteryRarityMap,
  UpgradeCraftingTechniqueMastery,
} from 'afnm-types';

// ─── Combat Technique Mastery Helpers ────────────────────────────────────────

/** Shorthand for a single upgrade mastery entry. */
export function upg(
  upgradeKey: string,
  change: number,
  tooltip: string,
  shouldMultiply = false,
): UpgradeTechniqueMastery {
  return { kind: 'upgrade', upgradeKey, change, tooltip, shouldMultiply };
}

/**
 * Builds a full TechniqueMasteryRarityMap.
 * `rarity` sets the starting tier — earlier tiers are left undefined.
 * Omitted entries are undefined (no bonus at that tier).
 */
export function masteryMap(
  rarity: Rarity,
  entries: Partial<Record<Rarity, UpgradeTechniqueMastery>>,
): TechniqueMasteryRarityMap {
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

/**
 * Standard multiplicative power upgrade across all six tiers (5% → 30%).
 * Starts at `empowered` by default.
 */
export function powerMastery(
  upgradeKey = 'power',
  label = 'power',
): TechniqueMasteryRarityMap {
  return masteryMap('empowered', {
    mundane:      upg(upgradeKey, 0.05, `Increase ${label} by <num>5%</num>.`,  true),
    qitouched:    upg(upgradeKey, 0.1,  `Increase ${label} by <num>10%</num>.`, true),
    empowered:    upg(upgradeKey, 0.15, `Increase ${label} by <num>15%</num>.`, true),
    resplendent:  upg(upgradeKey, 0.2,  `Increase ${label} by <num>20%</num>.`, true),
    incandescent: upg(upgradeKey, 0.25, `Increase ${label} by <num>25%</num>.`, true),
    transcendent: upg(upgradeKey, 0.3,  `Increase ${label} by <num>30%</num>.`, true),
  });
}

// ─── Crafting Technique Mastery Helpers ───────────────────────────────────────

/** Shorthand for a single crafting upgrade mastery entry. */
export function cupg(
  upgradeKey: string,
  change: number,
  tooltip: string,
  shouldMultiply = false,
): UpgradeCraftingTechniqueMastery {
  return { kind: 'upgrade', upgradeKey, change, tooltip, shouldMultiply };
}

/**
 * Builds a full CraftingTechniqueMasteryRarityMap.
 * `rarity` sets the starting tier — omitted entries are undefined.
 */
export function craftingMasteryMap(
  rarity: Rarity,
  entries: Partial<Record<Rarity, UpgradeCraftingTechniqueMastery>>,
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

/**
 * Standard multiplicative power upgrade for crafting effects across all six
 * tiers (5% → 30%). Starts at `empowered` by default.
 */
export function craftingPowerMastery(
  upgradeKey: string,
  label: string,
): CraftingTechniqueMasteryRarityMap {
  return craftingMasteryMap('empowered', {
    mundane:      cupg(upgradeKey, 0.05, `Increase ${label} by <num>5%</num>.`,  true),
    qitouched:    cupg(upgradeKey, 0.1,  `Increase ${label} by <num>10%</num>.`, true),
    empowered:    cupg(upgradeKey, 0.15, `Increase ${label} by <num>15%</num>.`, true),
    resplendent:  cupg(upgradeKey, 0.2,  `Increase ${label} by <num>20%</num>.`, true),
    incandescent: cupg(upgradeKey, 0.25, `Increase ${label} by <num>25%</num>.`, true),
    transcendent: cupg(upgradeKey, 0.3,  `Increase ${label} by <num>30%</num>.`, true),
  });
}
