import express from "express";
import { authRoutes } from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { profileRoutes } from "./routes/profile.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
    const app = express();

    app.use(express.static(path.join(__dirname, "public")));
    
    app.use(express.json());

    app.get("/health", (req, res) => res.json({ ok: true}));
    
    app.use(authRoutes);

    app.use(profileRoutes);
    
    app.get("/", (req, res) => {
        res.redirect("/login.html");
    });


    app.use(errorHandler);
    return app;
}