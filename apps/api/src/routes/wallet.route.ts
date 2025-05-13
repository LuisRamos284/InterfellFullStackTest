import express from "express";
import {
  getClientWallet,
  rechargeWallet,
} from "../controller/wallet.controller";

const router = express.Router();

router.route("/recharge").post(rechargeWallet);
router.route("/client").get(getClientWallet);

export = router;
