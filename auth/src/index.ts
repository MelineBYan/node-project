import mongoose from "mongoose";
import { app, logger } from "./app";

const start = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined.");
    }

    if (!process.env.AUTH_PORT) {
        throw new Error("AUTH_PORT must be defined.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("AUTH SERVICE: Connected to MongoDB");
    } catch (err) {
        throw err;
    }

    app.listen(process.env.AUTH_PORT, () => {
        logger.info("AUTH SERVICE: Listening on port " + process.env.AUTH_PORT);
    });
};

start();