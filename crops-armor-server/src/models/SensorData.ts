import { Schema, model } from "mongoose";

export interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  waterLevel: number;
  ldrValue: number;
  soundFrequency: number;
  pirValue: number;
  createdAt: Date;
}

const sensorDataSchema = new Schema<SensorData>({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  soilMoisture: { type: Number, required: true },
  waterLevel: { type: Number, required: true },
  ldrValue: { type: Number, required: true },
  soundFrequency: { type: Number, required: true },
  pirValue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<SensorData>("SensorData", sensorDataSchema);
