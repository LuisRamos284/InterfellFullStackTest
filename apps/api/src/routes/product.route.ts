import express from "express";
import {
  confirmOrder,
  getPendingOrders,
  getProducts,
  purchaseProduct,
} from "../controller/product.controller";
import { ProductRoutes } from "commons";

const router = express.Router();

router.route(ProductRoutes.GET_PRODUCTS).get(getProducts);

router.route(ProductRoutes.PURCHASE_PRODUCT).post(purchaseProduct);

router.route(ProductRoutes.GET_PENDING_PURCHASES).get(getPendingOrders);

router.route(ProductRoutes.CONFIRM_PURCHASE).put(confirmOrder);

export = router;
