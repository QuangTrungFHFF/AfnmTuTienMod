import { Quest, Realm, Rarity } from 'afnm-types';

// ─── Azureline Sanctuary — Supply Quests ───────────────────────────────────────
// 10 quests per tier (I–V), each asking for empowered/resplendent combat pills
// not sold in the estate market. Random board draws 3 at a time, cycling variety.
//
// Design rules:
//   • 1 rep per quest, max: 'exalted'
//   • Items are empowered/resplendent Boost Pill+ or Enhancement pills
//   • Money scales with tier

const NPC = 'Estate Caretaker';

type SupplyEntry = { pill: string; amount: number; money: number };

// 10 pill requests per realm — all empowered/resplendent, not in market
const SUPPLY_POOLS: Record<string, SupplyEntry[]> = {
  bodyForging: [
    { pill: 'Fist Boost Pill+ (I)',         amount: 5, money: 1200 },
    { pill: 'Blossom Boost Pill+ (I)',       amount: 5, money: 1200 },
    { pill: 'Weapon Boost Pill+ (I)',        amount: 5, money: 1200 },
    { pill: 'Cloud Boost Pill+ (I)',         amount: 5, money: 1300 },
    { pill: 'Blood Boost Pill+ (I)',         amount: 5, money: 1300 },
    { pill: 'Celestial Boost Pill+ (I)',     amount: 5, money: 1300 },
    { pill: 'Refined Control Pill+ (I)',     amount: 4, money: 1400 },
    { pill: 'Refined Intensity Pill+ (I)',   amount: 4, money: 1400 },
    { pill: 'Insight Pill+ (I)',             amount: 4, money: 1600 },
    { pill: 'Barrier Enhancement Pill+ (I)', amount: 3, money: 1800 },
  ],
  meridianOpening: [
    { pill: 'Fist Boost Pill+ (II)',         amount: 5, money: 4000 },
    { pill: 'Blossom Boost Pill+ (II)',      amount: 5, money: 4000 },
    { pill: 'Weapon Boost Pill+ (II)',       amount: 5, money: 4200 },
    { pill: 'Cloud Boost Pill+ (II)',        amount: 5, money: 4200 },
    { pill: 'Blood Boost Pill+ (II)',        amount: 5, money: 4500 },
    { pill: 'Celestial Boost Pill+ (II)',    amount: 5, money: 4500 },
    { pill: 'Refined Control Pill+ (II)',    amount: 4, money: 5000 },
    { pill: 'Refined Intensity Pill+ (II)',  amount: 4, money: 5000 },
    { pill: 'Insight Pill+ (II)',            amount: 4, money: 6000 },
    { pill: 'Barrier Enhancement Pill+ (II)',amount: 3, money: 7000 },
  ],
  qiCondensation: [
    { pill: 'Fist Boost Pill+ (III)',         amount: 5, money: 12000 },
    { pill: 'Blossom Boost Pill+ (III)',      amount: 5, money: 12000 },
    { pill: 'Weapon Boost Pill+ (III)',       amount: 5, money: 12500 },
    { pill: 'Cloud Boost Pill+ (III)',        amount: 5, money: 12500 },
    { pill: 'Blood Boost Pill+ (III)',        amount: 5, money: 13000 },
    { pill: 'Celestial Boost Pill+ (III)',    amount: 5, money: 13000 },
    { pill: 'Refined Control Pill+ (III)',    amount: 4, money: 15000 },
    { pill: 'Refined Intensity Pill+ (III)',  amount: 4, money: 15000 },
    { pill: 'Insight Pill+ (III)',            amount: 4, money: 17000 },
    { pill: 'Barrier Enhancement Pill+ (III)',amount: 3, money: 20000 },
  ],
  coreFormation: [
    { pill: 'Fist Boost Pill+ (IV)',          amount: 5, money: 20000 },
    { pill: 'Blossom Boost Pill+ (IV)',       amount: 5, money: 20000 },
    { pill: 'Weapon Boost Pill+ (IV)',        amount: 5, money: 21000 },
    { pill: 'Cloud Boost Pill+ (IV)',         amount: 5, money: 21000 },
    { pill: 'Blood Boost Pill+ (IV)',         amount: 5, money: 22000 },
    { pill: 'Celestial Boost Pill+ (IV)',     amount: 5, money: 22000 },
    { pill: 'Refined Control Pill+ (IV)',     amount: 4, money: 23000 },
    { pill: 'Refined Intensity Pill+ (IV)',   amount: 4, money: 23000 },
    { pill: 'Calming Mind Pill+',            amount: 3, money: 26000 },
    { pill: 'Barrier Enhancement Pill+ (IV)', amount: 3, money: 28000 },
  ],
  pillarCreation: [
    { pill: 'Fist Boost Pill+ (V)',          amount: 5, money: 33000 },
    { pill: 'Blossom Boost Pill+ (V)',       amount: 5, money: 33000 },
    { pill: 'Weapon Boost Pill+ (V)',        amount: 5, money: 34000 },
    { pill: 'Cloud Boost Pill+ (V)',         amount: 5, money: 34000 },
    { pill: 'Blood Boost Pill+ (V)',         amount: 5, money: 36000 },
    { pill: 'Celestial Boost Pill+ (V)',     amount: 5, money: 36000 },
    { pill: 'Refined Control Pill+ (V)',     amount: 4, money: 38000 },
    { pill: 'Refined Intensity Pill+ (V)',   amount: 4, money: 38000 },
    { pill: 'Insight Pill+ (V)',             amount: 4, money: 43000 },
    { pill: 'Barrier Enhancement Pill+ (V)', amount: 3, money: 48000 },
  ],
};

const REALM_RARITY: Record<string, Rarity> = {
  bodyForging:    'mundane',
  meridianOpening:'mundane',
  qiCondensation: 'qitouched',
  coreFormation:  'empowered',
  pillarCreation: 'resplendent',
};

function makeSupplyQuest(
  realm: Realm,
  idx: number,
  entry: SupplyEntry,
): { quest: Quest; realm: Realm; rarity: Rarity } {
  const rarity = REALM_RARITY[realm] as Rarity;
  return {
    realm,
    rarity,
    quest: {
      name: `azurelineSanctuary_supply_${realm}_${idx}`,
      displayName: `Estate Supply: ${entry.pill}`,
      description: `The Azureline Sanctuary requires ${entry.pill} for its cultivation operations. Gather some and deliver to the Estate Caretaker.`,
      category: 'requestBoard',
      steps: [
        {
          kind: 'collect',
          hint: `Collect ${entry.amount} ${entry.pill} ({held}/${entry.amount})`,
          item: entry.pill,
          amount: entry.amount,
        },
        {
          kind: 'speakToCharacter',
          hint: 'Deliver the pills to the Estate Caretaker at Azureline Sanctuary.',
          character: NPC,
          event: [
            {
              kind: 'speech',
              character: NPC,
              text: `"${entry.pill} — exactly what we needed. The estate thanks you, {forename}."`,
            },
            { kind: 'removeItem', item: { name: entry.pill }, amount: String(entry.amount) },
            { kind: 'reputation', amount: '1', name: 'Azureline Sanctuary', max: 'exalted' } as any,
            { kind: 'money', amount: String(entry.money) },
          ],
        },
      ],
      rewards: [
        { kind: 'reputation', amount: 1, name: 'Azureline Sanctuary' },
        { kind: 'money', amount: entry.money },
      ],
    },
  };
}

export function buildSupplyQuests(): { quest: Quest; realm: Realm; rarity: Rarity }[] {
  const realms: Realm[] = [
    'bodyForging', 'meridianOpening', 'qiCondensation', 'coreFormation', 'pillarCreation',
  ];
  const result: { quest: Quest; realm: Realm; rarity: Rarity }[] = [];
  for (const realm of realms) {
    SUPPLY_POOLS[realm].forEach((entry, i) => {
      result.push(makeSupplyQuest(realm, i + 1, entry));
    });
  }
  return result;
}
