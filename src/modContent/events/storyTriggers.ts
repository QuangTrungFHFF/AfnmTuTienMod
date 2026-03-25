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
          'Return, Young {Master/Mistress}. ' +
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
  // Fires on the world map when the player visits Ancestral Barrows.
  // screens: ['map'] is used because the Barrows shows "Explore" not "Enter",
  // so it has no location screen — 'location' would never fire there.
  // Condition simplified: beadActivated is sufficient, item flag lookup for
  // talisman items can be unreliable depending on equipped vs inventory state.
  trigger:
    'tuTien_beadActivated == 1 && ' +
    'tuTien_cryptDiscovered == 0',
  screens: ['map'],
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
              {
                // Teleport directly into the Crypt — no map-hunting required.
                // updatePlayerLocation: true is required or this only flashes
                // the background and snaps back.
                // The sentinelEncounter TriggeredEvent fires immediately on
                // arrival because its trigger is now satisfied:
                //   tuTien_cryptDiscovered == 1 && tuTien_sentinelDefeated == 0
                //   screens: ['map'], locations: ['Crypt of the Aetheric Chart']
                kind: 'location',
                location: 'Crypt of the Aetheric Chart',
                updatePlayerLocation: true,
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

// ─── 4. Sentinel Encounter ────────────────────────────────────────────────────
// Fires on the MAP at Crypt of the Aetheric Chart — exactly like thirdSilence
// fires at Ancestral Barrows. The Crypt is an Explore-type location (no Enter
// button / no location screen), so static NPCs never appear there. This
// triggered event is the only reliable way to deliver the fight.
// Fires exactly once: condition becomes false after sentinelDefeated == 1.
const sentinelEncounter: TriggeredEvent = {
  name: 'tuTien_sentinelEncounter',
  trigger: 'tuTien_cryptDiscovered == 1 && tuTien_sentinelDefeated == 0',
  screens: ['map'],
  locations: ['Crypt of the Aetheric Chart'],
  event: {
    location: 'Crypt of the Aetheric Chart',
    steps: [
      {
        kind: 'text',
        text:
          'Cold blue light fills the vaulted chamber. ' +
          'Ancient formation diagrams cover every wall, breathing with a slow metallic hum. ' +
          'And in the center — something turns to face you.',
      },
      {
        kind: 'setCharacter',
        character: 'Aetheric Sentinel',
      },
      {
        kind: 'text',
        text:
          'The brass construct rotates, eye-lenses flooding with cold light ' +
          'as long-dormant systems restart.',
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
            kind: 'setCharacter',
            character: 'Aetheric Sentinel',
          },
          {
            kind: 'speech',
            character: 'Aetheric Sentinel',
            text:
              '"Insufficient. Return when your cultivation matches your bloodline\'s ambition."',
          },
          { kind: 'clearCharacter' },
          { kind: 'exit' },
        ],
      },
      { kind: 'clearCharacter' },
    ],
  },
};

// ─── 5. The Veil Lifts ────────────────────────────────────────────────────────
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
      // Force Linshu's character placement to re-evaluate now that the flag is set.
      // Without this, she may not appear at the estate until the next game load.
      {
        kind: 'updateCharacterDefinition',
        character: 'Linshu',
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
          '"Look at you... you\'ve finally returned to us. ' +
          'I used to carry you through these gardens when you were no larger than a flower-bud, ' +
          'before the sky fell and we had to hide you among the commoners to keep you safe."',
      },
      {
        kind: 'choice',
        choices: [
          {
            text: '"Who are you? You talk as if you know me — I grew up on a dirt farm. I\'m nobody."',
            children: [
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"Lucky? Silly Little {Brother/Sister}." ' +
                  '(She reaches out to brush a stray hair from your face. Her hand passes through you like cold wind.) ' +
                  '"You think a mortal survives a direct lightning strike from a Fifth Elder because of \'luck\'?"',
              },
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"That bolt was meant to purify the world, but your blood is Azurite — ' +
                  'forged in the heart of falling stars. ' +
                  'When Tidao Feng\'s Blossom Qi hit you, it was like a spark hitting a mountain of dry tinder. ' +
                  'The lightning didn\'t save you. It sang to you. It recognised its Young {Master/Mistress}."',
              },
            ],
          },
          {
            text: '"What is this place? It looks like a graveyard for machines."',
            children: [
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"This is the Aetheric Chart House — the heart of our family\'s legacy. ' +
                  'For two thousand years, we were the Star-Gazers, the ones who mapped the will of the Heavens. ' +
                  'When the Empire fell, our last master folded this entire estate into a pocket of space ' +
                  'to keep our secrets from the thieves and squatters who now call themselves \'Sects\'."',
              },
            ],
          },
        ],
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"I am Linshu — the spirit of this Estate\'s Great Formation. ' +
          'But a formation cannot last forever without a master to feed it. ' +
          'I have spent every drop of my essence keeping this place hidden ' +
          'while you were \'sleeping\' in the world of mortals."',
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"Look at me, Little {Brother/Sister}... I am fading. My light is almost spent. ' +
          'If I vanish, the formation collapses, and this entire valley — ' +
          'along with the history of our people — will be crushed by the weight of the outside world. ' +
          'You have the blood, but you lack the strength to anchor me yet. ' +
          'Come to the estate. Talk to me there."',
      },
      { kind: 'clearCharacter' },
      // Move player to the estate — updatePlayerLocation: true is required
      // to actually move the player (without it, this is only a temporary
      // context change that flashes the estate background then snaps back).
      {
        kind: 'location',
        location: 'Observatory Estate',
        updatePlayerLocation: true,
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
  window.modAPI.actions.addTriggeredEvent(sentinelEncounter);
  window.modAPI.actions.addTriggeredEvent(veilLifts);
  // window.modAPI.actions.addTriggeredEvent(debugSkip); // Uncomment for testing
  console.log('✅ Story triggered events registered: bead delivery, fever, third silence, sentinel encounter, veil lifts.');
}
