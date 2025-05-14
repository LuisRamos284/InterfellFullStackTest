import express from "express";
import { getClients, registerClient } from "../controller/clients.controller";

const router = express.Router();

router.route("/all").get(getClients);
router.route("/").post(registerClient);

export = router;
