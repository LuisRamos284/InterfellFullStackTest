import { Transaction } from "sequelize";
import { Wallet } from "../..";

export async function createWalletInDb(
  clientId: string,
  transaction?: Transaction
): Promise<void> {
  await Wallet.create(
    { clientId },
    {
      transaction,
    }
  );
}
