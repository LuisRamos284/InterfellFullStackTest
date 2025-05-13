import { Transaction } from "sequelize";
import { getClientByPhoneAndDocumentFromDb } from "../../models/Client/dbMethods/getClientByPhoneAndDocumentFromDb";

export const getWalletByClientId = async (
  params: { phone: string; clientDocument: string },
  transaction: Transaction
) => {
  const { phone, clientDocument } = params;

  const client = await getClientByPhoneAndDocumentFromDb(
    { phone, document: clientDocument },
    transaction
  );

  if (!client) {
    return { data: false };
  }

  return { data: client.wallet };
};
