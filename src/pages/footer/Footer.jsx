import React from "react";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#fbf6f1] text-[#5b3cc4] p-10">
      <aside className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          {/* Logo */}
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-[#22049b] transition"
          >
            <span className="font-normal">Scholar</span>
            <span className="text-[#4a2fb8] lato lg:text-4xl">Stream</span>
          </Link>
        </div>
        <p className="font-bold">Your Gateway to Scholarship Success.</p>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>

      <nav className="mt-4">
        <div className="grid grid-flow-col gap-4 justify-center text-2xl">
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-[#1DA1F2] transition"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="hover:text-[#FF0000] transition"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-[#1877F2] transition"
          >
            <FaFacebook />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
