import { CHAR, DATE, ENUM, NOW, Sequelize, UUIDV4 } from "sequelize";
import { ClientPurchaseInstance, ClientPurchaseModel } from "./types";
import { PurchaseStatus } from "commons";

const ClientPurchaseCreator = (sequelize: Sequelize): ClientPurchaseModel => {
  const ClientPurchase = sequelize.define<ClientPurchaseInstance>(
    "ClientPurchase",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: CHAR(36),
        unique: true,
        defaultValue: UUIDV4,
      },
      clientId: {
        allowNull: false,
        type: CHAR(36),
        references: {
          model: "Client",
          key: "id",
        },
      },
      productId: {
        allowNull: false,
        type: CHAR(36),
        references: {
          model: "Product",
          key: "id",
        },
      },
      status: {
        type: ENUM(
          PurchaseStatus.CANCELED,
          PurchaseStatus.PENDING_CONFIRMATION,
          PurchaseStatus.COMPLETED
        ),
        defaultValue: PurchaseStatus.PENDING_CONFIRMATION,
        allowNull: false,
      },
      token: {
        type: CHAR(6),
        allowNull: false,
        unique: true,
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
      tableName: "ClientPurchase",
      paranoid: true,
    }
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ClientPurchase.associate = (models) => {
    ClientPurchase.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client",
    });
    ClientPurchase.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };
  return ClientPurchase;
};

export = ClientPurchaseCreator;
