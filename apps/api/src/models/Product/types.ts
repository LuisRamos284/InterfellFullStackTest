import { Model, ModelStatic } from "sequelize";

export interface ProductCreationParams {
  name: string;
  price: number;
}

export type ProductAttributes = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationParams>,
    ProductAttributes {}

export type ProductModel = ModelStatic<ProductInstance>;
