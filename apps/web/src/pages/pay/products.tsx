import React from "react";

import { useGetProducts } from "../../hooks/useGetProducts";
import { ProductAttributes } from "commons";

export const Products: React.FC<{
  handleProductSelect: (product: ProductAttributes) => void;
  disabled: boolean;
}> = ({ handleProductSelect, disabled }) => {
  const { products } = useGetProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border border-blue-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-800">
              {product.name}
            </h3>

            <p className="text-xl font-bold text-blue-700 mt-2">
              ${product.price.toFixed(2)}
            </p>
            <button
              disabled={disabled}
              onClick={() => handleProductSelect(product)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Purchase
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
