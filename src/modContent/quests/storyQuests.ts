import { Quest } from 'afnm-types';

// ─── Chain 3: Linshu's First Requests ────────────────────────────────────────
// Tier II quests that unlock the estate's core buildings.
// These quests appear in the player's side quest log.
// All delivery happens through Linshu's talkInteraction — quests just track
// the collect objective and are completed when the delivery flag is set.

export const q3_1_recovery: Quest = {
  name: 'tuTien_q3_1_recovery',
  displayName: 'A Place to Breathe',
  description:
    'Linshu needs medicinal support to anchor her spirit-form. ' +
    'She has asked for ten Regeneration Pill S (II).',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Gather Regeneration Pill S (II) for Linshu ({held}/10)',
      item: 'Regeneration Pill S (II)',
      amount: 10,
      // Bypass: quest completes when Linshu's delivery flag is set
      completionCondition: 'tuTien_q3_1_given == 2',
    },
  ],
  rewards: [
    { kind: 'item', item: { name: 'Regeneration Pill S (II)' }, amount: 0 }, // No explicit reward — herb field unlock is the reward
  ],
};

export const q3_2_skyRoof: Quest = {
  name: 'tuTien_q3_2_skyRoof',
  displayName: 'The Sky-Roof Array',
  description:
    'The estate\'s aetheric ceiling array is cracked. ' +
    'Linshu needs three Living Meteor shards from the Xing Kuilei near the Falling Star Observatory.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Gather Living Meteor shards from Xing Kuilei ({held}/3)',
      item: 'Living Meteor',
      amount: 3,
      completionCondition: 'tuTien_q3_2_given == 2',
    },
  ],
  rewards: [],
};

export const q3_3_tuneEarth: Quest = {
  name: 'tuTien_q3_3_tuneEarth',
  displayName: 'Tuning the Earth',
  description:
    'The estate\'s deep veins of ore have been silent since the Empire fell. ' +
    'Linshu needs ten Resonating Silver to wake the mine.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Gather Resonating Silver ({held}/10)',
      item: 'Resonating Silver',
      amount: 10,
      completionCondition: 'tuTien_q3_3_given == 2',
    },
  ],
  rewards: [],
};

export const q3_4_tempering: Quest = {
  name: 'tuTien_q3_4_tempering',
  displayName: 'The Sovereign\'s Tempering',
  description:
    'The final step in balancing your Azurite bloodline with your Blossom-attuned soul. ' +
    'Linshu needs one Burning Blood to complete the tempering.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Obtain one Burning Blood (empowered material, meridianOpening)',
      item: 'Burning Blood',
      amount: 1,
      completionCondition: 'tuTien_q3_4_given == 2',
    },
  ],
  rewards: [
    // Preview only — actual unlock happens in talkInteraction
    { kind: 'item', item: { name: 'Twin Sovereigns' }, amount: 1 },
  ],
};

// ─── Chain 4: The Heavenly Restoration ───────────────────────────────────────
// Tier III quests. Linshu grows more solid and the estate gains its final buildings.

export const q4_1_soulWeight: Quest = {
  name: 'tuTien_q4_1_soulWeight',
  displayName: 'Weight of the Soul',
  description:
    'Linshu needs concentrated qi to solidify her form and enhance your cloud mount. ' +
    'Bring her five Condensed Qi Elixir (III).',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Gather Condensed Qi Elixir (III) for Linshu ({held}/5)',
      item: 'Condensed Qi Elixir (III)',
      amount: 5,
      completionCondition: 'tuTien_q4_1_given == 2',
    },
  ],
  rewards: [
    { kind: 'item', item: { name: 'Azure Wisp' }, amount: 1 },
  ],
};

export const q4_2_mirrorLake: Quest = {
  name: 'tuTien_q4_2_mirrorLake',
  displayName: 'The Mirror-Lake Metamorphosis',
  description:
    'Linshu wants to become truly solid. The Jade Visage Pill from the Heavenly Mirror Lake ' +
    'can make her spirit-body permanent. Bring her one.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Obtain one Jade Visage Pill (incandescent pill, qiCondensation)',
      item: 'Jade Visage Pill',
      amount: 1,
      completionCondition: 'tuTien_q4_2_given == 2',
    },
  ],
  rewards: [
    { kind: 'item', item: { name: "Linshu's Worn Seal" }, amount: 1 },
  ],
};

export const q4_3_archive: Quest = {
  name: 'tuTien_q4_3_archive',
  displayName: 'The Echo of Knowledge',
  description:
    'The estate\'s Archive needs to be rebuilt. ' +
    'Five Shimmering Copperite will allow Linshu to draw the lost records from the aether.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Gather Shimmering Copperite ({held}/5)',
      item: 'Shimmering Copperite',
      amount: 5,
      completionCondition: 'tuTien_q4_3_given == 2',
    },
  ],
  rewards: [],
};

// ─── Chain 5: The Alchemist's Echo ───────────────────────────────────────────
// Tier III+ quests (requires craftSkill >= 300). Rescues Danxi from Jingdi Roost.

export const q5_1_roost: Quest = {
  name: 'tuTien_q5_1_roost',
  displayName: 'The Alchemist\'s Echo',
  description:
    'Linshu has remembered her old friend Danxi — the Empire\'s Chief Alchemist, ' +
    'trapped in a spatial ring that was swallowed by a Jingdi King-Bird. ' +
    'Find the ring at the Jingdi Roost.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Find the Scratched Bronze Ring at Jingdi Roost',
      item: 'Scratched Bronze Ring',
      amount: 1,
      completionCondition: 'tuTien_q5_1_given == 2',
    },
  ],
  rewards: [],
};

export const q5_2_danxi: Quest = {
  name: 'tuTien_q5_2_danxi',
  displayName: 'Releasing the Morning Pill',
  description:
    'The spatial seal on Danxi\'s ring is ancient and rusted. ' +
    'Only a Storm Orb has enough discharge to break it safely. ' +
    'Bring one to Linshu at the Observatory Estate.',
  category: 'side',
  steps: [
    {
      kind: 'collect',
      hint: 'Obtain one Storm Orb (resplendent material, qiCondensation)',
      item: 'Storm Orb',
      amount: 1,
      completionCondition: 'tuTien_q5_2_given == 2',
    },
  ],
  rewards: [],
};

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeStoryQuests(): void {
  // Chain 3
  window.modAPI.actions.addQuest(q3_1_recovery);
  window.modAPI.actions.addQuest(q3_2_skyRoof);
  window.modAPI.actions.addQuest(q3_3_tuneEarth);
  window.modAPI.actions.addQuest(q3_4_tempering);
  // Chain 4
  window.modAPI.actions.addQuest(q4_1_soulWeight);
  window.modAPI.actions.addQuest(q4_2_mirrorLake);
  window.modAPI.actions.addQuest(q4_3_archive);
  // Chain 5
  window.modAPI.actions.addQuest(q5_1_roost);
  window.modAPI.actions.addQuest(q5_2_danxi);
  console.log('✅ Story quests registered: 9 quests across chains 3–5.');
}
