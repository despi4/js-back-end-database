import bcrypt from "bcrypt";
import "dotenv/config";
import { createUser, findUserByEmailOrUsername } from "../services/user.service.js";
import { signToken } from "../services/token.service.js";

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

export async function login(req, res, next) {
  try {
    const { email, username, password } = req.body;

    const user = await findUserByEmailOrUsername({ email, username });
    if (!user) {
      return res.status(401).json({ ok: false, error: "auth_failed", message: "invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ ok: false, error: "auth_failed", message: "invalid credentials" });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      username: user.username || null,
    });

    return res.status(200).json({
      ok: true,
      message: "logged_in",
      token,
    });
  } catch (e) {
    next(e);
  }
}
