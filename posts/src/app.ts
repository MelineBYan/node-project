import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import {
    Logger,
    ConsoleTransport,
    createLoggerMiddleware,
} from "@voskan/context-aware-logger";
import { NotFoundError, errorHandler } from "@meline1/common";
import { createPostRouter } from "./routes/new";
import { showPostRouter } from "./routes/show";

const app = express();
const logger = new Logger();
logger.addTransport(new ConsoleTransport());

app.use(json());
app.use(createLoggerMiddleware(logger));

app.use(createPostRouter);
app.use(showPostRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app, logger };