import { ProductAttributes } from "commons";
import { Product } from "../..";
import { formatProduct } from "./utils/formatProducts";

export const getProductByIdFromDb = async (
  id: string
): Promise<ProductAttributes | null> => {
  const product = await Product.findOne({ where: { id } });

  return product && formatProduct(product);
};
