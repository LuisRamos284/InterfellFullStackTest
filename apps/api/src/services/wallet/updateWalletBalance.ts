import { WalletEventType } from "commons";
import { Transaction } from "sequelize";
import { rechargeClientWalletInDb } from "../../models/Wallet/dbMethods/rechargeClientWalletInDb";
import { createWalletEventInDb } from "../../models/WalletEvent/dbMethods/createWalletEventInDb";

export const updateWalletBalance = async (
  params: {
    clientId: string;
    rechargeAmount: number;
    currentBalance: number;
    walletId: string;
    walletEventType: WalletEventType;
  },
  transaction?: Transaction
): Promise<void> => {
  const {
    clientId,
    rechargeAmount,
    currentBalance,
    walletId,
    walletEventType,
  } = params;

  const newBalance =
    walletEventType === WalletEventType.CREDIT
      ? currentBalance + rechargeAmount
      : currentBalance - rechargeAmount;

  await rechargeClientWalletInDb(clientId, newBalance, transaction);

  await createWalletEventInDb(
    {
      transactionAmount: rechargeAmount,
      walletEventType,
      walletId: walletId,
      balance: newBalance,
    },
    transaction
  );
};
