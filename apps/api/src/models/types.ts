import { ClientModel } from "./Client/types";
import { WalletModel } from "./Wallet/types";
import { WalletEventModel } from "./WalletEvent/types";

export type ModelName = "Client" | "Wallet" | "WalletEvent";

export interface Db {
  Sequelize: any;
  Client: ClientModel;
  Wallet: WalletModel;
  WalletEvent: WalletEventModel;
}
