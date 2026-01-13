import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import Container from "../../shared/Container";

const data = [
  {
    name: "Ayesha Rahman",
    text: "ScholarStream helped me secure a fully funded scholarship in Canada.",
  },
  {
    name: "Rahim Uddin",
    text: "I found my dream university through this platform. Highly recommended!",
  },
  {
    name: "Sara Khan",
    text: "The application process was smooth and easy. Thank you ScholarStream!",
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-[#f1ecff] py-16">
      <Container>
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#5b3cc4] mb-10 text-center"
          >
            Success Stories
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow"
              >
                <FaQuoteLeft className="text-2xl text-[#5b3cc4] mb-3 mx-auto" />
                <p className="text-gray-600 mb-4">{item.text}</p>
                <h4 className="font-semibold text-[#5b3cc4]">{item.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SuccessStories;
