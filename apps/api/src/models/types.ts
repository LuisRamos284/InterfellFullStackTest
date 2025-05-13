import { ClientModel } from "./Client/types";

export type ModelName = "Client";

export interface Db {
  Sequelize: any;
  Client: ClientModel;
}
