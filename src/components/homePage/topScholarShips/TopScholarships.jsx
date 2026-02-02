import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import Container from "../../shared/Container";
import { FaFilter } from "react-icons/fa";
import { FaLocationArrow, FaGoogleScholar } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import SpinnerLoader from "../../../loader/SpinnerLoader";

const TopScholarships = () => {
  const [allScholarships, setAllScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/scholar.json");
        const data = await res.json();
        setAllScholarships(data);
        setFilteredScholarships(data.slice(0, 6));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    if (!allScholarships.length) return;

    let filtered = [...allScholarships];

    if (category)
      filtered = filtered.filter(
        (item) => item.scholarshipCategory === category,
      );
    if (subject)
      filtered = filtered.filter((item) => item.subjectCategory === subject);
    if (location)
      filtered = filtered.filter((item) => item.universityCountry === location);

    // Small timeout for smoothness
    const timeout = setTimeout(() => {
      setFilteredScholarships(filtered.slice(0, 6));
      setLoading(false); // only stop loader here
    }, 300);

    return () => clearTimeout(timeout); // cleanup on unmount
  }, [category, subject, location, allScholarships]);

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    if (showFilters) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  const categories = [
    ...new Set(allScholarships.map((s) => s.scholarshipCategory)),
  ];
  const subjects = [...new Set(allScholarships.map((s) => s.subjectCategory))];
  const locations = [
    ...new Set(allScholarships.map((s) => s.universityCountry)),
  ];

  return (
    <section className="py-16 bg-[#f7f7ff]">
      <Container>
        {/* Title */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#5b3cc4] mb-10"
        >
          Top Scholarships
        </motion.h2>

        {/* Filter Button */}
        <div className="relative mb-10 flex justify-center" ref={filterRef}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-2 bg-[#5b3cc4] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#22049b] transition"
          >
            <FaFilter />
            Filter By
          </motion.button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute top-14 w-full max-w-md bg-white rounded-xl shadow-xl p-5 z-50"
              >
                <div className="grid gap-4">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5b3cc4]"
                  >
                    <option value="">All Scholarship Categories</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5b3cc4]"
                  >
                    <option value="">All Subject Categories</option>
                    {subjects.map((sub, i) => (
                      <option key={i} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5b3cc4]"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc, i) => (
                      <option key={i} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setCategory("");
                      setSubject("");
                      setLocation("");
                    }}
                    className="text-sm font-semibold text-[#5b3cc4] hover:underline text-right"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cards */}
        {loading ? (
          <SpinnerLoader fullScreen={false} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.04,
                    boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col overflow-hidden relative"
                >
                  <motion.div className="relative overflow-hidden rounded-xl mb-4">
                    <motion.img
                      src={item.universityImage}
                      alt={item.universityName}
                      className="h-44 w-full object-cover rounded-xl"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition" />
                  </motion.div>

                  <h3 className="text-lg font-bold text-[#5b3cc4] mb-2">
                    {item.universityName}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <FaLocationArrow className="text-[#5b3cc4]" />
                    {item.universityCity}, {item.universityCountry}
                  </p>

                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <FaGoogleScholar className="text-[#5b3cc4]" />{" "}
                    {item.scholarshipCategory}
                  </p>

                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                    <RiMoneyDollarCircleLine className="text-[#5b3cc4]" />{" "}
                    Application Fee:{" "}
                    <span className="font-semibold">
                      {item.applicationFees
                        ? `$${item.applicationFees}`
                        : "Free"}
                    </span>
                  </p>

                  <Link
                    to={`/scholarship/${i}`}
                    className="mt-auto inline-block text-center text-sm font-semibold text-white bg-linear-to-r from-[#5b3cc4] to-[#22049b] px-5 py-2 rounded-full hover:scale-105 transition shadow-md"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* See All Button */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/scholarships"
                className="text-white font-semibold bg-[#5b3cc4] hover:bg-[#22049b] px-6 py-3 rounded-full shadow-lg transition hover:scale-105"
              >
                See All Scholarships
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default TopScholarships;
