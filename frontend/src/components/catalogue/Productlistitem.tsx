import { Product } from "../../types/catalogue.types";
import { badgeStyle } from "../../data/products.data";
import Stars from "./Stars";

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-sm flex items-center gap-5 px-5 py-4 hover:shadow-md transition-all duration-200">
      {/* Icon placeholder */}
      <div className="w-16 h-16 shrink-0 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-200" viewBox="0 0 64 64" fill="currentColor">
          <path d="M54.3 35.7l-4.1-.7a18.5 18.5 0 00-1.6-3.9l2.4-3.4a2 2 0 00-.2-2.6l-4.9-4.9a2 2 0 00-2.6-.2l-3.4 2.4a18.5 18.5 0 00-3.9-1.6l-.7-4.1A2 2 0 0033.3 15h-6.9a2 2 0 00-2 1.7l-.7 4.1a18.5 18.5 0 00-3.9 1.6L16.4 20a2 2 0 00-2.6.2L8.9 25a2 2 0 00-.2 2.6l2.4 3.4a18.5 18.5 0 00-1.6 3.9l-4.1.7A2 2 0 003.7 37v6.9a2 2 0 001.7 2l4.1.7c.4 1.4 1 2.7 1.6 3.9l-2.4 3.4a2 2 0 00.2 2.6l4.9 4.9a2 2 0 002.6.2l3.4-2.4c1.2.6 2.5 1.2 3.9 1.6l.7 4.1a2 2 0 002 1.7h6.9a2 2 0 002-1.7l.7-4.1a18.5 18.5 0 003.9-1.6l3.4 2.4a2 2 0 002.6-.2l4.9-4.9a2 2 0 00.2-2.6l-2.4-3.4c.6-1.2 1.2-2.5 1.6-3.9l4.1-.7a2 2 0 001.7-2V37a2 2 0 00-1.7-2zM29.9 47a10 10 0 110-20 10 10 0 010 20z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase text-red-600">
            {product.brand}
          </span>
          {product.badge && (
            <span
              className={`text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm ${badgeStyle[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-gray-900 font-semibold text-sm truncate">{product.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
          <span className="text-[10px] font-mono text-gray-300 ml-2">{product.ref}</span>
        </div>
      </div>

      {/* Price + CTA */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="text-right">
          <p
            className="text-lg font-bold text-gray-900"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
          >
            {product.price.toFixed(2)} TND
          </p>
          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">{product.oldPrice.toFixed(2)}</p>
          )}
        </div>
        <button
          disabled={!product.inStock}
          className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm transition-all
            ${product.inStock
              ? "bg-red-600 hover:bg-red-700 active:scale-95 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {product.inStock ? "Ajouter" : "Indisponible"}
        </button>
      </div>
    </div>
  );
}