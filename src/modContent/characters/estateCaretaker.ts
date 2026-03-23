import { Character } from 'afnm-types';
import { G } from '../constants';
import caretakerPortrait from '../../assets/characters/xiaomiao_p.webp';
import caretakerImage from '../../assets/characters/xiaomiao_full.webp';

// ─── Estate Caretaker ─────────────────────────────────────────────────────────
// The caretaker manages the Observatory Estate, accepts supply deliveries,
// and rewards the player with reputation and spirit stones.
//
// Portrait/image: replace the placeholder URLs below with actual game assets
// from C:\afnm-extracted\dist-electron\ once you find one you like.
// Good candidates to search for: any male/female NPC portrait .webp files.

export const estateCaretaker: Character = {
  name: 'Estate Caretaker',
  displayName: 'Estate Caretaker',
  allegiance: undefined, // neutral — accessible to all players
  bio:
    'A quiet, methodical cultivator who manages the day-to-day affairs of the ' +
    'Observatory Estate. He oversees supply procurement and maintains order ' +
    'across the grounds.',
  condition: '1', // always visible  
  portrait: caretakerPortrait,
  image: caretakerImage,
  definitions: [
    {
      kind: 'neutral',
      condition: '1',
      realm: 'qiCondensation',
      realmProgress: 'Middle',
      stats: [],  // no combat — not sparrable
      locations: [
        {
          kind: 'static',
          condition: '1',
          location: 'Observatory Estate',
        },
      ],
      encounters: [],
      talkInteraction: [
        // ── General greeting (always available) ─────────────────────────────
        {
          condition: '1',
          event: [
            {
              kind: 'speech',
              character: 'Estate Caretaker',
              text: '"Welcome back, {forename}. The estate runs smoothly today. ' +
                'If you have supplies to deliver, bring them to me and I shall see you rewarded."',
            },
            {
              kind: 'choice',
              choices: [
                {
                  text: 'What supplies does the estate need?',
                  children: [
                    {
                      kind: 'speech',
                      character: 'Estate Caretaker',
                      text: '"We maintain a standing request board near the entrance. ' +
                        'Check it and accept any commission that suits you. ' +
                        'Collect the listed materials and return to me - ' +
                        'I will process the delivery and settle your reward."',
                    },
                  ],
                },
                {
                  text: 'Tell me about the estate.',
                  children: [
                    {
                      kind: 'speech',
                      character: 'Estate Caretaker',
                      text: '"This estate sits at the convergence of several ley lines - ' +
                        'ideal for both cultivation and strategic positioning. ' +
                        'We have a working herb field and transport formation. ' +
                        'The market stocks supplies for long-range operations."',
                    },
                  ],
                },
                {
                  text: 'Farewell.',
                  children: [
                    {
                      kind: 'speech',
                      character: 'Estate Caretaker',
                      text: '"Safe travels. The estate will be here when you return."',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      shopInteraction: [],
    },
  ],
};

export function initializeEstateCaretaker(): void {
  window.modAPI.actions.addCharacter(estateCaretaker);
  console.log('✅ Estate Caretaker registered.');
}
