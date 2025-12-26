import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#fbf6f1] text-[#5b3cc4] shadow-sm">
      <nav className="max-w-10/12 mx-auto px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-[#22049b] transition"
          >
            <span className="font-normal">Scholar</span>
            <span className="text-[#4a2fb8] lato lg:text-4xl">Stream</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-medium hover:text-[#350ed1] transition"
            >
              Home
            </Link>

            <Link
              to="/scholarships"
              className="font-medium hover:text-[#350ed1] transition"
            >
              All Scholarships
            </Link>

            <Link
              to="/login"
              className="border border-[#5b3cc4] text-[#5b3cc4] px-5 py-2 rounded-full font-semibold hover:bg-[#5b3cc4] hover:text-white transition"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/login"
              className="border border-[#5b3cc4] text-[#5b3cc4] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#5b3cc4] hover:text-white transition"
            >
              Log In
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#5b3cc4]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-4 border-t border-[#5b3cc4]/20 pt-4 space-y-3">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block font-medium hover:text-[#4a2fb8] transition"
            >
              Home
            </Link>

            <Link
              to="/scholarships"
              onClick={() => setOpen(false)}
              className="block font-medium hover:text-[#4a2fb8] transition"
            >
              All Scholarships
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
