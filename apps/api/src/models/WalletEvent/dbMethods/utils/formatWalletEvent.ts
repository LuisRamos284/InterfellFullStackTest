import { WalletEventAttributes } from "commons";
import { WalletEventInstance } from "../../types";

export function formatWalletEvent(
  client: WalletEventInstance
): WalletEventAttributes {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}

export function formatWalletEvents(
  clients: WalletEventInstance[]
): WalletEventAttributes[] {
  return clients.map(formatWalletEvent);
}
