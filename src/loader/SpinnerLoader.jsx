import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const SpinnerLoader = ({ fullScreen = false }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#081613] bg-opacity-90"
          : "flex flex-col items-center justify-center w-full py-10"
      }
    >
      {/* Scholar Hat Icon */}
      <div className="text-[#5b3cc4] text-6xl mb-6 animate-bounce">
        <FaGraduationCap />
      </div>

      {/* Loading Bar */}
      <div className="relative w-64 h-4 bg-[#22049b]/30 rounded-full overflow-hidden">
        <div className="absolute left-0 top-0 h-4 bg-gradient-to-r from-[#5b3cc4] to-[#22049b] animate-loading"></div>
      </div>

      <p className="mt-4 text-white font-semibold">Loading Scholarships...</p>

      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 80%; }
            100% { width: 0%; }
          }
          .animate-loading {
            animation: loading 2s ease-in-out infinite;
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15%); }
          }
        `}
      </style>
    </div>
  );
};

export default SpinnerLoader;
