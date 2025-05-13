import { CHAR, DATE, INTEGER, NOW, STRING, Sequelize, UUIDV4 } from "sequelize";
import { ProductInstance, ProductModel } from "./types";

const ProductCreator = (sequelize: Sequelize): ProductModel => {
  const Product = sequelize.define<ProductInstance>(
    "Product",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: CHAR(36),
        unique: true,
        defaultValue: UUIDV4,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      price: {
        type: INTEGER,
        allowNull: false,
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
      tableName: "Product",
      paranoid: true,
    }
  );

  return Product;
};

export = ProductCreator;
