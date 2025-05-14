import React from "react";

import { useState } from "react";
import { Container } from "../../components/container";
import { PayPayload } from "../../validations/pay";
import { ConfirmPurchase } from "./confirmPurchase";
import {
  BaseRoute,
  ClientAttributes,
  ProductAttributes,
  RouteMethod,
} from "commons";

import { useGetClients } from "../../hooks/useGetClients";
import { Products } from "./products";
import { makeApiMutation } from "../../hooks/useApi";
import { useGetPendingOrders } from "../../hooks/useGetPendingOrders";
import { OrdersHistory } from "./orders";
import { useTriggerToast } from "../../hooks/useTriggerToast";

export default function Pay() {
  const [isLoading, setIsLoading] = useState(false);
  const { triggerErrorToast } = useTriggerToast();
  const { clients } = useGetClients();

  const [selectedProduct, setSelectedProduct] =
    useState<ProductAttributes | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientAttributes | null>(
    null
  );

  const { orders, refreshOrders } = useGetPendingOrders(selectedClient?.id);

  const handleProductSelect = async (
    product: ProductAttributes
  ): Promise<void> => {
    if (!selectedClient) return;
    setIsLoading(true);
    const { error } = await makeApiMutation({
      method: RouteMethod.POST,
      path: `${BaseRoute.PRODUCTS}/purchase`,
      body: {
        clientId: selectedClient.id,
        productId: product.id,
      },
    });
    setIsLoading(false);
    if (error) {
      triggerErrorToast({ message: error.message.toString() });
      return;
    }

    refreshOrders();
    setSelectedProduct(product);
    setShowConfirmation(true);
    setPurchaseComplete(false);
  };

  const handleConfirmPurchase = async (payload: PayPayload): Promise<void> => {
    const { token } = payload;

    if (!selectedClient) return;
    setIsLoading(true);
    const { error } = await makeApiMutation({
      method: RouteMethod.PUT,
      path: `${BaseRoute.PRODUCTS}/purchase/confirm`,
      body: {
        token,
        clientId: selectedClient.id,
      },
    });
    setIsLoading(false);
    if (error) {
      triggerErrorToast({ message: error.message.toString() });
      return;
    }
    setShowConfirmation(false);
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

      <div className="mb-6">
        <label
          htmlFor="client"
          className="block text-sm font-medium text-blue-700 mb-1"
        >
          Select Client
        </label>
        <select
          id="client"
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={selectedClient?.id || ""}
          onChange={(e) => {
            const clientId = e.target.value;
            const client = clients.find((c) => c.id === clientId) || null;
            setSelectedClient(client);
          }}
        >
          <option value="">-- Select a client --</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName} ({client.document})
            </option>
          ))}
        </select>
      </div>

      {selectedClient && !showConfirmation ? (
        <Products
          handleProductSelect={handleProductSelect}
          disabled={isLoading}
        />
      ) : (
        <ConfirmPurchase
          handleCancel={handleCancel}
          handleConfirmPurchase={handleConfirmPurchase}
          selectedProduct={selectedProduct}
          purchaseComplete={purchaseComplete}
          disabled={isLoading}
        />
      )}

      <OrdersHistory orders={orders} />
    </Container>
  );
}
