import { GameLocation, Realm } from 'afnm-types';
import { G } from '../constants';
import observatoryBg   from '../../assets/locations/observatory-estate-bg.webp';
import observatoryIcon from '../../assets/locations/observatory-estate-icon.webp';
import { observatoryEstateSeal } from '../items/transportSeals';
import { buildSupplyQuests } from './observatoryEstateSupplyQuests';
import { buildHuntQuests }   from './observatoryEstateHuntQuests';

// ─── Observatory Estate ───────────────────────────────────────────────────────
// Midway between Falling Star Observatory (2560, -787) and Spirit Herb Garden (574, -345).

const observatoryEstate: GameLocation = {
  name: 'Observatory Estate',
  description:
    'A secluded estate nestled between the Falling Star Observatory and the Spirit Herb Garden. ' +
    'The formation arrays here are aligned with the stars, ' +
    'granting unusually clear perception of qi flows.',
  image: observatoryBg,
  icon: observatoryIcon,
  screenEffect: 'driftingLeaves',
  music: 'Lake',
  ambience: 'Space',
  position: { x: 1567, y: -566 },
  size: 'large',
  reputationName: 'Observatory Estate',
  // Prevents the "explored N/3" discovery UI slot from rendering in the map circle.
  // Our location has no ExplorationLinks (all links are ConditionalLinks), so without
  // this override the game renders "empty" once mapExploration reaches exploresPerUnlock (3).
  explorationCountOverride: 999,
  unlocks: [],
  buildings: [
    // ── Player house ──────────────────────────────────────────────────────────
    {
      kind: 'house',
      unlockCondition: '1',
      houseDef: {
        name: 'Observatory Estate',
        description:
          'Your personal estate between the Falling Star Observatory and the Spirit Herb Garden. ' +
          'The formation arrays here are aligned with the stars, ' +
          'granting unusually clear perception of qi flows.',
        background: `${G}jiaoRestStop2.webp`,
        screenEffect: 'driftingLeaves',
        qiDensity: 4000,
        fixedRooms: [],
        freeRooms: '4',
        transportSeal: observatoryEstateSeal,
      },
    },

    // ── Personal herb field ───────────────────────────────────────────────────
    { kind: 'herbField' },

    // ── Market — items added via addItemToShop in initializeObservatoryEstate ──
    {
      kind: 'market',
      costMultiplier: 1.5,
      refreshMonths: 1,
      itemPool: {
        mundane: [], bodyForging: [], meridianOpening: [],
        qiCondensation: [], coreFormation: [], pillarCreation: [],
        lifeFlourishing: [], worldShaping: [], innerGenesis: [], soulAscension: [],
      },
    },

    // ── Request board — quests added in initializeObservatoryEstate ───────────
    {
      kind: 'requestBoard',
      requests: {
        mundane: [], bodyForging: [], meridianOpening: [],
        qiCondensation: [], coreFormation: [], pillarCreation: [],
        lifeFlourishing: [], worldShaping: [], innerGenesis: [], soulAscension: [],
      },
    },
  ],
};

// ─── Realm / tier mapping ─────────────────────────────────────────────────────
const TIERS: { realm: Realm; tier: string }[] = [
  { realm: 'bodyForging',     tier: 'I'    },
  { realm: 'meridianOpening', tier: 'II'   },
  { realm: 'qiCondensation',  tier: 'III'  },
  { realm: 'coreFormation',   tier: 'IV'   },
  { realm: 'pillarCreation',  tier: 'V'    },
  { realm: 'lifeFlourishing', tier: 'VI'   },
  { realm: 'worldShaping',    tier: 'VII'  },
  { realm: 'innerGenesis',    tier: 'VIII' },
  { realm: 'soulAscension',   tier: 'IX'   },
];

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeObservatoryEstate(): void {
  window.modAPI.actions.addLocation(observatoryEstate);

  // ── Location links ─────────────────────────────────────────────────────────
  window.modAPI.actions.linkLocations('Falling Star Observatory', {
    location: observatoryEstate,
    exploration: 1,
    distance: 3,
    event: [
      { kind: 'text', text: 'Exploring the area between the observatory and the herb garden, you discover a secluded estate hidden among the hills...' },
      { kind: 'unlockLocation', location: 'Observatory Estate' },
    ],
  });
  window.modAPI.actions.linkLocations('Observatory Estate', { location: window.modAPI.gameData.locations['Falling Star Observatory'], distance: 2, condition: '1' });
  window.modAPI.actions.linkLocations('Spirit Herb Garden',  { location: observatoryEstate, distance: 3, condition: '1' });
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Spirit Herb Garden'],     distance: 2, condition: '1' });
  window.modAPI.actions.linkLocations('Xidian Outpost',      { location: observatoryEstate, distance: 5, condition: '1' });
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Xidian Outpost'],        distance: 1, condition: '1' });
  window.modAPI.actions.linkLocations('Jingdi Rise',         { location: observatoryEstate, distance: 5, condition: '1' });
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Jingdi Rise'],           distance: 3, condition: '1' });

  // ── Market items ───────────────────────────────────────────────────────────
  // Tiers corrected to match actual item realm values.
  const add = (name: string, stacks: number, realm: Realm, valueModifier = 1.0): void => {
    const item = window.modAPI.gameData.items[name];
    if (!item) { console.warn(`⚠️ Observatory market: item not found — "${name}"`); return; }
    window.modAPI.actions.addItemToShop(item, stacks, 'Observatory Estate', realm, valueModifier);
  };

  add('Transport Seal (Nine Mountain Sect)',  5, 'qiCondensation');
  add('Transport Seal (Liang Tiao Village)',  5, 'qiCondensation');
  add('Transport Seal (Shen Henda City)',     5, 'qiCondensation');
  add('Transport Seal (Herb Garden Estate)', 5, 'qiCondensation');
  add('Transport Seal (Observatory Estate)', 5, 'qiCondensation');

  add('Trueflame Orchid',  7,   'qiCondensation');  // actual realm: qiCondensation
  add('Yinying Flare',     500, 'bodyForging');
  add('Guided Flow',       50,  'qiCondensation');
  add('Formation Poison',  50,  'meridianOpening'); // actual realm: meridianOpening
  add('Formation Shield',  50,  'qiCondensation');
  add('Formation Blade',   50,  'meridianOpening'); // actual realm: meridianOpening
  add('Formation Bell',    50,  'meridianOpening'); // actual realm: meridianOpening

  for (const { realm, tier } of TIERS) {
    add(`Recuperation Pill (${tier})`,         7, realm);
    add(`Ironskin Pill S (${tier})`,           7, realm, 1.2);
    add(`Pulsed Healing Pill S (${tier})`,     7, realm, 1.2);
    add(`Qi Pool Pill S (${tier})`,            7, realm, 1.2);
    add(`Regeneration Pill S (${tier})`,       7, realm, 1.2);
    add(`Toxin Cleansing Pill S (${tier})`,    1, realm, 1.5);
  }

  // ── Request board ──────────────────────────────────────────────────────────
  // Supply quests: 10 per tier (I–V), empowered/resplendent pills as collect items.
  for (const { quest, realm, rarity } of buildSupplyQuests()) {
    window.modAPI.actions.addQuestToRequestBoard(quest, realm, rarity, '1', 'Observatory Estate');
  }

  // Hunt quests: 10 per tier (II–V), using live monster templates from gameData.
  for (const { quest, realm, rarity } of buildHuntQuests()) {
    window.modAPI.actions.addQuestToRequestBoard(quest, realm, rarity, '1', 'Observatory Estate');
  }

  console.log('✅ Observatory Estate initialized: 50 supply quests + 40 hunt quests registered.');
}
