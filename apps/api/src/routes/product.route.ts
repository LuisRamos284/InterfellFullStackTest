import express from "express";
import { getProducts } from "../controller/product.controller";

const router = express.Router();

router.route("/all").get(getProducts);

export = router;
