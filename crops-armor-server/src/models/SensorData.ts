import { Schema, model } from "mongoose";

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  waterLevel: number;
  ldrValue: string;
  soundFrequency: number;
  pirValue: number;
}

const sensorDataSchema = new Schema<SensorData>(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    waterLevel: { type: Number, required: true },
    ldrValue: { type: String, required: true },
    soundFrequency: { type: Number, required: true },
    pirValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const SensorData = model<SensorData>("SensorData", sensorDataSchema);

export default SensorData;
