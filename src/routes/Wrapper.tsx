import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../shared/layouts/MainLayout";
import QueryProvider from "../lib/query/provider";
import NotFound from "../pages/NotFound";
import FAQPage from "../pages/Faq";
import EnrollCourse from "../pages/EnrollCourse";
import BookingConfirmed from "../pages/BookingConfirmed";

export const RoutesWrapper: React.FC = () => {
  return (
    <QueryProvider>
      <Routes>
        {/* Routes that share the Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/our-courses/:id" element={<EnrollCourse />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          {/* <Route path="/confirmation" element={<Confirmation />} /> */}
        </Route>
        {/*  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryProvider>
  );
};
