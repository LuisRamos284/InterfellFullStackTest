import { CHAR, DATE, INTEGER, NOW, STRING, Sequelize, UUIDV4 } from "sequelize";
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
        defaultValue: UUIDV4,
      },
      document: {
        unique: true,
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
        unique: true,
        type: STRING,
        allowNull: false,
      },
      email: {
        unique: true,
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Client.associate = (models) => {
    Client.hasOne(models.Wallet, {
      foreignKey: "clientId",
      as: "wallet",
    });
    Client.hasMany(models.ClientPurchase, {
      foreignKey: "clientId",
      as: "purchases",
    });
  };

  return Client;
};

export = ClientCreator;
