import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/home/HeroSection";
import OurCourses from "../components/home/OurCourses";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay so DOM is ready
      }
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="">
      {/* <div className="block h-[10vh] bg-white"></div> */}
      <div id="home" className="bg-white pt-[10vh]">
        <Hero />
      </div>
      <div id="our-courses-section" className="">
        <OurCourses />
      </div>
    </div>
  );
}
