import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaSeedling,
  FaSun,
  FaTint,
  FaUser,
  FaWater,
  FaChartBar,
  FaSearch,
  FaHistory,
  FaRobot,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const locationData = {
    city: "Dhaka",
    country: "Bangladesh",
    crop_production: {
      Barley: 37,
      Peanut: 26,
      Rapeseed: 23,
      Wheat: 16,
      Amun_rice: 12,
      Boro_rice: 17,
    },
    flood_impact: {
      flooded_area_ha: 530183,
      flooded_cropland_ha: 403183,
      impact: "Dhaka faced significant flooding in croplands near rivers.",
    },
    drought_severity: "Northern areas are experiencing D1: Moderate Drought.",
    wet_conditions: "Central and southern parts are W1: Moderately Wet.",
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/sensors`)
      .then((response) => {
        setSensorData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  if (error) return <p>{error}</p>;

  const firstData = sensorData[0];

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sensorData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sensorData.length / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
      {/* Sidebar */}
      <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
        <h2 className="text-3xl font-bold mb-5 text-center">
          {t("home.welcome")}
        </h2>
        <div>
          <Link to="/" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-success w-full">
              <FaChartBar className="mr-2 text-lg" /> {t("home.currentStats")}
            </button>
          </Link>

          {/* Analysis */}
          <Link to="/analysis" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-info w-full">
              <FaSearch className="mr-2 text-lg" /> {t("home.analysis")}
            </button>
          </Link>

          {/* Past Stats */}
          <Link to="/past_stat" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-accent w-full">
              <FaHistory className="mr-2 text-lg" /> {t("home.pastStats")}
            </button>
          </Link>

          {/* Agro Bot */}
          <Link to="/agro_bot" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-success w-full">
              <FaRobot className="mr-2 text-lg" /> {t("home.agroBot")}
            </button>
          </Link>

          {/* Community */}
          <Link to="/community" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-info w-full">
              <FaUsers className="mr-2 text-lg" /> {t("home.community")}
            </button>
          </Link>

          {/* Help Desk */}
          <Link to="/help" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-accent w-full">
              <FaQuestionCircle className="mr-2 text-lg" /> {t("home.helpDesk")}
            </button>
          </Link>
          <Link to="/profile" className="block">
            <button className="flex items-center btn btn-outline btn-accent w-full">
              <FaUser className="mr-2 text-lg" /> {t("home.profile")}
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:p-10">
        {/* Location-based Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
          {/* Left Section: Location and Data Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Location Section */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              {/* Location Data */}
              <FaMapMarkerAlt className="text-red-500 text-6xl mr-4" />
              <h2 className="text-3xl font-extrabold text-gray-800">
                {locationData.city}, {locationData.country}
              </h2>
            </div>

            {/* Data Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Wet Condition */}
              <div className="flex items-center bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-green-800">
                    {t("home.wetConditions")}
                  </h3>
                  <p className="text-lg font-bold text-green-900">
                    {locationData.wet_conditions}
                  </p>
                </div>
                <div className="ml-auto">
                  <FaTint className="text-green-600 text-4xl" />
                </div>
              </div>

              {/* Drought Severity */}
              <div className="flex items-center bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-yellow-800">
                    {t("home.droughtSeverity")}
                  </h3>
                  <p className="text-lg font-bold text-yellow-900">
                    {locationData.drought_severity}
                  </p>
                </div>
                <div className="ml-auto">
                  <FaSun className="text-yellow-600 text-4xl" />
                </div>
              </div>

              {/* Flood Impact */}
              <div className="flex items-center bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-red-800">
                    {t("home.floodImpact")}
                  </h3>
                  <p className="text-lg font-bold text-red-900">
                    {locationData.flood_impact.impact}
                  </p>
                </div>
                <div className="ml-auto">
                  <FaWater className="text-red-600 text-4xl" />
                </div>
              </div>

              {/* Best Crops */}
              <div className="flex items-center bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-purple-800">
                    {t("home.bestCrops")}
                  </h3>
                  <p className="text-lg font-bold text-purple-900">
                    Barley, Peanut, Wheat
                  </p>
                </div>
                <div className="ml-auto">
                  <FaSeedling className="text-purple-600 text-4xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Crop Calendar Image */}
          <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
            <img
              src="https://ipad.fas.usda.gov/countrysummary/images/BG/cropcalendar/bg_bg_calendar.png"
              alt="Crop Calendar"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Weather Data Section */}
        {firstData && (
          <>
            <h2 className="text-3xl font-bold my-5">{t("home.deviceData")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-gray-50 mt-6">
              {/* Weather Data */}
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-md shadow-md transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {t("home.weatherData")}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">🌡️ {t("home.temp")}</p>
                    <p className="text-2xl font-bold text-teal-900">
                      {firstData.temperature}°C
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      💧 {t("home.humidity")}
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {firstData.humidity}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Soil Data */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-md shadow-md transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {t("home.soilData")}
                </h2>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    🌱 {t("home.moisture")}
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {firstData.soilMoisture}
                  </p>
                </div>
              </div>

              {/* Water Data */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-md shadow-md transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {t("home.waterData")}
                </h2>
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    🌊 {t("home.waterLevel")}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {firstData.waterLevel}
                  </p>
                </div>
              </div>

              {/* Pest and Animal Data */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-md shadow-md transition-transform hover:scale-105">
                <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {t("home.pestData")}
                </h2>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      🔊 {t("home.soundFreq")}
                    </p>
                    <p className="text-2xl font-bold text-red-900">
                      {firstData.soundFrequency}Hz
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      🐾 {t("home.animal")}
                    </p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {firstData.pirValue === 1 ? "Detected" : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Table for Other Data */}
            {sensorData.length > 1 && (
              <div className="mt-10">
                <h2 className="text-3xl font-bold mb-5">
                  {t("home.previousData")}
                </h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">{t("home.index")}</th>
                        <th className="px-4 py-2">{t("home.temperature")}</th>
                        <th className="px-4 py-2">{t("home.humidity")}</th>
                        <th className="px-4 py-2">{t("home.moisture")}</th>
                        <th className="px-4 py-2">{t("home.waterLevel")}</th>
                        <th className="px-4 py-2">
                          {t("home.soundFrequency")}
                        </th>
                        <th className="px-4 py-2">
                          {t("home.animalPresence")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((data, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            {index + indexOfFirstRow + 1}
                          </td>
                          <td className="border px-4 py-2">
                            {data.temperature}°C
                          </td>
                          <td className="border px-4 py-2">{data.humidity}%</td>
                          <td className="border px-4 py-2">
                            {data.soilMoisture}
                          </td>
                          <td className="border px-4 py-2">
                            {data.waterLevel}
                          </td>
                          <td className="border px-4 py-2">
                            {data.soundFrequency}Hz
                          </td>
                          <td className="border px-4 py-2">
                            {data.pirValue ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-5">
                  <button
                    className={`btn ${
                      currentPage === 1
                        ? "btn-disabled"
                        : "btn btn-outline btn-success"
                    }`}
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                  >
                    {t("home.previous")}
                  </button>
                  <span className="self-center text-lg">
                    {t("home.page")} {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`btn ${
                      currentPage === totalPages
                        ? "btn-disabled"
                        : "btn btn-outline btn-success"
                    }`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    {t("home.next")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
