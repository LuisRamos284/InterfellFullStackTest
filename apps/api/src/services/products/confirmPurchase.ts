import { Transaction } from "sequelize";
import { getWalletByClientIdFromDb } from "../../models/Wallet/dbMethods/getWalletByClientIdFromDb";
import { getPendingPurchaseByIdFromDb } from "../../models/ClientPurchase/dbMethods/getPendingPurchaseByIdFromDb";
import { updateWalletBalance } from "../wallet/updateWalletBalance";
import { PurchaseStatus, WalletEventType } from "commons";
import { updateClientPurchaseInDb } from "../../models/ClientPurchase/dbMethods/updateClientPurchaseInDb";

export const confirmClientPurchase = async (
  params: { clientId: string; token: string },
  transaction: Transaction
): Promise<boolean> => {
  const { clientId, token } = params;

  const wallet = await getWalletByClientIdFromDb(clientId, transaction);

  if (!wallet) throw new Error("Invalid Document");

  const purchase = await getPendingPurchaseByIdFromDb(token, transaction);

  if (!purchase) throw new Error("Invalid Purchase");

  if (purchase.clientId !== clientId) throw new Error("Invalid Purchase");

  if (purchase.product.price > wallet.balance)
    throw new Error("You don't have enough balance to make this purchase");

  await updateWalletBalance(
    {
      clientId,
      rechargeAmount: purchase.product.price,
      currentBalance: wallet.balance,
      walletEventType: WalletEventType.DEBIT,
      walletId: wallet.id,
    },
    transaction
  );

  await updateClientPurchaseInDb(
    { id: purchase.id, status: PurchaseStatus.COMPLETED },
    transaction
  );

  return true;
};
