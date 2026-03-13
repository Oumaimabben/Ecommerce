import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";

export default function PartdoStore() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className=" bg-gray-50 h-[500px] ">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-2 pb-2">
        <div className="flex gap-6">
          {/* Empty placeholder to keep Hero Section in the same position */}
          <div className="w-64"></div>

          {/* Hero Section */}
          <div className="flex-1">
            <div
              className="relative bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden w-full h-[420px] ml-4"
              style={{ backgroundImage: "url('/slider-01.jpg')" }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="relative h-full flex items-center px-12">
                <div className="text-white max-w-xl">
                  <p className="text-gray-300 font-medium mb-3 text-sm tracking-wide">
                  Obtenez les meilleures pièces  automobiles
                  </p>

                  <h1 className="text-5xl font-bold leading-tight mb-4">
                    Nous effectuons des réparations automobiles
                  </h1>

                  <p className="text-gray-300 text-base mb-6 leading-relaxed">
                   Installation des pièces dans nos services partenaires. <br/>   Offre à durée limitée pour les nouveaux clients. 
                  </p>

                 

                  {/* Button */}
                  <button className="bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded-lg flex items-center gap-2 font-semibold text-base">
                   acheter maintenant
                  <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}