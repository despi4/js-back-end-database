import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateAuthRequest } from "../middlewares/validateAuthRequest.js";

export const authRoutes = Router();

authRoutes.post("/register", validateAuthRequest("register"), register);
authRoutes.post("/login", validateAuthRequest("login"), login);
