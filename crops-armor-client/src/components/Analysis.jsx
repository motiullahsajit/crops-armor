import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the actual pest sound frequency data
const PEST_DATA = {
  Aphids: { min: 60, max: 80 },
  Grasshoppers: { min: 70, max: 150 },
  Caterpillars: { min: 100, max: 200 },
  Crickets: { min: 300, max: 400 },
  Beetles: { min: 400, max: 500 },
};

const Analysis = () => {
  const [sensorData, setSensorData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch sensor data
    axios
      .get(`${import.meta.env.VITE_API_URL}/sensors`)
      .then((response) => {
        setSensorData(response.data[0]); // Get the most recent data
        return axios.get(`${import.meta.env.VITE_API_URL}/analyze`); // Fetch analysis data
      })
      .then((response) => {
        setAnalysisData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const getPestType = (soundFrequency) => {
    for (const [pest, range] of Object.entries(PEST_DATA)) {
      if (soundFrequency >= range.min && soundFrequency < range.max) {
        return pest;
      }
    }
    return "Unknown Pest";
  };

  const getFieldAdvice = (data) => {
    if (!data) return [];

    const {
      temperature,
      soilMoisture,
      waterLevel,
      soundFrequency,
      animalPresence,
    } = data;
    let advice = [];

    if (temperature > 30) {
      advice.push({
        icon: "🌡️",
        title: "Temperature",
        message:
          "It's very hot. Consider providing shade and additional watering.",
        bgColor: "bg-red-200",
      });
    } else if (temperature < 15) {
      advice.push({
        icon: "🌡️",
        title: "Temperature",
        message: "The temperature is low. Protect plants from cold.",
        bgColor: "bg-blue-200",
      });
    } else {
      advice.push({
        icon: "🌡️",
        title: "Temperature",
        message: "The temperature is ideal.",
        bgColor: "bg-green-200",
      });
    }

    if (soilMoisture < 20) {
      advice.push({
        icon: "💧",
        title: "Soil Moisture",
        message: "Soil is too dry. Increase irrigation.",
        bgColor: "bg-yellow-200",
      });
    } else if (soilMoisture > 60) {
      advice.push({
        icon: "💧",
        title: "Soil Moisture",
        message: "Soil is too moist. Reduce watering.",
        bgColor: "bg-blue-200",
      });
    } else {
      advice.push({
        icon: "💧",
        title: "Soil Moisture",
        message: "Soil moisture is at an optimal level.",
        bgColor: "bg-green-200",
      });
    }

    if (waterLevel < 50) {
      advice.push({
        icon: "🚰",
        title: "Water Level",
        message: "Water level is low. Check the water supply.",
        bgColor: "bg-yellow-200",
      });
    } else {
      advice.push({
        icon: "🚰",
        title: "Water Level",
        message: "Water level is sufficient.",
        bgColor: "bg-green-200",
      });
    }

    const pest = getPestType(soundFrequency);
    if (pest !== "Unknown Pest") {
      advice.push({
        icon: "🐜",
        title: "Pest Alert",
        message: `${pest} detected. Consider taking pest control measures.`,
        bgColor: "bg-red-200",
      });
    } else {
      advice.push({
        icon: "🐜",
        title: "Pest Alert",
        message: "No known pests detected.",
        bgColor: "bg-green-200",
      });
    }

    if (animalPresence) {
      advice.push({
        icon: "🐾",
        title: "Animal Presence",
        message: "Trespassing animals detected. Secure the area.",
        bgColor: "bg-red-200",
      });
    } else {
      advice.push({
        icon: "🐾",
        title: "Animal Presence",
        message: "No animal trespassing.",
        bgColor: "bg-green-200",
      });
    }

    return advice;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  if (error) return <p>{error}</p>;

  const { insights, floodOrDroughtRisk } = analysisData || {};

  return (
    <div className="">
      <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
        {/* Sidebar */}
        <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
          <h2 className="text-3xl font-bold mb-5 text-center">Dashboard</h2>
          <div className="">
            <Link to="/">
              <button className="btn btn-outline btn-success w-full mb-4">
                Current Stats
              </button>
            </Link>
            <Link to="/analysis">
              <button className="btn btn-outline btn-info w-full mb-4">
                Analysis
              </button>
            </Link>
            <Link to="/past_stat">
              <button className="btn btn-outline btn-accent w-full">
                Past Stats
              </button>
            </Link>
            <Link to="/community">
              <button className="btn btn-outline btn-accent w-full">
                Community
              </button>
            </Link>
            <Link to="/help">
              <button className="btn btn-outline btn-accent w-full">
                Help Desk
              </button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 md:p-10">
          {/* Risk Assessment Section */}
          {floodOrDroughtRisk && (
            <div
              className={`mb-8 p-5 rounded-lg shadow-lg ${
                floodOrDroughtRisk.includes("High")
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">
                ⚠️ Risk Assessment
              </h2>
              <p className="text-xl">{floodOrDroughtRisk}</p>
            </div>
          )}

          {/* Field Recommendations Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-5">
              🌾 Field Recommendations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensorData ? (
                getFieldAdvice(sensorData).map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bgColor} p-5 rounded-lg shadow-md flex flex-col items-center`}
                  >
                    <span className="text-4xl mb-3">{item.icon}</span>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-lg text-center mt-2">{item.message}</p>
                  </div>
                ))
              ) : (
                <p>No sensor data available to generate recommendations.</p>
              )}
            </div>
          </div>

          {/* Predictions for Next Day Section */}
          {insights && (
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-5">
                📈 Predictions for Next Day
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Humidity Trend
                  </h2>
                  <p
                    className={`text-3xl ${
                      insights.humidityTrend > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {insights.humidityTrend.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Precipitation Trend
                  </h2>
                  <p
                    className={`text-3xl ${
                      insights.precipitationTrend > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {insights.precipitationTrend.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Soil Moisture Trend
                  </h2>
                  <p
                    className={`text-3xl ${
                      insights.soilMoistureTrend > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {insights.soilMoistureTrend.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Temperature Trend
                  </h2>
                  <p
                    className={`text-3xl ${
                      insights.temperatureTrend > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {insights.temperatureTrend.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Wind Trend</h2>
                  <p
                    className={`text-3xl ${
                      insights.windTrend > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {insights.windTrend.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
