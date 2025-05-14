import { checkIfTokenIsBeingUsedInDb } from "../../models/ClientPurchase/dbMethods/checkIfTokenIsBeingUsedInDb";
import { generateRandomString } from "../../utils/string";

export const getUnusedTokenForPurchase = async ({
  chars,
  length,
}: {
  length: number;
  chars: string;
}): Promise<string> => {
  let token = generateRandomString(length, chars);
  let isBeingUsed = await checkIfTokenIsBeingUsedInDb(token);

  // searching for collisions
  // given its randomness its hard to test
  while (isBeingUsed) {
    token = generateRandomString(length, chars);
    isBeingUsed = await checkIfTokenIsBeingUsedInDb(token);
  }

  return token;
};
