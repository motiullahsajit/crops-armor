import express from "express";
import { storeSensorData } from "../controllers/sensorController.js";
const app = express.Router();

app.post("/", storeSensorData);

export default app;
