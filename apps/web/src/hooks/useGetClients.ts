import { BaseRoute, ClientAttributes } from "commons";
import { useApi } from "./useApi";

export const useGetClients = (): {
  clients: ClientAttributes[];
  refreshClients: () => void;
} => {
  const { data, mutate } = useApi<ClientAttributes[]>({
    path: `${BaseRoute.CLIENT}/all`,
  });

  return { clients: data?.response || [], refreshClients: () => mutate() };
};
