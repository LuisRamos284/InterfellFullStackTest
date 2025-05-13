import { ClientAttributes, ClientWithWalletResponse } from "commons";
import { ClientInstance, GetClientFromDb } from "../../types";
import { formatClientWallet } from "../../../Wallet/dbMethods/utils/formatClientWallet";

export function formatClient(client: ClientInstance): ClientAttributes {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}

export function formatClients(clients: ClientInstance[]): ClientAttributes[] {
  return clients.map(formatClient);
}

export function formatClientWithWallet(
  client: GetClientFromDb
): ClientWithWalletResponse {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    wallet: formatClientWallet(client.wallet),
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}
