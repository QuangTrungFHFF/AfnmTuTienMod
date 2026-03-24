import { Character } from 'afnm-types';
import { G } from '../constants';
import spiritGuardianPortrait from '../../assets/characters/spiritGuardian_p.webp';
import spiritGuardianImage from '../../assets/characters/spiritGuardian_full.webp';

// ─── Aetheric Sentinel ────────────────────────────────────────────────────────
// A minimal character definition used ONLY for speech step attribution
// (portrait + name display in dialogue boxes).
//
// The actual FIGHT uses a native game monster ("Automated Combatant",
// meridianOpening Late, hard) via a 'combat' event step in storyTriggers.ts.
// This approach avoids having to hand-build a complete EnemyEntity.
//
// The Sentinel appears as a location character in the Crypt so it can be seen,
// but has no talkInteraction, shopInteraction, or combat — it is purely narrative.

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
          // Only show when crypt is found and sentinel not yet defeated
          condition: 'tuTien_cryptDiscovered == 1 && tuTien_sentinelDefeated == 0',
          location: 'Crypt of the Aetheric Chart',
        },
      ],
      encounters: [],
      // No talkInteraction — the encounter is handled by the storyTriggers combat event.
    },
  ],
};

export function initializeAethericSentinel(): void {
  window.modAPI.actions.addCharacter(aethericSentinel);
  console.log('✅ Aetheric Sentinel registered (speech display only).');
}
