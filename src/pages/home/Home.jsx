import React from "react";
import { motion } from "framer-motion";
import Banner from "../../components/homePage/banner/Banner";
import TopScholarships from "../../components/homePage/topScholarShips/TopScholarships";
import SuccessStories from "../../components/homePage/successStories/SuccessStories";
import FAQ from "../../components/homePage/FAQ/FAQ";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Banner />
      <TopScholarships />
      <SuccessStories />
      <FAQ />
    </motion.div>
  );
};

export default Home;
