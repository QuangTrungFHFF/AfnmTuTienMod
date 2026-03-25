import { Character } from 'afnm-types';
import { G } from '../constants';
import spiritGuardianPortrait from '../../assets/characters/spiritGuardian_p.webp';
import spiritGuardianImage from '../../assets/characters/spiritGuardian_full.webp';

// ─── Aetheric Sentinel ────────────────────────────────────────────────────────
// Guardian-construct of the Azurite Empire, sealed in the Crypt of the Aetheric
// Chart. The player fights it by clicking the NPC directly via talkInteraction.
//
// Two talkInteraction entries:
//   1. condition '1' (pre-fight)  — shows when sentinelDefeated == 0
//   2. condition '1' (post-fight) — shows when sentinelDefeated == 1
// The location condition gates NPC visibility, so only the correct one shows.
//
// The fight uses the native "Automated Combatant" monster (meridianOpening Late,
// hard) fetched from gameData.monsters — no hand-built EnemyEntity required.

export const aethericSentinel: Character = {
  name: 'Aetheric Sentinel',
  allegiance: undefined,
  bio:
    'The last functional guardian-construct of the Azurite Empire, sealed within ' +
    'the Crypt of the Aetheric Chart alongside the Celestial Keystone. ' +
    'Two thousand years of waiting have not dulled its protocols.',
  condition: 'tuTien_cryptDiscovered == 1',
  portrait: spiritGuardianPortrait,
  image:    spiritGuardianImage,
  definitions: [
    // Post-defeat only — shows the broken remains as a quiet trophy presence.
    // The fight itself is handled by the sentinelEncounter TriggeredEvent,
    // which uses screens: ['map'] at the Crypt (an Explore-type location).
    {
      kind: 'neutral',
      condition: '1',
      realm: 'meridianOpening',
      realmProgress: 'Late',
      stats: [],
      locations: [
        {
          kind: 'static',
          condition: 'tuTien_sentinelDefeated == 1',
          location: 'Crypt of the Aetheric Chart',
        },
      ],
      encounters: [],
      talkInteraction: [
        {
          condition: '1',
          event: [
            {
              kind: 'text',
              text:
                'The shattered remains of the Aetheric Sentinel lie still on the crypt floor. ' +
                'Its eye-lenses are dark. Two thousand years of vigilance, ended.',
            },
          ],
        },
      ],
    },
  ],
};

export function initializeAethericSentinel(): void {
  window.modAPI.actions.addCharacter(aethericSentinel);
  console.log('✅ Aetheric Sentinel registered.');
}
