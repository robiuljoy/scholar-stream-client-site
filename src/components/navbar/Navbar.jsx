import React, { useState, useContext, useEffect, useRef } from "react";
import { FaGraduationCap, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdOutlineContacts } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import Container from "../shared/Container";
import Loader from "../../../src/loader/SpinnerLoader";
import { AuthContext } from "../../provider/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOutUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOutUser();
      setDropdownOpen(false);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Show loader while auth is loading
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <Loader />
      </div>
    );

  return (
    <header className="w-full bg-[#fbf6f1] text-[#5b3cc4] shadow-sm relative z-50">
      <Container>
        <nav>
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
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className="font-medium hover:text-[#ffffff] transition hover:bg-[#22049b] px-5 py-2 rounded-lg flex items-center gap-1"
              >
                <IoHome className="text-lg" /> Home
              </Link>

              <Link
                to="/scholarships"
                className="font-medium hover:text-[#ffffff] transition hover:bg-[#22049b] px-5 py-2 rounded-lg flex items-center gap-1"
              >
                <FaGraduationCap className="text-lg" /> All Scholarships
              </Link>

              <Link
                to="/contact"
                className="font-medium hover:text-[#ffffff] transition hover:bg-[#22049b] px-5 py-2 rounded-lg flex items-center gap-1"
              >
                <MdOutlineContacts className="text-lg" /> Contact Us
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/auth/login"
                    className="border border-[#5b3cc4] text-[#5b3cc4] px-4 py-2 rounded-full font-semibold hover:bg-[#5b3cc4] hover:text-white transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="border border-[#5b3cc4] text-[#5b3cc4] px-4 py-2 rounded-full font-semibold hover:bg-[#5b3cc4] hover:text-white transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative" ref={desktopDropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-[#5b3cc4] p-1 focus:outline-none transition hover:shadow-md"
                  >
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl py-2 flex flex-col z-50 animate-fadeIn">
                      <Link
                        to="/dashboard"
                        className="px-4 py-2 hover:bg-[#5b3cc4]/20 transition rounded-lg text-[#5b3cc4] flex items-center gap-2 font-medium"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FaTachometerAlt /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-[#5b3cc4]/20 transition rounded-lg text-[#5b3cc4] text-left w-full flex items-center gap-2 font-medium"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/auth/login"
                    className="border border-[#5b3cc4] text-[#5b3cc4] px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-[#5b3cc4] hover:text-white transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="border border-[#5b3cc4] text-[#5b3cc4] px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-[#5b3cc4] hover:text-white transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="relative" ref={mobileDropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl py-2 flex flex-col z-50 animate-fadeIn">
                      <Link
                        to="/dashboard"
                        className="px-4 py-2 hover:bg-[#5b3cc4]/20 transition rounded-lg text-[#5b3cc4] flex items-center gap-2 font-medium"
                        onClick={() => {
                          setDropdownOpen(false);
                          setOpen(false);
                        }}
                      >
                        <FaTachometerAlt /> Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#5b3cc4]/20 transition rounded-lg text-[#5b3cc4] text-left w-full flex items-center gap-2 font-medium"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger */}
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
                    d={
                      open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden mt-4 border-t border-[#5b3cc4]/20 pt-4 space-y-3 flex flex-col items-start z-50">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className=" font-medium hover:text-[#4a2fb8] transition flex items-center gap-1"
              >
                <IoHome className="text-lg" /> Home
              </Link>
              <Link
                to="/scholarships"
                onClick={() => setOpen(false)}
                className=" font-medium hover:text-[#4a2fb8] transition flex items-center gap-1"
              >
                <FaGraduationCap className="text-lg" /> All Scholarships
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className=" font-medium hover:text-[#4a2fb8] transition flex items-center gap-1"
              >
                <MdOutlineContacts className="text-lg" /> Contact Us
              </Link>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
