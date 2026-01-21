import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
    const app = express();
    
    app.use(express.json());

    app.get("/health", (req, res) => res.json({ ok: true}));
    
    app.use(errorHandler);
    return app;
}