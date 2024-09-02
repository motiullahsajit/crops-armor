import express from "express";

import { analyzeAndPredict } from "../controllers/analyzeController.js";
const app = express.Router();

app.get("/", analyzeAndPredict);

export default app;
