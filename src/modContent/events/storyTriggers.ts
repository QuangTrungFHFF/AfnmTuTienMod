import { TriggeredEvent } from 'afnm-types';

// ─── Story Triggered Events ───────────────────────────────────────────────────
// Three-event chain that carries the player from Nine Mountain Sect
// through to unlocking the Azureline Sanctuary.
//
// Flow:
//   1. beadDelivery   → gives Worn Glass Bead to new players
//   2. aFeverInBlood  → bead shatters into Sigil (requires bodyForging + tutorials done)
//   3. thirdSilence   → mercury wall at Ancestral Barrows, unlocks Crypt
//   4. sentinelEncounter → boss fight, Keystone reward
//   5. veilLifts      → Keystone used at Falling Star Observatory, estate unfolds
//
// Dialog source: lore_dialog_v5_synchronized.txt
// Location name: Observatory Estate → Azureline Sanctuary
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
// The bead activates in a separate event (aFeverInBlood).
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
          'As you move through the sect grounds, your chest still aches faintly from ' +
          'where Tidao Feng\'s heavenly tribulation lightning pierced you. You reach into ' +
          'your robes and feel something in your pocket, a dull glass bead. It was the only ' +
          'thing you managed to grab before the beast destroyed your house. You don\'t know ' +
          'why you still carry it, but it feels warm to the touch.',
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
          'found you. You have been cultivating for some time now.' +
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
// Mercury wall, Crypt discovery. Fires at Ancestral Barrows once.
// screens: ['map'] — Barrows shows "Explore" not "Enter", so has no location screen.
const thirdSilence: TriggeredEvent = {
  name: 'tuTien_thirdSilence',
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
          'You stand between the Crypt of the Fist and the Crypt of the Blossom. ' +
          'Other cultivators walk past without a second glance. ' +
          'But the Sigil on your belt is pulling toward a wall that — shouldn\'t move.',
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
                kind: 'location',
                location: 'Crypt of the Aetheric Chart',
                updatePlayerLocation: true,
              },
            ],
          },
          {
            text: 'Not yet. I\'m not ready.',
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
// button / no location screen), so static NPCs never appear there.
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
            // Hint: guide player to use the Keystone at Falling Star Observatory.
            kind: 'text',
            text:
              'The Keystone resonates with the high peaks near the Falling Star Observatory. ' +
              'Seek the hidden fold in the mist.',
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
// is obtained. The Keystone is consumed — it IS the estate's anchor pin.
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
          'As you hold the Keystone aloft, the thick mountain mists scream and part like torn silk. ' +
          'Reality itself seems to peel back, revealing a hidden valley ' +
          'where the sky is a deep, eternal twilight.',
      },
      {
        kind: 'text',
        text:
          'Before you lies the Azureline Sanctuary. It is a skeleton of its former glory. ' +
          'pagodas lean at impossible angles, and once-magnificent bronze machinery lies ' +
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
        location: 'Azureline Sanctuary',
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
          'I used to watch over you in these gardens when you were no larger than a flower-bud, ' +
          'before everything changed, when the surviving elders hid you among the commoners to keep you safe"',
      },
      {
        kind: 'choice',
        choices: [
          {
            text: '"Who are you? You talk as if we are family, but I\'m just a commoner from a poor village. I have no memories of this place or of you!"',
            children: [
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"Lucky? Silly Little one. ' +
                  'You think a mortal child survives a direct lightning strike from an Elder by chance alone?"',
              },
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"(her smile turns bittersweet, and she reaches out — her hand passes through ' +
                  'your shoulder like cold mist) Memories can be buried by time or sealed by arts, ' +
                  'Little {Brother/Sister}, but the blood never forgets. I have spent centuries ' +
                  'drifting in the aether, watching your soul cycle through the mortal world like ' +
                  'a flickering candle in a storm. I was beginning to fear the Azurite spark had ' +
                  'gone out forever."',
              },
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"But then came that day at the farm. Tidao Feng\'s lightning strike was meant ' +
                  'to be an end, but for you, it was a beginning. The lightning didn\'t save you ' +
                  'out of mercy — it recognised the resonance of the Falling Stars in your veins. ' +
                  'It was the anvil upon which your dormant lineage was reforged. You are the echo ' +
                  'of an Empire, finally come home."',
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
                  'For two thousand years, we were the Star-Gazers, the ones who mapped the will ' +
                  'of the Heavens. When the Empire fell, our last master folded this entire estate ' +
                  'into a pocket of space to keep our secrets from the thieves and squatters who ' +
                  'now call themselves \'Sects\'."',
              },
              {
                kind: 'speech',
                character: 'Linshu',
                text:
                  '"(gestures to the rusted gears around you) It may look like a graveyard of ' +
                  'rust to your eyes, Little {Brother/Sister}, but these machines are simply ' +
                  'asleep, waiting for the one person whose blood can wake them. You think you ' +
                  'are a commoner, yet the resonance in your heart says otherwise. That lightning ' +
                  'strike from the Elder? It was the key that finally turned the lock in your soul. ' +
                  'I have been watching the mists for so long, praying that the heir of the ' +
                  'Star-Gazers would find the way back to her seat."',
              },
            ],
          },
        ],
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"(her form flickers violently, turning grey for a moment) I am Linshu — ' +
          'the spirit of this Estate\'s Great Formation. I was created to be the memory of our ' +
          'house, and the guardian of its heir. But a formation is like a lamp, and I have been ' +
          'burning the last of my oil for far too long."',
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"(she looks down at her hands, which are turning transparent and grey) ' +
          'Look at me, Little {Brother/Sister}... I am fading. I spent the last of my essence ' +
          'to tear the veil and bring you here. My light is almost spent. If I vanish, this ' +
          'pocket of reality will collapse, and our history will be erased forever."',
      },
      {
        kind: 'speech',
        character: 'Linshu',
        text:
          '"You\'ve finally reached the door, but you haven\'t taken the seat of the ' +
          '{Master/Mistress} yet. Stay close to me. Breathe with the rhythm of the estate. ' +
          'I need you to help me anchor this place back to the world before I become nothing ' +
          'more than a whisper in the wind."',
      },
      { kind: 'clearCharacter' },
      // Move player to the estate — updatePlayerLocation: true is required
      // to actually move the player (without it, this only temporarily changes
      // the context and then snaps back).
      {
        kind: 'location',
        location: 'Azureline Sanctuary',
        updatePlayerLocation: true,
      },
    ],
  },
};

// ─── DEBUG: Skip to estate (comment out for release) ─────────────────────────
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
      { kind: 'unlockLocation', location: 'Azureline Sanctuary' },
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
