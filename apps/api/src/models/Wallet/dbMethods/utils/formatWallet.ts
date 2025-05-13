import { WalletAttributes } from "commons";
import { WalletInstance } from "../../types";

export function formatWallet(client: WalletInstance): WalletAttributes {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}

export function formatWallets(clients: WalletInstance[]): WalletAttributes[] {
  return clients.map(formatWallet);
}
