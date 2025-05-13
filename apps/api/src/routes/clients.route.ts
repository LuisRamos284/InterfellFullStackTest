import express from "express";
import { getClients } from "../controller/clients.controller";

const router = express.Router();

router.route("/all").get(getClients);

export = router;
