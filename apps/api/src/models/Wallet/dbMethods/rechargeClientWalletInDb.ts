import { Transaction } from "sequelize";
import { Wallet } from "../..";

export async function rechargeClientWalletInDb(
  clientId: string,
  newBalance: number,
  transaction?: Transaction
): Promise<void> {
  await Wallet.update(
    { balance: newBalance },
    { where: { clientId }, transaction }
  );
}
