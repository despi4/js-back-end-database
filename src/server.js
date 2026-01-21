import "dotenv/config";
import { createApp } from "./app.js";
import { pgHealthcheck } from "./config/postgres.js";
import { connectMongo } from "./config/mongo.js";

const PORT = Number(process.env.PORT || 3000);

async function main() {
  await connectMongo();
  
  const ok = await pgHealthcheck();
  if (!ok) throw new Error("Postgres healthcheck failed");

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  console.error("Startup error:", e);
  process.exit(1);
});
