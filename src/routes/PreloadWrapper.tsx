// src/shared/PreloadWrapper.tsx
import React, { useEffect, useState } from "react";
import { imageManifest } from "../assets/imageManifest";

const PreloadWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loaded = 0;

    const handleLoad = () => {
      loaded++;
      if (loaded === imageManifest.length) {
        // small timeout for smooth fade
        setTimeout(() => setIsLoaded(true), 300);
      }
    };

    imageManifest.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin" />
        </div>
      )}

      <div
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {isLoaded && children}
      </div>
    </div>
  );
};

export default PreloadWrapper;
