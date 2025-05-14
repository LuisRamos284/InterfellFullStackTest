import { Transaction } from "sequelize";
import { createClientPurchaseInDb } from "../../models/ClientPurchase/dbMethods/createClientPurchaseInDb";
import { ClientPurchaseCreationParams } from "../../models/ClientPurchase/types";
import { getUnusedTokenForPurchase } from "./getUnusedTokenForPurchase";
import { TOKEN_CHARS } from "../../utils/constants";

export const createPurchaseOrder = async (
  params: Omit<ClientPurchaseCreationParams, "token">,
  transaction: Transaction
): Promise<boolean> => {
  const { clientId, productId } = params;

  const token = await getUnusedTokenForPurchase({
    length: 6,
    chars: TOKEN_CHARS,
  });

  await createClientPurchaseInDb({ clientId, productId, token }, transaction);
  return true;
};
