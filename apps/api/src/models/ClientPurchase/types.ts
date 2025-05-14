import { PurchaseStatus } from "commons";
import { Model, ModelStatic } from "sequelize";
import { ProductInstance } from "../Product/types";

export interface ClientPurchaseCreationParams {
  clientId: string;
  productId: string;
  token: string;
}

export type ClientPurchaseAttributes = {
  id: string;
  clientId: string;
  productId: string;
  token: string;
  status: PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface ClientPurchaseInstance
  extends Model<ClientPurchaseAttributes, ClientPurchaseCreationParams>,
    ClientPurchaseAttributes {}

export type ClientPurchaseModel = ModelStatic<ClientPurchaseInstance>;

export type GetPendingPurchaseByIdFromDb = ClientPurchaseInstance & {
  // client should always have a wallet
  product: ProductInstance;
};
