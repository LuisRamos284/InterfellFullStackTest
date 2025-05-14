import express from "express";
import {
  getClientWallet,
  rechargeWallet,
} from "../controller/wallet.controller";
import { WalletRoutes } from "commons";

const router = express.Router();

router.route(WalletRoutes.RECHARGE_WALLET).patch(rechargeWallet);

router.route(WalletRoutes.GET_CLIENT_WALLET).get(getClientWallet);

export = router;
