import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { AuthContext } from "../providers/AuthProvider";

const googleProvider = new GoogleAuthProvider()

const Register = () => {

    const {createUser, setUser, googleSignIn} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')

        //password error
        if(password.length<6){
            toast.error('Password should be atleast 6 characters')
            return
        }else if(!/[A-Z]/.test(password)){
            toast.error('Password should have atleast one Uppercase')
            return
        }else if(!/[a-z]/.test(password)){
            toast.error('Password should have atleast one Lowercase')
            return
        }

        try {
            const result = await createUser(email, password);
            const user = result.user;
            console.log(user);
            await updateProfile(user, {
                displayName: name,
                photoURL: photo
            });
            
            setUser({
                ...user,
                displayName: name,
                photoURL: photo
            });

            toast.success('User created successfully');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error('Error creating user');
        }
    }

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
        .then(result => {
            console.log(result.user)
            toast.success('Login successful');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        })
        .catch(error => {
            console.log('error', error.message)
            toast.error('Error signing in with Google');
        })
    }

    return (
        <div className="hero min-h-screen">
            {/* <Helmet>
                <title>Register | Heal Hive</title>
            </Helmet> */}
            <ToastContainer></ToastContainer>
            <div className="hero-content flex-col md:flex-row lg:flex-row">
                <div className="w-full lg:w-1/2 mr-12">
                    <img src="https://i.ibb.co/552kDMF/Wavy-Gen-01-Single-07.jpg" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold text-green-600">Register <span className="text-black">Now!</span></h1>
                        <form onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="relative form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input className="input input-bordered" placeholder="Password" type={showPassword ? "text" : "password"} name="password" id="" required/>
                                <span className="absolute top-12 right-3" onClick={()=>setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <IoEyeOff /> : <IoEye />
                                }
                                </span>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn text-blue-600 bg-blue-300 font-bold" type="submit" value="Register" />
                            </div>
                            <div className="flex flex-col justify-center items-center gap-5 mt-5">
                                <button onClick={handleGoogleSignIn} className="border w-full inline-flex gap-5 rounded-lg p-3 bg-blue-100 font-bold"><FcGoogle className="text-2xl ml-10"/>Signup with Google</button>
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already Have an Account? <Link className='text-blue-600 font-bold' to="/login">Login</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;