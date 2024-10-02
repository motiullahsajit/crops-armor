import { Link } from "react-router-dom";
import HelpDeskChat from "./HelpDesk/HelpDesk";

const HelpDesk = () => {
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
      {/* Forum Component */}
      <div className="w-full md:w-4/6 lg:w-4/5">
        <HelpDeskChat />
      </div>
    </div>
  );
};

export default HelpDesk;
