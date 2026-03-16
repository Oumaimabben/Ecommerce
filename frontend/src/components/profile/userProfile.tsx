import { useState } from "react";

const menuItems = [
  { id: "dashboard", icon: "🏠", label: "Tableau de bord" },
  { id: "info", icon: "👤", label: "Informations personnelles" },
  { id: "orders", icon: "🛒", label: "Historiques des commandes" },
  { id: "favorites", icon: "❤️", label: "Liste des favoris" },
  { id: "logout", icon: "🚪", label: "Déconnexion" },
];

const recentOrders = [
  { id: "#CKF-00124", date: "12/03/2025", total: "340.000 DT", status: "Livré" },
  { id: "#CKF-00118", date: "28/02/2025", total: "87.500 DT", status: "En cours" },
  { id: "#CKF-00105", date: "10/02/2025", total: "215.000 DT", status: "Livré" },
];

export default function CKFMonCompte() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // état connexion

  const handleLogout = () => {
    setIsLoggedIn(false); // déconnecte l'utilisateur
    setActiveMenu("dashboard"); // retourne au dashboard si besoin
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#f2f2f2] font-[Poppins]">
        <h2 className="text-2xl font-bold mb-4">Vous êtes déconnecté !</h2>
        <p className="text-gray-600 mb-6">Merci d'avoir utilisé votre compte.</p>
        <button
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          onClick={() => setIsLoggedIn(true)}
        >
          Se reconnecter
        </button>
      </div>
    );
  }

  return (
    <div className="font-[Poppins] min-h-screen bg-[#f2f2f2]">

      {/* HERO */}
      <div className="max-w-[1280px] mx-auto px-8 pt-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-4">
          <span className="text-[#CC0000] cursor-pointer">🏠 Accueil</span>
          <span>›</span>
          <span className="text-gray-800 font-medium">Mon compte</span>
        </div>

        {/* Banner */}
        <div className="relative rounded-[16px] overflow-hidden h-[200px] mb-7
        bg-[linear-gradient(135deg,#1a0000_0%,#2d0000_40%,#4d0000_70%,#CC0000_100%)]
        shadow-[0_8px_32px_rgba(204,0,0,0.25)] flex items-center justify-end pr-12">

          <h1 className="bg-black/40 backdrop-blur px-10 py-4 rounded-lg border-l-4 border-[#CC0000]
          text-white text-[32px] font-extrabold tracking-[3px] uppercase">
            MON COMPTE
          </h1>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1280px] mx-auto px-8 pb-12 grid grid-cols-[280px_1fr] gap-7">

        {/* SIDEBAR */}
        <div className="flex flex-col gap-2">
         {menuItems.map((item) => (
  <div
    key={item.id}
    onClick={() => {
      if (item.id === "logout") {
        handleLogout();
      } else {
        setActiveMenu(item.id);
      }
    }}
    className={`flex items-center gap-3 px-5 py-[15px] rounded-[10px] cursor-pointer text-[14px] font-medium transition-all
      ${activeMenu === item.id
        ? "bg-gradient-to-r from-[#CC0000] to-[#990000] text-white shadow-lg translate-x-1"
        : "bg-white text-gray-700 shadow-sm"}
    `}
  >
    <span className="text-lg">{item.icon}</span>
    {item.label}
  </div>
))}

        </div>

        {/* CONTENT PANEL */}
        <div className="bg-white rounded-[16px] px-9 py-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border-t-[4px] border-[#CC0000]">

          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
            <div>
              <h2 className="text-[20px] font-bold text-[#1a0000] mb-2">Bienvenue, Ahmed Karim !</h2>
              <p className="text-gray-600 text-sm leading-7 mb-8">
                À partir du tableau de bord de votre compte, vous pouvez afficher vos
                <span className="text-[#CC0000] font-semibold"> historiques des commandes </span>
                et modifier votre mot de passe et les détails de votre compte.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 border rounded-xl p-5 text-center border-t-[3px] border-[#CC0000]">
                  <div className="text-3xl mb-2">🛒</div>
                  <div className="text-2xl font-bold text-[#CC0000]">12</div>
                  <div className="text-xs text-gray-500">Commandes</div>
                </div>
                <div className="bg-gray-50 border rounded-xl p-5 text-center border-t-[3px] border-pink-500">
                  <div className="text-3xl mb-2">❤️</div>
                  <div className="text-2xl font-bold text-pink-500">8</div>
                  <div className="text-xs text-gray-500">Favoris</div>
                </div>
                <div className="bg-gray-50 border rounded-xl p-5 text-center border-t-[3px] border-yellow-500">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-yellow-600">1240</div>
                  <div className="text-xs text-gray-500">Points fidélité</div>
                </div>
              </div>

              {/* RECENT ORDERS */}
              <h3 className="text-[15px] font-bold text-[#1a0000] mb-4 border-b pb-2">Dernières commandes</h3>
              <div className="flex flex-col gap-3">
                {recentOrders.map((order, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 border rounded-lg">
                    <div className="text-xl">📦</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-400">{order.date}</div>
                    </div>
                    <div className="font-bold text-gray-900">{order.total}</div>
                    <div className={`text-xs px-3 py-1 rounded-full font-semibold
                      ${order.status === "Livré" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}>
                      {order.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeMenu === "info" && (
            <div>
              <h2 className="text-[20px] font-bold mb-6">👤 Informations personnelles</h2>
              <div className="grid grid-cols-2 gap-5">
                <input placeholder="Prénom" className="border p-3 rounded-lg" />
                <input placeholder="Nom" className="border p-3 rounded-lg" />
                <input placeholder="Email" className="border p-3 rounded-lg" />
                <input placeholder="Téléphone" className="border p-3 rounded-lg" />
                <input placeholder="Adresse" className="border p-3 rounded-lg" />
                <input placeholder="Ville" className="border p-3 rounded-lg" />
              </div>
              <button className="mt-6 bg-gradient-to-r from-[#CC0000] to-[#990000] text-white px-8 py-3 rounded-lg font-semibold shadow-lg">
                Sauvegarder les modifications
              </button>
            </div>
          )}

          {/* ORDERS */}
          {activeMenu === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4">🛒 Historiques des commandes</h2>
              <p className="text-gray-500">Vous n'avez aucune commande.</p>
            </div>
          )}

          {/* FAVORITES */}
          {activeMenu === "favorites" && (
            <div>
              <h2 className="text-xl font-bold mb-4">❤️ Liste des favoris</h2>
              <p className="text-gray-500">Votre liste de favoris est vide.</p>
            </div>
          )}

       

        </div>
      </div>
    </div>
  );
}