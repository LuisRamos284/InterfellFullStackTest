import { CHAR, DATE, INTEGER, NOW, Sequelize, literal } from "sequelize";
import { WalletInstance, WalletModel } from "./types";

const WalletCreator = (sequelize: Sequelize): WalletModel => {
  const Wallet = sequelize.define<WalletInstance>(
    "Wallet",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: CHAR(36),
        unique: true,
        defaultValue: literal("(uuid())"),
      },
      clientId: {
        allowNull: false,
        unique: true,
        type: CHAR(36),
        references: {
          model: "Client",
          key: "id",
        },
      },
      balance: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0,
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
      tableName: "Wallet",
      paranoid: true,
    }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Wallet.associate = (models) => {
    Wallet.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
    Wallet.hasMany(models.WalletEvent, {
      foreignKey: "walletId",
      as: "events",
    });
  };

  return Wallet;
};

export = WalletCreator;
