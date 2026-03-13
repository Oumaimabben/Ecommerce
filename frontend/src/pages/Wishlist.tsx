import { useState } from "react";
import { Heart, ShoppingCart, Share2, X, Package, Tag, Calendar, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  addedDate: string;
  stock: "in_stock" | "low_stock" | "out_of_stock";
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideIn {
    from { opacity:0; transform:scale(.96) translateY(12px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes modalIn {
    from { opacity:0; transform:scale(.94); }
    to   { opacity:1; transform:scale(1); }
  }

  .row-enter { animation: fadeUp .4s cubic-bezier(.22,1,.36,1) both; }
  .modal-card { animation: modalIn .3s cubic-bezier(.22,1,.36,1) both; }

  .wishlist-row {
    transition: background .2s, box-shadow .2s, transform .2s;
  }
  .wishlist-row:hover {
    background: #fafafa;
    transform: translateX(3px);
  }

  .cart-btn {
    transition: all .2s cubic-bezier(.22,1,.36,1);
  }
  .cart-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px -4px rgba(220,38,38,.45);
  }
  .cart-btn:active:not(:disabled) {
    transform: scale(.97);
  }

  .remove-btn {
    transition: all .2s;
  }
  .remove-btn:hover {
    transform: rotate(90deg) scale(1.1);
  }

  .share-btn-social {
    transition: all .2s cubic-bezier(.22,1,.36,1);
  }
  .share-btn-social:hover {
    transform: translateY(-2px);
  }

  .discount-badge {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
  }
`;

const WishlistPageClassic = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    { id: "1", name: "Thinkware F770 Dash Cam Dual Channel Wifi", category: "Électronique", price: 249.99, originalPrice: 268.99, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=200&q=80", addedDate: "13 Fév 2026", stock: "in_stock" },
    { id: "2", name: "Kit de phares LED haute puissance", category: "Éclairage", price: 450.0, originalPrice: 600.0, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80", addedDate: "10 Fév 2026", stock: "in_stock" },
    { id: "3", name: "Batterie 12V 70Ah démarrage rapide", category: "Batteries", price: 350.0, image: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbed5?auto=format&fit=crop&w=200&q=80", addedDate: "08 Fév 2026", stock: "in_stock" },
    { id: "4", name: "Jeu de 4 pneus tout-terrain", category: "Pneus", price: 1200.0, originalPrice: 1500.0, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=200&q=80", addedDate: "05 Fév 2026", stock: "low_stock" },
    { id: "5", name: "Système audio Bluetooth connecté", category: "Électronique", price: 580.0, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=200&q=80", addedDate: "01 Fév 2026", stock: "out_of_stock" },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    console.log("Ajouté au panier:", item);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const discount = (orig: number, curr: number) =>
    Math.round(((orig - curr) / orig) * 100);

  const stockConfig = {
    in_stock:     { label: "En stock",     icon: <CheckCircle className="w-4 h-4" />, cls: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    low_stock:    { label: "Stock limité", icon: <AlertCircle className="w-4 h-4" />, cls: "text-amber-600  bg-amber-50  border-amber-200"  },
    out_of_stock: { label: "Rupture",      icon: <XCircle     className="w-4 h-4" />, cls: "text-red-500   bg-red-50    border-red-200"    },
  };

  const inStockCount = wishlistItems.filter(i => i.stock !== "out_of_stock").length;

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: "'Barlow', sans-serif" }} className="min-h-screen bg-gray-50">

        {/* ── Header ── */}
        <div className="bg-gray border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                
                <div>
                  <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
                      className="text-3xl text-gray-900 leading-none">
                    Ma liste de souhaits
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="font-semibold text-gray-700">{wishlistItems.length}</span> produit{wishlistItems.length > 1 ? "s" : ""} sauvegardé{wishlistItems.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 hover:border-red-300 hover:text-red-600 text-gray-600 rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-red-50"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-6xl mx-auto px-6 py-8">

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5">
                <Heart className="w-12 h-12 text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Votre liste est vide</h3>
              <p className="text-gray-400 mb-6 text-sm">Ajoutez des produits depuis notre catalogue</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors text-sm">
                Explorer le catalogue
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

              {/* Table head */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100">
                {[
                  { label: "Produit",       span: "col-span-5", icon: <Package  className="w-3.5 h-3.5" /> },
                  { label: "Prix",          span: "col-span-2", icon: <Tag      className="w-3.5 h-3.5" /> },
                  { label: "Ajouté le",     span: "col-span-2", icon: <Calendar className="w-3.5 h-3.5" /> },
                  { label: "Disponibilité", span: "col-span-2", icon: <CheckCircle className="w-3.5 h-3.5" /> },
                  { label: "Action",        span: "col-span-1", icon: <ShoppingCart className="w-3.5 h-3.5" /> },
                ].map((col, i) => (
                  <div key={i} className={`${col.span} flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest`}>
                    {col.icon} {col.label}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-50">
                {wishlistItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="wishlist-row row-enter grid grid-cols-12 gap-4 px-6 py-5 items-center"
                    style={{ animationDelay: `${idx * 0.07}s` }}
                  >
                    {/* Product */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/64x64?text=?"; }}
                          />
                        </div>
                        {item.originalPrice && (
                          <span className="discount-badge absolute -top-2 -right-2 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            -{discount(item.originalPrice, item.price)}%
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 hover:text-red-600 cursor-pointer transition-colors text-sm leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <span className="inline-block mt-1.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <div className="font-bold text-gray-900">
                        {item.price.toFixed(2)} <span className="text-xs font-normal text-gray-400">DT</span>
                      </div>
                      {item.originalPrice && (
                        <div className="text-xs text-gray-400 line-through mt-0.5">
                          {item.originalPrice.toFixed(2)} DT
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <span className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg font-medium">
                        {item.addedDate}
                      </span>
                    </div>

                    {/* Stock */}
                    <div className="col-span-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${stockConfig[item.stock].cls}`}>
                        {stockConfig[item.stock].icon}
                        {stockConfig[item.stock].label}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        disabled={item.stock === "out_of_stock"}
                        className={`cart-btn flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          item.stock === "out_of_stock"
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span className="hidden lg:inline">Panier</span>
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="remove-btn p-2 text-gray-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-gray-700">{inStockCount}</span> produit{inStockCount > 1 ? "s" : ""} disponible{inStockCount > 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={() => wishlistItems.filter(i => i.stock !== "out_of_stock").forEach(i => addToCart(i))}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Tout ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Share Modal ── */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="modal-card bg-white rounded-2xl shadow-2xl max-w-sm w-full p-7 relative">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="bg-red-50 border border-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Partager ma liste</h3>
                <p className="text-gray-400 text-sm">Partagez votre sélection avec vos proches</p>
              </div>

              {/* Link copy */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 truncate font-mono">
                  autoparts.tn/wishlist/user-123
                </div>
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    copied ? "bg-emerald-600 text-white" : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  {copied ? "Copié !" : "Copier"}
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-300 font-medium">ou partager sur</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="share-btn-social flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-blue-200">
                  Facebook
                </button>
                <button className="share-btn-social flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-sky-200">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPageClassic;