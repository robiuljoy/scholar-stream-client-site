import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

import { auth } from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Register = () => {
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

  // SweetAlert toast
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

  // ----------------- Email/Password Registration -----------------
  const handleRegistration = async (data) => {
    const { name, email, password, photo } = data;

    try {
      //  Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //  Update profile
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      //  Success
      showToast("success", `Welcome, ${name}!`);
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

        <h2 className="text-2xl font-bold text-[#22049b] mb-1">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join ScholarStream as a Student
        </p>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          Sign up with Google
        </button>

        <div className="text-center text-gray-400 mb-4">or</div>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...formRegister("name", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#5b3cc4]"
              placeholder="Your name"
            />
            <p className="min-h-[18px] text-sm text-red-500">
              {errors.name && "Name is required"}
            </p>
          </div>

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

          {/* Photo URL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              {...formRegister("photo", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#5b3cc4]"
              placeholder="Photo URL"
            />
            <p className="min-h-[18px] text-sm text-red-500">
              {errors.photo && "Photo URL is required"}
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
                {...formRegister("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/,
                })}
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
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" && "Minimum 6 characters"}
              {errors.password?.type === "pattern" &&
                "Must include capital & special character"}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2 rounded-full bg-[#5b3cc4] text-white font-semibold hover:bg-[#22049b] transition"
          >
            Register
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#5b3cc4] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
