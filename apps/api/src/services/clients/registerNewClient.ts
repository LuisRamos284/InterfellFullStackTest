import { Transaction } from "sequelize";
import { ClientCreationParams } from "../../models/Client/types";
import { createClientInDb } from "../../models/Client/dbMethods/createClientInDb";
import { createWalletInDb } from "../../models/Wallet/dbMethods/createWalletInDb";

export const registerNewClient = async (
  clientData: ClientCreationParams,
  transaction: Transaction
) => {
  const client = await createClientInDb(clientData, transaction);

  await createWalletInDb(client.id, transaction);

  return { data: true };
};
