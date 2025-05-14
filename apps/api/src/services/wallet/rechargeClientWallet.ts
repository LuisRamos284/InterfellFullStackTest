import { Transaction } from "sequelize";
import { getClientByPhoneAndDocumentFromDb } from "../../models/Client/dbMethods/getClientByPhoneAndDocumentFromDb";
import { WalletEventType } from "commons";
import { updateWalletBalance } from "./updateWalletBalance";

export const rechargeClientWallet = async (
  params: { rechargeAmount: number; phone: string; document: string },
  transaction: Transaction
) => {
  const { phone, document, rechargeAmount } = params;

  const client = await getClientByPhoneAndDocumentFromDb(
    { phone, document },
    transaction
  );

  if (!client?.wallet) {
    return { data: false };
  }

  await updateWalletBalance(
    {
      clientId: client.id,
      rechargeAmount,
      currentBalance: client.wallet.balance,
      walletEventType: WalletEventType.CREDIT,
      walletId: client.wallet.id,
    },
    transaction
  );

  return { data: true };
};
