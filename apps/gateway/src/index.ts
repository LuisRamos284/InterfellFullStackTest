import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.APP_URL,
  maxAge: 86400,
};

const PORT = process.env.PORT;
app.use((req, res, next) => {
  express.json()(req, res, next);
});

app.use(cors(corsOptions));
// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`Hello World`);
});

// mount api v1 routes
app.use("/v1", routes);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
