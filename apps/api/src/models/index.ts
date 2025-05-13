import SequelizeModel, { Sequelize, DataTypes } from "sequelize";
import modelData from "./model-data";
import { Db, ModelName } from "./types";
import sequelizeInstance from "../config/getSequelizeInstance";

const db: Db = modelData.reduce(
  (
    modelLookup: any,
    {
      modelCreator,
      modelName,
    }: {
      modelCreator: (sequelize: Sequelize, DataTypes: any) => any;
      modelName: ModelName;
    }
  ) => {
    const model = modelCreator(sequelizeInstance, DataTypes);
    modelLookup[modelName] = model;
    return modelLookup;
  },
  {}
);

modelData.forEach(({ modelName }) => {
  if ("associate" in db[modelName]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    db[modelName].associate(db);
  }
});

db.Sequelize = SequelizeModel;

export = db;
