import React from "react";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./logo";



const Footer = () => {
  const helpLinks = [
    "Centre d'aide",
    "Mon compte",
    "Suivi des produits",
    "Mes commandes",
    "Ma liste de souhaits"
  ];

  const storeLinks = [
    "À propos de la boutique CKF",
    "Meilleures ventes",
    "Derniers produits",
    "Nouvelles réductions",
    "Produits en promotion"
  ];

  const bottomLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Order Tracking", href: "#tracking" },
    { name: "Terms and Conditions", href: "#terms" },
    { name: "Refund and Returns", href: "#returns" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 text-gray-700">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo />
            <h4 className="mb-4 font-bold text-gray-900 leading-tight">
              Votre partenaire en équipements pour garages et stations de lavage
            </h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-red-500 flex-shrink-0" />
                <p>3 rue de l'Uranium, ZI Sidi Daoued, Bhar Lazreg, La Marsa</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-red-500" />
                <a href="mailto:info@ckf.tn" className="font-medium text-red-500 hover:text-red-600 transition-colors">
                  info@ckf.tn
                </a>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Phone size={20} className="text-red-500" />
              <h4 className="font-bold text-gray-900">Besoin d'aide ?</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  (+216) 29 283 727
                </p>
                <p className="text-base font-semibold text-gray-700">
                  (+216) 22 932 504
                </p>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200">
                <Clock size={16} className="mt-1 text-orange-500" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Lun – Ven : 9h00 – 20h00</p>
                  <p>Sam : 11h00 – 15h00</p>
                </div>
              </div>
              <a
                href="mailto:support@ckf.tn"
                className="inline-block text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                support@ckf.tn
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-5 font-bold text-gray-900 text-lg border-l-4 border-red-500 pl-3">
              Service client
            </h4>
            <ul className="space-y-3 text-sm">
              {helpLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-red-500 transition-colors"></span>
                    <span className="group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h4 className="mb-5 font-bold text-gray-900 text-lg border-l-4 border-red-500 pl-3">
              Informations
            </h4>
            <ul className="space-y-3 text-sm">
              {storeLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors"></span>
                    <span className="group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-200">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {bottomLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-gray-600 hover:text-red-500 transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <span className="text-red-500 font-bold uppercase text-sm tracking-wide">
              Suivez-nous
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:text-white hover:border-transparent ${social.color} transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Copyright © 2025 <span className="font-semibold text-gray-700">CKF</span> - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;