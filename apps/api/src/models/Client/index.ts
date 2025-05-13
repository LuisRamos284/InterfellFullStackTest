import {
  CHAR,
  DATE,
  INTEGER,
  NOW,
  STRING,
  Sequelize,
  literal,
} from "sequelize";
import { ClientInstance, ClientModel } from "./types";

const ClientCreator = (sequelize: Sequelize): ClientModel => {
  const Client = sequelize.define<ClientInstance>(
    "Client",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: CHAR(36),
        unique: true,
        defaultValue: literal("(uuid())"),
      },
      document: {
        type: INTEGER,
        allowNull: false,
      },
      firstName: {
        type: STRING,
        allowNull: false,
      },
      lastName: {
        type: STRING,
        allowNull: false,
      },
      phone: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
        defaultValue: NOW,
      },
      deletedAt: {
        allowNull: true,
        type: DATE,
        defaultValue: null,
      },
    },
    {
      freezeTableName: true,
      tableName: "Client",
      paranoid: true,
    }
  );

  return Client;
};

export = ClientCreator;
