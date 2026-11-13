import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import donorRoutes from "./routes/donors.js";

// The Express app, without the database connection, so it can be started by server.js or by tests.
const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  const database = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({ status: "Ready", database });
});

app.use("/api/donors", donorRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found." });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body is not valid JSON." });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large." });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

export default app;
