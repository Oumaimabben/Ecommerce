import { useState } from "react";

type BadgeType = "Premium" | "Officiel" | "Certifié";

interface Partner {
  initials: string;
  name: string;
  domain: string;
  badge: BadgeType;
}

interface Stat {
  value: string;
  label: string;
}

const partners: Partner[] = [
  { initials: "BSC", name: "Bosch", domain: "Systèmes moteur", badge: "Premium" },
  { initials: "NGK", name: "NGK", domain: "Bougies & sondes", badge: "Officiel" },
  { initials: "VAL", name: "Valeo", domain: "Éclairage & embrayage", badge: "Premium" },
  { initials: "KYB", name: "KYB", domain: "Amortisseurs", badge: "Officiel" },
  { initials: "FED", name: "Federal Mogul", domain: "Joints & pistons", badge: "Certifié" },
  { initials: "GAT", name: "Gates", domain: "Courroies & chaînes", badge: "Officiel" },
  { initials: "ATE", name: "ATE", domain: "Freinage", badge: "Premium" },
  { initials: "SAC", name: "Sachs", domain: "Amortisseurs & embrayage", badge: "Certifié" },
];

const stats: Stat[] = [
  { value: "30+", label: "Partenaires" },
  { value: "15+", label: "Pays" },
  { value: "100%", label: "Certifiés" },
];

const badgeColors: Record<BadgeType, string> = {
  Premium: "bg-red-50 border border-red-200 text-red-700",
  Officiel: "bg-orange-50 border border-orange-200 text-orange-700",
  Certifié: "bg-gray-100 border border-gray-200 text-gray-600",
};

interface PartnerCardProps {
  partner: Partner;
}

function PartnerCard({ partner }: PartnerCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      className="relative bg-white border border-gray-100 flex flex-col items-center gap-3 px-6 py-8 cursor-pointer transition-all duration-200 overflow-hidden group"
      style={{ boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.07)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top red bar */}
      <span
        className="absolute top-0 left-0 h-[3px] bg-red-600 transition-all duration-300 ease-out"
        style={{ width: hovered ? "100%" : "0%" }}
      />

      {/* Logo circle */}
      <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center">
        <span
          className="text-red-600 font-black tracking-widest"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px" }}
        >
          {partner.initials}
        </span>
      </div>

      {/* Name */}
      <p className="text-gray-900 font-semibold text-sm tracking-widest uppercase text-center">
        {partner.name}
      </p>

      {/* Domain */}
      <p className="text-gray-400 text-xs text-center">{partner.domain}</p>

      {/* Badge */}
      <span
        className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm ${badgeColors[partner.badge]}`}
      >
        {partner.badge}
      </span>
    </div>
  );
}

export default function OurPartner() {
  return (
    <section className="bg-[#f5f5f3] px-6 py-16 md:px-16">
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <div className="text-center mb-14">
        <div
          className="inline-flex items-center gap-3 text-red-600 text-xs font-bold tracking-[0.18em] uppercase mb-4"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <span className="block w-7 h-[2px] bg-red-600" />
          Nos partenaires
          <span className="block w-7 h-[2px] bg-red-600" />
        </div>

        <h2
          className="text-gray-900 leading-none mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "0.04em",
          }}
        >
          Nos <span className="text-red-600">partenaires</span>
          <br />
          de confiance
        </h2>

        <p
          className="text-gray-500 max-w-md mx-auto leading-relaxed text-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          Des marques mondiales sélectionnées pour leur fiabilité et leur
          excellence dans l'équipement automobile.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[2px] mb-12">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-gray-200 pt-8">
        {/* Stats */}
        <div className="flex items-center gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              <div className="text-center">
                <p
                  className="text-red-600 leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-gray-400 text-[11px] tracking-widest uppercase mt-1"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <span className="block w-[1px] h-10 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-right">
          <p
            className="text-gray-400 text-sm mb-3 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <span className="text-gray-700 font-medium">
              Vous souhaitez devenir partenaire ?
            </span>
            <br />
            Rejoignez notre réseau de distributeurs agréés.
          </p>
          <button
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold tracking-widest uppercase px-7 py-3 rounded-sm transition-all duration-150"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Devenir partenaire →
          </button>
        </div>
      </div>
    </section>
  );
}