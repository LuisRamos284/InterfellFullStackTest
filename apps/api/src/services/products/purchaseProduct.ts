import { Transaction } from "sequelize";
import { createClientPurchaseInDb } from "../../models/ClientPurchase/dbMethods/createClientPurchaseInDb";
import { ClientPurchaseCreationParams } from "../../models/ClientPurchase/types";
import { getUnusedTokenForPurchase } from "./getUnusedTokenForPurchase";
import { TOKEN_CHARS } from "../../utils/constants";
import { getClientByIdFromDb } from "../../models/Client/dbMethods/getClientByIdFromDb";
import { wrappedSendMail } from "../../utils/email";
import { getProductByIdFromDb } from "../../models/Product/dbMethods/getProductByIdFromDb";

export const createPurchaseOrder = async (
  params: Omit<ClientPurchaseCreationParams, "token">,
  transaction: Transaction
): Promise<boolean> => {
  const { clientId, productId } = params;

  const token = await getUnusedTokenForPurchase({
    length: 6,
    chars: TOKEN_CHARS,
  });

  const client = await getClientByIdFromDb(clientId);

  // TODO  Handle error
  if (!client) return false;

  const product = await getProductByIdFromDb(productId);

  // TODO  Handle error
  if (!product) return false;

  await wrappedSendMail({
    from: `"Interfell" <${process.env.EMAIL_USERNAME}>`,
    to: client.email,
    subject: "Confirm purchase",
    html: `<b>Hi to confirm your purchase for ${product.name} use this token: ${token}</b>`, // HTML body
  });

  await createClientPurchaseInDb({ clientId, productId, token }, transaction);
  return true;
};
