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
    {
      kind: 'neutral',
      condition: '1',
      realm: 'meridianOpening',
      realmProgress: 'Late',
      stats: [],
      locations: [
        {
          kind: 'static',
          // Show pre-fight version while still standing
          condition: 'tuTien_cryptDiscovered == 1 && tuTien_sentinelDefeated == 0',
          location: 'Crypt of the Aetheric Chart',
        },
      ],
      encounters: [],

      // ── Pre-fight talk: clicking the Sentinel triggers the combat ──────────
      talkInteraction: [
        {
          // PRE-FIGHT — shown when not yet defeated
          condition: 'tuTien_sentinelDefeated == 0',
          event: [
            {
              kind: 'text',
              text:
                'The brass construct rotates to face you. Eye-lenses flood with cold light ' +
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
          ],
        },
        {
          // POST-FIGHT — shown after victory (NPC still visible as a quiet trophy)
          condition: 'tuTien_sentinelDefeated == 1',
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
    // Post-defeat definition: shows the broken remains as a static location presence
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
