import React from "react";

const SpinnerLoader = ({ fullScreen = false }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-[#081613] bg-opacity-90"
          : "flex items-center justify-center w-full py-10"
      }
    >
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 rounded-full border-8 border-t-transparent border-[#ffc108] animate-spin"></div>

        {/* Middle pulsing ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-t-transparent border-[#00e0a1] animate-pulse"></div>

        {/* Inner glowing core */}
        <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-[#ffc108] to-[#00e0a1] animate-ping"></div>

        {/* Subtle rotation overlay */}
        <div className="absolute w-10 h-10 rounded-full border-4 border-dashed border-[#ffffff55] animate-spin-slow"></div>
      </div>

      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default SpinnerLoader;
