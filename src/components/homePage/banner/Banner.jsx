import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/scholarships?search=${query}`);
  };

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Find Your Perfect Scholarship
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
        >
          Connecting students with global scholarship opportunities. Apply,
          grow, and succeed.
        </motion.p>

        {/* Search Area */}
        <div ref={searchRef}>
          <AnimatePresence mode="wait">
            {!showSearch ? (
              <motion.button
                key="button"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setShowSearch(true)}
                className="inline-flex items-center gap-2 bg-[#5b3cc4] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#22049b] transition shadow-lg"
              >
                <FaSearch />
                Search Scholarship
              </motion.button>
            ) : (
              <motion.form
                key="input"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSearch}
                className="flex items-center bg-white rounded-full overflow-hidden shadow-lg"
              >
                <input
                  type="text"
                  placeholder="Search by scholarship, university, or degree..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="px-5 py-3 w-72 md:w-96 outline-none text-gray-700"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#5b3cc4] text-white px-10 py-5 rounded-x-xl hover:bg-[#22049b] transition"
                >
                  <FaSearch />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Banner;
