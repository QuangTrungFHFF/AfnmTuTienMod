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

// ─── Azureline Sanctuary — Transport Seal ────────────────────────────────────
// Teleports the player to the Azureline Sanctuary location.
export const azurelineSanctuarySeal: TransportSealItem = {
  kind: 'transport_seal',
  name: 'Transport Seal (Azureline Sanctuary)',
  description: 'A formation seal attuned to your estate in Azureline Sanctuary. Crush it to be instantly transported there.',
  icon: seal03Icon,
  stacks: 3,
  rarity: 'empowered',
  realm: 'qiCondensation',
  destination: 'Azureline Sanctuary',
};

// ─── Registration ─────────────────────────────────────────────────────────────
// Must be called before locations are initialized, since houseDef references these items.
export function initializeTransportSeals(): void {
  window.modAPI.actions.addItem(herbGardenEstateSeal);
  window.modAPI.actions.addItem(azurelineSanctuarySeal);
}
