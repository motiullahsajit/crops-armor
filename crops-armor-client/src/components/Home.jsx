import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
            <button className="btn btn-outline btn-accent w-full mb-4">
              Past Stats
            </button>
          </Link>
          <Link to="/agro_bot">
            <button className="btn btn-outline btn-accent w-full mb-4">
              Agro bot
            </button>
          </Link>
          <Link to="/community">
            <button className="btn btn-outline btn-accent w-full mb-4">
              Community
            </button>
          </Link>
          <Link to="/help">
            <button className="btn btn-outline btn-accent w-full mb-4">
              Help Desk
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:p-10">
        {/* Weather Data Section */}
        {firstData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-gray-400 p-2 rounded-xl">
                Weather Data
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Temperature
                </h2>
                <p className="text-3xl lg:text-4xl">
                  {firstData.temperature}°C
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Humidity
                </h2>
                <p className="text-3xl lg:text-4xl">{firstData.humidity}%</p>
              </div>
            </div>

            {/* Soil Data Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-yellow-400 p-2 rounded-xl">
                Soil Data
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Moisture
                </h2>
                <p className="text-3xl lg:text-4xl">{firstData.soilMoisture}</p>
              </div>
            </div>

            {/* Water Data Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-blue-400 p-2 rounded-xl">
                Water Data
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Water Level
                </h2>
                <p className="text-3xl lg:text-4xl">{firstData.waterLevel}</p>
              </div>
            </div>

            {/* Pest Data Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-red-400 p-2 rounded-xl">
                Pest and Animal Data
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Sound Frequency
                </h2>
                <p className="text-3xl lg:text-4xl">
                  {firstData.soundFrequency}Hz
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  Animal Presence
                </h2>
                <p className="text-3xl lg:text-4xl">
                  {firstData.pirValue === 1 ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Table for Other Data */}
        {sensorData.length > 1 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">Previous Data</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Index</th>
                    <th className="px-4 py-2">Temperature</th>
                    <th className="px-4 py-2">Humidity</th>
                    <th className="px-4 py-2">Moisture</th>
                    <th className="px-4 py-2">Water Level</th>
                    <th className="px-4 py-2">Sound Frequency</th>
                    <th className="px-4 py-2">Animal Presence</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {index + indexOfFirstRow + 1}
                      </td>
                      <td className="border px-4 py-2">{data.temperature}°C</td>
                      <td className="border px-4 py-2">{data.humidity}%</td>
                      <td className="border px-4 py-2">{data.soilMoisture}</td>
                      <td className="border px-4 py-2">{data.waterLevel}</td>
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
                Previous
              </button>
              <span className="self-center text-lg">
                Page {currentPage} of {totalPages}
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
