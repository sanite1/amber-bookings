import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowDown, Mail, Phone, CheckCircle } from "lucide-react";
import CoursesImg from "../../assets/images/iconTiles.jpg";

export default function CoursesHero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-20 pt-[7vh] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute top-20 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div> */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:flex lg:items-center gap-12 relative z-10">
        {/* Left Side: Text Content */}
        <div data-aos="fade-right" className="lg:w-1/2">
          <div
            className="inline-block mb-4"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-sm font-semibold">
              Professional Training
            </span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl md:text-5xl font-bold leading-tight text-black mb-6"
          >
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 text-transparent bg-clip-text">
              Learn & Grow
            </span>{" "}
            <span className="text-black">with Our Expert-Led Courses</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg text-gray-900 mb-8"
          >
            Master essential first aid and safety certifications designed for
            professionals and organizations. Gain Ofqual-approved qualifications
            that advance your career and protect your community.
          </p>

          {/* Features List */}
          <div
            className="space-y-3 mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                size={20}
                className="text-orange-400 flex-shrink-0"
              />
              <span className="text-gray-900">
                Ofqual-regulated & FAA-approved
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle
                size={20}
                className="text-orange-400 flex-shrink-0"
              />
              <span className="text-gray-900">
                Expert trainers with real-world experience
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle
                size={20}
                className="text-orange-400 flex-shrink-0"
              />
              <span className="text-gray-900">
                Flexible scheduling & in-house training available
              </span>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => {
                const section = document.getElementById("our-courses-section");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-fit flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
            >
              Browse Courses <ArrowDown size={20} />
            </button>
            <a
              href="tel:+447763658885"
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all border border-slate-600 hover:border-orange-500"
            >
              Call Us Now
            </a>
          </div>
        </div>

        {/* Right Side: Image & Contact Badges */}
        <div
          data-aos="fade-left"
          className="relative lg:w-1/2 flex justify-center mt-12 lg:mt-0"
        >
          {/* Card Container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-600">
              <img
                src={CoursesImg}
                alt="First Aid Training Courses"
                className="w-full h-auto object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>

            {/* Floating Contact Badge - Call Us */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="absolute top-6 -left-4 sm:left-4 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 hover:shadow-orange-500/20 transition-shadow duration-300 max-w-xs"
            >
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Call Us</p>
                <a
                  href="tel:+447763658885"
                  className="text-xs text-orange-600 font-semibold hover:text-orange-700"
                >
                  +44 7763 658885
                </a>
              </div>
            </div>

            {/* Floating Contact Badge - Email Us */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="absolute bottom-6 -right-4 sm:right-4 bg-white rounded-xl shadow-2xl p-4 flex items-center gap-3 hover:shadow-orange-500/20 transition-shadow duration-300 max-w-xs"
            >
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Email Us</p>
                <a
                  href="mailto:support@ambertraining.co.uk"
                  className="text-xs text-orange-600 font-semibold hover:text-orange-700"
                >
                  support@ambertraining.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
