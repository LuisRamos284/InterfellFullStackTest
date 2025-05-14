import { Transaction } from "sequelize";
import { getClientByPhoneAndDocumentFromDb } from "../../models/Client/dbMethods/getClientByPhoneAndDocumentFromDb";

export const getWalletByDocument = async (
  params: { phone: string; document: string },
  transaction: Transaction
) => {
  const { phone, document } = params;

  const client = await getClientByPhoneAndDocumentFromDb(
    { phone, document },
    transaction
  );

  if (!client) throw Error("No User found.");

  return client.wallet;
};
