import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const css = `
  @keyframes kenBurns {
    0%   { transform: scale(1)    translateX(0)    translateY(0); }
    50%  { transform: scale(1.08) translateX(-1%)  translateY(-1%); }
    100% { transform: scale(1)    translateX(0)    translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
    50%       { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
  }

  .bg-photo {
    animation: kenBurns 18s ease-in-out infinite;
  }
  .auth-card {
    animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both;
  }
  .particle {
    animation: particleFloat linear infinite;
  }
  .tab-active {
    position: relative;
  }
  .tab-active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0; right: 0;
    height: 2px;
    background: #dc2626;
    border-radius: 2px;
  }
`;

const AuthCard = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const particles = [
    { size: 6,  top: "15%", left: "8%",  delay: "0s",   duration: "6s"  },
    { size: 4,  top: "70%", left: "5%",  delay: "1s",   duration: "8s"  },
    { size: 8,  top: "30%", left: "90%", delay: "2s",   duration: "7s"  },
    { size: 5,  top: "80%", left: "88%", delay: ".5s",  duration: "9s"  },
    { size: 6,  top: "50%", left: "3%",  delay: "3s",   duration: "6.5s"},
    { size: 4,  top: "20%", left: "93%", delay: "1.5s", duration: "10s" },
    { size: 7,  top: "90%", left: "50%", delay: "4s",   duration: "7.5s"},
    { size: 3,  top: "5%",  left: "55%", delay: "2.5s", duration: "8.5s"},
  ];

  const inputCls = "w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-200 pr-12";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <>
      <style>{css}</style>

      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">

        {/* ── Animated background image ── */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1920&q=80"
            alt="Garage"
            className="bg-photo absolute inset-0 w-full h-full object-cover"
          />
          {/* layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-red-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* ── Floating particles ── */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-red-500/30 border border-red-400/20"
            style={{
              width:  p.size,
              height: p.size,
              top:    p.top,
              left:   p.left,
              animationDelay:    p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        {/* ── Auth card ── */}
        <div className="auth-card relative z-10 w-full max-w-md mx-4">

          {/* white card */}
          <div className="rounded-3xl bg-white shadow-2xl shadow-black/40 p-10">

          
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center  mb-4">
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue</h1>
              <p className="text-gray-500 text-sm">Veuillez vous connecter ou créer un compte</p>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex justify-center gap-8 text-sm font-bold border-b border-gray-100 pb-0">
              <button
                onClick={() => setActiveTab("login")}
                className={`pb-3 transition-all duration-300 ${
                  activeTab === "login"
                    ? "text-red-600 tab-active"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                CONNEXION
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`pb-3 transition-all duration-300 ${
                  activeTab === "register"
                    ? "text-red-600 tab-active"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                INSCRIPTION
              </button>
            </div>

            {/* ── LOGIN ── */}
            {activeTab === "login" && (
              <form className="space-y-5">
                <div>
                  <label className={labelCls}>
                    Adresse email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Votre nom d'utilisateur ou email"
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Mot de passe <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={inputCls}
                      placeholder="Votre mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-gray-600">Se souvenir de moi</span>
                  </div>
                  <button type="button" className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline">
                    Mot de passe oublié ?
                  </button>
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3.5 font-semibold text-white shadow-lg shadow-red-900/50 hover:from-red-500 hover:to-red-600 transition-all duration-200 hover:shadow-xl hover:shadow-red-900/60 active:scale-[0.98] mt-2">
                  Se connecter
                </button>
              </form>
            )}

            {/* ── REGISTER ── */}
            {activeTab === "register" && (
              <form className="space-y-5">
                <div>
                  <label className={labelCls}>
                    Nom d'utilisateur <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Choisissez un nom d'utilisateur"
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Adresse email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="Votre adresse email"
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Mot de passe <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={inputCls}
                      placeholder="Créez un mot de passe sécurisé"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3.5 font-semibold text-white shadow-lg shadow-red-900/50 hover:from-red-500 hover:to-red-600 transition-all duration-200 hover:shadow-xl hover:shadow-red-900/60 active:scale-[0.98] mt-2">
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthCard;