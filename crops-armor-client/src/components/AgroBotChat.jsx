import { Link } from "react-router-dom";
import AgroBot from "./AgroBot/AgroBot";
import {
  FaUser,
  FaChartBar,
  FaSearch,
  FaHistory,
  FaRobot,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";

const AgroBotChat = () => {
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

      {/* Forum Component */}
      <div className="w-full md:w-4/6 lg:w-4/5">
        <AgroBot />
      </div>
    </div>
  );
};

export default AgroBotChat;
