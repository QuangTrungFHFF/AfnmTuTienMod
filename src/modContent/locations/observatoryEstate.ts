import { GameLocation, Realm, Rarity, Quest } from 'afnm-types';
import { G } from '../constants';
import observatoryBg   from '../../assets/locations/observatory-estate-bg.webp';
import observatoryIcon from '../../assets/locations/observatory-estate-icon.webp';
import { observatoryEstateSeal } from '../items/transportSeals';

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

    // ── Request board — quests added via addQuestToRequestBoard below ─────────
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

// ─── Request board quests ─────────────────────────────────────────────────────
// Each quest has TWO steps:
//   1. collect  — player gathers the items
//   2. speakToCharacter — player returns to Estate Caretaker who removes items
//                         and gives reputation + spirit stone reward
const NPC = 'Estate Caretaker';

const requestBoardQuests: { quest: Quest; realm: Realm; rarity: Rarity }[] = [
  {
    realm: 'bodyForging',
    rarity: 'mundane',
    quest: {
      name: 'observatoryEstate_supply_I',
      displayName: 'Estate Supply: Formation Poison',
      description: 'The Observatory Estate requires Formation Poison for its defensive arrays. Gather some and deliver to the Estate Caretaker.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 5 Formation Poison ({held}/5)',
          item: 'Formation Poison',
          amount: 5,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Formation Poison to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"Formation Poison — exactly what we needed. Well done, {forename}."' },
            { kind: 'removeItem', item: { name: 'Formation Poison' }, amount: '5' },
            { kind: 'reputation', amount: '1', name: 'Observatory Estate' },
            { kind: 'money', amount: '10000' },
            { kind: 'text', text: 'The Estate Caretaker nods approvingly and records the delivery.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 1, name: 'Observatory Estate' },
        { kind: 'money', amount: 10000 },
      ],
    },
  },
  {
    realm: 'meridianOpening',
    rarity: 'mundane',
    quest: {
      name: 'observatoryEstate_supply_II',
      displayName: 'Estate Supply: Formation Shield',
      description: 'Reinforce the estate defences. Gather Formation Shield and return to the Estate Caretaker.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 5 Formation Shield ({held}/5)',
          item: 'Formation Shield',
          amount: 5,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Formation Shield to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"These shields will reinforce our outer perimeter. Good work."' },
            { kind: 'removeItem', item: { name: 'Formation Shield' }, amount: '5' },
            { kind: 'reputation', amount: '1', name: 'Observatory Estate' },
            { kind: 'money', amount: '15000' },
            { kind: 'text', text: 'The Estate Caretaker accepts the delivery and marks it in his records.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 1, name: 'Observatory Estate' },
        { kind: 'money', amount: 15000 },
      ],
    },
  },
  {
    realm: 'qiCondensation',
    rarity: 'qitouched',
    quest: {
      name: 'observatoryEstate_supply_III',
      displayName: 'Estate Supply: Formation Blade',
      description: 'The estate\'s offensive arrays need Formation Blade. Gather some and report back.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 5 Formation Blade ({held}/5)',
          item: 'Formation Blade',
          amount: 5,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Formation Blade to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"Formation Blade — the arrays will be considerably more dangerous now. You have our thanks."' },
            { kind: 'removeItem', item: { name: 'Formation Blade' }, amount: '5' },
            { kind: 'reputation', amount: '1', name: 'Observatory Estate' },
            { kind: 'money', amount: '20000' },
            { kind: 'text', text: 'The caretaker stores the blades carefully in the formation vault.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 1, name: 'Observatory Estate' },
        { kind: 'money', amount: 20000 },
      ],
    },
  },
  {
    realm: 'coreFormation',
    rarity: 'empowered',
    quest: {
      name: 'observatoryEstate_supply_IV',
      displayName: 'Estate Supply: Formation Bell',
      description: 'The estate\'s alarm formation requires Formation Bell. Gather them and return.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 5 Formation Bell ({held}/5)',
          item: 'Formation Bell',
          amount: 5,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Formation Bell to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"With these bells installed, nothing approaches the estate undetected. Excellent work, {forename}."' },
            { kind: 'removeItem', item: { name: 'Formation Bell' }, amount: '5' },
            { kind: 'reputation', amount: '1', name: 'Observatory Estate' },
            { kind: 'money', amount: '20000' },
            { kind: 'text', text: 'The caretaker personally oversees installation of the bells.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 1, name: 'Observatory Estate' },
        { kind: 'money', amount: 20000 },
      ],
    },
  },
  {
    realm: 'pillarCreation',
    rarity: 'resplendent',
    quest: {
      name: 'observatoryEstate_supply_V',
      displayName: 'Estate Supply: Trueflame Orchid',
      description: 'Rare Trueflame Orchid is needed for the estate\'s cultivation chambers. Gather some.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 3 Trueflame Orchid ({held}/3)',
          item: 'Trueflame Orchid',
          amount: 3,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Trueflame Orchid to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"Trueflame Orchid — do you know how rare these are? The cultivation chambers will flourish. I am in your debt, {forename}."' },
            { kind: 'removeItem', item: { name: 'Trueflame Orchid' }, amount: '3' },
            { kind: 'reputation', amount: '75', name: 'Observatory Estate' },
            { kind: 'money', amount: '5000' },
            { kind: 'text', text: 'The caretaker handles each orchid with remarkable care.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 75, name: 'Observatory Estate' },
        { kind: 'money', amount: 5000 },
      ],
    },
  },
  {
    realm: 'lifeFlourishing',
    rarity: 'incandescent',
    quest: {
      name: 'observatoryEstate_supply_VI',
      displayName: 'Estate Supply: Yinying Flares',
      description: 'Stock the estate with Yinying Flares for extended exploration operations.',
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: 'Collect 50 Yinying Flare ({held}/50)',
          item: 'Yinying Flare',
          amount: 50,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver Yinying Flares to the Estate Caretaker at Observatory Estate.',
          character: NPC,
          event: [
            { kind: 'speech', character: NPC, text: '"Fifty flares. Our expeditions can now venture far deeper. This will change things considerably, {forename}."' },
            { kind: 'removeItem', item: { name: 'Yinying Flare' }, amount: '50' },
            { kind: 'reputation', amount: '100', name: 'Observatory Estate' },
            { kind: 'money', amount: '8000' },
            { kind: 'text', text: 'The caretaker distributes the flares to the expedition stores.' },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 100, name: 'Observatory Estate' },
        { kind: 'money', amount: 8000 },
      ],
    },
  },
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
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Spirit Herb Garden'],        distance: 2, condition: '1' });
  window.modAPI.actions.linkLocations('Xidian Outpost',     { location: observatoryEstate, distance: 5, condition: '1' });
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Xidian Outpost'],           distance: 1, condition: '1' });
  window.modAPI.actions.linkLocations('Jingdi Rise',         { location: observatoryEstate, distance: 5, condition: '1' });
  window.modAPI.actions.linkLocations('Observatory Estate',  { location: window.modAPI.gameData.locations['Jingdi Rise'],              distance: 3, condition: '1' });

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

  add('Trueflame Orchid',  7,   'bodyForging');
  add('Yinying Flare',     500, 'bodyForging');
  add('Guided Flow',       50,  'qiCondensation');
  add('Formation Poison',  50,  'qiCondensation');
  add('Formation Shield',  50,  'qiCondensation');
  add('Formation Blade',   50,  'qiCondensation');
  add('Formation Bell',    50,  'qiCondensation');

  for (const { realm, tier } of TIERS) {
    add(`Recuperation Pill (${tier})`,         7, realm);
    add(`Ironskin Pill S (${tier})`,           7, realm, 1.2);
    add(`Pulsed Healing Pill S (${tier})`,     7, realm, 1.2);
    add(`Qi Pool Pill S (${tier})`,            7, realm, 1.2);
    add(`Regeneration Pill S (${tier})`,       7, realm, 1.2);
    add(`Toxin Cleansing Pill S (${tier})`,    1, realm, 1.5);
  }

  // ── Request board ──────────────────────────────────────────────────────────
  for (const { quest, realm, rarity } of requestBoardQuests) {
    window.modAPI.actions.addQuestToRequestBoard(quest, realm, rarity, '1', 'Observatory Estate');
  }

  console.log('✅ Observatory Estate location registered and linked.');
}
