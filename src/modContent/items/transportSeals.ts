import { TransportSealItem } from 'afnm-types';
import seal02Icon from '../../assets/items/seal02.webp';
import seal03Icon from '../../assets/items/seal03.webp';

// ─── Spirit Herb Garden Estate — Transport Seal ───────────────────────────────
// Teleports the player to Spirit Herb Garden (where the estate house is).
export const herbGardenEstateSeal: TransportSealItem = {
  kind: 'transport_seal',
  name: 'Transport Seal (Herb Garden Estate)',
  description: 'A formation seal attuned to your estate near the Spirit Herb Garden. Crush it to be instantly transported there.',
  icon: seal02Icon,
  stacks: 3,
  rarity: 'empowered',
  realm: 'qiCondensation',
  destination: 'Spirit Herb Garden',
};

// ─── Observatory Estate — Transport Seal ─────────────────────────────────────
// Teleports the player to the Observatory Estate location.
export const observatoryEstateSeal: TransportSealItem = {
  kind: 'transport_seal',
  name: 'Transport Seal (Observatory Estate)',
  description: 'A formation seal attuned to your estate near the Falling Star Observatory. Crush it to be instantly transported there.',
  icon: seal03Icon,
  stacks: 3,
  rarity: 'empowered',
  realm: 'qiCondensation',
  destination: 'Observatory Estate',
};

// ─── Registration ─────────────────────────────────────────────────────────────
// Must be called before locations are initialized, since houseDef references these items.
export function initializeTransportSeals(): void {
  window.modAPI.actions.addItem(herbGardenEstateSeal);
  window.modAPI.actions.addItem(observatoryEstateSeal);

  // Both seals are craftable in the house Transport Array room —
  // no shop listing needed. Players obtain them by building the room.
}
