import { useState } from "react";
import { Product } from "../../types/catalogue.types";
import { badgeStyle } from "../../data/products.data";
import Stars from "./Stars";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-sm overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Image area */}
      <div className="relative bg-gray-50 h-44 flex items-center justify-center overflow-hidden">
        {/* Gear placeholder icon */}
        <svg
          className="w-20 h-20 text-gray-200 group-hover:text-gray-300 transition-colors duration-200"
          viewBox="0 0 64 64"
          fill="currentColor"
        >
          <path d="M54.3 35.7l-4.1-.7a18.5 18.5 0 00-1.6-3.9l2.4-3.4a2 2 0 00-.2-2.6l-4.9-4.9a2 2 0 00-2.6-.2l-3.4 2.4a18.5 18.5 0 00-3.9-1.6l-.7-4.1A2 2 0 0033.3 15h-6.9a2 2 0 00-2 1.7l-.7 4.1a18.5 18.5 0 00-3.9 1.6L16.4 20a2 2 0 00-2.6.2L8.9 25a2 2 0 00-.2 2.6l2.4 3.4a18.5 18.5 0 00-1.6 3.9l-4.1.7A2 2 0 003.7 37v6.9a2 2 0 001.7 2l4.1.7c.4 1.4 1 2.7 1.6 3.9l-2.4 3.4a2 2 0 00.2 2.6l4.9 4.9a2 2 0 002.6.2l3.4-2.4c1.2.6 2.5 1.2 3.9 1.6l.7 4.1a2 2 0 002 1.7h6.9a2 2 0 002-1.7l.7-4.1a18.5 18.5 0 003.9-1.6l3.4 2.4a2 2 0 002.6-.2l4.9-4.9a2 2 0 00.2-2.6l-2.4-3.4c.6-1.2 1.2-2.5 1.6-3.9l4.1-.7a2 2 0 001.7-2V37a2 2 0 00-1.7-2zM29.9 47a10 10 0 110-20 10 10 0 010 20z" />
        </svg>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm ${badgeStyle[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 border border-gray-300 px-3 py-1 rounded-sm">
              Rupture de stock
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-3 right-3 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center transition-colors hover:border-red-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={wishlist ? "#e63329" : "none"}
            stroke={wishlist ? "#e63329" : "#9ca3af"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-bold tracking-widest uppercase text-red-600"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {product.brand}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">{product.ref}</span>
        </div>

        <h3
          className="text-gray-900 font-semibold text-sm leading-snug"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
          >
            {product.price.toFixed(2)} TND
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleCart}
          disabled={!product.inStock}
          className={`mt-1 w-full py-2.5 text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-150
            ${
              product.inStock
                ? addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-red-600 hover:bg-red-700 active:scale-95 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {!product.inStock ? "Indisponible" : addedToCart ? "✓ Ajouté" : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}