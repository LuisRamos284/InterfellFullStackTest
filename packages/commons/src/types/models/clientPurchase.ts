import { PurchaseStatus } from "../purchaseStatus";

export type ClientPurchaseAttributes = {
  id: string;
  clientId: string;
  productId: string;
  status: PurchaseStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
