import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PastStat = () => {
  const [humidity, setHumidity] = useState([]);
  const [moisture, setMoisture] = useState([]);
  const [temp, setTemp] = useState([]);
  const [wind, setWind] = useState([]);
  const [precipitation, setPrecipitation] = useState([]);
  const [ndvi, setNdvi] = useState([]); // State for NDVI data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumidity = fetch("humidityAve.json").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch humidity data");
      return res.json();
    });

    const fetchTemperature = fetch("tempAve.json").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch temperature data");
      return res.json();
    });

    const fetchWind = fetch("windAve.json").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch wind data");
      return res.json();
    });

    const fetchSoilMoisture = fetch("soilMoistureAve.json").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch soil moisture data");
      return res.json();
    });

    const fetchPrecipitation = fetch("precipitationAve.json").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch precipitation data");
      return res.json();
    });

    const fetchNdvi = fetch("ndvi.json").then((res) => { // Fetch NDVI data
      if (!res.ok) throw new Error("Failed to fetch NDVI data");
      return res.json();
    });

    Promise.all([
      fetchHumidity,
      fetchTemperature,
      fetchWind,
      fetchSoilMoisture,
      fetchPrecipitation,
      fetchNdvi, // Add NDVI fetch
    ])
      .then(
        ([
          humidityData,
          temperatureData,
          windData,
          soilMoistureData,
          precipitationData,
          ndviData, // Get NDVI data
        ]) => {
          setHumidity(humidityData);
          setTemp(temperatureData);
          setWind(windData);
          setMoisture(soilMoistureData);
          setPrecipitation(precipitationData);
          setNdvi(ndviData); // Set NDVI data
        }
      )
      .catch((error) => {
        console.error("Fetching error:", error);
        setError(error);
      });
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  const labels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "ANN",
  ];

  //Humidity graph configuration
  const humidityGraph = {
    labels,
    datasets: humidity.map((entry, index) => ({
      label: `Year: ${entry.YEAR}`,
      data: labels.map((month) => entry[month]),
      borderColor:
        index === 0 ? "rgba(0, 123, 255, 1)" : index === 1 ? "rgba(40, 167, 69, 1)" : "rgba(255, 193, 7, 1)", // Blue, Green, Yellow
      backgroundColor:
        index === 0 ? "rgba(0, 123, 255, 0.2)" : index === 1 ? "rgba(40, 167, 69, 0.2)" : "rgba(255, 193, 7, 0.2)", // Blue, Green, Yellow
      fill: false,
    })),
  };

  const humidityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Humidity Data by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Humidity (%)",
        },
      },
    },
  };

  //NDVI graph configuration
  const ndviGraph = {
    labels: ndvi.map(data => data.year),
    datasets: [
      {
        label: 'NDVI',
        data: ndvi.map(data => data.sample_value),
        borderColor: 'rgba(0, 123, 255, 1)', 
        backgroundColor: 'rgba(0, 123, 255, 0.2)', 
        fill: false,
      },
    ],
  };
  

  const ndviOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "NDVI Data Over Years",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "NDVI Value",
        },
      },
    },
  };

  //Moisture graph configuration
  const moistureGraph = {
    labels,
    datasets: moisture.map((entry, index) => ({
      label: `Year: ${entry.YEAR}`,
      data: labels.map((month) => entry[month]),
      borderColor:
        index === 0 ? "rgba(0, 123, 255, 1)" : index === 1 ? "rgba(40, 167, 69, 1)" : "rgba(255, 193, 7, 1)", // Blue, Green, Yellow
      backgroundColor:
        index === 0 ? "rgba(0, 123, 255, 0.2)" : index === 1 ? "rgba(40, 167, 69, 0.2)" : "rgba(255, 193, 7, 0.2)", // Blue, Green, Yellow
      fill: false,
    })),
  };

  const moistureOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Soil Moisture Data by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Moisture",
        },
      },
    },
  };

  //Temperature graph configuration
  const tempGraph = {
    labels,
    datasets: temp.map((entry, index) => ({
      label: `Year: ${entry.YEAR}`,
      data: labels.map((month) => entry[month]),
      borderColor:
        index === 0 ? "rgba(0, 123, 255, 1)" : index === 1 ? "rgba(40, 167, 69, 1)" : "rgba(255, 193, 7, 1)", // Blue, Green, Yellow
      backgroundColor:
        index === 0 ? "rgba(0, 123, 255, 0.2)" : index === 1 ? "rgba(40, 167, 69, 0.2)" : "rgba(255, 193, 7, 0.2)", // Blue, Green, Yellow
      fill: false,
    })),
  };

  const tempOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Temperature Data by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature C",
        },
      },
    },
  };

  //Precipitation graph configuration
  const precipitationGraph = {
    labels,
    datasets: precipitation.map((entry, index) => ({
      label: `Year: ${entry.YEAR}`,
      data: labels.map((month) => entry[month]),
      borderColor:
        index === 0 ? "rgba(0, 123, 255, 1)" : index === 1 ? "rgba(40, 167, 69, 1)" : "rgba(255, 193, 7, 1)", // Blue, Green, Yellow
      backgroundColor:
        index === 0 ? "rgba(0, 123, 255, 0.2)" : index === 1 ? "rgba(40, 167, 69, 0.2)" : "rgba(255, 193, 7, 0.2)", // Blue, Green, Yellow
      fill: false,
    })),
  };

  const precipitationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Precipitation Data by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Precipitation",
        },
      },
    },
  };

  //Wind graph configuration
  const windGraph = {
    labels,
    datasets: wind.map((entry, index) => ({
      label: `Year: ${entry.YEAR}`,
      data: labels.map((month) => entry[month]),
      borderColor:
        index === 0 ? "rgba(0, 123, 255, 1)" : index === 1 ? "rgba(40, 167, 69, 1)" : "rgba(255, 193, 7, 1)", // Blue, Green, Yellow
      backgroundColor:
        index === 0 ? "rgba(0, 123, 255, 0.2)" : index === 1 ? "rgba(40, 167, 69, 0.2)" : "rgba(255, 193, 7, 0.2)", // Blue, Green, Yellow
      fill: false,
    })),
  };

  const windOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Wind Data by Year",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Wind Speed",
        },
      },
    },
  };

  return (
    <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
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
              <button className="btn btn-outline btn-success w-full mb-4">
                Agro bot
              </button>
            </Link>
            <Link to="/community">
              <button className="btn btn-outline btn-info w-full mb-4">
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
      <div className="w-full space-y-10">
        <h2 className="text-2xl font-bold text-center">Monthly Statistics</h2>
        <div>
          <Line options={humidityOptions} data={humidityGraph} />
        </div>
        <div>
          <Line options={moistureOptions} data={moistureGraph} />
        </div>
        <div>
          <Line options={tempOptions} data={tempGraph} />
        </div>
        <div>
          <Line options={precipitationOptions} data={precipitationGraph} />
        </div>
        <div>
          <Line options={windOptions} data={windGraph} />
        </div>
        <div>
          <Line options={ndviOptions} data={ndviGraph} /> {/* Render NDVI graph */}
        </div>
      </div>
    </div>
  );
};

export default PastStat;
