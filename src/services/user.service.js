import { pgPool } from "../config/postgres.js";

export async function existsByEmailOrUsername({ email, username }) {
  if (email) {
    const r = await pgPool.query("SELECT 1 FROM users WHERE email=$1", [email]);
    if (r.rowCount > 0) return true;
  }
  if (username) {
    const r = await pgPool.query("SELECT 1 FROM users WHERE username=$1", [username]);
    if (r.rowCount > 0) return true;
  }
  return false;
}

export async function createUser({ email, username, passwordHash }) {
  const r = await pgPool.query(
    "INSERT INTO users(email, username, password_hash) VALUES($1,$2,$3) RETURNING id,email,username,created_at",
    [email, username || null, passwordHash]
  );
  return r.rows[0];
}

export async function findUserByEmailOrUsername({ email, username }) {
  if (email) {
    const r = await pgPool.query("SELECT * FROM users WHERE email=$1", [email]);
    return r.rows[0] || null;
  }
  if (username) {
    const r = await pgPool.query("SELECT * FROM users WHERE username=$1", [username]);
    return r.rows[0] || null;
  }
  return null;
}

export async function getUserPublicById(id) {
  const r = await pgPool.query(
    "SELECT id, email, username, created_at FROM users WHERE id=$1",
    [id]
  );
  return r.rows[0] || null;
}



