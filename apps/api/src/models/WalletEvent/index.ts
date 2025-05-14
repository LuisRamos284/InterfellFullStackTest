import { BIGINT, CHAR, DATE, ENUM, NOW, Sequelize, UUIDV4 } from "sequelize";
import { WalletEventInstance, WalletEventModel } from "./types";
import { WalletEventType } from "commons";

const WalletEventCreator = (sequelize: Sequelize): WalletEventModel => {
  const WalletEvent = sequelize.define<WalletEventInstance>(
    "WalletEvent",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: CHAR(36),
        unique: true,
        defaultValue: UUIDV4,
      },
      walletId: {
        allowNull: false,
        type: CHAR(36),
        references: {
          model: "Wallet",
          key: "id",
        },
      },
      walletEventType: {
        type: ENUM(WalletEventType.CREDIT, WalletEventType.DEBIT),
        allowNull: false,
      },
      transactionAmount: {
        allowNull: false,
        type: BIGINT,
        defaultValue: 0,
      },
      balance: {
        allowNull: false,
        type: BIGINT,
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
      tableName: "WalletEvent",
      paranoid: true,
    }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  WalletEvent.associate = (models) => {
    WalletEvent.belongsTo(models.Wallet, {
      foreignKey: "walletId",
      as: "wallet",
    });
  };

  return WalletEvent;
};

export = WalletEventCreator;
