import type React from "react";

import { useState } from "react";
import { Container } from "../../components/container";
import { PayPayload } from "../../validations/pay";
import { ConfirmPurchase } from "./confirmPurchase";
import { ProductAttributes } from "commons";

const products: ProductAttributes[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 129.99,
    createdAt: "test",
    updatedAt: "test",
    deletedAt: "test",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    createdAt: "test",
    updatedAt: "test",
    deletedAt: "test",
  },
];

export default function Pay() {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductAttributes | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleProductSelect = (product: ProductAttributes) => {
    setSelectedProduct(product);
    setShowConfirmation(true);
    setPurchaseComplete(false);
  };

  const handleConfirmPurchase = (payload: PayPayload): void => {
    if (payload.token.length === 6) {
      setPurchaseComplete(true);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedProduct(null);
    setPurchaseComplete(false);
  };

  return (
    <Container>
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Pay for Products
      </h2>

      {!showConfirmation ? (
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
                  onClick={() => handleProductSelect(product)}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ConfirmPurchase
          handleCancel={handleCancel}
          handleConfirmPurchase={handleConfirmPurchase}
          selectedProduct={selectedProduct}
          purchaseComplete={purchaseComplete}
        />
      )}
    </Container>
  );
}
