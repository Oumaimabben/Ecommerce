import { useState, useEffect, useRef, RefObject } from "react";
import {
  Shield, Truck, Award, Users, MapPin, Clock, Phone, Mail,
  Target, Heart, Zap, TrendingUp,
} from "lucide-react";

/* ── CSS injected once ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(0.93); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes slideLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes kenBurns {
    0%   { transform:scale(1)    translateX(0)   translateY(0); }
    50%  { transform:scale(1.07) translateX(-1%) translateY(-1%); }
    100% { transform:scale(1)    translateX(0)   translateY(0); }
  }
  @keyframes barGrow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes pulseRing {
    0%   { transform:scale(1);   opacity:.5; }
    100% { transform:scale(1.6); opacity:0;  }
  }

  .anim-fadeUp  { animation: fadeUp   .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fadeIn  { animation: fadeIn   .8s ease both; }
  .anim-scaleIn { animation: scaleIn  .8s cubic-bezier(.22,1,.36,1) both; }
  .anim-slideL  { animation: slideLeft  .7s cubic-bezier(.22,1,.36,1) both; }
  .anim-slideR  { animation: slideRight .7s cubic-bezier(.22,1,.36,1) both; }

  .hero-photo { animation: kenBurns 20s ease-in-out infinite; }

  .accent-bar {
    animation: barGrow .6s cubic-bezier(.22,1,.36,1) both;
    transform-origin: top;
  }

  .stat-card { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }
  .stat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -8px rgba(0,0,0,.15); }
  .stat-card:hover .pulse-dot { animation: pulseRing .8s ease-out infinite; }

  .value-card { transition: transform .35s cubic-bezier(.22,1,.36,1), border-color .3s; }
  .value-card:hover { transform: translateY(-8px) scale(1.02); border-color: rgba(220,38,38,.5) !important; }
  .value-card:hover .val-icon { transform: scale(1.15) rotate(-4deg); }
  .val-icon { transition: transform .35s cubic-bezier(.22,1,.36,1); }

  .team-card { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; }
  .team-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -12px rgba(0,0,0,.2); }
  .team-overlay { opacity:0; transition: opacity .4s ease; }
  .team-card:hover .team-overlay { opacity:1; }
`;

/* ── Typed IntersectionObserver hook ── */
function useReveal<T extends Element>(threshold = 0.12): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Animated counter ── */
interface CounterProps {
  target: string;
  suffix?: string;
}

function Counter({ target, suffix = "" }: CounterProps) {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(num)) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(num / 45));
    const id = setInterval(() => {
      cur += step;
      if (cur >= num) { setVal(num); clearInterval(id); }
      else setVal(cur);
    }, 28);
    return () => clearInterval(id);
  }, [visible, target]);

  return <span ref={ref}>{val.toLocaleString("fr-FR")}{suffix}</span>;
}

/* ════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [heroRef, heroVisible] = useReveal<HTMLDivElement>(0);
  const [statsRef, statsVisible] = useReveal<HTMLDivElement>(0.1);
  const [storyRef, storyVisible] = useReveal<HTMLDivElement>(0.1);
  const [valuesRef, valuesVisible] = useReveal<HTMLElement>(0.1);
  const [teamRef, teamVisible] = useReveal<HTMLElement>(0.1);

  const stats = [
    { number: "15",     suffix: "+", label: "Années d'expérience", icon: <Award className="w-7 h-7" /> },
    { number: "50000",  suffix: "+", label: "Clients satisfaits",  icon: <Users className="w-7 h-7" /> },
    { number: "100000", suffix: "+", label: "Produits vendus",     icon: <TrendingUp className="w-7 h-7" /> },
    { number: "24/7",   suffix: "",  label: "Support client",      icon: <Clock className="w-7 h-7" /> },
  ];

  const values = [
    { icon: <Shield className="w-10 h-10" />, title: "Qualité garantie",     desc: "Nous sélectionnons rigoureusement chaque produit pour garantir des pièces automobiles de haute qualité et durables." },
    { icon: <Truck  className="w-10 h-10" />, title: "Livraison rapide",     desc: "Expédition express partout en Tunisie avec un système de suivi en temps réel pour tous vos achats." },
    { icon: <Heart  className="w-10 h-10" />, title: "Service client dédié", desc: "Notre équipe passionnée est disponible pour vous conseiller et répondre à toutes vos questions." },
    { icon: <Zap    className="w-10 h-10" />, title: "Prix compétitifs",     desc: "Les meilleurs tarifs du marché sans compromis sur la qualité de nos produits automobiles." },
  ];

  const team = [
    { name: "Mohamed Ben Ali", role: "Fondateur & CEO",        desc: "Passionné d'automobile depuis 20 ans" },
    { name: "Fatima Trabelsi", role: "Directrice Commerciale", desc: "Experte en pièces détachées" },
    { name: "Ahmed Mansour",   role: "Chef Logistique",         desc: "Spécialiste en gestion des stocks" },
  ];

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: "'Barlow', sans-serif" }} className="min-h-screen bg-gray-50">

        {/* ══ HERO ══ */}
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-2">
          <div
            ref={heroRef}
            className={`relative rounded-3xl overflow-hidden shadow-2xl ${heroVisible ? "anim-scaleIn" : "opacity-0"}`}
            style={{ height: "min(540px, 70vw)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1920&q=80"
              alt="Équipement de garage"
              className="hero-photo absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div
              className={`absolute left-0 top-0 bottom-0 w-1.5 bg-red-600 rounded-l-3xl ${heroVisible ? "accent-bar" : "opacity-0"}`}
              style={{ animationDelay: ".5s" }}
            />

            <div className="relative h-full flex flex-col justify-center px-10 md:px-16 max-w-2xl">
              <div
                className={`flex items-center gap-3 mb-5 ${heroVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{ animationDelay: ".2s" }}
              >
                <span className="w-8 h-px bg-red-500" />
                <span className="text-red-400 text-xs font-semibold tracking-[.2em] uppercase">Depuis 2009</span>
              </div>

              <h1
                className={`text-white leading-none mb-5 ${heroVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
                  fontWeight: 900,
                  animationDelay: ".35s",
                }}
              >
                À propos<br />
                <span className="text-red-500">de nous</span>
              </h1>

              <p
                className={`text-gray-300 text-base md:text-lg leading-relaxed max-w-sm ${heroVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{ animationDelay: ".5s" }}
              >
                Votre partenaire de confiance pour toutes vos pièces automobiles en Tunisie.
              </p>

              <div
                className={`flex flex-wrap gap-3 mt-8 ${heroVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{ animationDelay: ".65s" }}
              >
                <button className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900/40">
                  Voir la boutique
                </button>
                <button className="border border-white/30 hover:border-white/70 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                  Nous contacter
                </button>
              </div>
            </div>

            <div
              className={`absolute bottom-7 right-7 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white text-center hidden md:block ${heroVisible ? "anim-fadeIn" : "opacity-0"}`}
              style={{ animationDelay: ".9s" }}
            >
              <div className="text-3xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                50K+
              </div>
              <div className="text-gray-300 text-xs mt-1 uppercase tracking-widest">Clients satisfaits</div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section ref={statsRef} className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`stat-card bg-white rounded-2xl p-7 shadow border border-gray-100 cursor-default ${statsVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="pulse-dot absolute inset-0 rounded-full bg-red-400 opacity-0" />
                    <div className="relative bg-red-50 text-red-600 p-3.5 rounded-xl">{s.icon}</div>
                  </div>
                  <div
                    className="text-4xl font-black text-gray-900"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {s.number !== "24/7"
                      ? <Counter target={s.number} suffix={s.suffix} />
                      : "24/7"
                    }
                  </div>
                  <div className="text-gray-500 text-sm font-medium">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section ref={storyRef} className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${storyVisible ? "anim-slideL" : "opacity-0"}`}>
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold">
                Notre histoire
              </span>
              <h2
                className="text-gray-900 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900 }}
              >
                Leader tunisien des<br />pièces automobiles
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Depuis 2009, nous nous sommes engagés à fournir aux automobilistes tunisiens les meilleures pièces détachées et accessoires automobiles du marché.</p>
                <p>Notre passion pour l'automobile et notre expertise technique nous permettent de sélectionner rigoureusement chaque produit pour garantir qualité, durabilité et performance.</p>
                <p>Avec plus de 50 000 clients satisfaits et un catalogue de plus de 10 000 références, nous continuons à innover pour mieux vous servir.</p>
              </div>
              <div className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-2xl p-5">
                <Target className="w-10 h-10 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Notre mission</h3>
                  <p className="text-gray-600 text-sm">Rendre l'entretien automobile accessible, simple et fiable pour tous.</p>
                </div>
              </div>
            </div>

            <div className={`${storyVisible ? "anim-slideR" : "opacity-0"}`} style={{ animationDelay: ".15s" }}>
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-1 shadow-2xl shadow-red-900/30">
                <div className="bg-gradient-to-br from-red-500/90 to-red-700 rounded-3xl p-8 space-y-5">
                  {([
                    { icon: <MapPin className="w-5 h-5" />, label: "Notre siège", value: "Tunis, Tunisie" },
                    { icon: <Phone  className="w-5 h-5" />, label: "Téléphone",   value: "(+216) 71 123 456" },
                    { icon: <Mail   className="w-5 h-5" />, label: "Email",       value: "contact@autoparts.tn" },
                    { icon: <Clock  className="w-5 h-5" />, label: "Horaires",    value: "Lun - Sam : 8h – 18h" },
                  ] as const).map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white border-b border-white/10 pb-5 last:border-0 last:pb-0 group">
                      <div className="bg-white/20 group-hover:bg-white/35 transition-colors p-2.5 rounded-xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-red-200 text-xs uppercase tracking-widest font-semibold">{item.label}</div>
                        <div className="text-white font-semibold mt-0.5 text-sm">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section ref={valuesRef} className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`text-center mb-14 ${valuesVisible ? "anim-fadeUp" : "opacity-0"}`}>
              <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">
                Nos valeurs
              </span>
              <h2
                className="text-white mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900 }}
              >
                Ce qui nous différencie
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-sm">Des principes qui guident chacune de nos actions pour votre satisfaction.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`value-card bg-white/5 border border-white/10 rounded-2xl p-7 group cursor-default ${valuesVisible ? "anim-fadeUp" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className="val-icon text-red-500 mb-5 w-fit">{v.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section ref={teamRef} className="max-w-7xl mx-auto px-4 py-20">
          <div className={`text-center mb-14 ${teamVisible ? "anim-fadeUp" : "opacity-0"}`}>
            <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold inline-block mb-4">
              Notre équipe
            </span>
            <h2
              className="text-gray-900 mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900 }}
            >
              Des experts à votre service
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Une équipe passionnée et expérimentée pour vous accompagner.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {team.map((m, i) => (
              <div
                key={i}
                className={`team-card bg-white rounded-2xl overflow-hidden shadow border border-gray-100 ${teamVisible ? "anim-fadeUp" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="h-56 bg-gradient-to-br from-red-500 to-red-700 relative flex items-center justify-center overflow-hidden">
                  <Users className="w-20 h-20 text-white/20" />
                  <div className="team-overlay absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold tracking-widest uppercase border border-white/50 px-4 py-2 rounded-full">
                      Voir le profil
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-gray-900 font-bold text-xl mb-1">{m.name}</h3>
                  <p className="text-red-600 font-semibold text-xs mb-3 uppercase tracking-wide">{m.role}</p>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="max-w-7xl mx-auto px-4 pb-14">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative py-16 px-8 text-center text-white">
              <h2
                className="mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900 }}
              >
                Prêt à découvrir nos produits ?
              </h2>
              <p className="text-red-100 mb-8 max-w-lg mx-auto text-sm">
                Explorez notre large catalogue de pièces automobiles de qualité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-sm">
                  Voir la boutique
                </button>
                <button className="border-2 border-white/60 hover:border-white text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:bg-white/10 text-sm">
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}