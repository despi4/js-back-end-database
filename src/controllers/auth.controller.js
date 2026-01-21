import bcrypt from "bcrypt";
import "dotenv/config";
import { createUser } from "../services/user.service.js";

export async function register(req, res, next) {
  try {
    const { email, username, password } = req.body;

    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
    const passwordHash = await bcrypt.hash(password, rounds);

    const user = await createUser({ email, username, passwordHash });

    return res.status(201).json({
      ok: true,
      message: "registered",
      user,
    });
  } catch (e) {
    next(e);
  }
}
