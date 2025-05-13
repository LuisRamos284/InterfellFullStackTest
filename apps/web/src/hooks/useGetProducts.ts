import { BaseRoute, ProductAttributes } from "commons";
import { useApi } from "./useApi";

export const useGetProducts = (): {
  products: ProductAttributes[];
  refreshProducts: () => void;
} => {
  const { data, mutate } = useApi<ProductAttributes[]>({
    path: `${BaseRoute.PRODUCTS}/all`,
  });

  return { products: data?.response || [], refreshProducts: () => mutate() };
};
