import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Link } from 'react-router-dom';

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

    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHumidity = fetch('humidityAve.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch humidity data');
                return res.json();
            });

        const fetchTemperature = fetch('tempAve.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch temperature data');
                return res.json();
            });

        const fetchWind = fetch('windAve.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch wind data');
                return res.json();
            });

        const fetchSoilMoisture = fetch('soilMoistureAve.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch soil moisture data');
                return res.json();
            });

            const fetchPrecipitation = fetch('precipitationAve.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch precipitation data');
                return res.json();
            });

        Promise.all([fetchHumidity, fetchTemperature, fetchWind, fetchSoilMoisture, fetchPrecipitation])
            .then(([humidityData, temperatureData, windData, soilMoistureData, precipitationData]) => {
                setHumidity(humidityData);
                setTemp(temperatureData);
                setWind(windData);
                setMoisture(soilMoistureData);
                setPrecipitation(precipitationData)
            })
            .catch(error => {
                console.error('Fetching error:', error);
                setError(error);
            });
    }, []);

    if (error) return <div>Error: {error.message}</div>;

    const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "ANN"];

    //Humidity
    const humidityGraph = {
        labels,
        datasets: humidity.map((entry, index) => ({
            label: `Year: ${entry.YEAR}`,
            data: labels.map(month => entry[month]),
            borderColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 1)`,
            backgroundColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 0.2)`,
            fill: false,
        }))
    };

    const humidityOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Humidity Data by Year',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Humidity (%)'
                }
            }
        }
    };

    //Moisture
    const moistureGraph = {
        labels,
        datasets: moisture.map((entry, index) => ({
            label: `Year: ${entry.YEAR}`,
            data: labels.map(month => entry[month]),
            borderColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 1)`,
            backgroundColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 0.2)`,
            fill: false,
        }))
    };

    const moistureOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Soil Moisture Data by Year',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Moisture'
                }
            }
        }
    };

    //Temp
    const tempGraph = {
        labels,
        datasets: temp.map((entry, index) => ({
            label: `Year: ${entry.YEAR}`,
            data: labels.map(month => entry[month]),
            borderColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 1)`,
            backgroundColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 0.2)`,
            fill: false,
        }))
    };

    const tempOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Temperature Data by Year',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature C'
                }
            }
        }
    };

    //Precipitation
    const precipitationGraph = {
        labels,
        datasets: precipitation.map((entry, index) => ({
            label: `Year: ${entry.YEAR}`,
            data: labels.map(month => entry[month]),
            borderColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 1)`,
            backgroundColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 0.2)`,
            fill: false,
        }))
    };

    const precipitationOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Precipitation Data by Year',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Precipitation'
                }
            }
        }
    };

    //Wind
    const windGraph = {
        labels,
        datasets: wind.map((entry, index) => ({
            label: `Year: ${entry.YEAR}`,
            data: labels.map(month => entry[month]),
            borderColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 1)`,
            backgroundColor: `rgba(${Math.floor(255 - index * 10)}, ${Math.floor(index * 25)}, 132, 0.2)`,
            fill: false,
        }))
    };

    const windOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Wind Speed Data by Year',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Wind Speed'
                }
            }
        }
    };

    return (
        <div className='flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl'>
            <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
                <h2 className="text-3xl font-bold mb-5 text-center">Dashboard</h2>
                {<div className="">
                    <Link to="/"><button className="btn btn-outline btn-success w-full mb-4">Data</button></Link>
                    <Link to="/past_stat"><button className="btn btn-outline btn-info w-full mb-4">Past Stats</button></Link>
                    <Link to="/analysis"><button className="btn btn-outline btn-accent w-full mb-4">Analysis</button></Link>
                </div>}
                </div>
        <div className='w-full space-y-10'>
            <Line data={humidityGraph} options={humidityOptions} />
            <Line data={moistureGraph} options={moistureOptions} />
            <Line data={tempGraph} options={tempOptions} />
            <Line data={precipitationGraph} options={precipitationOptions} />
            <Line data={windGraph} options={windOptions} />
        </div>
        </div>
    );
};

export default PastStat;
