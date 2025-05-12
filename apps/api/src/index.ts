import express, { Request, Response } from "express";
import 'dotenv/config'

import { TEST_MESSAGE } from "commons";
import { sequelize } from "./config/sql";

const app = express();

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`${TEST_MESSAGE} Hello World`);
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });

// Test Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
