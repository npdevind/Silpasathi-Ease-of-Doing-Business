// checking for production mode to load the environment files
import "dotenv/config";
import express, { Application, Request } from "express";
import apiRouter from "./routes/api";
import webRouter from "./routes/web";
import * as path from "path";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swaggerConfig";

const app: Application = express();

// if env port available then it will go for this port instead of 8081
const PORT = process.env.PORT || 3000;
// accepting json file upto 10mb
app.use(express.json({ limit: "10mb" }));
app.use(cors<Request>());
app.use("/uploads", express.static(path.join(__dirname, "../data/uploads")));

app.use(express.static("public"));

// use url encoder for get the data
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(morgan("common"));

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// use the api routes to /api
app.use("/api/v1", apiRouter);

// use the web routes to default
app.use(webRouter);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is Listening on: ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (err: Error, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
});
