import React, { useState } from "react";
import {
  ArrowRight,
  Heart,
  Eye,
  Repeat,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";

const FeaturedProductTabs = () => {
  const [activeTab, setActiveTab] = useState("Auto Safety & Security");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewAll, setViewAll] = useState(false);

  const itemsPerPage = 5;

  const tabs = [
    "Featured Products",
    "Auto Safety & Security",
    "Interior Accessories",
    "Motor Oils",
    "Tires & Wheels",
  ];

  const products = [
    { id: 1, discount: 8, image: "/api/placeholder/200/200", name: "Thinkware F770 Dash Cam Dual Channel Wifi", price: 249.99, oldPrice: 268.99 },
    { id: 2, badge: "SUPER PRICE", image: "/api/placeholder/200/200", name: "Technaxx car Alarm with Charging Function", price: 47.99, oldPrice: 51.99 },
    { id: 3, discount: 21, image: "/api/placeholder/200/200", name: "Right Stuff® – Drilled and Slotted Brake Rotor", price: 157.99, oldPrice: 199.37 },
    { id: 4, discount: 15, image: "/api/placeholder/200/200", name: "R1 Concepts® – eLINE Series Plain Brake Rotors", price: 187.6, oldPrice: 219.6 },
    { id: 5, discount: 5, image: "/api/placeholder/200/200", name: "Power Stop® – Evolution Drilled and Slotted", price: 154.89, oldPrice: 162.99 },
    { id: 6, discount: 5, image: "/api/placeholder/200/200", name: "Power Stop® – Evolution Drilled and Slotted (2)", price: 154.89, oldPrice: 162.99 },
    { id: 7, discount: 5, image: "/api/placeholder/200/200", name: "Power Stop® – Evolution Drilled and Slotted (3)", price: 154.89, oldPrice: 162.99 },
    { id: 8, discount: 5, image: "/api/placeholder/200/200", name: "Power Stop® – Evolution Drilled and Slotted (4)", price: 154.89, oldPrice: 162.99 },
    { id: 9, discount: 5, image: "/api/placeholder/200/200", name: "Power Stop® – Evolution Drilled and Slotted (5)", price: 154.89, oldPrice: 162.99 },
  ];

  const maxIndex = products.length - itemsPerPage;

  const visibleProducts = viewAll
    ? products
    : products.slice(currentIndex, currentIndex + itemsPerPage);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="bg-white pt-2 pb-8">
      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Tabs */}
        <div className="flex items-center justify-between mb-8 border-b">
          <div className="flex gap-8">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentIndex(0);
                  setViewAll(false);
                }}
                className={`pb-4 font-semibold text-sm ${
                  activeTab === tab
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* View All */}
          <button
            onClick={() => setViewAll(!viewAll)}
            className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-600"
          >
            {viewAll ? "Show Less" : "View All"}
            <ArrowRight className={`w-5 h-5 transition ${viewAll && "rotate-180"}`} />
          </button>
        </div>

        {/* Slider arrows (hidden in View All) */}
        {!viewAll && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {visibleProducts.map(product => (
            <div key={product.id} className="border p-4 rounded-lg hover:shadow-lg">
              <img src={product.image} alt={product.name} className="mb-3" />
              <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
              <div>
                <span className="line-through text-gray-400 mr-2">${product.oldPrice}</span>
                <span className="text-red-500 font-bold">${product.price}</span>
              </div>
              <button className="mt-3 w-full border p-2 hover:bg-red-500 hover:text-white flex justify-center">
                <ShoppingCart />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProductTabs;
