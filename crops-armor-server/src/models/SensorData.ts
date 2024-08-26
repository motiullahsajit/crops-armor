import mongoose from "mongoose";

const schema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  soilMoisture: { type: Number, required: true },
  waterLevel: { type: Number, required: true },
  ldrValue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const SensorData = mongoose.model("SensorData", schema);
