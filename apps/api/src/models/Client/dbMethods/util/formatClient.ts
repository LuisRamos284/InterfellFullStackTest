import { ClientAttributes } from "commons";
import { ClientInstance } from "../../types";

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

