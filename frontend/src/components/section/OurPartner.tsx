import React from "react";

type Partner = {
  id: number;
  name: string;
  logo: string;
};

const partners: Partner[] = [
  { id: 1, name: "RedCar", logo: "/partners/redcar.png" },
  { id: 2, name: "Autocar", logo: "/partners/autocar.png" },
  { id: 3, name: "Detroit", logo: "/partners/detroit.png" },
  { id: 4, name: "Corporate", logo: "/partners/corporate.png" },
  { id: 5, name: "Phone Planet", logo: "/partners/phoneplanet.png" },
  { id: 6, name: "Photography", logo: "/partners/photography.png" },
];

export default function OurPartner() {
  return (
    
    <section className="w-full bg-white py-16 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="border-b border-gray-400 mb-8" />

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Our Business Partners
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm">
          Trusted brands worldwide
        </p>
      </div>

      {/* Slider */}
      <div className="relative mt-14 overflow-hidden">
        <div className="partner-track">
          {/* Répéter 3 fois au lieu de 2 pour un défilement fluide */}
          {[...Array(3)].map((_, groupIndex) => (
            <div key={groupIndex} className="partner-group">
              {partners.map((partner) => (
                <div key={`${groupIndex}-${partner.id}`} className="partner-item">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 object-contain grayscale opacity-60"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        .partner-track {
          display: flex;
          width: max-content;
          animation: partner-scroll 24s linear infinite;
        }

        .partner-group {
          display: flex;
        }

        .partner-item {
          min-width: 220px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes partner-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        .partner-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}