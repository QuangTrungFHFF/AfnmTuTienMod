import { Character } from 'afnm-types';
import { G } from '../constants';
import caretakerPortrait from '../../assets/characters/xiaomiao_p.webp';
import caretakerImage from '../../assets/characters/xiaomiao_full.webp';

// ─── Linshu — The Estate Spirit ───────────────────────────────────────────────
// The spirit of the Azureline Sanctuary, bound to the pocket dimension for two
// thousand years. She is the player's "Senior Sister" — warm, teasing, protective,
// with flashes of ancient authority when the situation demands it.
//
// Dialog source: lore_dialog_v5_synchronized.txt (all [CODE X] stages aligned)
//
// Visibility: Only after the estate is unlocked (tuTien_estateUnlocked == 1)
// Location:   Azureline Sanctuary (static)
//
// Flag reference:
//   tuTien_estateUnlocked    — estate revealed via Keystone event
//   tuTien_q3_1_given        — Chain 3.1 quest (1=given, 2=delivered)
//   tuTien_q3_2_given        — Chain 3.2 quest (1=given, 2=delivered)
//   tuTien_q3_3_given        — Chain 3.3 quest (1=given, 2=delivered)
//   tuTien_q3_4_given        — Chain 3.4 quest (1=given, 2=delivered)
//   tuTien_chain3Complete    — all of chain 3 finished
//   tuTien_q4_1_given        — Chain 4.1 quest (1=given, 2=delivered)
//   tuTien_q4_2_given        — Chain 4.2 quest (1=given, 2=delivered)
//   tuTien_q4_3_given        — Chain 4.3 quest (1=given, 2=delivered)
//   tuTien_chain4Complete    — all of chain 4 finished
//   tuTien_q5_1_given        — Chain 5.1 quest (1=given, 2=delivered)
//   tuTien_q5_2_given        — Chain 5.2 quest (1=given, 2=delivered)
//   tuTien_chain5Complete    — all of chain 5 finished
//   tuTien_danxiUnlocked     — Danxi NPC available
//   craftskill               — all lowercase, not craftSkill
//
// Note: Regeneration Pill S (II) flag name:
//   window.modAPI.utils.flag('Regeneration Pill S (II)') = 'Regeneration_Pill_S__II_'

const CHAR = 'Linshu';

export const linshu: Character = {
  name: CHAR,
  displayName: 'Linshu',
  allegiance: undefined,
  bio:
    'The spirit of the Azureline Sanctuary, a consciousness bound to this place ' +
    'since the fall of the Azurite Empire. She calls herself your Senior Sister. ' +
    'She has been waiting two thousand years for a Young Master or Mistress to return.',
  condition: 'tuTien_estateUnlocked == 1',
  // TODO: Replace portrait and image with proper Linshu artwork.
  // She should appear semi-transparent/spectral in chain 3 and early chain 4,
  // and fully solid after quest 4.2 completes (tuTien_q4_2_given >= 2).
  // Use imageOverride for the two-variant pattern — see HANDOFF.md.
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
          location: 'Azureline Sanctuary',
        },
      ],
      encounters: [],
      talkInteraction: [

        // ── DEFAULT: Idle / fallback — MUST be first ──────────────────────────
        // The game picks the LAST matching condition, not the first.
        // condition:'1' always matches — it sits at top as baseline, every
        // specific stage below overrides it by appearing later in the array.
        {
          condition: '1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The estate is quiet today, Little {Brother/Sister}. The spiritual ' +
                'energy is flowing perfectly. Is there something you needed?"',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: 'Just checking in. I\'m heading back out.',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"Stay safe. Don\'t let those Sect elders bully you."',
                    },
                  ],
                },
                {
                  text: 'Could you help me adjust my Qi before I travel?',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Of course. Stand still for a moment... let me smooth out the ' +
                        'turbulent winds in your meridians. There. You should feel much lighter ' +
                        'on your feet, and your aura is shining brightly. Make a good impression ' +
                        'out there!"',
                    },
                    // [FOR FUTURE] Buff: Linshu's Blessing (Speed + Charisma + Qi absorption)
                    // TODO: implement buff and add step here.
                  ],
                },
              ],
            },
          ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // CHAIN 3: SENIOR SISTER'S FIRST REQUEST
        // ═════════════════════════════════════════════════════════════════════

        // ── STAGE 3.0: First talk after estate unlock, chain 3 not started ───
        {
          condition: 'tuTien_estateUnlocked == 1 && tuTien_q3_1_given == 0',
          notifyCondition: 'tuTien_estateUnlocked == 1 && tuTien_q3_1_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Silly Little {Brother/Sister}... don\'t look so scared. I\'m just a ' +
                'little... out of breath. It turns out holding an entire estate in a fold of ' +
                'space for two thousand years is quite tiring for a Spirit. To anchor my form ' +
                'back to reality, I need a catalyst."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Bring me some Regeneration Pills. They carry enough refined life-force ' +
                'to act as a temporary anchor for my spirit. Please... I\'ve waited so long to ' +
                'see you again. Don\'t let me disappear now."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I will get you those pills. Don\'t fade."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Five Regeneration Pills should be enough. Just make sure they are ' +
                        'properly refined... diluted medicine won\'t have the spiritual weight I ' +
                        'need to anchor myself. Please hurry, Little {Brother/Sister}."',
                    },
                    { kind: 'quest', quest: 'tuTien_q3_1_recovery' },
                    { kind: 'flag', global: true, flag: 'tuTien_q3_1_given', value: '1' },
                  ],
                },
                {
                  text: '"Are you sure? Will just five pills be enough to anchor you?"',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"(smiles weakly) It will be enough to stop the wind from blowing me ' +
                        'through the walls. The medicinal Qi will simulate a physical vessel for ' +
                        'my spirit. We can worry about permanent solutions later. Just please... ' +
                        'come back safely."',
                    },
                    // Quest not given on this branch — player must return and pick [I].
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.1-WAIT: Waiting for Regeneration Pills ───────────────────
        // Accepts Regeneration Pill (II) OR Regeneration Pill S (II)
        {
          condition:
            'tuTien_q3_1_given == 1 && ' +
            'Regeneration_Pill__II_ < 5 && Regeneration_Pill_S__II_ < 5',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"(her voice sounds slightly muffled, as if coming from far away) ' +
                'Five Regeneration Pills, Tier II. I\'m still here, Little {Brother/Sister}, ' +
                'but the edges of my vision are getting blurry. Please hurry."',
            },
          ],
        },

        // ── STAGE 3.1-DELIVER: Have pills → Quest 3.1 completion ─────────────
        {
          condition:
            'tuTien_q3_1_given == 1 && ' +
            '(Regeneration_Pill__II_ >= 5 || Regeneration_Pill_S__II_ >= 5)',
          notifyCondition:
            'Regeneration_Pill__II_ >= 5 || Regeneration_Pill_S__II_ >= 5',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'text',
              text:
                'Linshu\'s form brightens slightly as you approach, the medicinal ' +
                'scent of the pills reaching her before you do.',
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
                'She inhales the medicinal vapor deeply. Her edges solidify — she ' +
                'flickers less. A faint color returns to her cheeks.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ah... much better. My feet actually feel the grass again. Thank you, ' +
                'Little {Brother/Sister}. You\'re already more reliable than the old masters. ' +
                'Look at this garden — it\'s a mess of silver-weeds and dead Qi. Now that I can ' +
                'touch the world again, let me clear the overgrowth. I\'ll make this a place ' +
                'where your spirit-herbs can finally breathe."',
            },
            {
              kind: 'text',
              text: 'Estate Herb Field unlocked. You can now grow spirit herbs here.',
            },
            { kind: 'flag', global: true, flag: 'tuTien_herbUnlocked', value: '1' },
            { kind: 'flag', global: true, flag: 'tuTien_q3_1_given', value: '2' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.1→3.2: Quest 3.2 given on next visit ────────────────────
        {
          condition: 'tuTien_q3_1_given == 2 && tuTien_q3_2_given == 0',
          notifyCondition: 'tuTien_q3_1_given == 2 && tuTien_q3_2_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Good — you can see the garden is already clearing."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The estate has lost its sight, its guardian spirit slumbers, ' +
                'and the watching array has gone dark. Those Xing Kuilei beasts near ' +
                'the Falling Star Observatory carry shards of Living Meteor in their bodies. ' +
                'Bring me three shards, and I will hammer them into the roof-tiles myself."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I\'ll hunt down the Xing Kuilei and get the shards."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Be careful out there. Those beasts hit like falling boulders… ' +
                        'return to me in one piece."',
                    },
                    { kind: 'quest', quest: 'tuTien_q3_2_skyRoof' },
                    { kind: 'flag', global: true, flag: 'tuTien_q3_2_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.2-WAIT: Waiting for Living Meteor ────────────────────────
        {
          condition: 'tuTien_q3_2_given == 1 && Living_Meteor < 3',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The Xing Kuilei nest near the Falling Star Observatory. Bring me ' +
                'three Living Meteor shards. I\'ll hold the array together until you return."',
            },
          ],
        },

        // ── STAGE 3.2-DELIVER: Have Living Meteor → Quest 3.2 completion ──────
        {
          condition: 'tuTien_q3_2_given == 1 && Living_Meteor >= 3',
          notifyCondition: 'Living_Meteor >= 3',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Living Meteor' },
              amount: '3',
            },
            {
              kind: 'text',
              text:
                'Linshu takes the meteor shards and floats upward, pressing each one ' +
                'into the cracked tiles of the estate\'s domed ceiling. They fuse with a sound ' +
                'like ringing brass. The roof glows pulsing violet.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"There. Can you feel that? The house is starting to recognise its master. ' +
                'You should stay here, Little {Brother/Sister}. A Young {Master/Mistress} ' +
                'shouldn\'t be sleeping in a commoner\'s hut at the Sect."',
            },
            {
              kind: 'text',
              text: 'Ancestral Estate unlocked.',
            },
            { kind: 'flag', global: true, flag: 'tuTien_houseUnlocked', value: '1' },
            { kind: 'flag', global: true, flag: 'tuTien_q3_2_given', value: '2' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.2→3.3: Quest 3.3 given on next visit ────────────────────
        {
          condition: 'tuTien_q3_2_given == 2 && tuTien_q3_3_given == 0',
          notifyCondition: 'tuTien_q3_2_given == 2 && tuTien_q3_3_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text: '"I hope the house is comfortable. But we\'re not done yet —"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The estate is hovering just above the mortal realm, yet it has no roots. ' +
                'If we embed enough Resonating Silver into its lower foundations, we can anchor it ' +
                'to the same earth-veins that run through the Yinglin Mine near your Sect. ' +
                'Bring me ten pieces, and I will carve a path straight into the mountain\'s heart."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I\'ll gather the Resonating Silver."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"Ten pieces. Don\'t settle for dull ore."',
                    },
                    { kind: 'quest', quest: 'tuTien_q3_3_tuneEarth' },
                    { kind: 'flag', global: true, flag: 'tuTien_q3_3_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.3-WAIT: Waiting for Resonating Silver ────────────────────
        {
          condition: 'tuTien_q3_3_given == 1 && Resonating_Silver < 10',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ten pieces of Resonating Silver. We cannot tap into the Yinglin Mine\'s ' +
                'deep veins without them."',
            },
          ],
        },

        // ── STAGE 3.3-DELIVER: Have Resonating Silver → Quest 3.3 completion ──
        {
          condition: 'tuTien_q3_3_given == 1 && Resonating_Silver >= 10',
          notifyCondition: 'Resonating_Silver >= 10',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Resonating Silver' },
              amount: '10',
            },
            {
              kind: 'text',
              text:
                'Linshu guides the silver into the estate\'s lower chamber with a gesture. ' +
                'A low, resonant hum builds from below, deep and rhythmic, like a second heartbeat.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The earth is singing again. You\'re becoming quite the reliable heir, ' +
                'aren\'t you? Go on! See what the mountain has to offer."',
            },
            {
              kind: 'text',
              text: 'Aetheric Veins (mine location) unlocked. Your own private mine.',
            },
            { kind: 'flag', global: true, flag: 'tuTien_mineUnlocked', value: '1' },
            { kind: 'flag', global: true, flag: 'tuTien_q3_3_given', value: '2' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 3.3→3.4: Quest 3.4 given on next visit ────────────────────
        {
          condition: 'tuTien_q3_3_given == 2 && tuTien_q3_4_given == 0',
          notifyCondition: 'tuTien_q3_3_given == 2 && tuTien_q3_4_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The mine is connected. I can hear the pickaxes echoing from the ' +
                'undercroft. But there is one last step for you, Little {Brother/Sister}."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"That Fifth Elder\'s lightning strike saved your life and awoke your blood, ' +
                'but it left the Qi in your meridians violently unbalanced. You\'re carrying a storm ' +
                'inside you. We need to temper it. Burning Blood is the only thing hot enough to weld ' +
                'your raw Azurite lineage to your Blossom-attuned soul. Are you ready for a little pain?"',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"If it balances my cultivation, I\'m ready."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"At Feiteng Lake lurks a Shaoshang. It nests at the Bifang Crane Corpse, ' +
                        'in the depths of the boiling waters. The task is dangerous, but when you ' +
                        'return, I will personally guide and refine its energy."',
                    },
                    { kind: 'quest', quest: 'tuTien_q3_4_tempering' },
                    { kind: 'flag', global: true, flag: 'tuTien_q3_4_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 3.4-WAIT: Waiting for Burning Blood ────────────────────────
        {
          condition: 'tuTien_q3_4_given == 1 && Burning_Blood < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Just one vial of empowered Burning Blood. Please, don\'t push yourself ' +
                'too hard looking for it. You will find it within the beasts that dwell at ' +
                'the Bifang Crane Corpse."',
            },
          ],
        },

        // ── STAGE 3.4-DELIVER: Have Burning Blood → Twin Sovereigns ──────────
        {
          condition: 'tuTien_q3_4_given == 1 && Burning_Blood >= 1',
          notifyCondition: 'Burning_Blood >= 1',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Burning Blood' },
              amount: '1',
            },
            {
              kind: 'text',
              text:
                'Linshu takes the vial and uncorks it with ceremony. She dips her fingers ' +
                'into the burning liquid and traces the seal of the Fractured Sigil directly onto ' +
                'your chest. The blood burns cold rather than hot as it sinks into your very soul.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"The Metal is the sword; the Blossom is the hand that guides it. You are ' +
                'the Twin Sovereign of this small world now. Use this technique well... ' +
                'it belongs to our family."',
            },
            { kind: 'unlockTechnique', technique: 'Twin Sovereigns' },
            { kind: 'flag', global: true, flag: 'tuTien_q3_4_given', value: '2' },
            { kind: 'flag', global: true, flag: 'tuTien_chain3Complete', value: '1' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── GATE 3→4 LOW: Chain 3 done, below qiCondensation ────────────────
        {
          condition:
            'tuTien_chain3Complete == 1 && tuTien_q4_1_given == 0 && realm < qiCondensation',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"You\'ve done well, Little {Brother/Sister}. The estate breathes again, ' +
                'and your foundation is stable. Rest now. Focus on your cultivation. Once you ' +
                'reach the Qi Condensation, we will speak of rebuilding the family\'s true power. ' +
                'I will be right here waiting."',
            },
          ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // CHAIN 4: THE HEAVENLY RESTORATION
        // ═════════════════════════════════════════════════════════════════════

        // ── STAGE 4-UNLOCK: qiCondensation reached → Chain 4 begins ─────────
        {
          condition:
            'tuTien_chain3Complete == 1 && tuTien_q4_1_given == 0 && realm >= qiCondensation',
          notifyCondition:
            'tuTien_chain3Complete == 1 && realm >= qiCondensation',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'text',
              text:
                'Linshu stands on the balcony, looking at the distant clouds. Her posture ' +
                'is elegant, carrying the quiet, heavy dignity of a forgotten era.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"You wouldn\'t remember this, but in our era, we didn\'t walk ' +
                'the earth like mortals. We rode the currents of the stars. Even the wind had ' +
                'to ask our permission to blow."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I am anchored now, thanks to you, but my spirit lacks the \'weight\' to ' +
                'manipulate the aether. I want to weave the surrounding starlight into a proper ' +
                'mount for you. A Young {Master/Mistress} of the Azurite line deserves better."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"Why an Azure Cloud? The Sect gives us flying swords."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"(laughs softly) Those rusty toothpicks? They are terribly slow, and ' +
                        'absolutely dreadful for one\'s balance. Bring me ten Condensed Qi Elixirs ' +
                        '(III). I will use them to forge you a cloud that actually respects your lineage."',
                    },
                    { kind: 'quest', quest: 'tuTien_q4_1_soulWeight' },
                    { kind: 'flag', global: true, flag: 'tuTien_q4_1_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.1-WAIT: Waiting for Condensed Qi Elixir (III) ────────────
        {
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ < 10',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Ten Condensed Qi Elixirs, Little {Brother/Sister}. I need their density ' +
                'before I can pull a cloud down from the aether for you."',
            },
          ],
        },

        // ── STAGE 4.1-DELIVER: Have elixirs → Cerulean Sovereign reward ───────
        {
          condition: 'tuTien_q4_1_given == 1 && Condensed_Qi_Elixir__III_ >= 10',
          notifyCondition: 'Condensed_Qi_Elixir__III_ >= 10',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Condensed Qi Elixir (III)' },
              amount: '10',
            },
            {
              kind: 'text',
              text:
                'As Linshu consumes the elixirs, a shockwave of azure energy ripples from ' +
                'her form. For a moment she seems more solid than air.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Mmm... it feels like lead turning into gold in my veins. Come here. Give me your travel-seal."',
            },
            {
              kind: 'text',
              text:
                'Linshu takes your seal and traces ancient runes upon it. The air beside ' +
                'you condenses, weaving starlight and mist into a breathtaking, radiant Azure Cloud. ' +
                'You run your hand through the pulsing mist, a wide smile breaking across your face ' +
                'as you bow your head in deep gratitude.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"There. It is now yours. It won\'t just carry you, it will recognise the ' +
                'path before you even see it. Try not to go too fast and leave your soul behind!"',
            },
            {
              // Cerulean Sovereign — Tier III mount (qiCondensation).
              // Described as "Azure Cloud" in the narration above (in-world name).
              kind: 'addItem',
              item: { name: 'Cerulean Sovereign' },
              amount: '1',
            },
            { kind: 'flag', global: true, flag: 'tuTien_q4_1_given', value: '2' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 4.1→4.2: Quest 4.2 given on next visit ────────────────────
        {
          condition: 'tuTien_q4_1_given == 2 && tuTien_q4_2_given == 0',
          notifyCondition: 'tuTien_q4_1_given == 2 && tuTien_q4_2_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'text',
              text:
                'The garden is quiet, untouched by wind. Even the scent of spirit-blooms ' +
                'lingers too lightly, as if afraid to settle. Linshu stands among them, motionless ' +
                'for a moment. Then she raises her hand toward a flower as if testing a thought. ' +
                'The petals do not react. Her fingers pass through the stem like mist through moonlight. ' +
                'She pauses, then withdraws her hand with a small, amused smile.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Little {Brother/Sister}... look at my hand."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Hm… a bit inconvenient, isn\'t it? I can talk to you all I want, but I ' +
                'can\'t even steal a cup of tea when you\'re back from a hunt."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"There\'s an old legend about a Jade Visage Pill. If I could get my hands ' +
                'on it, my spirit-body would harmonize with the physical world. I\'d be solid… ' +
                'and then I could properly walk beside you."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"So if you ever stumble upon one… bring it to me, alright? I should at ' +
                'least be allowed to officially trouble my little {Brother/Sister} in person."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I will find the Jade Visage Pill for you."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"Thank you... truly."',
                    },
                    { kind: 'quest', quest: 'tuTien_q4_2_mirrorLake' },
                    { kind: 'flag', global: true, flag: 'tuTien_q4_2_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.2-WAIT: Waiting for Jade Visage Pill ─────────────────────
        {
          condition: 'tuTien_q4_2_given == 1 && Jade_Visage_Pill < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"(looking at her translucent hands) One Jade Visage Pill... ' +
                'incandescent rarity, Qi Condensation realm. Please be safe looking for it. ' +
                'I\'ve waited centuries; I can wait a little longer."',
            },
          ],
        },

        // ── STAGE 4.2-DELIVER: Jade Visage Pill → Linshu becomes solid ────────
        {
          condition: 'tuTien_q4_2_given == 1 && Jade_Visage_Pill >= 1',
          notifyCondition: 'Jade_Visage_Pill >= 1',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Jade Visage Pill' },
              amount: '1',
            },
            {
              kind: 'text',
              // TODO: Apply Linshu imageOverride here to switch from spectral to solid portrait.
              // Condition for solid variant: 'tuTien_q4_2_given >= 2'
              // See HANDOFF.md "imageOverride" section for the pattern.
              text:
                'Linshu holds the pill between her fingers for a long moment, as if weighing ' +
                'the boundary between existence and dream. Then she swallows it. For an instant, ' +
                'the world falls silent. Her form fractures into light, then reforms. The shifting ' +
                'outline of her spirit-body steadies, becoming vivid, anchored, undeniably real. ' +
                'The garden does not pass through her anymore. She exhales softly, almost ' +
                'disbelieving, and slowly raises her hand. Linshu reaches out and brushes your ' +
                'cheek. Warmth. Real warmth, like living sunlight after a long winter.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I... I can feel you. The wind isn\'t just a sound anymore." ' +
                '(a small, breathless laugh of relief)',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Thank you… I feel as if something I didn\'t even realize I was carrying ' +
                'has finally been set down. This is my personal seal from the old days. Keep it ' +
                'with you — it will watch over you when I cannot."',
            },
            {
              // Linshu's Worn Seal — starting talisman of the seal upgrade chain.
              // TODO: Lore v5 requests tier 3 seal (Linshu's Radiant Seal) with pot 6.
              // Update item name here once confirmed by writer/dev in a dedicated session.
              kind: 'addItem',
              item: { name: "Linshu's Worn Seal" },
              amount: '1',
            },
            { kind: 'flag', global: true, flag: 'tuTien_q4_2_given', value: '2' },
            { kind: 'clearCharacter' },
          ],
        },

        // ── BRIDGE 4.2→4.3: Quest 4.3 given on next visit ────────────────────
        {
          condition: 'tuTien_q4_2_given == 2 && tuTien_q4_3_given == 0',
          notifyCondition: 'tuTien_q4_2_given == 2 && tuTien_q4_3_given == 0',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Now that I have my strength back, the silence of this estate is starting ' +
                'to bother me. Our family were Scribes. We recorded the secrets of the universe. ' +
                'But look at our shelves — empty. Dust and shadows."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I can feel the \'memory\' of our books drifting in the collective aether, ' +
                'but I need a conductor to pull them back into reality. Shimmering Copperite ' +
                'resonates with the frequency of stored knowledge. If you bring me five pieces, ' +
                'I can rebuild our Archive."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Let us bring the light of wisdom back to the Observatory. I want to see ' +
                'you reading the true history of our people, not the filtered lies of the ' +
                'current sects."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I\'ll gather the Copperite. Let\'s rebuild the library."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"Excellent. Five pieces of Shimmering Copperite should be enough to start."',
                    },
                    { kind: 'quest', quest: 'tuTien_q4_3_archive' },
                    { kind: 'flag', global: true, flag: 'tuTien_q4_3_given', value: '1' },
                  ],
                },
                {
                  text: '"I\'m a bit busy with cultivation right now. Later."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Of course. The dust has been here for two millennia. It can wait ' +
                        'until you are ready."',
                    },
                    // Quest not given — condition stays true, bridge fires again on next visit.
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 4.3-WAIT: Waiting for Shimmering Copperite ─────────────────
        {
          condition: 'tuTien_q4_3_given == 1 && Shimmering_Copperite < 5',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Five pieces of Shimmering Copperite. The records are scattered across ' +
                'the aether, waiting for us to draw them back home."',
            },
          ],
        },

        // ── STAGE 4.3-DELIVER: Have Copperite → Library + Chain 4 complete ────
        {
          condition: 'tuTien_q4_3_given == 1 && Shimmering_Copperite >= 5',
          notifyCondition: 'Shimmering_Copperite >= 5',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'removeItem',
              item: { name: 'Shimmering Copperite' },
              amount: '5',
            },
            {
              kind: 'text',
              text:
                'The empty shelves of the library begin to glow faintly. One by one, ' +
                'spectral scrolls and jade slips emerge from the aether, solidifying as they ' +
                'settle upon the wood.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"It worked! It\'s only a fraction of what we once had, but it is a start. ' +
                'The history of Linghe, the musings on Qi... it\'s all here."',
            },
            {
              kind: 'text',
              text: '(a soft, relieved pause)',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Whenever the outside world grows too loud, come here. Rest among the ' +
                'words of our ancestors… and find your peace."',
            },
            {
              kind: 'text',
              text: 'Estate Library unlocked. Ancient records are now accessible within the estate.',
            },
            { kind: 'flag', global: true, flag: 'tuTien_libraryUnlocked', value: '1' },
            { kind: 'flag', global: true, flag: 'tuTien_q4_3_given', value: '2' },
            { kind: 'flag', global: true, flag: 'tuTien_chain4Complete', value: '1' },
            { kind: 'clearCharacter' },
          ],
        },

        // ═════════════════════════════════════════════════════════════════════
        // CHAIN 5: THE ALCHEMIST'S ECHO
        // ═════════════════════════════════════════════════════════════════════

        // ── GATE 4→5 LOW: Chain 4 done, craftskill too low ───────────────────
        {
          condition:
            'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftskill < 300',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I\'m starting to remember her, Little Danxi. My best friend - the ' +
                'Empire\'s Chief Alchemist. I think there might be a way to find her, but the ' +
                'method requires a steady, experienced alchemist\'s hand. Your crafting skill ' +
                'isn\'t quite there yet. Study the flames, practice your art, and come back to me."',
            },
          ],
        },

        // ── STAGE 5-UNLOCK: craftskill >= 300 → Chain 5 begins ───────────────
        {
          condition:
            'tuTien_chain4Complete == 1 && tuTien_q5_1_given == 0 && craftskill >= 300',
          notifyCondition:
            'tuTien_chain4Complete == 1 && craftskill >= 300',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'text',
              text:
                'Linshu is looking at a scorched mark on the floor of the alchemy room. ' +
                'Something in her expression is slightly different than usual.',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"I was cleaning the furnaces today, and I remembered her. Little Danxi. ' +
                'She was arrogant, loud, and constantly complained that my star-charts distracted ' +
                'her from her cauldron. But she was the greatest Alchemist the Empire ever saw."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Back then, I could no longer sense her after she left the estate… only ' +
                'that she never returned. I assumed she had met with misfortune."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"But now that my senses are restored… I can feel something still lingering ' +
                'within the peaks. A sealed spatial signature… faint, but alive. Something must ' +
                'have happened there… her spatial ring is intact, but it is acting like a sealed ' +
                'vessel, holding something within."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"But the seal is failing. The pocket dimension is destabilizing. If it ' +
                'collapses now, she will be erased inside it." ' +
                '(a softer, urgent tone) "We have to retrieve her before it gives way."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I\'ll go to Jingdi Roost and find her ring."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text:
                        '"Be careful. The Jingdi Roost is a death sentence to all but the ' +
                        'prepared. The winds alone can strip flesh from bone, and the King-Beasts ' +
                        'rule its heights without mercy."',
                    },
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"It\'s dangerous to go alone. Take this."',
                    },
                    {
                      kind: 'addItem',
                      item: { name: 'Ancient Regeneration Pill (V)' },
                      amount: '3',
                    },
                    { kind: 'quest', quest: 'tuTien_q5_1_roost' },
                    { kind: 'flag', global: true, flag: 'tuTien_q5_1_given', value: '1' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 5.1-WAIT: Waiting for Scratched Bronze Ring ────────────────
        {
          condition: 'tuTien_q5_1_given == 1 && Scratched_Bronze_Ring < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text: '"(pacing anxiously) Have you found the ring yet?"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"The spatial seal… it\'s weakening. I can feel it breaking apart."',
            },
          ],
        },

        // ── STAGE 5.1-DELIVER: Have ring → Quest 5.2 given ───────────────────
        {
          condition: 'tuTien_q5_1_given == 1 && Scratched_Bronze_Ring >= 1',
          notifyCondition: 'Scratched_Bronze_Ring >= 1',
          event: [
            { kind: 'setCharacter', character: CHAR },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"(holding the bronze ring with trembling hands) The seal is corroded by ' +
                'spatial decay… I can hear her. She\'s attempting to refine the void within ' +
                'the ring itself just to remain alive."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"We cannot break this from within. The spatial mechanisms must be forced ' +
                'open from the outside with a massive surge of Cloud-energy — enough to reawaken ' +
                'the flow of the seal."',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Something like a Storm Orb…"',
            },
            {
              kind: 'text',
              text: '(a tense pause)',
            },            
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"But I do not know where one could be found. If we are to save her, ' +
                'we will have to search for it."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: '"I\'ll find the Storm Orb. We\'ll open the seal."',
                  children: [
                    {
                      kind: 'speech',
                      character: CHAR,
                      text: '"Then I will wait for your return… and keep her stable as long as I can."',
                    },
                    { kind: 'quest', quest: 'tuTien_q5_2_danxi' },
                    { kind: 'flag', global: true, flag: 'tuTien_q5_2_given', value: '1' },
                    { kind: 'flag', global: true, flag: 'tuTien_q5_1_given', value: '2' },
                  ],
                },
              ],
            },
            { kind: 'clearCharacter' },
          ],
        },

        // ── STAGE 5.2-WAIT: Waiting for Storm Orb ────────────────────────────
        {
          condition: 'tuTien_q5_2_given == 1 && Storm_Orb < 1',
          event: [
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"Is there any sign of the Storm Orb? The ring is becoming harder to ' +
                'stabilize… the seal is losing its balance."',
            },
          ],
        },

        // ── STAGE 5.2-DELIVER: Have Storm Orb → Danxi released ───────────────
        {
          condition: 'tuTien_q5_2_given == 1 && Storm_Orb >= 1',
          notifyCondition: 'Storm_Orb >= 1',
          event: [
            { kind: 'setCharacter', character: CHAR },
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
                'You crush the Storm Orb against the ring. A violent vortex of wind and ' +
                'green lightning erupts. The ring fractures instantly, and a thick cloud of ' +
                'pungent smoke engulfs the room.',
            },
            // ── DANXI LINES (text steps — Danxi not yet registered as a Character) ──
            // Once danxi.ts is built and registered, convert each text step below
            // to: { kind: 'speech', character: 'Danxi', text: '...' }
            // Remove the narrator prefix and keep only the quoted dialogue.
            {
              kind: 'text',
              text:
                'From within the smoke, a voice explodes: ' +
                '"COUGH! HACK! Which... absolute moron used a Storm Orb?!"',
            },
            {
              kind: 'text',
              text:
                'A small figure stomps out of the smoke, violently waving it away with ' +
                'her bare hands. She looks surprisingly young, her dark hair tied in twin buns ' +
                'with fiery red streaks. Heavy alchemist robes clink with glass vials and ' +
                'dangling pouches that jostle with every furious step. She points an accusatory ' +
                'finger directly at your face, her dark eyes blazing.',
            },
            {
              kind: 'text',
              text:
                '"Linshu? Is that you? You look... better than I remember. Less ' +
                'transparent. Has it been two hundred years? Five hundred?"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text: '"Two thousand, Danxi."',
            },
            {
              kind: 'text',
              text:
                '(a beat of silence) "Two ...thousand?!" ' +
                '(she clicks her tongue, already dismissing the impossibility) ' +
                '"My pill must be completely ruined."',
            },
            {
              kind: 'text',
              text: '"And who is this brat? Why do you smell like Storm Orb residue and bad decisions?"',
            },
            {
              kind: 'speech',
              character: CHAR,
              text:
                '"(laughing softly, hugging Danxi like nothing happened) ' +
                'She saved your life, you grumpy old furnace-clog. Be nice."',
            },
            {
              // {playerName} — correct variable name TBD next session.
              kind: 'speech',
              character: CHAR,
              text:
                '"This is our Little {playerName}, the one who now carries the Azurite line."',
            },
            {
              kind: 'text',
              text:
                'Danxi doesn\'t respond immediately. She circles her jade fan once in her ' +
                'hand, pretending to adjust the airflow of the room. But her gaze has already ' +
                'mapped you. Bone structure of your qi flow. Stability of your meridians. The ' +
                'way your spirit pressure doesn\'t collapse under hers — even slightly. ' +
                'A flicker of interest. Gone in an instant.',
            },
            {
              kind: 'text',
              text: '(stares, unimpressed, then scoffs) "Hmph. We\'ll see."',
            },
            {
              kind: 'text',
              text:
                '"Blood means nothing if the technique is sloppy. If {he/she} wants me ' +
                'to refine anything better than a sugar cube, {he\'d/she\'d} better find a ' +
                'cauldron that isn\'t made of rusted scrap metal. Now move aside —" ' +
                '(She snaps her jade fan open, already turning away.) ' +
                '"Now move. I need to check whether my recipe formulas survived that ' +
                'spatial trash-heap you call a ring."',
            },
            { kind: 'flag', global: true, flag: 'tuTien_danxiUnlocked', value: '1' },
            { kind: 'flag', global: true, flag: 'tuTien_q5_2_given', value: '2' },
            { kind: 'flag', global: true, flag: 'tuTien_chain5Complete', value: '1' },
            // TODO: add { kind: 'updateCharacterDefinition', character: 'Danxi' }
            // once danxi.ts is registered — needed so Danxi appears at the estate immediately.
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
