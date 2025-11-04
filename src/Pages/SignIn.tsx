import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import authBG from "../assets/authBg.png";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons for show/hide password
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"

interface SignInFormData {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<SignInFormData>();
    const Navigate = useNavigate()

    const onSubmit = async (data: SignInFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth-api/SignIn`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                toast.success(response.data.message || "Login successful! 🎉", { position: "top-right", autoClose: 2000, theme: "colored", });
                setTimeout(() => {
                    Navigate("/");
                    setLoading(false)
                }, 1000);
            } else {
                setLoading(false)
                toast.error(response.data.message, { position: "top-right", autoClose: 2000, theme: "colored", });
            }
        } catch (err) {
            setLoading(false)
            const error = err as AxiosError<{ message?: string }>;
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.message || "Invalid email or password!";
            toast.error(errorMsg, { position: "top-right", autoClose: 2500, theme: "colored" });
        }
    };

    
    return (
        <div
            className="w-full h-[100vh] bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${authBG})` }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-[450px] max-w-[450px] bg-[#00000063] backdrop-blur-md shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[30px] rounded-2xl"
            >
                <h1 className="text-[27px] mb-[20px] text-white font-semibold">
                    Login to <span className="text-blue-400">Virtual Assistant</span>
                </h1>

                {/* 📧 Email Input */}
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                        className="w-full h-[55px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 rounded-full text-[18px] py-[15px] px-[20px]"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-[14px] mt-[5px]">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* 🔒 Password Input */}
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters",
                            },
                        })}
                        className="w-full h-[55px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 rounded-full text-[18px] py-[15px] px-[20px]"
                    />
                    {/* 👁️ Toggle Password Button */}
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-5 top-4 text-white"
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                    {errors.password && (
                        <p className="text-red-400 text-[14px] mt-[5px]">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* 🚀 Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`min-w-[150px] cursor-pointer h-[51px] mt-[20px] text-black font-semibold text-[19px] bg-white rounded-full transition-all duration-200 ${loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-blue-400 hover:text-white"
                        }`}
                >
                    {loading ? "Signing in..." : "Sign In"} {/* ✅ dynamic label */}
                </button>

                {/* 🔁 Sign In Link */}
                <p className="text-white text-[18px]">
                    Register your account?{" "}
                    <NavLink to={"/SignUp"}>
                        <span className="text-blue-400 hover:underline">Sign Up</span>
                    </NavLink>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
