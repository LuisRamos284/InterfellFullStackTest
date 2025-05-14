import { Op, Transaction } from "sequelize";
import { Client } from "../..";
import { ClientCreationParams } from "../types";

export const checkClientDataInDb = async (
  params: ClientCreationParams,
  transaction?: Transaction
): Promise<boolean> => {
  const { document, email, phone } = params;

  const count = await Client.count({
    where: {
      [Op.or]: [{ document }, { email }, { phone }],
    },
    transaction,
  });

  return count > 0;
};
