import { ClientModel } from "./Client/types";
import { ClientPurchaseModel } from "./ClientPurchase/types";
import { ProductModel } from "./Product/types";
import { WalletModel } from "./Wallet/types";
import { WalletEventModel } from "./WalletEvent/types";

export type ModelName =
  | "Client"
  | "ClientPurchase"
  | "Product"
  | "Wallet"
  | "WalletEvent";

export interface Db {
  Sequelize: any;
  Client: ClientModel;
  ClientPurchase: ClientPurchaseModel;
  Product: ProductModel;
  Wallet: WalletModel;
  WalletEvent: WalletEventModel;
}
