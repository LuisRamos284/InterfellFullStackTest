import express from "express";
import { getClients, registerClient } from "../controller/clients.controller";
import { ClientRoutes } from "commons";
import { checkIfClientExists } from "../middlewares/checkIfClientExists";

const router = express.Router();

router.route(ClientRoutes.GET_CLIENTS).get(getClients);
router
  .route(ClientRoutes.REGISTER_CLIENT)
  .post([checkIfClientExists], registerClient);

export = router;
