import { Transaction } from "sequelize";
import { Client } from "../..";
import { formatClient } from "./util/formatClient";
import { ClientAttributes } from "commons";
import { ClientCreationParams } from "../types";

export async function createClientInDb(
  params: ClientCreationParams,
  transaction?: Transaction
): Promise<ClientAttributes> {
  const client = await Client.create(params, {
    transaction,
  });

  return formatClient(client);
}
