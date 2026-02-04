import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Swal from "sweetalert2";

const ContactUs = () => {
  //  added submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We’ll get back to you shortly.",
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Done ",
    });

    e.target.reset(); // optional but nice UX
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-lg text-indigo-100">
          Have questions about scholarships or need support? We’re here to help
          you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-semibold text-gray-800">Get in touch</h2>
          <p className="text-gray-600">
            Reach out to us for scholarship inquiries, application help, or
            general questions.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md">
              <Mail className="text-indigo-600" />
              <span className="text-gray-700">support@scholarstream.com</span>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md">
              <Phone className="text-indigo-600" />
              <span className="text-gray-700">+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md">
              <MapPin className="text-indigo-600" />
              <span className="text-gray-700">Dhaka, Bangladesh</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit} // ✅ added
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            Send us a message
          </h3>

          <div>
            <label className="block text-gray-600 mb-1">Your Name</label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Message</label>
            <textarea
              rows="5"
              required
              placeholder="Write your message..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
