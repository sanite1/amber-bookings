import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function BookingConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-[10vh] min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Success Card - Horizontal Layout */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-600">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Success Message & Steps */}
            <div>
              {/* Success Icon */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-green-500/20 p-4 rounded-full border border-green-500/30">
                  <CheckCircle size={48} className="text-green-400" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Booking Confirmed!
                  </h1>
                  <p className="text-green-400 font-semibold mt-1">
                    ✓ Successfully received
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed">
                Thank you for choosing Amber Training. Your booking request has
                been successfully received and is now being processed by our
                team.
              </p>

              {/* Timeline Steps - Horizontal */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-6">
                  What Happens Next
                </h3>

                {/* Step 1 */}
                <div className="flex gap-4 pb-4 border-b border-slate-600">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Within 2-4 Hours</p>
                    <p className="text-sm text-gray-400">
                      Our team calls to confirm details
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 pb-4 border-b border-slate-600">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">
                      Confirmation Email
                    </p>
                    <p className="text-sm text-gray-400">
                      Full training details sent to your inbox
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Ready to Train</p>
                    <p className="text-sm text-gray-400">
                      Show up and let us handle the rest
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact & Actions */}
            <div className="flex flex-col justify-between">
              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {/* Phone Card */}
                <a
                  href="tel:+447763658885"
                  className="bg-gradient-to-r from-blue-500/10 to-blue-400/10 hover:from-blue-500/20 hover:to-blue-400/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Phone size={24} className="text-blue-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-blue-400 font-semibold">Call Us</p>
                      <p className="text-white font-bold">+44 7763 658885</p>
                      <p className="text-xs text-gray-400">9:00 AM - 6:00 PM</p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:support@ambertraining.co.uk"
                  className="bg-gradient-to-r from-green-500/10 to-green-400/10 hover:from-green-500/20 hover:to-green-400/20 border border-green-500/30 hover:border-green-500/50 rounded-xl p-5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <Mail size={24} className="text-green-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-green-400 font-semibold">Email Us</p>
                      <p className="text-white font-bold text-sm">
                        support@ambertraining.co.uk
                      </p>
                      <p className="text-xs text-gray-400">
                        Response within 24h
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </a>
              </div>

              {/* Alert Box */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8 flex gap-3">
                <Clock
                  size={20}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <div className="text-sm">
                  <p className="text-amber-400 font-semibold mb-1">
                    Response Time
                  </p>
                  <p className="text-gray-300 text-xs">
                    Can't reach you by phone? We'll email within 24 hours.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Return to Homepage
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-all border border-slate-600 hover:border-orange-500"
                >
                  Explore More Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
