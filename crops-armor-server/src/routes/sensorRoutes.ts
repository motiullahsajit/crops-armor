import express from "express";
import {
  getSensorData,
  storeSensorData,
} from "../controllers/sensorController.js";
const app = express.Router();

app.get("/", getSensorData);
app.post("/", storeSensorData);

export default app;
