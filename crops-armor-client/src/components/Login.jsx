import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Default email and password for demo user
  const defaultEmail = "user@example.com";
  const defaultPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("There is no such user. Check email and password");
      });
  };

  const handleDemoLogin = () => {
    signInUser(defaultEmail, defaultPassword)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in as demo user");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Demo user login failed");
      });
  };

  return (
    <div className="mb-10">
      <ToastContainer />
      <div>
        <h2 className="text-5xl my-10 text-center font-extrabold text-green-600">
          Login Now <span className="text-black">!</span>
        </h2>
        <div
          className="lg:w-6/12 mx-auto flex flex-col-reverse md:flex-col-reverse lg:flex-row rounded-2xl"
          style={{
            backgroundImage: `url('https://i.ibb.co/M1dXf93/Untitled-design-3.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full text-center justify-center shadow-2xl">
            <form
              onSubmit={handleLogin}
              className="card-body justify-center mt-10"
            >
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>
              <div className="relative form-control">
                <input
                  className="input input-bordered"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <span
                  className="absolute top-3 right-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
                <br />
              </div>
              <div className="form-control space-y-5 mt-6">
                <button className="btn border-green-400 bg-white text-green-600">
                  Login
                </button>
              </div>
            </form>
            <div className="form-control px-8 pb-7">
              <button onClick={handleDemoLogin} className="btn btn-success">
                Demo User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
