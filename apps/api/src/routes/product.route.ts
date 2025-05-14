import express from "express";
import {
  getPendingOrders,
  getProducts,
  purchaseProduct,
} from "../controller/product.controller";

const router = express.Router();

router.route("/all").get(getProducts);

router.route("/purchase").post(purchaseProduct);

router.route("/purchase/pending").get(getPendingOrders);

export = router;
