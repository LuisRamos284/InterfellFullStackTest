import { Transaction } from "sequelize";
import { getPendingPurchasesByClientIdFromDb } from "../../models/ClientPurchase/dbMethods/getPendingPurchasesByClientIdFromDb";
import { ClientPurchaseAttributes } from "commons";

export const getPendingPurchasesByClientId = async (
  clientId: string,
  transaction: Transaction
): Promise<Omit<ClientPurchaseAttributes, "token">[]> => {
  const purchases = await getPendingPurchasesByClientIdFromDb(
    clientId,
    transaction
  );

  return purchases;
};
