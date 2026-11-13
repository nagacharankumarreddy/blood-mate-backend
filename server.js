import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const { MONGO_URI, PORT = 5000 } = process.env;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

try {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
} catch (err) {
  // Exit so the host (Render) restarts the service instead of leaving it up with no database.
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
}
