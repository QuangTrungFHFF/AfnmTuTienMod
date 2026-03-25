import { GameLocation, Realm } from 'afnm-types';
import { G } from '../constants';
import observatoryBg   from '../../assets/locations/observatory-estate-bg.webp';
import observatoryIcon from '../../assets/locations/observatory-estate-icon.webp';
import roomIcon from '../../assets/locations/observatory-estate-room-bg.webp';
import { observatoryEstateSeal } from '../items/transportSeals';
import { buildSupplyQuests } from './observatoryEstateSupplyQuests';
import { buildHuntQuests }   from './observatoryEstateHuntQuests';

// ─── Observatory Estate ───────────────────────────────────────────────────────
// The hidden Azurite estate, revealed when the Celestial Keystone is used
// near the Falling Star Observatory. Each major building unlocks through
// Linshu's quest chains rather than being available from the start.
//
// Building unlock flags (set by Linshu's talkInteraction delivery scenes):
//   tuTien_herbUnlocked    — Quest 3.1 complete
//   tuTien_houseUnlocked   — Quest 3.2 complete
//   tuTien_mineUnlocked    — Quest 3.3 complete
//   tuTien_libraryUnlocked — Quest 4.3 complete
//
// Market and Request Board are always available — they represent the
// estate's existing operational infrastructure, not things Linshu is rebuilding.

const observatoryEstate: GameLocation = {
  name: 'Observatory Estate',
  description:
    'A secluded estate revealed from a pocket dimension, nestled between the Falling Star ' +
    'Observatory and the Spirit Herb Garden. The formation arrays here are aligned with ' +
    'the stars, granting unusually clear perception of qi flows. ' +
    'It bears the marks of the Azurite Empire — two thousand years of patient waiting.',
  image: observatoryBg,
  icon: observatoryIcon,
  screenEffect: 'driftingLeaves',
  music: 'Lake',
  ambience: 'Space',
  position: { x: 1567, y: -630 },
  size: 'large',
  reputationName: 'Observatory Estate',
  explorationCountOverride: 999,
  unlocks: [],
  buildings: [

    // ── Player house — unlocked by Quest 3.2 ──────────────────────────────────
    {
      kind: 'house',
      // Gate: only accessible after Linshu repairs the Sky-Roof Array
      unlockCondition: 'tuTien_houseUnlocked == 1',
      condition: 'tuTien_houseUnlocked == 1',
      houseDef: {
        name: 'Observatory Estate',
        description:
          'Your restored ancestral estate between the Falling Star Observatory and the ' +
          'Spirit Herb Garden. The aetheric arrays in the ceiling pulse with violet light. ' +
          'The qi density here is exceptional.',
        background: roomIcon,
        screenEffect: 'driftingLeaves',
        qiDensity: 4000,
        fixedRooms: [],
        freeRooms: '4',
        transportSeal: observatoryEstateSeal,
      },
    },

    // ── Herb field — unlocked by Quest 3.1 ───────────────────────────────────
    {
      kind: 'herbField',
      condition: 'tuTien_herbUnlocked == 1',
      offset: { x: -500, y: 0 },
    },

    // ── Mine — unlocked by Quest 3.3 ─────────────────────────────────────────
    {
      kind: 'mine',
      condition: 'tuTien_mineUnlocked == 1',
      offset: { x: 150, y: 0 },
    },

    // ── Library — unlocked by Quest 4.3 ──────────────────────────────────────
    // The Archive holds lore books about the Azurite Empire and the Lost Ages.
    // Books can be added here later to expand worldbuilding.
    {
      kind: 'library',
      condition: 'tuTien_libraryUnlocked == 1',
      title: 'The Azurite Archive',
      categories: [
        {
          name: 'The Lost Empire',
          condition: '1',
          books: [
            {
              title: 'The Last Sentinel\'s Record',
              author: 'Aetheric Sentinel Unit 01',
              condition: 'tuTien_sentinelDefeated == 1',
              contents:
                'Trial parameters: Royal Azurite Blood confirmed. Purity: 0.001%. ' +
                'Assessment: Bloodline dispersal consistent with civilian survival lineage. ' +
                'Combat proficiency: satisfactory. Archive access: granted. ' +
                'Note for the Archivist: The Star-Eaters have been probing the outer seal ' +
                'for the last eight hundred years. This unit\'s integrity will not hold indefinitely. ' +
                'It is recommended that the new heir fortify the estate\'s outer formations before ' +
                'the next probe cycle.',
            },
          ],
        },
      ],
    },

    // ── Market — always available (pre-existing estate infrastructure) ────────
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

    // ── Request board — always available ─────────────────────────────────────
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
  // CHANGED: The estate is no longer discovered by exploring from Falling Star
  // Observatory — it is revealed narratively by the Veil Lifts triggered event.
  // All links are now ConditionalLinks (condition-gated) rather than ExplorationLinks.

  // From Falling Star Observatory — visible once estate is unlocked
  window.modAPI.actions.linkLocations('Falling Star Observatory', {
    location: observatoryEstate,
    distance: 3,
    condition: 'tuTien_estateUnlocked == 1',
  });

  // Return links — always open once the estate exists
  window.modAPI.actions.linkLocations('Observatory Estate', {
    location: window.modAPI.gameData.locations['Falling Star Observatory'],
    distance: 2,
    condition: '1',
  });
  window.modAPI.actions.linkLocations('Spirit Herb Garden', {
    location: observatoryEstate,
    distance: 3,
    condition: 'tuTien_estateUnlocked == 1',
  });
  window.modAPI.actions.linkLocations('Observatory Estate', {
    location: window.modAPI.gameData.locations['Spirit Herb Garden'],
    distance: 2,
    condition: '1',
  });
  window.modAPI.actions.linkLocations('Xidian Outpost', {
    location: observatoryEstate,
    distance: 5,
    condition: 'tuTien_estateUnlocked == 1',
  });
  window.modAPI.actions.linkLocations('Observatory Estate', {
    location: window.modAPI.gameData.locations['Xidian Outpost'],
    distance: 1,
    condition: '1',
  });
  window.modAPI.actions.linkLocations('Jingdi Rise', {
    location: observatoryEstate,
    distance: 5,
    condition: 'tuTien_estateUnlocked == 1',
  });
  window.modAPI.actions.linkLocations('Observatory Estate', {
    location: window.modAPI.gameData.locations['Jingdi Rise'],
    distance: 3,
    condition: '1',
  });

  // ── Market items ───────────────────────────────────────────────────────────
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

  add('Trueflame Orchid',  7,   'qiCondensation');
  add('Yinying Flare',     500, 'bodyForging');
  add('Guided Flow',       50,  'qiCondensation');
  add('Formation Poison',  50,  'meridianOpening');
  add('Formation Shield',  50,  'qiCondensation');
  add('Formation Blade',   50,  'meridianOpening');
  add('Formation Bell',    50,  'meridianOpening');

  for (const { realm, tier } of TIERS) {
    add(`Recuperation Pill (${tier})`,        7, realm);
    add(`Ironskin Pill S (${tier})`,          7, realm, 1.2);
    add(`Pulsed Healing Pill S (${tier})`,    7, realm, 1.2);
    add(`Qi Pool Pill S (${tier})`,           7, realm, 1.2);
    add(`Regeneration Pill S (${tier})`,      7, realm, 1.2);
    add(`Toxin Cleansing Pill S (${tier})`,   1, realm, 1.5);
  }

  // ── Request board ──────────────────────────────────────────────────────────
  for (const { quest, realm, rarity } of buildSupplyQuests()) {
    window.modAPI.actions.addQuestToRequestBoard(quest, realm, rarity, '1', 'Observatory Estate');
  }
  for (const { quest, realm, rarity } of buildHuntQuests()) {
    window.modAPI.actions.addQuestToRequestBoard(quest, realm, rarity, '1', 'Observatory Estate');
  }

  console.log('✅ Observatory Estate initialized with story-gated buildings.');
}
