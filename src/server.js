import { createApp } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
