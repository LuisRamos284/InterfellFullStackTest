import { WalletWithEventsResponse } from "commons";
import { GetClientWalletFromDb } from "../../types";
import { formatWalletEvents } from "../../../WalletEvent/dbMethods/utils/formatWalletEvent";

export function formatClientWallet(
  wallet: GetClientWalletFromDb
): WalletWithEventsResponse {
  const clientDataToReturn = wallet.get({ plain: true });
  return {
    ...clientDataToReturn,
    events: formatWalletEvents(wallet.events),
    createdAt: wallet.createdAt.toISOString(),
    updatedAt: wallet.updatedAt.toISOString(),
    deletedAt: wallet.deletedAt?.toISOString() || null,
  };
}
