import { SensorData } from "../models/SensorData.js";
import { Humidity } from "../models/Humidity.js";
import { Precipitation } from "../models/Precipitation.js";
import { SoilMoisture } from "../models/SoilMoisture.js";
import { Temperature } from "../models/Temperature.js";
import { Wind } from "../models/Wind.js";

const calculateTrend = (
  sensorValue: number,
  nasaData: any[],
  key: string
): number => {
  const nasaValues = nasaData.map((data) => data[key]);
  const averageNasaValue =
    nasaValues.reduce((a, b) => a + b, 0) / nasaValues.length;
  return sensorValue - averageNasaValue;
};

export const analyzeData = (
  sensorData: SensorData,
  nasaData: {
    humidityData: Humidity[];
    precipitationData: Precipitation[];
    soilMoistureData: SoilMoisture[];
    temperatureData: Temperature[];
    windData: Wind[];
  }
) => {
  return {
    humidityTrend: calculateTrend(
      sensorData.humidity,
      nasaData.humidityData,
      "ANN"
    ),
    precipitationTrend: calculateTrend(
      sensorData.waterLevel,
      nasaData.precipitationData,
      "ANN"
    ),
    soilMoistureTrend: calculateTrend(
      sensorData.soilMoisture,
      nasaData.soilMoistureData,
      "ANN"
    ),
    temperatureTrend: calculateTrend(
      sensorData.temperature,
      nasaData.temperatureData,
      "ANN"
    ),
    windTrend: calculateTrend(sensorData.humidity, nasaData.windData, "ANN"),
  };
};

export const predictFloodOrDrought = (insights: any) => {
  const { precipitationTrend, soilMoistureTrend, temperatureTrend } = insights;

  if (precipitationTrend > 10 && soilMoistureTrend > 10) {
    return "High risk of flood";
  } else if (temperatureTrend > 5 && soilMoistureTrend < -5) {
    return "High risk of drought";
  }

  return "Normal conditions";
};
