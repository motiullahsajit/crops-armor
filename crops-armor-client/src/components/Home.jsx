import { Link} from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col mb-10 md:flex-row bg-gray-100 rounded-2xl">
            {/* Sidebar */}
            <div className="w-full md:w-2/6 lg:w-1/5 bg-gray-900 text-white p-5 md:rounded-l-2xl lg:rounded-l-2xl text-center">
                <h2 className="text-3xl font-bold mb-5 text-center">Dashboard</h2>
                {<div className="">
                    <Link to="/"><button className="btn btn-outline btn-success w-full mb-4">Data</button></Link>
                    <Link to="/past_stat"><button className="btn btn-outline btn-info w-full mb-4">Past Stats</button></Link>
                    <Link to="/"><button className="btn btn-outline btn-accent w-full">Analysis</button></Link>
                </div>}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-5 md:p-10">
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

                {/* Soil Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-yellow-400 p-2 rounded-xl">Soil Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Moisture</h2>
                        <p className="text-3xl lg:text-4xl">6.5</p>
                    </div>
                </div>

                {/* Water Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-blue-400 p-2 rounded-xl">Water Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Water Level</h2>
                        <p className="text-3xl lg:text-4xl">High</p>
                    </div>
                </div>

                {/* Pest Data Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <h2 className="text-3xl font-extrabold mb-5 col-span-full border-4 border-red-400 p-2 rounded-xl">Pest and Animal Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Sound Frequency</h2>
                        <p className="text-3xl lg:text-4xl">200Hz</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Animal Presence</h2>
                        <p className="text-3xl lg:text-4xl">Yes</p>
                    </div>
                </div>               
            </div>
        </div>
    );
};

export default Home;
