import { ProductAttributes } from "commons";
import { getAllProductsFromDb } from "../../models/Product/dbMethods/getAllProductsFromDb";

export const getAllProducts = async (): Promise<ProductAttributes[]> => {
  const products = await getAllProductsFromDb();

  return products;
};
