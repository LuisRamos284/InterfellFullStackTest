import { Model, ModelStatic } from "sequelize";
import { WalletEventInstance } from "../WalletEvent/types";

export interface WalletCreationParams {
  clientId: string;
}

export type WalletAttributes = {
  id: string;
  clientId: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface WalletInstance
  extends Model<WalletAttributes, WalletCreationParams>,
    WalletAttributes {}

export type WalletModel = ModelStatic<WalletInstance>;

export type GetClientWalletFromDb = WalletInstance & {
  events: WalletEventInstance[];
};
