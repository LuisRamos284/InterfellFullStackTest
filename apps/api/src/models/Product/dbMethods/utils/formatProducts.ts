import { ProductAttributes } from "commons";
import { ProductInstance } from "../../types";

export function formatProduct(product: ProductInstance): ProductAttributes {
  const ProductDataToReturn = product.get({ plain: true });
  return {
    ...ProductDataToReturn,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    deletedAt: product.deletedAt?.toISOString() || null,
  };
}

export function formatProducts(
  products: ProductInstance[]
): ProductAttributes[] {
  return products.map(formatProduct);
}
