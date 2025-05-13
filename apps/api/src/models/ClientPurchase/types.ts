import { PurchaseStatus } from "commons";
import { Model, ModelStatic } from "sequelize";

export interface ClientPurchaseCreationParams {
  clientId: string;
  productId: string;
}

export type ClientPurchaseAttributes = {
  id: string;
  clientId: string;
  productId: string;
  status: PurchaseStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface ClientPurchaseInstance
  extends Model<ClientPurchaseAttributes, ClientPurchaseCreationParams>,
    ClientPurchaseAttributes {}

export type ClientPurchaseModel = ModelStatic<ClientPurchaseInstance>;
