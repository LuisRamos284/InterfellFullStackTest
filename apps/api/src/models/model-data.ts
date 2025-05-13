import { Sequelize, ModelStatic, Model } from "sequelize";
import ClientCreator from "./Client";
import { ModelName } from "./types";
import WalletCreator from "./Wallet";
import WalletEventCreator from "./WalletEvent";
import ClientPurchaseCreator from "./ClientPurchase";
import ProductCreator from "./Product";

const modelData: {
  modelCreator: (sequelize: Sequelize, DataTypes: any) => ModelStatic<Model>;
  modelName: ModelName;
}[] = [
  {
    modelCreator: ClientCreator,
    modelName: "Client",
  },
  {
    modelCreator: ClientPurchaseCreator,
    modelName: "ClientPurchase",
  },
  {
    modelCreator: ProductCreator,
    modelName: "Product",
  },
  {
    modelCreator: WalletCreator,
    modelName: "Wallet",
  },
  {
    modelCreator: WalletEventCreator,
    modelName: "WalletEvent",
  },
];

export default modelData;
