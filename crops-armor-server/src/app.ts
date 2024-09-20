import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/features.js";
import sensorDataRoute from "./routes/sensorRoutes.js";
import analyzeDataRoute from "./routes/analyzeRoutes.js";
import morgan from "morgan";
import cors from "cors";

config({
  path: "./.env",
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Production
const corsOptions = {
  origin: "https://crops-armor.vercel.app",
};

app.use(cors(corsOptions));

// Development
// app.use(cors());

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);

app.use("/api/sensors", sensorDataRoute);
app.use("/api/analyze", analyzeDataRoute);

app.get("/", (req, res) => {
  res.send("API working with /api/v1/");
});

app.listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});

export default app;
