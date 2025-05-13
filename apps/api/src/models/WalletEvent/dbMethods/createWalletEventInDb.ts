import { Transaction } from "sequelize";
import { WalletEvent } from "../..";
import { WalletEventCreationParams } from "../types";

export async function createWalletEventInDb(
  params: WalletEventCreationParams,
  transaction?: Transaction
): Promise<void> {
  await WalletEvent.create(params, {
    transaction,
  });
}
