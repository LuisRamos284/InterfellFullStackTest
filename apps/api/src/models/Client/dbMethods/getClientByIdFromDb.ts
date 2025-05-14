import { Transaction } from "sequelize";
import { Client } from "../..";
import { formatClient } from "./util/formatClient";
import { ClientAttributes } from "commons";

export async function getClientByIdFromDb(
  id: string,
  transaction?: Transaction
): Promise<ClientAttributes | null> {
  const client = await Client.findOne({
    where: {
      id,
    },

    transaction,
  });

  return client && formatClient(client);
}
