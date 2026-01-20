// pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Error Illustration/Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-orange-500/20 mb-4">404</div>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6 rounded-full"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved, deleted, or you entered an incorrect URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl font-bold"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 px-6 py-3 rounded-lg transition-all font-bold"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="p-5 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <p className="text-sm text-gray-300">
            If you believe this is an error, please{" "}
            <a
              href="mailto:support@ambertraining.co.uk"
              className="text-orange-400 font-semibold hover:text-orange-300 transition-colors"
            >
              contact support
            </a>
            .
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-10 space-y-3">
          <p className="text-gray-400 text-sm">Need help? Try these:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+447763658885"
              className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
            >
              Call Us
            </a>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <a
              href="mailto:support@ambertraining.co.uk"
              className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
