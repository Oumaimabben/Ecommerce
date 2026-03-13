import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// exemple route
app.get("/", (req, res) => {
  res.send("API is running...");
});
