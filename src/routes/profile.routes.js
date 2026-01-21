import { Router } from "express";
import { myProfile, updateMyProfile } from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const profileRoutes = Router();

profileRoutes.get("/profile", requireAuth, myProfile);
profileRoutes.put("/profile", requireAuth, updateMyProfile);
