import express, { Application } from "express";
import Server from "./index";
import logger from "./utils/logger";
import config from "./config";

const app: Application = express();
const server: Server = new Server(app);

app.listen(config.port, function () {
  logger.log(`Server is running on port ${config.port}.`);
});

app.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    logger.error("Error: address already in use");
  } else {
    logger.error(err);
  }
});
