import { WalletAttributes, WalletWithEventsResponse } from "./wallet";

export type ClientAttributes = {
  id: string;
  document: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ClientWithWalletAndEventsResponse = ClientAttributes & {
  wallet: WalletWithEventsResponse;
};

export type ClientWithWalletResponse = ClientAttributes & {
  wallet: WalletAttributes;
};
