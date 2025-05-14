import { buildErrorMsg } from "../functions";
import { RouteMethod } from "./http";

enum BaseRoute {
  CLIENT = "/client",
  WALLET = "/wallet",
  PRODUCTS = "/products",
}

enum ClientRoutes {
  GET_CLIENTS = "/all",
  REGISTER_CLIENT = "/",
}

enum WalletRoutes {
  RECHARGE_WALLET = "/recharge",
  GET_CLIENT_WALLET = "/client",
}

enum ProductRoutes {
  GET_PRODUCTS = "/all",
  PURCHASE_PRODUCT = "/purchase",
  CONFIRM_PURCHASE = "/purchase/confirm",
  GET_PENDING_PURCHASES = "/purchase/pending",
}

const ApiRoutes = {
  [BaseRoute.CLIENT]: {
    [ClientRoutes.GET_CLIENTS]: {
      method: RouteMethod.GET,
      defaultError: buildErrorMsg("getting client list"),
    },
    [ClientRoutes.REGISTER_CLIENT]: {
      method: RouteMethod.POST,
      defaultError: buildErrorMsg("registering client"),
    },
  },
  [BaseRoute.WALLET]: {
    [WalletRoutes.GET_CLIENT_WALLET]: {
      method: RouteMethod.GET,
      defaultError: buildErrorMsg("getting client wallet"),
    },
    [WalletRoutes.RECHARGE_WALLET]: {
      method: RouteMethod.PATCH,
      defaultError: buildErrorMsg("getting client wallet"),
    },
  },
  [BaseRoute.PRODUCTS]: {
    [ProductRoutes.CONFIRM_PURCHASE]: {
      method: RouteMethod.PUT,
      defaultError: buildErrorMsg("confirming purchase"),
    },
    [ProductRoutes.GET_PENDING_PURCHASES]: {
      method: RouteMethod.GET,
      defaultError: buildErrorMsg("getting purchases"),
    },
    [ProductRoutes.GET_PRODUCTS]: {
      method: RouteMethod.GET,
      defaultError: buildErrorMsg("getting products"),
    },
    [ProductRoutes.PURCHASE_PRODUCT]: {
      method: RouteMethod.POST,
      defaultError: buildErrorMsg("purchasing product"),
    },
  },
} as const;

export { BaseRoute, ApiRoutes, ProductRoutes, WalletRoutes, ClientRoutes };
