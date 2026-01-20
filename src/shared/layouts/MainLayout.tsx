import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";

const MainLayout: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Box>
      {/* Navbar stays on top */}
      <Navbar />

      {/* This is where child routes render */}
      <div className="bg-[#F5F3F0]">
        <Outlet />
      </div>

      <div className="" id="contact"></div>
      <Footer />
    </Box>
  );
};

export default MainLayout;
