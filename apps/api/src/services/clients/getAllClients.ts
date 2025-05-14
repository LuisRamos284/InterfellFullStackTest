import { ClientAttributes } from "commons";

import { getClientsFromDb } from "../../models/Client/dbMethods/getClientsFromDb";

export const getAllClients = async (): Promise<ClientAttributes[]> => {
  const clients = await getClientsFromDb();
  return clients;
};
