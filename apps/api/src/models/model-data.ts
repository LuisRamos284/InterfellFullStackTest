import { Sequelize, ModelStatic, Model } from "sequelize";
import ClientCreator from "./Client";
import { ModelName } from "./types";

const modelData: {
  modelCreator: (sequelize: Sequelize, DataTypes: any) => ModelStatic<Model>;
  modelName: ModelName;
}[] = [
  {
    modelCreator: ClientCreator,
    modelName: "Client",
  },
];

export default modelData;
