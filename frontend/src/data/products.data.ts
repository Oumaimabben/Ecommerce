import { Category, Product } from "../types/catalogue.types";

export const categories: Category[] = [
  "Tous",
  "Freinage",
  "Moteur",
  "Filtration",
  "Électrique",
  "Suspension",
];

export const products: Product[] = [
  { id: 1,  name: "Plaquettes de frein avant",   brand: "Bosch",         ref: "BP-0986424723",  price: 42.50,  oldPrice: 55.00, category: "Freinage",    badge: "Promo",      inStock: true,  rating: 4, reviews: 128 },
  { id: 2,  name: "Disque de frein ventilé",      brand: "ATE",           ref: "DV-24012501631", price: 67.90,                   category: "Freinage",                         inStock: true,  rating: 5, reviews: 84  },
  { id: 3,  name: "Filtre à huile moteur",        brand: "Mann Filter",   ref: "FH-W71280",      price: 8.90,                    category: "Filtration",  badge: "Populaire",  inStock: true,  rating: 4, reviews: 310 },
  { id: 4,  name: "Filtre à air sport",           brand: "NGK",           ref: "FA-33-2304",     price: 19.50,  oldPrice: 24.00, category: "Filtration",  badge: "Promo",      inStock: true,  rating: 4, reviews: 76  },
  { id: 5,  name: "Bougie d'allumage Iridium",    brand: "NGK",           ref: "BG-ILKAR7B11",   price: 12.80,                   category: "Électrique",  badge: "Nouveau",    inStock: true,  rating: 5, reviews: 55  },
  { id: 6,  name: "Alternateur 90A",              brand: "Valeo",         ref: "AL-436685",      price: 189.00,                  category: "Électrique",                       inStock: false, rating: 4, reviews: 22  },
  { id: 7,  name: "Amortisseur avant droit",      brand: "KYB",           ref: "AM-333290",      price: 74.50,                   category: "Suspension",                       inStock: true,  rating: 4, reviews: 97  },
  { id: 8,  name: "Ressort de suspension",        brand: "Sachs",         ref: "RS-993869",      price: 38.00,  oldPrice: 46.00, category: "Suspension",  badge: "Promo",      inStock: true,  rating: 3, reviews: 41  },
  { id: 9,  name: "Joint de culasse",             brand: "Federal Mogul", ref: "JC-51005700",    price: 28.90,                   category: "Moteur",                           inStock: true,  rating: 4, reviews: 63  },
  { id: 10, name: "Courroie de distribution",     brand: "Gates",         ref: "CD-T43118",      price: 22.40,                   category: "Moteur",      badge: "Populaire",  inStock: true,  rating: 5, reviews: 204 },
  { id: 11, name: "Pompe à eau",                  brand: "Bosch",         ref: "PE-0986280656",  price: 54.00,                   category: "Moteur",                           inStock: false, rating: 4, reviews: 38  },
  { id: 12, name: "Capteur ABS roue avant",       brand: "Valeo",         ref: "CA-251646",      price: 31.20,                   category: "Électrique",  badge: "Nouveau",    inStock: true,  rating: 4, reviews: 19  },
];

export const badgeStyle: Record<string, string> = {
  Nouveau:   "bg-blue-50 text-blue-700 border border-blue-200",
  Promo:     "bg-red-50 text-red-700 border border-red-200",
  Populaire: "bg-amber-50 text-amber-700 border border-amber-200",
};