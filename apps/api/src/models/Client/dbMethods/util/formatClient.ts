import { ClientAttributes, ClientWithWalletAndEventsResponse } from "commons";
import {
  ClientInstance,
  GetClientByIdFromDb,
  GetClientFromDb,
} from "../../types";
import { formatClientWalletWithEvents } from "../../../Wallet/dbMethods/utils/formatClientWallet";
import { formatWallet } from "../../../Wallet/dbMethods/utils/formatWallet";
import { ClientWithWalletResponse } from "commons/dist/types/models/client";

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

export function formatClientWithWalletAndEvents(
  client: GetClientFromDb
): ClientWithWalletAndEventsResponse {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    wallet: formatClientWalletWithEvents(client.wallet),
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}

export function formatClientWithWallet(
  client: GetClientByIdFromDb
): ClientWithWalletResponse {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    wallet: formatWallet(client.wallet),
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}
