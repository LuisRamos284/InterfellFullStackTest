import express from "express";
import {
  getClientWallet,
  rechargeWallet,
} from "../controller/wallet.controller";
import { ApiRoutes, BaseRoute, WalletRoutes } from "commons";
import { Request, Response } from "express";

const router = express.Router();

const walletRoutesData = ApiRoutes[BaseRoute.WALLET];

router
  .route(WalletRoutes.RECHARGE_WALLET)
  .patch((req: Request, res: Response) =>
    rechargeWallet({
      req,
      res,
      defaultMessage:
        walletRoutesData[WalletRoutes.RECHARGE_WALLET].defaultError,
      method: walletRoutesData[WalletRoutes.RECHARGE_WALLET].method,
    })
  );

router
  .route(WalletRoutes.GET_CLIENT_WALLET)
  .get((req: Request, res: Response) =>
    getClientWallet({
      req,
      res,
      defaultMessage:
        walletRoutesData[WalletRoutes.GET_CLIENT_WALLET].defaultError,
      method: walletRoutesData[WalletRoutes.GET_CLIENT_WALLET].method,
    })
  );

export = router;
