import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#fbf6f1] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <FaGraduationCap className="text-7xl text-[#5b3cc4]" />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-8xl font-bold text-[#5b3cc4] mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-6"
        >
          Oops! The page you are looking for doesn’t exist or has been moved.
          <br />
          Let’s get you back on track to your scholarship journey.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-block bg-[#5b3cc4] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#22049b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
