import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Default email and password
    const defaultEmail = "user@example.com";
    const defaultPassword = "password123";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email') || defaultEmail;
        const password = form.get('password') || defaultPassword;
        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                toast.success('Login successful');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch(error => {
                console.error(error);
                toast.error('There is no such user. Check email and password');
            });
    };

    return (
        <div className="mb-10">
            <ToastContainer></ToastContainer>
            <div className="">
                <h2 className="text-5xl my-10 text-center font-extrabold text-green-600">Login Now <span className="text-black">!</span></h2>
                <div className='lg:w-6/12 mx-auto flex flex-col-reverse md:flex-col-reverse lg:flex-row rounded-2xl' style={{ 
                    backgroundImage: `url('https://i.ibb.co/M1dXf93/Untitled-design-3.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat' }}>
                    <div className="w-full text-center justify-center shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body justify-center mt-10 bg">
                            <div className="form-control">
                                <input type="email" name="email" placeholder="email" className="input input-bordered" defaultValue={defaultEmail} required />
                            </div>
                            <div className="relative form-control">
                                <input className="input input-bordered" placeholder="Password" type={showPassword ? "text" : "password"} name="password" defaultValue={defaultPassword} required />
                                <span className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </span><br />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn border-blue-400 bg-white text-blue-600">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
