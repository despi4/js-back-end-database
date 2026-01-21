import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { validateAuthRequest } from "../middlewares/validateAuthRequest.js";

export const authRoutes = Router();

authRoutes.post("/register", validateAuthRequest("register"), register);
