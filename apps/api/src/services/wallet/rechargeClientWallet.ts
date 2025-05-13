import { Transaction } from "sequelize";
import { getClientByPhoneAndDocumentFromDb } from "../../models/Client/dbMethods/getClientByPhoneAndDocumentFromDb";
import { rechargeClientWalletInDb } from "../../models/Wallet/dbMethods/rechargeClientWalletInDb";
import { createWalletEventInDb } from "../../models/WalletEvent/dbMethods/createWalletEventInDb";
import { WalletEventType } from "commons";

export const rechargeClientWallet = async (
  params: { rechargeAmount: number; phone: string; clientDocument: string },
  transaction: Transaction
) => {
  const { phone, clientDocument, rechargeAmount } = params;

  const client = await getClientByPhoneAndDocumentFromDb(
    { phone, document: clientDocument },
    transaction
  );

  if (!client?.wallet) {
    return { data: false };
  }

  await rechargeClientWalletInDb(
    client.id,
    client.wallet.balance + rechargeAmount,
    transaction
  );

  await createWalletEventInDb(
    {
      transactionAmount: rechargeAmount,
      walletEventType: WalletEventType.CREDIT,
      walletId: client.wallet.id,
    },
    transaction
  );

  return { data: true };
};
