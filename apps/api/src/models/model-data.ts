import { Sequelize, ModelStatic, Model } from "sequelize";
import ClientCreator from "./Client";
import { ModelName } from "./types";
import WalletCreator from "./Wallet";
import WalletEventCreator from "./WalletEvent";

const modelData: {
  modelCreator: (sequelize: Sequelize, DataTypes: any) => ModelStatic<Model>;
  modelName: ModelName;
}[] = [
  {
    modelCreator: ClientCreator,
    modelName: "Client",
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
