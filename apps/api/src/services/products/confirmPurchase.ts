import { Transaction } from "sequelize";
import { getWalletByClientIdFromDb } from "../../models/Wallet/dbMethods/getWalletByClientIdFromDb";
import { getPendingPurchaseByIdFromDb } from "../../models/ClientPurchase/dbMethods/getPendingPurchaseByIdFromDb";
import { updateWalletBalance } from "../wallet/updateWalletBalance";
import { WalletEventType } from "commons";

export const confirmPurchase = async (
  params: { clientId: string; token: string },
  transaction: Transaction
): Promise<boolean> => {
  const { clientId, token } = params;

  const wallet = await getWalletByClientIdFromDb(clientId, transaction);

  // TODO HANDLE ERROR
  if (!wallet) {
    return false;
  }

  const purchase = await getPendingPurchaseByIdFromDb(token, transaction);

  // TODO HANDLE ERROR
  if (!purchase) {
    return false;
  }

  // TODO HANDLE ERROR
  if (purchase.clientId !== clientId) {
    return false;
  }

  // TODO HANDLE ERROR
  if (purchase.product.price > wallet.balance) {
    return false;
  }

  await updateWalletBalance(
    {
      clientId,
      rechargeAmount: -purchase.product.price,
      currentBalance: wallet.balance,
      walletEventType: WalletEventType.DEBIT,
      walletId: wallet.id,
    },
    transaction
  );

  return true;
};
