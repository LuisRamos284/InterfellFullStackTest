import { ClientPurchaseAttributes } from "commons";
import { ClientPurchaseInstance } from "../../types";

export function formatClientPurchase(
  client: ClientPurchaseInstance
): ClientPurchaseAttributes {
  const clientDataToReturn = client.get({ plain: true });
  return {
    ...clientDataToReturn,
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
    deletedAt: client.deletedAt?.toISOString() || null,
  };
}

export function formatClientPurchases(
  clients: ClientPurchaseInstance[]
): ClientPurchaseAttributes[] {
  return clients.map(formatClientPurchase);
}
