import { Transaction } from "sequelize";
import { ClientPurchase } from "../..";
import { ClientPurchaseCreationParams } from "../types";

export const createClientPurchaseInDb = async (
  params: ClientPurchaseCreationParams,
  transaction?: Transaction
) => {
  await ClientPurchase.create(params, { transaction });
};
