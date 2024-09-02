import { Request, Response } from "express";
import SensorData from "../models/SensorData.js";

export const getSensorData = async (req: Request, res: Response) => {
  try {
    const sensorData = await SensorData.find().sort({ createdAt: -1 });

    res.status(200).json(sensorData);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve sensor data", error });
  }
};

export const storeSensorData = async (req: any, res: any) => {
  try {
    const {
      temperature,
      humidity,
      soilMoisture,
      waterLevel,
      ldrValue,
      soundFrequency,
      pirValue,
    } = req.body;

    const newSensorData = new SensorData({
      temperature,
      humidity,
      soilMoisture,
      waterLevel,
      ldrValue,
      soundFrequency,
      pirValue,
    });

    await newSensorData.save();
    res.status(201).json({ message: "Sensor data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save sensor data", error });
  }
};
