import express, { Request, Response } from "express";
import "dotenv/config";
import routes from "./routes";
import cors from "cors";
import instance from "./config/getSequelizeInstance";

const app = express();
app.disable("x-powered-by");

const corsOptions = {
  origin: "*",
  maxAge: 86400,
};

const PORT = process.env.PORT;

app.use(cors(corsOptions));

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });

app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`Success!`);
});

// mount api v1 routes
app.use("/v1", routes);

// Test Connection
(async () => {
  try {
    await instance.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
