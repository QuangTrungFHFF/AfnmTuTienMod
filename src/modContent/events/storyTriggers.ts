import { TriggeredEvent } from 'afnm-types';

// ─── Story Triggered Events ───────────────────────────────────────────────────
// Three-event chain that carries the player from Nine Mountain Sect
// through to unlocking the Observatory Estate.
//
// Flow:
//   1. beadDelivery   → gives Worn Glass Bead to new players
//   2. aFeverInBlood  → bead shatters into Sigil (requires bodyForging + tutorials done)
//   3. thirdSilence   → mercury wall at Ancestral Barrows, unlocks Crypt
//   4. veilLifts      → Keystone used at Falling Star Observatory, estate unfolds
//
// Trigger flag reference:
//   luGianReturnToSectTutorial  — set by base game after Lu Gian crossroads event
//   tuTien_beadGiven            — player has received the bead
//   tuTien_beadActivated        — bead shattered, Sigil obtained
//   tuTien_cryptDiscovered      — Crypt unlocked at Ancestral Barrows
//   tuTien_keystoneObtained     — Sentinel defeated, Keystone in inventory
//   tuTien_estateUnlocked       — estate revealed, first Linshu meeting done

// ─── 1. Bead Delivery ─────────────────────────────────────────────────────────
// Fires once at Nine Mountain Sect as soon as the mod loads on any existing save.
// Gives the player the starting heirloom so it's in their inventory.
// Simple, no-drama delivery — the bead activates in a separate event.
const beadDelivery: TriggeredEvent = {
  name: 'tuTien_beadDelivery',
  trigger: 'tuTien_beadGiven == 0',
  screens: ['location'],
  locations: ['Nine Mountain Sect'],
  event: {
    location: 'Nine Mountain Sect',
    steps: [
      {
        kind: 'text',
        text:
          'As you move through the sect grounds, you notice something in your pocket — ' +
          'a dull glass bead, the only thing you managed to grab before the fire took your house. ' +
          'You don\'t know why you still carry it.',
      },
      {
        kind: 'addItem',
        item: { name: 'Worn Glass Bead' },
        amount: '1',
      },
      {
        kind: 'flag',
        global: true,
        flag: 'tuTien_beadGiven',
        value: '1',
      },
    ],
  },
};

// ─── 2. A Fever in the Blood ──────────────────────────────────────────────────
// The bloodline awakens. Fires at Nine Mountain Sect once the player has:
//   - Reached Body Forging realm (first real breakthrough)
//   - Completed the main tutorial chain (Lu Gian crossroads event)
//   - Not yet activated the bead
const aFeverInBlood: TriggeredEvent = {
  name: 'tuTien_aFeverInBlood',
  trigger:
    'realm >= bodyForging && ' +
    'luGianReturnToSectTutorial == 1 && ' +
    'tuTien_beadGiven == 1 && ' +
    'tuTien_beadActivated == 0',
  screens: ['location'],
  locations: ['Nine Mountain Sect'],
  event: {
    location: 'Nine Mountain Sect',
    steps: [
      {
        kind: 'text',
        text:
          'The air still carries the last traces of Tidao Feng\'s blossoms from the day she ' +
          'found you. You have been cultivating for some time now — something in you is different. ' +
          'And then the bead in your pocket begins to burn.',
      },
      {
        kind: 'text',
        text:
          'Not heat-burn. Cold-burn. Blue light bleeds through the fabric of your robe. ' +
          'Your chest tightens as if a hammer is striking your ribs from the inside.',
      },
      {
        kind: 'text',
        text: 'The bead is not glass. It never was.',
      },
      {
        kind: 'text',
        // A metallic echo — not quite a voice, more like a resonance inside bone
        text:
          '(A faint, metallic echo reaches you — not from the air, but from your own blood.)\n\n' +
          '"The forge... is cold. ' +
          'The stars... are blind. ' +
          'Return, Young Master. ' +
          'Return to the Barrows of the Scribes."',
      },
      {
        kind: 'text',
        text:
          'The bead shatters. The light collapses inward. ' +
          'Where it was, something else lies in your palm — ' +
          'a sigil etched with a fractured imperial seal that you have never seen before ' +
          'and somehow recognise completely.',
      },
      {
        kind: 'replaceItem',
        source: { name: 'Worn Glass Bead' },
        target: { name: 'Fractured Azurite Sigil' },
      },
      {
        kind: 'flag',
        global: true,
        flag: 'tuTien_beadActivated',
        value: '1',
      },
      {
        kind: 'choice',
        choices: [
          {
            text: 'Follow the sigil\'s pull toward the Ancestral Barrows.',
            children: [
              {
                kind: 'text',
                text:
                  'The sigil thrums with a phantom weight, its needle pointing ' +
                  'toward the Ancestral Barrows with quiet insistence.',
              },
            ],
          },
          {
            text: 'This is too strange. Examine the sigil carefully first.',
            children: [
              {
                kind: 'text',
                text:
                  'The symbols are Azurite-era metallographic script — a dead language ' +
                  'you have no business knowing. Yet you can read it. ' +
                  '"Return. The Archive waits. The Guardian waits. The heir is overdue."',
              },
            ],
          },
        ],
      },
    ],
  },
};

// ─── 3. The Third Silence ─────────────────────────────────────────────────────
// Mercury wall, Crypt discovery, and Sentinel fight — all in one event.
// Fires at Ancestral Barrows once. The actual combat uses "Automated Combatant"
// (meridianOpening Late, hard) — a native game monster that fits the "ancient
// construct" theme perfectly and avoids any hand-built EnemyEntity type errors.
const thirdSilence: TriggeredEvent = {
  name: 'tuTien_thirdSilence',
  trigger:
    'tuTien_beadActivated == 1 && ' +
    'tuTien_cryptDiscovered == 0 && ' +
    'Fractured_Azurite_Sigil >= 1',
  screens: ['location'],
  locations: ['Ancestral Barrows'],
  event: {
    location: 'Ancestral Barrows',
    steps: [
      {
        kind: 'text',
        text:
          'Between the Crypt of the Fist and the Crypt of the Blossom, ' +
          'other cultivators walk past without a second glance. ' +
          "But the Sigil on your belt is pulling toward a wall that — shouldn't move.",
      },
      {
        kind: 'text',
        text:
          'The solid stone ripples. Not like water. More like mercury — ' +
          'dense, heavy, impossibly liquid. A passage forms. ' +
          'No one else looks this way. The door exists only for your eyes.',
      },
      {
        kind: 'text',
        text: 'Beyond it: cold blue light. The hum of very old machinery.',
      },
      {
        kind: 'choice',
        choices: [
          {
            text: 'Step through.',
            children: [
              {
                kind: 'text',
                text:
                  'The mercury wall closes behind you. ' +
                  'The Crypt of the Aetheric Chart has been waiting two thousand years ' +
                  'for someone with your blood.',
              },
              {
                kind: 'unlockLocation',
                location: 'Crypt of the Aetheric Chart',
              },
              {
                kind: 'flag',
                global: true,
                flag: 'tuTien_cryptDiscovered',
                value: '1',
              },
              // ── Sentinel encounter ────────────────────────────────────────
              {
                kind: 'text',
                text:
                  'In the center of the chamber, a construct of ancient brass and blue crystal ' +
                  'rotates to face you. Eye-lenses flood with light as long-dormant systems restart.',
              },
              {
                kind: 'speech',
                character: 'Aetheric Sentinel',
                text:
                  '"Scanning bio-signature... ' +
                  'Analysis: Royal Azurite Blood detected. ' +
                  'Purity: 0.001%. ' +
                  'Status: Disgraceful. ' +
                  'Trial of the Heavens initiated. ' +
                  'Prove your right to the Archive, or become dust for the floor."',
              },
              {
                kind: 'combat',
                // "Automated Combatant" — meridianOpening Late, hard, long.
                // monsters is EnemyEntity[] so use find(), not string index.
                enemies: [window.modAPI.gameData.monsters.find(m => m.name === 'Automated Combatant')!],
                victory: [
                  {
                    kind: 'speech',
                    character: 'Aetheric Sentinel',
                    text:
                      '"Competence... accepted. ' +
                      'Combat parameters: exceeded. ' +
                      'The Keystone is yours. ' +
                      'Do not... let the Star-Eaters find it again."',
                  },
                  {
                    kind: 'text',
                    text:
                      'The construct collapses inward, ancient gears spilling across the stone floor. ' +
                      'A compartment in its chest slides open. ' +
                      'Inside, a prism of cold light hums with the rhythm of your own heartbeat.',
                  },
                  {
                    kind: 'addItem',
                    item: { name: 'Celestial Keystone' },
                    amount: '1',
                  },
                  {
                    kind: 'flag',
                    global: true,
                    flag: 'tuTien_sentinelDefeated',
                    value: '1',
                  },
                  {
                    kind: 'flag',
                    global: true,
                    flag: 'tuTien_keystoneObtained',
                    value: '1',
                  },
                ],
                defeat: [
                  {
                    kind: 'text',
                    text:
                      'The Sentinel lifts you with one brass hand and deposits you ' +
                      'outside the crypt entrance as if discarding a failed test subject.',
                  },
                  {
                    kind: 'speech',
                    character: 'Aetheric Sentinel',
                    text:
                      '"Insufficient. Return when your cultivation matches your bloodline\'s ambition."',
                  },
                  { kind: 'exit' },
                ],
              },
              {
                kind: 'location',
                location: 'Ancestral Barrows',
              },
            ],
          },
          {
            text: "Not yet. I'm not ready.",
            children: [
              {
                kind: 'text',
                text:
                  'The mercury wall holds its shape — patient. ' +
                  'It will still be here when you return.',
              },
              {
                kind: 'unlockLocation',
                location: 'Crypt of the Aetheric Chart',
              },
              {
                kind: 'flag',
                global: true,
                flag: 'tuTien_cryptDiscovered',
                value: '1',
              },
            ],
          },
        ],
      },
    ],
  },
};

// ─── 4. The Veil Lifts ────────────────────────────────────────────────────────
// The estate unfolds. Fires at Falling Star Observatory once the Keystone
// is obtained. The Keystone is consumed — it IS the estate's anchor pin,
// and using it here "grounds" the pocket dimension into the real world.
const veilLifts: TriggeredEvent = {
  name: 'tuTien_veilLifts',
  trigger:
    'tuTien_keystoneObtained == 1 && ' +
    'tuTien_estateUnlocked == 0 && ' +
    'Celestial_Keystone >= 1',
  screens: ['location'],
  locations: ['Falling Star Observatory'],
  event: {
    location: 'Falling Star Observatory',
    steps: [
      {
        kind: 'text',
        text:
          'The Keystone pulses in your hand. ' +
          'You are standing at the Falling Star Observatory, ' +
          'and something in the mist to the west is answering it.',
      },
      {
        kind: 'text',
        text:
          'You hold the Keystone aloft. It doesn\'t so much activate as it remembers. ' +
          'The thick mountain mists scream and part like torn silk. ' +
          'Reality itself seems to peel back — revealing a hidden valley ' +
          'where the sky is a deep, eternal twilight.',
      },
      {
        kind: 'text',
        text:
          'Before you lies the Observatory Estate. It is a skeleton of its former glory. ' +
          'Pagodas lean at impossible angles. Once-magnificent bronze machinery lies ' +
          'rusted and choked by silver weeds. Two thousand years of sleep.',
      },
      // Keystone consumed — it has done its job
      {
        kind: 'removeItem',
        item: { name: 'Celestial Keystone' },
        amount: '1',
      },
      {
        kind: 'unlockLocation',
        location: 'Observatory Estate',
      },
      {
        kind: 'flag',
        global: true,
        flag: 'tuTien_estateUnlocked',
        value: '1',
      },
      {
        kind: 'text',
        text:
          'A soft glow begins to coalesce in the center of the courtyard. ' +
          'Petals of light and sparks of brass weave together into the form of a young woman. ' +
          'She is semi-transparent, her edges flickering like a dying candle.',
      },
      {
        kind: 'setCharacter',
        character: 'Linshu',
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"Oh! You\'re finally here. ' +
          'I was starting to think I\'d have to wait another century. ' +
          'You\'ve grown up... well, you\'ve grown \'at all,\' I suppose. ' +
          'You were much smaller when the Empire fell."',
      },
      {
        kind: 'choice',
        choices: [
          {
            text: '"Who are you? What do you mean \'when I was smaller\'?"',
            children: [
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"Silly Little Brother." ' +
                  '(She pokes your forehead with a cold, spectral finger.) ' +
                  '"You think a peasant survives a direct lightning strike from a Fifth Elder? ' +
                  'That lightning didn\'t save you. It recognised you. ' +
                  'Your bloodline did the rest."',
              },
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"I am Linshu, your Senior Sister. ' +
                  'Or your Caretaker, if you\'re going to be difficult. ' +
                  'This is the family\'s Observatory Estate, and you have a lot of work to do. ' +
                  'Look at me! I\'m fading! I need energy. ' +
                  'Come back when you\'re ready to start."',
              },
            ],
          },
          {
            text: '"What needs to be done?"',
            children: [
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"Straight to business. Good. ' +
                  'I can work with that. ' +
                  'Come to the estate and talk to me there — ' +
                  'I can\'t hold this form much longer outside its walls. ' +
                  'I\'ll explain everything when I\'m not flickering."',
              },
            ],
          },
        ],
      },
      { kind: 'clearCharacter' },
      // Move player to the estate
      {
        kind: 'location',
        location: 'Observatory Estate',
      },
    ],
  },
};

// ─── DEBUG: Skip to estate (comment out for release) ─────────────────────────
// Uncomment this and add it to the registration below to jump straight to
// the estate being unlocked for fast iteration testing.
/*
const debugSkip: TriggeredEvent = {
  name: 'tuTien_debugSkip',
  trigger: 'tuTien_debugSkipDone == 0',
  screens: ['location'],
  event: {
    location: 'Nine Mountain Sect',
    steps: [
      { kind: 'flag', global: true, flag: 'tuTien_beadGiven',       value: '1' },
      { kind: 'flag', global: true, flag: 'tuTien_beadActivated',   value: '1' },
      { kind: 'flag', global: true, flag: 'tuTien_cryptDiscovered', value: '1' },
      { kind: 'flag', global: true, flag: 'tuTien_sentinelDefeated',value: '1' },
      { kind: 'flag', global: true, flag: 'tuTien_keystoneObtained',value: '1' },
      { kind: 'flag', global: true, flag: 'tuTien_estateUnlocked',  value: '1' },
      { kind: 'unlockLocation', location: 'Observatory Estate' },
      { kind: 'flag', global: true, flag: 'tuTien_debugSkipDone',   value: '1' },
    ],
  },
};
*/

// ─── Registration ─────────────────────────────────────────────────────────────

export function initializeStoryTriggers(): void {
  window.modAPI.actions.addTriggeredEvent(beadDelivery);
  window.modAPI.actions.addTriggeredEvent(aFeverInBlood);
  window.modAPI.actions.addTriggeredEvent(thirdSilence);
  window.modAPI.actions.addTriggeredEvent(veilLifts);
  // window.modAPI.actions.addTriggeredEvent(debugSkip); // Uncomment for testing
  console.log('✅ Story triggered events registered: bead delivery, fever, third silence, veil lifts.');
}
