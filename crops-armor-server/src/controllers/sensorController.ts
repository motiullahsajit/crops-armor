import { SensorData } from "../models/SensorData.js";

export const storeSensorData = async (req: any, res: any) => {
  try {
    const { temperature, humidity, soilMoisture, waterLevel, ldrValue } =
      req.body;

    const newSensorData = new SensorData({
      temperature,
      humidity,
      soilMoisture,
      waterLevel,
      ldrValue,
    });

    await newSensorData.save();
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save sensor data", error });
  }
};
