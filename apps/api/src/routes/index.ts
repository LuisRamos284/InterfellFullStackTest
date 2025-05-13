import { BaseRoute } from "commons";
import express from "express";
import clientRoutes from "./clients.route";

const router = express.Router();

router.use(BaseRoute.CLIENT, clientRoutes);

export = router;
