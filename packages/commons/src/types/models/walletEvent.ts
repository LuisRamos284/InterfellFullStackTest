import { WalletEventType } from "../walletEventType";

export type WalletEventAttributes = {
  id: string;
  walletId: string;
  walletEventType: WalletEventType;
  transactionAmount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
