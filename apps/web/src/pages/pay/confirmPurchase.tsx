import { yupResolver } from "@hookform/resolvers/yup";
import { ProductAttributes } from "commons";
import React from "react";
import { useForm } from "react-hook-form";
import { PayPayload, PaySchema } from "../../validations/pay";

import { Input } from "../../components/input";

export const ConfirmPurchase: React.FC<{
  selectedProduct: ProductAttributes | null;
  purchaseComplete: boolean;
  handleCancel: () => void;
  handleConfirmPurchase: (payload: PayPayload) => void;
}> = ({
  selectedProduct,
  handleCancel,
  handleConfirmPurchase,
  purchaseComplete,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PayPayload>({
    resolver: yupResolver(PaySchema),
    criteriaMode: "all",
    mode: "onChange",
  });

  const token = watch("token");

  if (!selectedProduct) return <></>;

  return (
    <div className="max-w-md mx-auto border border-blue-200 rounded-lg p-6 bg-blue-50">
      {!purchaseComplete ? (
        <>
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Confirm Purchase
          </h3>
          <div className="mb-4">
            <p className="text-gray-700">Product: {selectedProduct?.name}</p>
            <p className="text-gray-700">
              Price: $
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "USD",
              }).format(selectedProduct.price)}
            </p>
          </div>
          <form onSubmit={handleSubmit(handleConfirmPurchase)}>
            <div className="mb-6">
              <Input
                register={register}
                controlId="token"
                label="Enter 6-digit confirmation token"
                placeholder="Enter 6-digit token"
                type="text"
                maxLength={6}
                errors={errors}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={token?.length !== 6}
                className={`px-4 py-2 rounded-md transition-colors ${
                  token?.length === 6
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-300 text-white cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Purchase Complete!
          </h3>
          <p className="text-gray-700 mb-6">
            Thank you for your purchase of {selectedProduct?.name}.
          </p>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};
