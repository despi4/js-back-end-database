import { verifyToken } from "../services/token.service.js";

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const [type, token] = auth.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, error: "unauthorized", message: "missing bearer token" });
  }

  try {
    req.user = verifyToken(token); // { userId, email, username }
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "unauthorized", message: "invalid token" });
  }
}
