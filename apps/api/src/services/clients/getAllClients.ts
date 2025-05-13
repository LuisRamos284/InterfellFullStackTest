import { ClientAttributes } from "commons";

import { getClientsFromDb } from "../../models/Client/dbMethods/getClientsFromDb";

export const getAllClients = async (): Promise<{
  data: ClientAttributes[];
}> => {
  const clients = await getClientsFromDb();
  return { data: clients };
};
