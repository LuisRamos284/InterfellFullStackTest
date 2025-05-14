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
  const { clientId, rechargeAmount, currentBalance, walletId } = params;

  await rechargeClientWalletInDb(
    clientId,
    currentBalance + rechargeAmount,
    transaction
  );

  await createWalletEventInDb(
    {
      transactionAmount: rechargeAmount,
      walletEventType: WalletEventType.CREDIT,
      walletId: walletId,
    },
    transaction
  );
};
