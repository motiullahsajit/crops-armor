import { Link } from "react-router-dom";
import {
  FaUser,
  FaChartBar,
  FaSearch,
  FaHistory,
  FaRobot,
  FaUsers,
  FaQuestionCircle,
  FaMedal,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";

// Demo farmer data
const farmerData = {
  name: "Muhammad Azim Uddin",
  location: "Ashulia, Dhaka",
  points: 250,
  achievements: [
    { title: "New Member", date: "2023-01-15" },
    { title: "First Crop Planted", date: "2023-02-20" },
    { title: "Water Conservation Badge", date: "2023-03-30" },
    { title: "Top 10% Yield", date: "2023-07-10" },
    { title: "Sustainable Practices Award", date: "2023-08-05" },
  ],
  imageUrl: "https://i.ibb.co/LCvYWQq/IMG-4209.jpg",
  stats: {
    totalCrops: 15,
    activeCrops: 5,
    communityMembers: 120,
  },
  motivationalQuote:
    "Cultivating the land is a reflection of nurturing our souls.",
};

// Demo progress data
const progressData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "Points Earned",
      data: [50, 75, 100, 120, 150, 175, 200, 225, 250],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

// Badge component for achievements
const Badge = ({ title }) => (
  <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2">
    <FaMedal className="mr-1" />
    {title}
  </div>
);

const Profile = () => {
  return (
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
          <Link to="/analysis" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-info w-full">
              <FaSearch className="mr-2 text-lg" /> Analysis
            </button>
          </Link>
          <Link to="/past_stat" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-accent w-full">
              <FaHistory className="mr-2 text-lg" /> Past Stats
            </button>
          </Link>
          <Link to="/agro_bot" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-success w-full">
              <FaRobot className="mr-2 text-lg" /> Agro Bot
            </button>
          </Link>
          <Link to="/community" className="block mb-4">
            <button className="flex items-center btn btn-outline btn-info w-full">
              <FaUsers className="mr-2 text-lg" /> Community
            </button>
          </Link>
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

      {/* Profile Content */}
      <div className="w-full md:w-4/6 lg:w-4/5 p-5 flex flex-col md:flex-row">
        {/* Left Column: Profile Overview */}
        <div className="w-full md:w-1/2 p-3">
          <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-md">
            <img
              src={farmerData.imageUrl}
              alt="Farmer"
              className="w-32 h-32 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{farmerData.name}</h2>
              <p className="text-gray-700">{farmerData.location}</p>
              {/* Points as a badge */}
              <div className="mt-2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold">
                  {farmerData.points} Points
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-3xl font-bold mb-5">Overview</h2>
            <p className="mb-4">
              Your farming journey is gamified to enhance your experience! The
              points system not only tracks your activities but also rewards
              your dedication and participation in sustainable practices. Our
              progress dashboard keeps you motivated by showcasing your
              achievements and encouraging you to strive for more in your
              farming endeavors.
            </p>
            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {farmerData.achievements.map((achievement, index) => (
                <Badge key={index} title={achievement.title} />
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-lg">
                  {farmerData.stats.totalCrops}
                </h4>
                <p className="text-gray-600">Total Crops</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-lg">
                  {farmerData.stats.activeCrops}
                </h4>
                <p className="text-gray-600">Active Crops</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-lg">
                  {farmerData.stats.communityMembers}
                </h4>
                <p className="text-gray-600">Community Members</p>
              </div>
            </div>
          </div>

          {/* Motivational Quote Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Motivational Quote</h3>
            <p className="italic text-gray-700">
              "{farmerData.motivationalQuote}"
            </p>
          </div>
        </div>

        {/* Right Column: Gamification and Progress Dashboard */}
        <div className="w-full md:w-1/2 p-3">
          {/* Progress Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-5">Progress</h2>
            <Line
              data={progressData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `Points: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
