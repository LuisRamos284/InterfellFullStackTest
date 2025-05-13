import { ProductAttributes } from "commons";
import { Product } from "../..";
import { formatProducts } from "./utils/formatProducts";

export const getAllProductsFromDb = async (): Promise<ProductAttributes[]> => {
  const products = await Product.findAll();

  return formatProducts(products);
};
