import { Transaction } from "sequelize";
import { Client } from "../..";
import { formatClientWithWalletAndEvents } from "./util/formatClient";
import { ClientWithWalletAndEventsResponse } from "commons";
import { GetClientFromDb } from "../types";

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
        include: [
          {
            association: "events",
          },
        ],
      },
    ],
    transaction,
  })) as unknown as GetClientFromDb;

  return client && formatClientWithWalletAndEvents(client);
}
