import { BaseRoute } from "commons";
import express from "express";
import clientRoutes from "./clients.route";
import walletRoutes from "./wallet.route";

const router = express.Router();

router.use(BaseRoute.CLIENT, clientRoutes);
router.use(BaseRoute.WALLET, walletRoutes);

export = router;
