import React from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    q: "How do I apply for a scholarship?",
    a: "Browse scholarships, open details, and apply directly through our platform.",
  },
  {
    q: "Is ScholarStream free for students?",
    a: "Yes, students can browse and apply for scholarships for free.",
  },
  {
    q: "Can universities post scholarships here?",
    a: "Yes, verified universities and organizations can post scholarship opportunities.",
  },
];

const FAQ = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-[#5b3cc4] mb-10"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {faqData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-5 rounded-lg shadow"
          >
            <h4 className="font-semibold text-[#5b3cc4] mb-2">{item.q}</h4>
            <p className="text-gray-600">{item.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
