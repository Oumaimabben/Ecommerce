import { useState } from "react";
import { Heart, Eye, Repeat, ShoppingCart } from "lucide-react";

/* =======================
   TYPES
======================= */
type Product = {
  id: number;
  badge: string;
  badgeColor?: string;
  image: string;
  title: string;
  description: string;
  features: string[];
  oldPrice: number;
  price: number;
  reviews: number;
};

/* =======================
   DATA
======================= */
const products: Product[] = [
  {
    id: 1,
    badge: "18%",
    image: "/wheel.png",
    title: "VISION® – 147 DAYTONA Hyper Silver",
    description: "Best-in-class all-around performance with premium durability.",
    features: ["High quality alloy", "Perfect road grip", "Long-lasting finish"],
    oldPrice: 254,
    price: 209,
    reviews: 1,
  },
  {
    id: 2,
    badge: "8%",
    image: "/dashcam.png",
    title: "Thinkware F770 Dash Cam Dual Channel Wifi",
    description: "Crystal-clear recording and advanced safety features.",
    features: ["Full HD recording", "Night vision", "Wi-Fi connectivity"],
    oldPrice: 268.99,
    price: 249.99,
    reviews: 1,
  },
  {
    id: 3,
    badge: "SUPER PRICE",
    badgeColor: "bg-orange-500",
    image: "/charger.png",
    title: "Technaxx Car Alarm with Charging Function",
    description: "Reliable protection with smart charging integration.",
    features: ["Anti-theft alarm", "USB charging", "Easy installation"],
    oldPrice: 51.99,
    price: 47.99,
    reviews: 1,
  },
  {
    id: 4,
    badge: "TOP PRODUCT",
    badgeColor: "bg-green-500",
    image: "/adapter.png",
    title: "SnowyFox RV 15Amp to 50Amp Adapter",
    description: "Safe power conversion for RV and outdoor use.",
    features: ["Heavy-duty material", "Heat resistant", "Stable connection"],
    oldPrice: 25.98,
    price: 23.88,
    reviews: 1,
  },
  {
    id: 5,
    badge: "29%",
    image: "/oil.png",
    title: "Shell Rotella T1 SAE 30 Heavy Duty",
    description: "Engineered for superior engine protection.",
    features: ["Reduces wear", "Improves engine life", "High temperature stability"],
    oldPrice: 24.85,
    price: 17.85,
    reviews: 1,
  },
];

/* =======================
   COMPONENT
======================= */
export default function Bestseller() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-red-500">
            Latest Deals for This Week
          </h2>

          <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            54 : 05 : 58 : 07
          </div>

          <span className="text-sm text-gray-400">
            Remains until the end of the offer
          </span>
        </div>

        <button className="text-red-500 font-semibold hover:text-red-600">
          View All →
        </button>
      </div>

      <div className="border-b border-red-500 mb-8" />

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="group relative cursor-pointer rounded-xl border p-4 transform transition-all duration-300 scale-95 hover:scale-105 hover:shadow-2xl bg-white"
          >
            {/* BADGE */}
            <span
              className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${
                product.badgeColor ?? "bg-red-500"
              }`}
            >
              {product.badge}
            </span>

            {/* ACTIONS (visible on hover) */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition">
                <Heart size={16} />
              </button>
              <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition">
                <Repeat size={16} />
              </button>
              <button className="p-2 bg-white rounded-full shadow hover:shadow-md transition">
                <Eye size={16} />
              </button>
            </div>

            {/* IMAGE */}
            <div className="aspect-square flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-105">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* TITLE */}
            <h3 className="text-sm font-semibold mb-1">{product.title}</h3>

            {/* RATING */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span className="text-yellow-400">★★★★★</span>
              <span>{product.reviews} review</span>
            </div>

            {/* PRICE */}
            <div className="mb-1">
              <span className="line-through text-gray-400 mr-1 text-sm">
                ${product.oldPrice}
              </span>
              <span className="text-red-500 font-bold">${product.price}</span>
            </div>

            {/* DETAILS (shown on hover) */}
            <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-72 group-hover:opacity-100 transition-all duration-300 mt-2">
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              
              <ul className="text-sm text-gray-500 list-disc pl-5 mb-2">
                {product.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart size={18} /> Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}