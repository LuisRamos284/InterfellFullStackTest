import { Transaction } from "sequelize";
import { Client } from "../..";
import {
  formatClientWithWallet,
  formatClientWithWalletAndEvents,
} from "./util/formatClient";
import { ClientWithWalletAndEventsResponse } from "commons";
import { GetClientByIdFromDb, GetClientFromDb } from "../types";

export async function getClientByPhoneAndDocumentFromDb(
  params: { phone: string; document: string },
  transaction?: Transaction
): Promise<ClientWithWalletAndEventsResponse | null> {
  const { phone, document } = params;
  const client = (await Client.findOne({
    where: {
      phone,
      document,
    },
    include: [
      {
        association: "wallet",
      },
    ],
    transaction,
  })) as unknown as GetClientByIdFromDb;

  return client && formatClientWithWallet(client);
}
