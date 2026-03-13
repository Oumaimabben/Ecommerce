import { useState } from "react"
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  X,
  Tag,
  Lightbulb,
  Car,
  Wrench,
  Shield,
  Settings,
  Battery,
  Smartphone,
  Droplet,
  Mail,
  Phone,
} from "lucide-react"
import Logo from "./logo"
import { Link, useLocation } from "react-router-dom"


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const location = useLocation();

const showNavbar = location.pathname === "/";
  const categories = [
    { name: "Phares & Éclairage", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Accessoires Intérieurs", icon: <Car className="w-5 h-5" /> },
    { name: "Pneus & Jantes", icon: <Settings className="w-5 h-5" /> },
    { name: "Outils & Équipements", icon: <Wrench className="w-5 h-5" /> },
    { name: "Sécurité Automobile", icon: <Shield className="w-5 h-5" /> },
    { name: "Outils de Garage", icon: <Settings className="w-5 h-5" /> },
    { name: "Batteries d'Origine", icon: <Battery className="w-5 h-5" /> },
    { name: "Écrans de Téléphone", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Batteries & Adhésifs", icon: <Droplet className="w-5 h-5" /> },
  ]

  return (
<div className="w-full">
      {isMenuOpen && (
        <div>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* menu panel */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-white to-gray-50 z-50 overflow-y-auto shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 bg-white/50 backdrop-blur">
             <Logo/>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* MAIN MENU */}
            <div className="px-4 pt-6 pb-2 text-xs font-bold text-red-600 tracking-wider">
              MENU PRINCIPAL
            </div>

            <div className="mt-1">
              {["Accueil", "Boutique", "Pneus & Jantes", "Accessoires Intérieurs", "Blog", "Contact"].map(
                (item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all border-b border-gray-100 group"
                  >
                    <span className="font-medium">{item}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                )
              )}
            </div>

            {/* CATEGORY MENU */}
            <div className="px-4 pt-6 pb-2 text-xs font-bold text-red-600 tracking-wider">
              CATÉGORIES
            </div>

            <div className="mt-1">
              {categories.map((c, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-red-50 hover:text-red-600 transition-all border-b border-gray-100 group"
                >
                  <div className="flex items-center gap-3 text-gray-700 group-hover:text-red-600">
                    <span className="group-hover:scale-110 transition-transform">{c.icon}</span>
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              ))}
            </div>

            {/* CONTACT DETAILS */}
            <div className="px-4 pt-6 pb-2 text-xs font-bold text-red-600 tracking-wider">
              CONTACT 
            </div>

            <div className="px-4 py-4 space-y-4 text-gray-700">
              <div className="hover:bg-red-50 p-3 rounded-lg transition-colors">
                <p className="flex items-center gap-3 font-medium">
                  <Phone className="w-5 h-5 text-red-600" />
                  (+800) 1234 5678 90
                </p>
                <p className="text-sm text-gray-500 pl-8 mt-1">9am – 6pm</p>
              </div>

              <div className="hover:bg-red-50 p-3 rounded-lg transition-colors">
                <p className="flex items-center gap-3 font-medium">
                  <Mail className="w-5 h-5 text-red-600" />
                  info@company.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 text-sm">
            <div className="flex items-center gap-6">
                  <Link to="/" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
               Accueil
              </Link>
               <Link to="/about" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
               À propos
              </Link>
              <Link to="/auth" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
                Mon compte
              </Link>
               {/* Top Bar 
               <Link to="/suivi" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
             Suivi de commande
              </Link>
              */}
                <Link to="/wishlist" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
            Liste de souhaits
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm">Besoin d'aide ?</span>
                <a href="#" className="text-gray-800 hover:text-red-600 font-semibold transition-colors">Appelez-nous</a>
                <span className="font-bold text-gray-900">(+800) 1234 5678 90</span>
                <span className="text-gray-500">ou</span>
                <a href="mailto:info@company.com" className="text-gray-800 hover:text-red-600 font-semibold transition-colors">
                  info@company.com
                </a>
              </div>

              <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
                <span className="text-gray-800 font-semibold">
                  Français
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-5 gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Logo */}
            <div className="items-center flex-shrink-0">
              <Logo />
            </div>
 
            {/* Search Bar */}
            <div className="flex-grow max-w-2xl hidden sm:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="De quoi avez-vous besoin ?"
                  className="w-full pl-5 pr-14 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all shadow-sm"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2.5 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50">
                <User className="w-5 h-5" />
                <div className="text-sm">
                  <div className="font-semibold">Mon compte</div>
                  <div className="text-xs text-gray-500">Bonjour, connectez-vous</div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </div>

              <button className="relative p-2.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <Heart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  0
                </span>
              </button>

              <button className="relative p-2.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  0
                </span>
              </button>

              <div className="hidden sm:flex flex-col items-end text-sm ml-3 border-l border-gray-200 pl-4">
                <span className="font-semibold text-gray-700">0 article</span>
                <span className="font-bold text-red-600">0.00 TDN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Navigation Bar */}
{showNavbar && (
  <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50  shadow-sm">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-0">
        {/* All Categories */}
        {!isMenuOpen && (
          <div className="relative">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white w-72 px-6 py-4 flex justify-between items-center font-semibold rounded-tl-xl rounded-tr-xl shadow-lg">
              <span>Toutes les catégories</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-bl-xl rounded-br-xl shadow-2xl w-72 z-50 overflow-hidden">
              <div className="py-2">
                {categories.map((c, i) => (
                  <button
                    key={i}
                    className="w-full px-5 py-3.5 flex justify-between items-center hover:bg-red-50 hover:text-red-600 transition-all text-left text-sm group/item"
                  >
                    <div className="flex items-center gap-3 text-gray-700 group-hover/item:text-red-600">
                      <span className="group-hover/item:scale-110 transition-transform">{c.icon}</span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 -rotate-90 group-hover/item:text-red-500 group-hover/item:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation menu */}
        <nav className="flex items-center gap-8 ml-10 flex-grow">
          <button className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition-colors font-semibold py-4 group">
            Accueil
            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          <button className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition-colors font-semibold py-4 group">
            Boutique
            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          <button className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition-colors font-semibold py-4 group">
            Nos Partenaires
            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          <button className="flex items-center gap-1.5 text-gray-700 hover:text-red-600 transition-colors font-semibold py-4 group">
            Catalogues
            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </nav>

        {/* Top offers */}
        <div className="flex items-center gap-6 ml-auto">
          <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-red-50 group">
            <Tag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Meilleures offres
            <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Header