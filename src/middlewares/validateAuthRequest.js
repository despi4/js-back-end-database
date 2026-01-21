import { existsByEmailOrUsername } from "../services/user.service.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthRequest(mode /* "register" | "login" */) {
  return async (req, res, next) => {
    try {
      const { email, username, password } = req.body ?? {};

      if (mode === "register") {
        if (!email || typeof email !== "string") {
          return res.status(400).json({ ok: false, error: "validation_error", message: "email is required" });
        }
      }

      if (!password || typeof password !== "string") {
        return res.status(400).json({ ok: false, error: "validation_error", message: "password is required" });
      }

      if (email && !emailRegex.test(email)) {
        return res.status(400).json({ ok: false, error: "validation_error", message: "invalid email format" });
      }

      if (password.length < 6) {
        return res.status(400).json({
          ok: false,
          error: "validation_error",
          message: "password must be at least 6 characters",
        });
      }

      if (mode === "register") {
        const dup = await existsByEmailOrUsername({ email, username });
        if (dup) {
          return res.status(409).json({
            ok: false,
            error: "duplicate_user",
            message: "user with same email/username already exists",
          });
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}
