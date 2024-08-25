import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const Root = () => {
    return (
        <div>
            <div className="w-11/12 mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        {/* <Footer></Footer> */}
        </div>
    );
};

export default Root;