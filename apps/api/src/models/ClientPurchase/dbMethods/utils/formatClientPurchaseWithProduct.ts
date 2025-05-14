import { ClientPurchaseAttributes, ProductAttributes } from "commons";
import { GetPendingPurchaseByIdFromDb } from "../../types";
import { formatProduct } from "../../../Product/dbMethods/utils/formatProducts";

export function formatClientPurchaseWithProduct(
  clientPurchase: GetPendingPurchaseByIdFromDb
): ClientPurchaseAttributes & { product: ProductAttributes } {
  const clientPurchaseDataToReturn = clientPurchase.get({ plain: true });
  return {
    ...clientPurchaseDataToReturn,
    product: formatProduct(clientPurchase.product),
    createdAt: clientPurchase.createdAt.toISOString(),
    updatedAt: clientPurchase.updatedAt.toISOString(),
    deletedAt: clientPurchase.deletedAt?.toISOString() || null,
  };
}
