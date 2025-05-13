import { WalletEventAttributes } from ".";

export type WalletAttributes = {
  id: string;
  clientId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type WalletWithEventsResponse = WalletAttributes & {
  events: WalletEventAttributes[];
};
