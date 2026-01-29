import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

// Firebase imports
import { auth } from "../../firebase/firebase.init";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const googleProvider = new GoogleAuthProvider();

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  // ----------------- Email/Password Login -----------------
  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("success", "Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      showToast("error", error.message);
    }
  };

  // ----------------- Google Login -----------------
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      showToast("success", `Welcome, ${user.displayName}!`);
      navigate(from, { replace: true });
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbf6f1] px-4">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl border border-[#5b3cc4]/20 p-8 relative">
        {/* Go Home */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-sm flex items-center gap-1 text-[#5b3cc4] hover:underline"
        >
          ← Home
        </Link>

        <h2 className="text-2xl font-bold text-[#22049b] mb-1">Login</h2>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please login to continue.
        </p>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          Login with Google
        </button>

        <div className="text-center text-gray-400 mb-4">or</div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...formRegister("email", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#5b3cc4]"
              placeholder="Email"
            />
            <p className="min-h-[18px] text-sm text-red-500">
              {errors.email && "Email is required"}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                {...formRegister("password", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:border-[#5b3cc4]"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="min-h-9 text-sm text-red-500">
              {errors.password && "Password is required"}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-full bg-[#5b3cc4] text-white font-semibold hover:bg-[#22049b] transition"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-[#5b3cc4] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
