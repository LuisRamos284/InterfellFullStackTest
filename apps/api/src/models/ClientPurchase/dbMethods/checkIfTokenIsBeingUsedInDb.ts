import { Transaction } from "sequelize";
import { ClientPurchase } from "../..";

export const checkIfTokenIsBeingUsedInDb = async (
  token: string,
  transaction?: Transaction
): Promise<boolean> => {
  const count = await ClientPurchase.count({
    where: { token },
    transaction,
  });

  return count > 0;
};
