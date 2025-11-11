import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", itemRoutes);

app.get("/", (req, res) => {
  res.send("Best Price API is running...");
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
