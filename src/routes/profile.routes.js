import { Router } from "express";
import { myProfile } from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const profileRoutes = Router();

profileRoutes.get("/profile", requireAuth, myProfile);
