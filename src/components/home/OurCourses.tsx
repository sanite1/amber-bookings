import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ChevronRight, Award, Zap } from "lucide-react";
import { trainings } from "../../data/firstaidCourses";

export default function OurCourses() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-sm font-semibold">
              Professional Training Programs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Training{" "}
            <span className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 text-transparent bg-clip-text">
              Courses
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ofqual-regulated, expert-led courses designed to equip you with
            life-saving skills and professional certifications.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((item) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={item.id * 50}
              className="group relative h-full"
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden h-full flex flex-col border border-slate-600 hover:border-orange-500 transition-colors duration-300 shadow-2xl">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden bg-slate-600">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {item.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {item.name}
                  </h3>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Award size={16} className="text-orange-400" />
                      <span>{item.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Zap size={16} className="text-orange-400" />
                      <span>{item.certification}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {item.desc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {item.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-600 gap-4">
                    <div className="text-left">
                      <span className="text-gray-400 text-xs block">
                        Starting at
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-400">
                          {item.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {item.originalPrice}
                        </span>
                        <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">
                          SAVE {item.discount}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/our-courses/${item.link}`}
                      className="w-full sm:w-auto"
                    >
                      <button className="w-full sm:w-auto group/btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center sm:justify-start gap-2 transition-all duration-300 transform hover:translate-x-1">
                        Enroll
                        <ChevronRight
                          size={18}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
