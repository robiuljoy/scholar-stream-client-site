import React from "react";
import Navbar from "../../pages/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../pages/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
