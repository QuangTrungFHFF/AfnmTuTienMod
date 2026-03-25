import { Character } from 'afnm-types';
import { G } from '../constants';
import caretakerPortrait from '../../assets/characters/xiaomiao_p.webp';
import caretakerImage from '../../assets/characters/xiaomiao_full.webp';

// ─── Linshu — The Estate Spirit ───────────────────────────────────────────────
// The spirit of the Observatory Estate, bound to the pocket dimension for two
// thousand years. She is the player's "Senior Sister" — warm, teasing, protective,
// with flashes of ancient authority when the situation demands it.
//
// She acts as the estate's primary NPC and caretaker.
// Her talkInteraction gates through all quest chain stages using flags.
//
// Visibility: Only after the estate is unlocked (tuTien_estateUnlocked == 1)
// Location:   Observatory Estate (static)
//
// Flag reference:
//   tuTien_estateUnlocked    — estate revealed via Keystone event
//   tuTien_q3_1_given        — Chain 3.1 quest added to log
//   tuTien_q3_2_given        — Chain 3.2 quest added
//   tuTien_q3_3_given        — Chain 3.3 quest added
//   tuTien_q3_4_given        — Chain 3.4 quest added (chain 3 done when this completes)
//   tuTien_chain3Complete    — all of chain 3 finished
//   tuTien_q4_1_given        — Chain 4 started
//   tuTien_chain4Complete    — all of chain 4 finished
//   tuTien_q5_1_given        — Chain 5 started
//   tuTien_chain5Complete    — all of chain 5 finished (Danxi unlocked)
//
// Note: pill item name is 'Regeneration Pill S (II)' — flag conversion:
//   window.modAPI.utils.flag('Regeneration Pill S (II)') = 'Regeneration_Pill_S__II_'

const CHAR = 'Linshu';

export const linshu: Character = {
  name: CHAR,
  displayName: 'Linshu',
  allegiance: undefined,
  bio:
    'The spirit of the Observatory Estate, a consciousness bound to this place ' +
    'since the fall of the Azurite Empire. She calls herself your Senior Sister. ' +
    'She has been waiting two thousand years for a Young Master or Mistress to return.',
  condition: 'tuTien_estateUnlocked == 1',
  // DONE: Replace portrait and image with proper Linshu artwork.
  // She should appear semi-transparent/spectral in early chain 3,
  // and fully solid after chain 4.2. Two portrait variants would be ideal.
  // Suggested placeholder: use any female cultivator image from game assets.
  portrait: caretakerPortrait,
  image:    caretakerImage,
  definitions: [
    {
      kind: 'neutral',
      condition: '1',
      realm: 'pillarCreation',     
      realmProgress: 'Late',
      stats: [],                   
      locations: [
        {
          kind: 'static',
          condition: 'tuTien_estateUnlocked == 1',
          location: 'Observatory Estate',
        },
      ],
      encounters: [],
      talkInteraction: [

        // ── DEFAULT: Idle / fallback — MUST be first so specific stages below override it.
        // The game picks the LAST matching condition, not the first.
        // condition:'1' always matches, so it must sit at the top as the baseline.
        // Any stage condition that is also true will appear later in the array and win.
        {
          condition: '1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The estate is in good shape today, Little {Brother/Sister}. ' +
                'Is there something you needed?"',
            },
          ],
        },

        // ── STAGE 0: Estate just unlocked, Chain 3 not yet started ────────────
        {
          condition: 'tuTien_estateUnlocked == 1 && tuTien_q3_1_given == 0',
          notifyCondition: 'tuTien_estateUnlocked == 1 && tuTien_q3_1_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Silly Little {Brother/Sister}... don\'t look so scared. ' +
                'I\'m just a little... out of breath. ' +
                'It turns out holding an entire estate in a fold of space ' +
                'for a few centuries is quite tiring for a Spirit. ' +
                'I need to anchor my form before I vanish. ' +
                'Bring me some regeneration pills — Tier II. ' +
                'They carry enough refined life-force to act as a temporary anchor. ' +
                'Please... I\'ve waited so long to see you again. Don\'t let me disappear now."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: 'I will get you those pills.',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Five of them. Tier II. ' +
                        'Don\'t bring me anything weaker — I can smell diluted medicine ' +
                        'from across the estate. Now go, before I fade."',
                    },
                    {
                      kind: 'quest',
                      quest: 'tuTien_q3_1_recovery',
                    },
                    {
                      kind: 'flag',
                      global: true,
                      flag: 'tuTien_q3_1_given',
                      value: '1',
                    },
                  ],
                },
                {
                  text: 'Who are you, exactly?',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"I am Linshu. The estate\'s spirit, your Senior Sister, ' +
                        'and the only reason this building still has walls. ' +
                        'The important question is who YOU are — but we can discuss ' +
                        'your bloodline after I stop flickering. Pills first. Go."',
                    },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.1: Waiting for pills ─────────────────────────────────────
        // Accepts Regeneration Pill (II) OR Regeneration Pill S (II) — either counts
        {
          condition: 'tuTien_q3_1_given == 1 && Regeneration_Pill__II_ < 5 && Regeneration_Pill_S__II_ < 5',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Five Regeneration Pills, Tier II. ' +
                'I can see you don\'t have them yet. ' +
                'I\'ll still be here, fading slightly. No rush."',
            },
          ],
        },

        // ── STAGE 3.1: Have the pills → delivery ─────────────────────────────
        // notifyCondition shows an indicator on the NPC when pills are ready
        {
          condition: 'tuTien_q3_1_given == 1 && (Regeneration_Pill__II_ >= 5 || Regeneration_Pill_S__II_ >= 5)',
          notifyCondition: 'Regeneration_Pill__II_ >= 5 || Regeneration_Pill_S__II_ >= 5',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'text',
              text:
                'Linshu\'s form brightens slightly as you approach, ' +
                'the medicinal scent of the pills reaching her before you do.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"...Oh. You actually brought them. Good Little {Brother/Sister}."',
            },
            {
              kind: 'removeItem',
              item: { name: 'Regeneration Pill (II)' },
              alternates: [{ name: 'Regeneration Pill S (II)' }],
              amount: '5',
            },
            {
              kind: 'text',
              text:
                'She inhales the medicinal vapor deeply. ' +
                'Her edges solidify — she flickers less. ' +
                'A faint color returns to her cheeks.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ah... much better. My feet actually feel the grass again. ' +
                'Thank you, Little {Brother/Sister}. You\'re already more reliable than the old masters. ' +
                'Look at this garden — it\'s a mess of silver-weeds and dead Qi. ' +
                'Now that I can touch the world again, let me clear the overgrowth. ' +
                'I\'ll make this a place where your spirit-herbs can finally breathe."',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_herbUnlocked',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_1_given',
              value: '2', // marks as delivered, not just given
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.1→3.2: Next visit after herb field unlocked ─────────────
        {
          condition: 'tuTien_q3_1_given == 2 && tuTien_q3_2_given == 0',
          notifyCondition: 'tuTien_q3_1_given == 2 && tuTien_q3_2_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Good — you can see the garden is already clearing. ' +
                'But the estate is still blind. ' +
                'The Aetheric Array in the ceiling is cracked. ' +
                'We need something that fell from the sky but still thinks it\'s in the heavens. ' +
                'Those Xing Kuilei carry shards of Living Meteor. Bring me three."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q3_2_skyRoof',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_2_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.2: Waiting for Living Meteor ─────────────────────────────
        {
          condition: 'tuTien_q3_2_given == 1 && Living_Meteor < 3',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The Xing Kuilei nest near the Falling Star Observatory. ' +
                'Three shards. And don\'t come back with two saying \'close enough.\'"',
            },
          ],
        },

        // ── STAGE 3.2: Have Living Meteor → delivery ──────────────────────────
        {
          condition: 'tuTien_q3_2_given == 1 && Living_Meteor >= 3',
          notifyCondition: 'Living_Meteor >= 3',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Living Meteor' },
              amount: '3',
            },
            {
              kind: 'text',
              text:
                'Linshu takes the meteor shards and floats upward, pressing each one ' +
                'into the cracked tiles of the estate\'s domed ceiling. ' +
                'They fuse with a sound like ringing brass. The roof glows pulsing violet.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"There. Can you feel that? The house is starting to recognise its master. ' +
                'You should stay here, Little {Brother/Sister}. ' +
                'A Young {Master/Mistress} shouldn\'t be sleeping in a commoner\'s hut at the Sect."',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_houseUnlocked',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_2_given',
              value: '2',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.2→3.3: Next visit after house unlocked ──────────────────
        {
          condition: 'tuTien_q3_2_given == 2 && tuTien_q3_3_given == 0',
          notifyCondition: 'tuTien_q3_2_given == 2 && tuTien_q3_3_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I hope the house is comfortable. ' +
                'But we\'re not done yet — deep beneath us, there are veins of ore ' +
                'that haven\'t \'vibrated\' since the Empire fell. ' +
                'Resonating Silver acts as a tuning fork for the earth. ' +
                'If we plant enough of it in the lower levels, the mine will wake up. ' +
                'Just don\'t blame me if the pickaxes start moving on their own."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q3_3_tuneEarth',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_3_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.3: Waiting for Resonating Silver ─────────────────────────
        {
          condition: 'tuTien_q3_3_given == 1 && Resonating_Silver < 10',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ten Resonating Silver. The deeper veins of the mine won\'t tune themselves."',
            },
          ],
        },

        // ── STAGE 3.3: Have Resonating Silver → delivery ──────────────────────
        {
          condition: 'tuTien_q3_3_given == 1 && Resonating_Silver >= 10',
          notifyCondition: 'Resonating_Silver >= 10',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Resonating Silver' },
              amount: '10',
            },
            {
              kind: 'text',
              text:
                'Linshu guides the silver into the estate\'s lower chamber with a gesture. ' +
                'A low, resonant hum builds from below — deep and rhythmic, like a second heartbeat.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The earth is singing again. ' +
                'You\'re becoming quite the reliable heir, aren\'t you? ' +
                'Go on — see what the mountain has to offer."',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_mineUnlocked',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_3_given',
              value: '2',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.3→3.4: Next visit after mine unlocked ───────────────────
        {
          condition: 'tuTien_q3_3_given == 2 && tuTien_q3_4_given == 0',
          notifyCondition: 'tuTien_q3_3_given == 2 && tuTien_q3_4_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The mine is awake. I can hear it humming from up here. ' +
                'But there is one last step — the lightning saved you, ' +
                'but it left you unbalanced. ' +
                'Burning Blood is the only thing hot enough to weld your Azurite lineage ' +
                'to your Blossom-attuned soul. Are you ready for a little pain?"',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q3_4_tempering',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_4_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.4: Waiting for Burning Blood ─────────────────────────────
        {
          condition: 'tuTien_q3_4_given == 1 && Burning_Blood < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Burning Blood. One is all we need. ' +
                'It\'s empowered rarity — you\'ll find it from the stronger beasts ' +
                'in the meridianOpening hunting grounds."',
            },
          ],
        },

        // ── STAGE 3.4: Have Burning Blood → delivery + Twin Sovereigns ────────
        {
          condition: 'tuTien_q3_4_given == 1 && Burning_Blood >= 1',
          notifyCondition: 'Burning_Blood >= 1',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Burning Blood' },
              amount: '1',
            },
            {
              kind: 'text',
              text:
                'Linshu takes the vial and uncorks it with ceremony. ' +
                'She traces the seal of the Fractured Sigil on your chest, ' +
                'the blood burning cold rather than hot as it sinks in.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The Metal is the sword; the Blossom is the hand that guides it. ' +
                'You are the Twin Sovereign of this small world now. ' +
                'Use this technique well... it belongs to our family."',
            },
            {
              kind: 'unlockTechnique',
              technique: 'Twin Sovereigns',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q3_4_given',
              value: '2',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_chain3Complete',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE: Chain 3 done, Chain 4 not yet started (Tier III gate) ──────
        {
          condition: 'tuTien_chain3Complete == 1 && tuTien_q4_1_given == 0 && realm < qiCondensation',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"You\'ve done well, Little {Brother/Sister}. ' +
                'The estate breathes again. Rest. Train. Reach the Third Gate. ' +
                'There\'s more work ahead, but it can wait until you\'re stronger."',
            },
          ],
        },

        // ── STAGE: Chain 3 done, Tier III reached → start Chain 4 ────────────
        {
          condition: 'tuTien_chain3Complete == 1 && tuTien_q4_1_given == 0 && realm >= qiCondensation',
          notifyCondition: 'tuTien_chain3Complete == 1 && realm >= qiCondensation',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'text',
              text:
                'Linshu stands on the balcony, looking at the distant clouds. ' +
                'Something in her expression is older than her face.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Do you remember, Little {Brother/Sister}? When we were young, ' +
                'our family didn\'t walk the earth like mortals. ' +
                'We rode the currents of the stars. ' +
                'Even the wind had to ask our permission to blow."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I am anchored now, thanks to you, but I feel... light. ' +
                'Like a leaf that might be blown away by a strong gale. ' +
                'I want to help you travel safely through this dangerous world — ' +
                'to be the wind beneath your wings again — but I lack the \'weight\' to manipulate the aether."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Bring me Condensed Qi Elixirs — the Tier III kind. ' +
                'If I consume their density, I can weave the surrounding starlight into your mount. ' +
                'I don\'t want you riding those clumsy, slow clouds the Nine Mountain Sect provides. ' +
                'A Young {Master/Mistress} of the Azurite line deserves better."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q4_1_soulWeight',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_1_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.1: Waiting for elixirs ───────────────────────────────────
        {
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ < 10',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text: '"Ten Condensed Qi Elixir (III). The clouds won\'t weave themselves."',
            },
          ],
        },

        // ── STAGE 4.1: Have elixirs → delivery + cloud reward ────────────────
        {
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ >= 10',
          notifyCondition: 'Condensed_Qi_Elixir__III_ >= 10',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Condensed Qi Elixir (III)' },
              amount: '10',
            },
            {
              kind: 'text',
              text:
                'As Linshu consumes the elixirs, a shockwave of azure energy ripples ' +
                'from her form. For a moment she seems more solid than air — almost real.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Mmm... it feels like lead turning into gold in my veins. ' +
                'Come here, Little {Brother/Sister}. Give me your travel-seal."',
            },
            {
              kind: 'text',
              text:
                'Linshu takes your cloud-seal and begins to trace ancient runes upon it ' +
                'with a shimmering finger. The cloud beneath your feet begins to pulse ' +
                'with a rhythmic, heartbeat-like glow.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"There. I\'ve woven a piece of the Estate\'s own foundation into your mount. ' +
                'It won\'t just carry you — it will recognise the path before you even see it. ' +
                'Go on... try not to go too fast and leave your soul behind!"',
            },
            {
              kind: 'addItem',
              item: { name: 'Azure Wisp' },
              amount: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_1_given',
              value: '2',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 4.1→4.2: Next visit after Azure Wisp reward ───────────────
        {
          condition: 'tuTien_q4_1_given == 2 && tuTien_q4_2_given == 0',
          notifyCondition: 'tuTien_q4_1_given == 2 && tuTien_q4_2_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Little {Brother/Sister}... look at my face. It\'s still a bit \'blurry,\' isn\'t it? ' +
                '(She is trying to pick up a real flower from the garden, but her fingers pass through the stem.) ' +
                'It\'s... a bit lonely, isn\'t it? Being able to speak to you, ' +
                'yet unable to even hold your hand or help you adjust your robes."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I\'ve spent centuries as a thought, a memory of a Great Formation. ' +
                'But now that you\'ve returned, I find myself wanting to be... real. ' +
                'There is a pill spoken of in the old legends of the Heavenly Mirror Lake — the Jade Visage. ' +
                'If I can consume it, my spirit-body will harmonize with the physical world. ' +
                'I would be solid. I could walk beside you, not just drift behind you. ' +
                'Would you find that for me? I wish to be your \'real\' Senior {Brother/Sister}, in flesh and spirit."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q4_2_mirrorLake',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_2_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.2: Waiting for Jade Visage Pill ──────────────────────────
        {
          condition: 'tuTien_q4_2_given == 1 && Jade_Visage_Pill < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"One Jade Visage Pill. qiCondensation realm, incandescent rarity. ' +
                'You\'ll find it in the higher-tier markets or craft it if you dare."',
            },
          ],
        },

        // ── STAGE 4.2: Have Jade Visage Pill → Linshu becomes solid ──────────
        {
          condition: 'tuTien_q4_2_given == 1 && Jade_Visage_Pill >= 1',
          notifyCondition: 'Jade_Visage_Pill >= 1',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Jade Visage Pill' },
              amount: '1',
            },
            {
              kind: 'text',
              text:
                'Linshu takes the pill and holds it for a long moment. ' +
                'Then she swallows it. For a moment, the world goes silent. ' +
                'Her form shimmers and becomes vivid — solid, real. ' +
                'She tentatively reaches out and brushes your cheek. Her hand is warm.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I... I can feel you. The wind isn\'t just a sound anymore — it\'s a sensation. ' +
                'Thank you. I feel a great weight lifted from my mind, ' +
                'as if my true potential has finally been unlocked."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Because my form is stable now, I can maintain much more complex ' +
                'protective arrays for you. Let me share this — consider it a sisterly gift."',
            },
            {
              kind: 'addItem',
              item: { name: "Linshu's Worn Seal" },
              amount: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_2_given',
              value: '2',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 4.2→4.3: Next visit after Linshu becomes solid ────────────
        {
          condition: 'tuTien_q4_2_given == 2 && tuTien_q4_3_given == 0',
          notifyCondition: 'tuTien_q4_2_given == 2 && tuTien_q4_3_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Now that I have my strength back, ' +
                'the silence of this estate is starting to bother me. ' +
                'Our family were Scribes. We didn\'t just cultivate — we recorded the secrets of the universe. ' +
                'But look at our shelves — empty. Dust and shadows."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I can feel the \'memory\' of our books drifting in the collective aether, ' +
                'but I need a conductor to pull them back into reality. ' +
                'Shimmering Copperite resonates with the frequency of stored knowledge. ' +
                'Bring me five pieces, and I can rebuild our Archive. ' +
                'I want to see you reading the true history of our people, ' +
                'not the filtered lies of the current sects."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q4_3_archive',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_3_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.3: Waiting for Shimmering Copperite ──────────────────────
        {
          condition: 'tuTien_q4_3_given == 1 && Shimmering_Copperite < 5',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text: '"Five Shimmering Copperite. The books won\'t sort themselves."',
            },
          ],
        },

        // ── STAGE 4.3: Have Copperite → unlock library ────────────────────────
        {
          condition: 'tuTien_q4_3_given == 1 && Shimmering_Copperite >= 5',
          notifyCondition: 'Shimmering_Copperite >= 5',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Shimmering Copperite' },
              amount: '5',
            },
            {
              kind: 'text',
              text:
                'The empty library shelves begin to glow. One by one, spectral scrolls ' +
                'and jade slips materialize, becoming solid as they touch the wood.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"It worked! It\'s only a fraction of what we once had, but it is a start. ' +
                'The history of Linghe, the musings on Qi... it\'s all here. ' +
                'Whenever the world outside becomes too loud, ' +
                'come here and find peace in the words of our ancestors."',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_libraryUnlocked',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q4_3_given',
              value: '2',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_chain4Complete',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE: Chain 4 done, Chain 5 gate (crafting skill) ───────────────
        {
          condition: 'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftskill < 300',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I\'m starting to remember her, Little {Brother/Sister}. Danxi. ' +
                'My best friend — the Empire\'s Chief Alchemist. ' +
                'But the method to rescue her requires a steady alchemist\'s hand. ' +
                'Your craft skill isn\'t quite there yet. Train more, then come back."',
            },
          ],
        },

        // ── STAGE: Chain 4 done, crafting >= 300 → start Chain 5 ─────────────
        {
          condition: 'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftskill >= 300',
          notifyCondition: 'tuTien_chain4Complete == 1 && craftskill >= 300',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'text',
              text:
                'Linshu is looking at a scorched mark on the floor of the alchemy room. ' +
                'Something in her expression is older than usual — not the warm Senior Sister, ' +
                'but the woman who watched an empire fall.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I was cleaning the furnaces today, and I remembered her. Danxi. ' +
                'She was... difficult. Arrogant, loud, and she always complained ' +
                'that my star-charts were \'distracting her from the flame.\' ' +
                'But she was the greatest Alchemist the Empire ever saw."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"She didn\'t flee when the Jingdi Roost expanded. ' +
                'She claimed the Beast-Kings produced the most consistent heat for her high-tier pills. ' +
                'I saw her seal herself into her Bronze Ring just as the nest swallowed this wing of the estate."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I\'ve felt a strange spatial distortion coming from the Jingdi Roost recently. ' +
                'I think the ring is failing. If we don\'t get her out, she\'ll be crushed ' +
                'by the collapsing dimensions. Please, Little {Brother/Sister}... ' +
                'she\'s the only other one left who remembers your parents\' faces."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q5_1_roost',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q5_1_given',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 5.1: Waiting for ring ───────────────────────────────────────
        {
          condition: 'tuTien_q5_1_given == 1 && Scratched_Bronze_Ring < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"She\'s in the Jingdi Roost. Find the strongest bird there ' +
                'and look for her ring. It\'ll be glowing. You can\'t miss it."',
            },
          ],
        },

        // ── STAGE 5.1: Have the ring → start 5.2 ─────────────────────────────
        {
          condition: 'tuTien_q5_1_given == 1 && Scratched_Bronze_Ring >= 1',
          notifyCondition: 'Scratched_Bronze_Ring >= 1',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"This ring is locked tight — I can hear her... ' +
                'she\'s trying to refine the very void inside the ring just to stay alive. ' +
                'The seal is rusted with spatial decay. ' +
                'We have to break it from the outside, but it requires a massive burst of Cloud-energy ' +
                'to \'lubricate\' the spatial gears."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"A Storm Orb is the only thing with enough raw atmospheric power. ' +
                'Be careful, Little {Brother/Sister}. If your hands shake when you apply the energy, ' +
                'the ring will shatter and Danxi will be lost forever. ' +
                'But you... you have the blood of the Star-Gazers. Your precision is unmatched."',
            },
            {
              kind: 'quest',
              quest: 'tuTien_q5_2_danxi',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q5_2_given',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q5_1_given',
              value: '2',
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 5.2: Waiting for Storm Orb ─────────────────────────────────
        {
          condition: 'tuTien_q5_2_given == 1 && Storm_Orb < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"One Storm Orb. qiCondensation tier, resplendent rarity. ' +
                'You\'ll find it in the higher-tier markets or from the stronger cultivators ' +
                'in the qiCondensation hunting grounds."',
            },
          ],
        },

        // ── STAGE 5.2: Have Storm Orb → release Danxi ────────────────────────
        {
          condition: 'tuTien_q5_2_given == 1 && Storm_Orb >= 1',
          notifyCondition: 'Storm_Orb >= 1',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Scratched Bronze Ring' },
              amount: '1',
            },
            {
              kind: 'removeItem',
              item: { name: 'Storm Orb' },
              amount: '1',
            },
            {
              kind: 'text',
              text:
                'You crush the Storm Orb against the ring. A violent vortex of wind and green lightning erupts. ' +
                'The ring shatters, and a cloud of thick, pungent smoke fills the room.',
            },
            {
              // Danxi is not yet a registered Character — use text step to avoid crash.
              // Once Danxi.ts is built and registered, convert these back to speech steps.
              kind: 'text',
              text:
                'A voice erupts from inside the smoke: ' +
                '"COUGH! HACK! Which... (Cough)... absolute moron used a Storm Orb?! ' +
                'I was right in the middle of a delicate stabilization! ' +
                'You nearly turned my eyebrows into ash!"',
            },
            {
              kind: 'text',
              text:
                'A tall, sharp-featured woman steps out of the smoke, waving a jade fan to clear the air. ' +
                'She looks at Linshu, then at you, her eyes narrowing with intense scrutiny.',
            },
            {
              kind: 'text',
              text:
                'The woman surveys the room, fan still waving: ' +
                '"Linshu? You\'ve... filled out. ' +
                'And who is this brat? Why {is he/is she} wearing the Royal Seal? ' +
                '{He looks/She looks} like {he\'s/she\'s} had three meals and zero hours of furnace-duty. ' +
                'Is this the new \'Master\' of the house? ' +
                '{He/She} can barely hold a Storm Orb without shaking!"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"(Giggling) {He/She} saved your life, you grumpy old furnace-clog. ' +
                'Be nice. This is our Little {Brother/Sister} — the true heir to the Azurite line."',
            },
            {
              kind: 'text',
              text:
                'She waves you aside already heading for the alchemy room: ' +
                '"Hmph. Heir? We\'ll see. ' +
                'If {he/she} wants me to refine anything better than a sugar cube, ' +
                '{he\'d/she\'d} better find me a cauldron that isn\'t made of scrap metal. ' +
                'Now, move aside! I need to see if my recipes survived that spatial trash-heap you call a ring!"',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_danxiUnlocked',
              value: '1',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_q5_2_given',
              value: '2',
            },
            {
              kind: 'flag',
              global: true,
              flag: 'tuTien_chain5Complete',
              value: '1',
            },
            { kind: 'clearCharacter' },
          ],
        },

      ],
    },
  ],
};

export function initializeLinshu(): void {
  window.modAPI.actions.addCharacter(linshu);
  console.log('✅ Linshu registered.');
}
