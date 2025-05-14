import { Transaction } from "sequelize";
import { Wallet } from "../..";
import { WalletWithEventsResponse } from "commons";
import { GetClientWalletFromDb } from "../types";
import { formatClientWalletWithEvents } from "./utils/formatClientWallet";

export async function getWalletByClientIdFromDb(
  clientId: string,
  transaction?: Transaction
): Promise<WalletWithEventsResponse | null> {
  const wallet = (await Wallet.findOne({
    where: {
      clientId,
    },
    include: [
      {
        association: "events",
      },
    ],
    transaction,
  })) as unknown as GetClientWalletFromDb | null;

  return wallet && formatClientWalletWithEvents(wallet);
}
