import express from "express";
import {
  confirmOrder,
  getPendingOrders,
  getProducts,
  purchaseProduct,
} from "../controller/product.controller";
import { Request, Response } from "express";
import { ApiRoutes, BaseRoute, ProductRoutes } from "commons";

const router = express.Router();

const productRoutesData = ApiRoutes[BaseRoute.PRODUCTS];

router.route(ProductRoutes.GET_PRODUCTS).get((req: Request, res: Response) =>
  getProducts({
    req,
    res,
    defaultMessage: productRoutesData[ProductRoutes.GET_PRODUCTS].defaultError,
    method: productRoutesData[ProductRoutes.GET_PRODUCTS].method,
  })
);

router
  .route(ProductRoutes.PURCHASE_PRODUCT)
  .post((req: Request, res: Response) =>
    purchaseProduct({
      req,
      res,
      defaultMessage:
        productRoutesData[ProductRoutes.PURCHASE_PRODUCT].defaultError,
      method: productRoutesData[ProductRoutes.PURCHASE_PRODUCT].method,
    })
  );

router
  .route(ProductRoutes.GET_PENDING_PURCHASES)
  .get((req: Request, res: Response) =>
    getPendingOrders({
      req,
      res,
      defaultMessage:
        productRoutesData[ProductRoutes.GET_PENDING_PURCHASES].defaultError,
      method: productRoutesData[ProductRoutes.GET_PENDING_PURCHASES].method,
    })
  );

router
  .route(ProductRoutes.CONFIRM_PURCHASE)
  .put((req: Request, res: Response) =>
    confirmOrder({
      req,
      res,
      defaultMessage:
        productRoutesData[ProductRoutes.CONFIRM_PURCHASE].defaultError,
      method: productRoutesData[ProductRoutes.CONFIRM_PURCHASE].method,
    })
  );

export = router;
