import { Transaction } from "sequelize";
import { getClientByPhoneAndDocumentFromDb } from "../../models/Client/dbMethods/getClientByPhoneAndDocumentFromDb";
import { WalletEventType } from "commons";
import { updateWalletBalance } from "./updateWalletBalance";

export const rechargeClientWallet = async (
  params: { rechargeAmount: number; phone: string; document: string },
  transaction: Transaction
): Promise<boolean> => {
  const { phone, document, rechargeAmount } = params;

  const client = await getClientByPhoneAndDocumentFromDb(
    { phone, document },
    transaction
  );

  if (!client?.wallet)
    throw new Error("There is no user associated to that phone and document");

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

  return true;
};
