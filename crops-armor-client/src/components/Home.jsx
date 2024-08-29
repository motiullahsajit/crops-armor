import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Link} from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Temperature',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
            {/* Sidebar */}
            <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
                <h2 className="text-3xl font-bold mb-5 text-center">Dashboard</h2>
                {<div className="gap-2 mb-10 md:space-y-4 flex flex-row md:flex-col justify-center items-center">
                    <Link to="/"><button className="btn btn-outline btn-success w-[150px]">Data</button></Link>
                    <Link to="/past_stat"><button className="btn btn-outline btn-info w-[150px]">Past Stats</button></Link>
                    <Link to="/"><button className="btn btn-outline btn-accent w-[150px]">Analysis</button></Link>
                </div>}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5 md:p-10">
                {/* Soil Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-yellow-400 p-2 rounded-xl">Soil Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Soil pH</h2>
                        <p className="text-3xl lg:text-4xl">6.5</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Moisture</h2>
                        <p className="text-3xl lg:text-4xl">45%</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Soil Type</h2>
                        <p className="text-3xl lg:text-4xl">Loamy</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Water Level</h2>
                        <p className="text-3xl lg:text-4xl">High</p>
                    </div>
                </div>

                {/* Water Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-blue-400 p-2 rounded-xl">Water Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Water Temperature</h2>
                        <p className="text-3xl lg:text-4xl">22°C</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Water pH</h2>
                        <p className="text-3xl lg:text-4xl">7.2</p>
                    </div>
                </div>

                {/* Weather Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-gray-400 p-2 rounded-xl">Weather Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Temperature</h2>
                        <p className="text-3xl lg:text-4xl">28°C</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Humidity</h2>
                        <p className="text-3xl lg:text-4xl">65%</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Day/Night</h2>
                        <p className="text-3xl lg:text-4xl">Day</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center lg:text-left">Temperature Over Time</h2>
                    <div className="h-64">
                        <Line data={data} options={options} />
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center lg:text-left">Device Data Logs</h2>
                    <table className="w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Device</th>
                                <th className="py-2 px-4 border-b">Timestamp</th>
                                <th className="py-2 px-4 border-b">Temperature</th>
                                <th className="py-2 px-4 border-b">Humidity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td className="py-2 px-4 border-b">Device 1</td>
                                <td className="py-2 px-4 border-b">2024-08-20 14:00</td>
                                <td className="py-2 px-4 border-b">24°C</td>
                                <td className="py-2 px-4 border-b">58%</td>
                            </tr>
                            <tr className='text-center'>
                                <td className="py-2 px-4 border-b">Device 2</td>
                                <td className="py-2 px-4 border-b">2024-08-20 14:05</td>
                                <td className="py-2 px-4 border-b">26°C</td>
                                <td className="py-2 px-4 border-b">60%</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
