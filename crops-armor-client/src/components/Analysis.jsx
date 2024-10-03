import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaChartBar,
  FaSearch,
  FaHistory,
  FaRobot,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";

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
    <>
      <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
        {/* Sidebar */}
        <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
          <h2 className="text-3xl font-bold mb-5 text-center">Dashboard</h2>
          <div>
            <Link to="/" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-success w-full">
                <FaChartBar className="mr-2 text-lg" /> Current Stats
              </button>
            </Link>

            {/* Analysis */}
            <Link to="/analysis" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-info w-full">
                <FaSearch className="mr-2 text-lg" /> Analysis
              </button>
            </Link>

            {/* Past Stats */}
            <Link to="/past_stat" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-accent w-full">
                <FaHistory className="mr-2 text-lg" /> Past Stats
              </button>
            </Link>

            {/* Agro Bot */}
            <Link to="/agro_bot" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-success w-full">
                <FaRobot className="mr-2 text-lg" /> Agro Bot
              </button>
            </Link>

            {/* Community */}
            <Link to="/community" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-info w-full">
                <FaUsers className="mr-2 text-lg" /> Community
              </button>
            </Link>

            {/* Help Desk */}
            <Link to="/help" className="block mb-4">
              <button className="flex items-center btn btn-outline btn-accent w-full">
                <FaQuestionCircle className="mr-2 text-lg" /> Help Desk
              </button>
            </Link>
            <Link to="/profile" className="block">
              <button className="flex items-center btn btn-outline btn-accent w-full">
                <FaUser className="mr-2 text-lg" /> Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-12 bg-gray-50 min-h-screen">
          {/* Risk Assessment Section */}
          {floodOrDroughtRisk && (
            <div
              className={`mb-8 p-6 rounded-lg shadow-xl ${
                floodOrDroughtRisk.includes("High")
                  ? "bg-red-100 border-l-4 border-red-600 text-red-800"
                  : "bg-yellow-100 border-l-4 border-yellow-600 text-yellow-800"
              }`}
            >
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
                ⚠️ Risk Assessment
              </h2>
              <p className="text-lg">{floodOrDroughtRisk}</p>
            </div>
          )}

          {/* Field Recommendations Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              🌾 Field Recommendations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sensorData ? (
                getFieldAdvice(sensorData).map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${item.bgColor} flex flex-col items-center`}
                  >
                    <span className="text-5xl mb-4">{item.icon}</span>
                    <h3 className="text-2xl font-semibold text-gray-700">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-600 mt-3 text-center">
                      {item.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No sensor data available to generate recommendations.
                </p>
              )}
            </div>
          </div>

          {/* Predictions for Next Day Section */}
          {insights && (
            <div className="mt-12">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">
                📈 Predictions for Next Day
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Individual Prediction Card */}
                {[
                  { label: "Humidity Trend", value: insights.humidityTrend },
                  {
                    label: "Precipitation Trend",
                    value: insights.precipitationTrend,
                  },
                  {
                    label: "Soil Moisture Trend",
                    value: insights.soilMoistureTrend,
                  },
                  {
                    label: "Temperature Trend",
                    value: insights.temperatureTrend,
                  },
                  { label: "Wind Trend", value: insights.windTrend },
                ].map((insight, i) => (
                  <div
                    key={i}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                      {insight.label}
                    </h3>
                    <p
                      className={`text-4xl font-bold ${
                        insight.value > 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {insight.value.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Analysis;
