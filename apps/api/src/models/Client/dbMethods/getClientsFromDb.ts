import { Transaction } from "sequelize";
import { Client } from "../..";
import { formatClients } from "./util/formatClient";
import { ClientAttributes } from "commons";

export async function getClientsFromDb(
  transaction?: Transaction
): Promise<ClientAttributes[]> {
  const assignee = await Client.findAll({
    transaction,
  });

  return formatClients(assignee);
}
