import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import donorRoutes from "./routes/donors.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/donors", donorRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));
