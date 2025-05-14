import { WalletEventType } from "commons";
import { Model, ModelStatic } from "sequelize";

export interface WalletEventCreationParams {
  walletId: string;
  walletEventType: WalletEventType;
  transactionAmount: number;
  balance: number;
}

export type WalletEventAttributes = {
  id: string;
  walletId: string;
  balance: number;
  walletEventType: WalletEventType;
  transactionAmount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface WalletEventInstance
  extends Model<WalletEventAttributes, WalletEventCreationParams>,
    WalletEventAttributes {}

export type WalletEventModel = ModelStatic<WalletEventInstance>;
