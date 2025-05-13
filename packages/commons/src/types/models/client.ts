import { WalletWithEventsResponse } from "./wallet";

export type ClientAttributes = {
  id: string;
  document: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ClientWithWalletResponse = ClientAttributes & {
  wallet: WalletWithEventsResponse;
};
