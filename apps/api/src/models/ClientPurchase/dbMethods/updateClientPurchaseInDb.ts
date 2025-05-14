import { Transaction } from "sequelize";
import { ClientPurchase } from "../..";
import { PurchaseStatus } from "commons";

export const updateClientPurchaseInDb = async (
  params: { status: PurchaseStatus; id: string },
  transaction?: Transaction
) => {
  await ClientPurchase.update(
    { status: params.status },
    { where: { id: params.id }, transaction }
  );
};
