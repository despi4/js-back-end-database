import express from "express";
import { authRoutes } from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { profileRoutes } from "./routes/profile.routes.js";

export function createApp() {
    const app = express();
    
    app.use(express.json());

    app.get("/health", (req, res) => res.json({ ok: true}));
    
    app.use(authRoutes);

    app.use(profileRoutes);

    app.use(errorHandler);
    return app;
}