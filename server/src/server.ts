import express, { Application } from "express";
import Server from "./index";
import logger from "./utils/logger";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.listen(PORT, function () {
    logger.log(`Server is running on port ${PORT}.`);
});

app.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
        logger.error("Error: address already in use");
    } else {
        logger.error(err);
    }
});
