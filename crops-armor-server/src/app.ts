import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/features.js";
import morgan from "morgan";
import cors from "cors";

config({
  path: "./.env",
});

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "https://swift-cart-zeta.vercel.app",
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);

app.get("/", (req, res) => {
  res.send("API working with /api/v1/");
});

app.listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});

export default app;
