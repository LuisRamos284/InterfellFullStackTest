import { BaseRoute, ClientPurchaseAttributes } from "commons";
import { useApi } from "./useApi";

export const useGetPendingOrders = (
  clientId?: string
): {
  orders: Omit<ClientPurchaseAttributes, "token">[];
  refreshOrders: () => void;
} => {
  const { data, mutate } = useApi<Omit<ClientPurchaseAttributes, "token">[]>(
    !!clientId && {
      path: `${BaseRoute.PRODUCTS}/purchase/pending`,
      query: { clientId: String(clientId) },
    }
  );

  return { orders: data?.response || [], refreshOrders: () => mutate() };
};
