import pg from "pg";
import "dotenv/config";

export const pgPool = new pg.Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT || 5432),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

export async function pgHealthcheck() {
  const r = await pgPool.query("SELECT 1 as ok");
  return r.rows[0]?.ok === 1;
}
