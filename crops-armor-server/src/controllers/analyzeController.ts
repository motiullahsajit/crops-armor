import { Request, Response } from "express";
import Humidity from "../models/Humidity.js";
import Precipitation from "../models/Precipitation.js";
import SoilMoisture from "../models/SoilMoisture.js";
import Temperature from "../models/Temperature.js";
import Wind from "../models/Wind.js";
import SensorData from "../models/SensorData.js";
import {
  analyzeData,
  predictFloodOrDrought,
} from "../services/analysisService.js";

export const analyzeAndPredict = async (req: Request, res: Response) => {
  try {
    const sensorData = await SensorData.find().sort({ createdAt: -1 }).limit(1);

    if (!sensorData.length) {
      return res.status(404).json({ message: "No sensor data available" });
    }

    const latestSensorData = sensorData[0];

    const humidityData = await Humidity.find().sort({ YEAR: -1 }).limit(3);
    const precipitationData = await Precipitation.find()
      .sort({ YEAR: -1 })
      .limit(3);
    const soilMoistureData = await SoilMoisture.find()
      .sort({ YEAR: -1 })
      .limit(3);
    const temperatureData = await Temperature.find()
      .sort({ YEAR: -1 })
      .limit(3);
    const windData = await Wind.find().sort({ YEAR: -1 }).limit(3);

    const insights = analyzeData(latestSensorData, {
      humidityData,
      precipitationData,
      soilMoistureData,
      temperatureData,
      windData,
    });

    const floodOrDroughtRisk = predictFloodOrDrought(insights);

    return res.json({
      insights,
      floodOrDroughtRisk,
    });
  } catch (error) {
    console.error("Error in analyzing data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
