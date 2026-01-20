// components/Header.tsx
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/amberLogo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <section className="fixed top-0 w-full z-40 bg-white box-border blairITCMedium">
      <header className="border-b">
        <div className="mx-auto flex items-center justify-between px-6 lg:px-24 py-4 max-w-[90%] lg:max-w-[90%]">
          {/* Left: Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-[13px]">
            {/* <p
              className="relative cursor-pointer group"
              onClick={() => {
                if (pathname !== "/") {
                  navigate("/", { state: { scrollTo: "about" } });
                } else {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              ABOUT
              <span
                className="
      absolute left-[20%] -bottom-2 h-[3px] w-0 bg-[#95822C]
      transition-all duration-300 ease-out
      group-hover:w-[80%]
    "
              ></span>
            </p>

            <p
              className="relative cursor-pointer group"
              onClick={() => {
                if (pathname !== "/") {
                  navigate("/", { state: { scrollTo: "highlights" } });
                } else {
                  document
                    .getElementById("highlights")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              HIGHLIGHTS
              <span
                className="
      absolute left-[20%] -bottom-2 h-[3px] w-0 bg-[#95822C]
      transition-all duration-300 ease-out
      group-hover:w-[80%]
    "
              ></span>
            </p>
            <p
              className="relative cursor-pointer group"
              onClick={() => {
                if (pathname !== "/") {
                  navigate("/", { state: { scrollTo: "venue" } });
                } else {
                  document
                    .getElementById("venue")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              VENUE
              <span
                className="
      absolute left-[20%] -bottom-2 h-[3px] w-0 bg-[#95822C]
      transition-all duration-300 ease-out
      group-hover:w-[80%]
    "
              ></span>
            </p> */}
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <p
              onClick={() => {
                if (pathname !== "/") {
                  navigate("/", { state: { scrollTo: "home" } });
                } else {
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <img
                className="h-auto w-[160px] lg:w-[200px]"
                src={Logo}
                alt="Logo"
              />
            </p>
          </div>

          {/* Right: CTA */}
          <button
            onClick={() => {
              if (pathname !== "/") {
                navigate("/", { state: { scrollTo: "tickets" } });
              } else {
                document
                  .getElementById("tickets")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="hidden md:inline-flex items-center gap-2 bg-[#FF7C22] px-5 py-2 text-white text-xs font-medium hover:bg-[#3b4726] transition opacity-0 pointer-events-none"
          >
            BOOK COURSE
            <span className="inline-flex items-center justify-center bg-white text-[#FF7C22] p-1">
              <ArrowUpRight size={14} />
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#FF7C22] focus:outline-none invisible"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm z-40 bg-gradient-to-r from-[#fff9f8] to-[#f5f5f5] shadow-xl border-l border-gray-100 flex flex-col"
              data-aos="fade-left"
            >
              {/* Centered Logo */}
              <div className="flex justify-center items-center py-6 border-b">
                <p
                  onClick={() => {
                    if (pathname !== "/") {
                      setIsOpen(false);
                      navigate("/", { state: { scrollTo: "home" } });
                    } else {
                      setIsOpen(false);
                      document
                        .getElementById("home")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <img
                    className="h-auto w-[160px] lg:w-[200px]"
                    src={Logo}
                    alt="Logo"
                  />
                </p>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col items-center space-y-6 py-8 text-center">
                {/* <p
                  onClick={() => {
                    if (pathname !== "/") {
                      setIsOpen(false);
                      navigate("/", { state: { scrollTo: "about" } });
                    } else {
                      setIsOpen(false);
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-800 font-medium hover:text-[#e28580] transition cursor-pointer"
                >
                  ABOUT
                </p>
                <p
                  onClick={() => {
                    if (pathname !== "/") {
                      setIsOpen(false);
                      navigate("/", { state: { scrollTo: "highlights" } });
                    } else {
                      setIsOpen(false);
                      document
                        .getElementById("highlights")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-800 font-medium hover:text-[#e28580] transition cursor-pointer uppercase"
                >
                  highlights
                </p>
                <p
                  onClick={() => {
                    if (pathname !== "/") {
                      setIsOpen(false);
                      navigate("/", { state: { scrollTo: "venue" } });
                    } else {
                      setIsOpen(false);
                      document
                        .getElementById("venue")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-gray-800 font-medium hover:text-[#e28580] transition cursor-pointer uppercase"
                >
                  venue
                </p>
                <p
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/faq");
                  }}
                  className="text-gray-800 font-medium hover:text-[#e28580] transition cursor-pointer uppercase"
                >
                  FAQ
                </p> */}

                <button
                  onClick={() => {
                    if (pathname !== "/") {
                      setIsOpen(false);
                      navigate("/", { state: { scrollTo: "tickets" } });
                    } else {
                      setIsOpen(false);
                      document
                        .getElementById("tickets")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#FF7C22] px-5 py-2 text-white text-sm font-medium hover:bg-[#3b4726] transition"
                >
                  BOOK COURSE
                  <span className="inline-flex items-center justify-center bg-white text-[#FF7C22] p-1">
                    <ArrowUpRight size={14} />
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
