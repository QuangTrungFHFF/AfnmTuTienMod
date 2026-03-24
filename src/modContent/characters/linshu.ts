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
    'She has been waiting two thousand years for a Young Master to return.',
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
      realm: 'pillarCreation',     // Ancient, powerful, but not a fighter
      realmProgress: 'Late',
      stats: [],                   // Non-combatant
      locations: [
        {
          kind: 'static',
          condition: 'tuTien_estateUnlocked == 1',
          location: 'Observatory Estate',
        },
      ],
      encounters: [],
      talkInteraction: [

        // ── STAGE 0: Estate just unlocked, Chain 3 not yet started ────────────
        {
          condition: 'tuTien_estateUnlocked == 1 && tuTien_q3_1_given == 0',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Silly Little Brother... don\'t look so scared. ' +
                'I\'m just a little... out of breath. ' +
                'It turns out holding an entire estate in a fold of space ' +
                'for a few centuries is quite tiring for a Spirit. ' +
                'I need to anchor my form before I vanish. ' +
                'Bring me some pills—the \'S\' kind from the Recuperation stock. ' +
                'The Regeneration ones. They have enough kick to keep me awake."',
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
                        '"Ten of them. Tier II. ' +
                        'Don\'t bring me anything weaker—I can smell diluted medicine ' +
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
                        'The important question is who YOU are—but we can discuss ' +
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
        {
          condition: 'tuTien_q3_1_given == 1 && Regeneration_Pill_S__II_ < 10',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"...Ten Regeneration Pill S (II). ' +
                'I can see you don\'t have them yet. ' +
                'I\'ll still be here, fading slightly. No rush."',
            },
          ],
        },

        // ── STAGE 3.1: Have the pills → delivery ─────────────────────────────
        // notifyCondition shows an indicator on the NPC when pills are ready
        {
          condition: 'tuTien_q3_1_given == 1 && Regeneration_Pill_S__II_ >= 10',
          notifyCondition: 'Regeneration_Pill_S__II_ >= 10',
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
              text: '"...Oh. You actually brought them. Good Little Brother."',
            },
            {
              kind: 'removeItem',
              item: { name: 'Regeneration Pill S (II)' },
              amount: '10',
            },
            {
              kind: 'text',
              text:
                'She inhales the medicinal vapor deeply. ' +
                'Her edges solidify — she flickers less. ' +
                'Color returns to her translucent form.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ah... much better. I can feel my feet touching the grass again. ' +
                'Look at this garden, Little Brother — it\'s a mess of weeds. ' +
                'Let me clear the overgrowth. I\'ll make it a place where ' +
                'your spirit-herbs can actually breathe."',
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
            // Start next quest immediately
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Now. The estate is still blind. ' +
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
                'You should stay here, Little Brother. ' +
                'A Young Master shouldn\'t be sleeping in a commoner\'s hut at the Sect."',
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
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Deep beneath us, there are veins of ore that haven\'t \'vibrated\' ' +
                'since the Empire fell. Resonating Silver acts as a tuning fork for the earth. ' +
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
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"One last step. The lightning saved you, but it left you unbalanced. ' +
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
                '"You\'ve done well, Little Brother. ' +
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
              kind: 'speech',
              character: CHAR,
              text:
                '"I need \'weight.\' Qi density. ' +
                'Bring me Condensed Qi Elixirs—the Tier III kind. ' +
                'If I consume enough, I can manipulate the clouds outside to carry you faster. ' +
                'You want a faster mount, don\'t you? ' +
                'Then stop staring at me and get to work!"',
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
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ < 5',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text: '"Five Condensed Qi Elixir (III). The clouds won\'t weave themselves."',
            },
          ],
        },

        // ── STAGE 4.1: Have elixirs → delivery + cloud reward ────────────────
        {
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ >= 5',
          notifyCondition: 'Condensed_Qi_Elixir__III_ >= 5',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'removeItem',
              item: { name: 'Condensed Qi Elixir (III)' },
              amount: '5',
            },
            {
              kind: 'text',
              text:
                'Linshu absorbs the elixirs into her form. For a moment she seems ' +
                'more solid than air — almost real. She exhales starlight.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Mmm... so dense. I feel... solid. ' +
                'Here — I\'ve woven some of the estate\'s starlight into a cloud for you. ' +
                'The Azure Wisp. It recognises your bloodline. ' +
                'It will move like a dream — and grow stronger as you do."',
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
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Little Brother... look at my face. It\'s still a bit \'blurry,\' isn\'t it? ' +
                'There is a Jade Visage Pill from the Heavenly Mirror Lake. ' +
                'If I take it, my spirit-body will become as permanent as flesh. ' +
                'I\'ll finally be your \'real\' Senior Sister. ' +
                'You wouldn\'t want me to remain a drawing forever, would you?"',
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
                'Linshu takes the pill and holds it for a long moment, looking at it with ' +
                'an expression you can\'t quite name. Then she swallows it. ' +
                'The translucency that has defined her since the day you met — ' +
                'the flickering edges, the cold glow — solidifies all at once. ' +
                'She reaches out and touches your sleeve. You can feel it.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I... I can feel the wind on my skin. ' +
                'Thank you. Truly. ' +
                'I can hold more protective formations for the estate now. ' +
                'Here — consider this a sisterly gift."',
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
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Now that I can think clearly, I\'m bored! ' +
                'We need to rebuild the Archive. ' +
                'Shimmering Copperite is the best conductor for memory-stones. ' +
                'Bring me five. I\'ll pull the records from the aether and stock our shelves."',
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
                'Linshu presses the Shimmering Copperite into the estate\'s foundation pillars ' +
                'with both hands. Lines of azure light spread outward like roots. ' +
                'A door you hadn\'t noticed before swings open — behind it, shelves. Scrolls. ' +
                'The ghost-whisper of preserved knowledge.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The library is open! It\'s small, but it holds what was saved. ' +
                'Come, let\'s get lost in the past together."',
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
          condition: 'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftSkill < 300',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I\'m starting to remember her, Little Brother. Danxi. ' +
                'My best friend — the Empire\'s Chief Alchemist. ' +
                'But the method to rescue her requires a steady alchemist\'s hand. ' +
                'Your craft skill isn\'t quite there yet. Train more, then come back."',
            },
          ],
        },

        // ── STAGE: Chain 4 done, crafting >= 300 → start Chain 5 ─────────────
        {
          condition: 'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftSkill >= 300',
          notifyCondition: 'tuTien_chain4Complete == 1 && craftSkill >= 300',
          event: [
            {
              kind: 'setCharacter',
              character: CHAR,
            },
            {
              kind: 'text',
              text:
                'Something changes in Linshu\'s expression. Not the usual warmth — ' +
                'something older. A memory surfacing from beneath two thousand years of waiting.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I remember her now... Danxi. ' +
                'She was my best friend. The Empire\'s Chief Alchemist. ' +
                'She was a genius, a terror, and she smelled perpetually of burnt sulphur. ' +
                'When the beasts came and everything fell... she hid inside her spatial ring. ' +
                'And then a King-Bird swallowed it."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"She\'s been trapped in a bird\'s stomach for two thousand years, Little Brother. ' +
                'Go to the Jingdi Roost. Find the bird with the brightest stomach. Get her back."',
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
                '"This ring is locked tight. ' +
                'Danxi must be screaming in there. ' +
                'The spatial rust on the seal is ancient — only a Storm Orb has enough ' +
                'concentrated discharge to blast it free. ' +
                'It\'s dangerous—one wrong move and she\'ll scatter into the void. ' +
                'But I trust your hands."',
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
                'Linshu holds the ring steady while you press the Storm Orb against the seal. ' +
                'For a moment nothing happens. Then the Orb detonates — ' +
                'a crack of thunder inside a closed room. Green smoke erupts. ' +
                'Linshu stumbles backward. You stumble backward. ' +
                'Out of the smoke steps a woman, coughing violently.',
            },
            {
              kind: 'speech',
              character: 'Danxi',
              text:
                '"COUGH! HACK! Which idiot used a Storm Orb?! ' +
                'You nearly blew my furnace to the Moon! ' +
                'And you! (Points at Linshu) You\'ve put on weight! ' +
                'And who is this brat? The new \'Master\'? ' +
                'He looks like he couldn\'t refine a sugar cube!"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Welcome back, Danxi. Be nice. He\'s our Young Master."',
            },
            {
              kind: 'speech',
              character: 'Danxi',
              text:
                '"Hmph. We\'ll see. ' +
                'Boy! If you want me to work, your cauldron better not be made of tin!"',
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

        // ── DEFAULT: All chains done or idle between stages ───────────────────
        {
          condition: '1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The estate is in good shape today, Little Brother. ' +
                'Is there something you needed?"',
            },
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
