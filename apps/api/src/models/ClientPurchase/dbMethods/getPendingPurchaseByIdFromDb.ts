import { Transaction } from "sequelize";
import { ClientPurchase } from "../..";
import {
  ClientPurchaseAttributes,
  ProductAttributes,
  PurchaseStatus,
} from "commons";
import { GetPendingPurchaseByIdFromDb } from "../types";
import { formatClientPurchaseWithProduct } from "./utils/formatClientPurchaseWithProduct";

export const getPendingPurchaseByIdFromDb = async (
  token: string,
  transaction?: Transaction
): Promise<
  (ClientPurchaseAttributes & { product: ProductAttributes }) | null
> => {
  const purchase = (await ClientPurchase.findOne({
    where: {
      token,
      status: PurchaseStatus.PENDING_CONFIRMATION,
    },
    include: [
      {
        association: "product",
      },
    ],
    transaction,
  })) as unknown as GetPendingPurchaseByIdFromDb | null;

  return purchase && formatClientPurchaseWithProduct(purchase);
};
