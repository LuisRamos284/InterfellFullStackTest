import { Transaction } from "sequelize";
import { ClientPurchase } from "../..";
import { ClientPurchaseAttributes, PurchaseStatus } from "commons";
import { formatClientPurchases } from "./utils/formatClientPurchases";

export const getPendingPurchasesByClientIdFromDb = async (
  clientId: string,
  transaction?: Transaction
): Promise<ClientPurchaseAttributes[]> => {
  const purchases = await ClientPurchase.findAll({
    where: {
      clientId,
      status: PurchaseStatus.PENDING_CONFIRMATION,
    },
    attributes: { exclude: ["token"] },
    transaction,
  });

  return formatClientPurchases(purchases);
};
