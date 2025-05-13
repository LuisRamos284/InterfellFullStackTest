import { ClientAttributes } from "commons";

import { getClientsFromDb } from "../models/Client/dbMethods/getClients";

export const getAllClients = async (): Promise<{
  data: ClientAttributes[];
}> => {
  const clients = await getClientsFromDb();
  return { data: clients };
};
