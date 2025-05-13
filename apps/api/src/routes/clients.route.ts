import express from "express";
import { registerClient } from "../controller/clients.controller";

const router = express.Router();

router.route("/").post(registerClient);

export = router;
