import { Transaction } from "sequelize";
import { Client } from "../..";
import { formatClientWithWallet } from "./util/formatClient";
import { ClientWithWalletResponse } from "commons";
import { GetClientFromDb } from "../types";

export async function getClientByPhoneAndDocumentFromDb(
  params: { phone: string; document: string },
  transaction?: Transaction
): Promise<ClientWithWalletResponse | null> {
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

  return client && formatClientWithWallet(client);
}
