import express from "express";
import { getClients, registerClient } from "../controller/clients.controller";
import { ApiRoutes, BaseRoute, ClientRoutes } from "commons";
import { Request, Response } from "express";

const router = express.Router();

const clientRoutesData = ApiRoutes[BaseRoute.CLIENT];

router.route(ClientRoutes.GET_CLIENTS).get((req: Request, res: Response) =>
  getClients({
    req,
    res,
    defaultMessage: clientRoutesData[ClientRoutes.GET_CLIENTS].defaultError,
    method: clientRoutesData[ClientRoutes.GET_CLIENTS].method,
  })
);

router.route(ClientRoutes.REGISTER_CLIENT).post((req: Request, res: Response) =>
  registerClient({
    req,
    res,
    defaultMessage: clientRoutesData[ClientRoutes.REGISTER_CLIENT].defaultError,
    method: clientRoutesData[ClientRoutes.REGISTER_CLIENT].method,
  })
);

export = router;
