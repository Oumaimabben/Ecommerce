import { useState } from "react";
import {
  Search, SlidersHorizontal, Heart, ShoppingCart, Star,
  ChevronDown, Flame, Zap, Shield, Award, Grid3X3, List,
  ArrowRight, X, Check
} from "lucide-react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,900;1,900&family=Barlow:wght@400;500;600&display=swap');

  :root {
    --red: #dc2626;
    --red-dark: #b91c1c;
    --black: #0a0a0a;
    --surface: #f8f8f8;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes heroSlide {
    from { opacity:0; transform:translateX(-30px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes kenBurns {
    0%,100% { transform:scale(1) translateX(0); }
    50%     { transform:scale(1.05) translateX(-1%); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes badgePop {
    0%   { transform:scale(0); }
    70%  { transform:scale(1.15); }
    100% { transform:scale(1); }
  }
  @keyframes cartBounce {
    0%,100% { transform:translateY(0); }
    40%     { transform:translateY(-5px); }
  }

  .hero-text { animation: heroSlide .8s cubic-bezier(.22,1,.36,1) both; }
  .hero-img   { animation: kenBurns 16s ease-in-out infinite; }

  .card-enter { animation: fadeUp .5s cubic-bezier(.22,1,.36,1) both; }
  .fade-in    { animation: fadeIn .4s ease both; }

  .product-card {
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease;
  }
  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px -12px rgba(0,0,0,.18);
  }
  .product-card:hover .card-img {
    transform: scale(1.06);
  }
  .card-img {
    transition: transform .5s cubic-bezier(.22,1,.36,1);
  }
  .product-card:hover .card-actions {
    opacity: 1;
    transform: translateY(0);
  }
  .card-actions {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity .25s ease, transform .25s ease;
  }

  .wishlist-btn {
    transition: transform .2s, color .2s;
  }
  .wishlist-btn:hover { transform: scale(1.2); }
  .wishlist-btn.active { color: var(--red); }

  .filter-tag {
    transition: all .2s;
  }
  .filter-tag:hover, .filter-tag.active {
    background: var(--red);
    color: white;
    border-color: var(--red);
  }

  .cart-add:hover .cart-icon { animation: cartBounce .4s ease; }

  .badge-new { animation: badgePop .4s cubic-bezier(.22,1,.36,1) both; }

  .price-sale {
    background: linear-gradient(135deg, var(--red), var(--red-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-stat {
    border-left: 2px solid rgba(255,255,255,.2);
  }

  .search-input:focus { outline: none; box-shadow: 0 0 0 3px rgba(220,38,38,.15); }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 400px 100%;
    animation: shimmer 1.2s infinite;
  }
`;

/* ── Data ── */
interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "new" | "sale" | "hot";
  stock: number;
  tags: string[];
}

const products: Product[] = [
  { id:1,  name:"Dash Cam 4K Dual Channel WiFi", category:"Électronique", brand:"Thinkware", price:249, originalPrice:299, rating:4.8, reviews:312, image:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=400&q=80", badge:"sale", stock:15, tags:["caméra","sécurité"] },
  { id:2,  name:"Kit Phares LED 12000LM H7", category:"Éclairage", brand:"Osram", price:189, rating:4.6, reviews:187, image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80", badge:"hot", stock:8, tags:["led","éclairage"] },
  { id:3,  name:"Batterie AGM 70Ah Start-Stop", category:"Batteries", brand:"Varta", price:285, originalPrice:320, rating:4.9, reviews:543, image:"https://images.unsplash.com/photo-1620714223084-8fcacc2dbed5?auto=format&fit=crop&w=400&q=80", badge:"sale", stock:22, tags:["batterie","démarrage"] },
  { id:4,  name:"Pneu All-Terrain 265/65 R17", category:"Pneus", brand:"BFGoodrich", price:320, rating:4.7, reviews:234, image:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80", stock:6, tags:["pneu","4x4"] },
  { id:5,  name:"Autoradio Bluetooth DAB+ 2 DIN", category:"Électronique", brand:"Pioneer", price:195, originalPrice:240, rating:4.5, reviews:98, image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80", badge:"new", stock:12, tags:["audio","bluetooth"] },
  { id:6,  name:"Huile Moteur 5W-40 Synthétique 5L", category:"Lubrifiants", brand:"Castrol", price:65, rating:4.8, reviews:721, image:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80", badge:"hot", stock:50, tags:["huile","entretien"] },
  { id:7,  name:"Disques de Frein Ventilés ATE", category:"Freinage", brand:"ATE", price:145, originalPrice:175, rating:4.7, reviews:156, image:"https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=400&q=80", badge:"sale", stock:9, tags:["frein","sécurité"] },
  { id:8,  name:"Alarme GPS Traceur Antivol Pro", category:"Sécurité", brand:"Cobra", price:220, rating:4.4, reviews:67, image:"https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80", badge:"new", stock:18, tags:["alarme","gps"] },
  { id:9,  name:"Kit Suspension Sport Bilstein", category:"Suspension", brand:"Bilstein", price:580, originalPrice:720, rating:4.9, reviews:89, image:"https://images.unsplash.com/photo-1591293836027-e05b48473b67?auto=format&fit=crop&w=400&q=80", badge:"sale", stock:4, tags:["suspension","sport"] },
];

const categories = ["Tous", "Électronique", "Éclairage", "Batteries", "Pneus", "Lubrifiants", "Freinage", "Sécurité", "Suspension"];

const badgeCfg = {
  new:  { label:"NEW",  cls:"bg-emerald-500 text-white" },
  sale: { label:"PROMO",cls:"bg-red-600 text-white"     },
  hot:  { label:"🔥 HOT",cls:"bg-orange-500 text-white" },
};

/* ── Showroom ── */
export default function Showroom() {
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("Tous");
  const [sortBy, setSortBy]         = useState("popular");
  const [viewMode, setViewMode]     = useState<"grid"|"list">("grid");
  const [wishlist, setWishlist]     = useState<number[]>([]);
  const [cartItems, setCartItems]   = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [toast, setToast]           = useState<string|null>(null);

  const toggleWishlist = (id: number) =>
    setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);

  const addToCart = (name: string, id: number) => {
    setCartItems(c => [...c, id]);
    setToast(`"${name.slice(0,28)}…" ajouté au panier`);
    setTimeout(() => setToast(null), 2800);
  };

  const filtered = products
    .filter(p => category === "Tous" || p.category === category)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating")     return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  const discount = (orig: number, curr: number) => Math.round(((orig - curr) / orig) * 100);

  return (
    <>
      <style>{css}</style>
      <div style={{ fontFamily: "'Barlow', sans-serif" }} className="min-h-screen bg-gray-50">

        {/* ══ HERO BANNER ══ */}
        <div className="relative overflow-hidden bg-gray-900" style={{ height: 420 }}>
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
            alt="Showroom"
            className="hero-img absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Red side accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="hero-text max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-red-500" />
                <span className="text-red-400 text-xs font-semibold tracking-[.25em] uppercase">Showroom Pièces Auto</span>
              </div>
              <h1
                className="text-white leading-none mb-4"
                style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:900 }}
              >
                Les meilleures<br />
                <span className="text-red-500 italic">pièces détachées</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
                Plus de 10 000 références disponibles. Qualité garantie, livraison express partout en Tunisie.
              </p>

              {/* Search bar in hero */}
              <div className="flex gap-3 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher une pièce, marque…"
                    className="search-input w-full bg-white/95 backdrop-blur pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-400 font-medium"
                  />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                  <Search className="w-4 h-4" /> Chercher
                </button>
              </div>

              {/* Mini stats */}
              <div className="flex gap-8 mt-8">
                {[
                  { label:"Produits",    value:"10K+"  },
                  { label:"Marques",     value:"200+"  },
                  { label:"Clients",     value:"50K+"  },
                  { label:"Garantie",    value:"2 ans" },
                ].map((s, i) => (
                  <div key={i} className={`text-white ${i > 0 ? "hero-stat pl-8" : ""}`}>
                    <div className="text-2xl font-black" style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>{s.value}</div>
                    <div className="text-gray-400 text-xs uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ MAIN CONTENT ══ */}
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* ── Toolbar ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`filter-tag text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                    category === cat
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-red-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-red-300 cursor-pointer"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="rating">Mieux notés</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 transition-colors ${viewMode==="grid" ? "bg-red-600 text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 transition-colors ${viewMode==="list" ? "bg-red-600 text-white" : "text-gray-400 hover:text-gray-700"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Cart indicator */}
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Panier</span>
                  {cartItems.length > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center badge-new">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="text-gray-400 text-sm mb-6 font-medium">
            <span className="text-gray-900 font-bold">{filtered.length}</span> produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            {search && <span> pour <span className="text-red-600 font-semibold">"{search}"</span></span>}
          </p>

          {/* ── GRID VIEW ── */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="product-card card-enter bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col"
                  style={{ animationDelay:`${i * 0.07}s` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-50" style={{ height: 200 }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="card-img w-full h-full object-cover"
                    />
                    {/* Overlay actions */}
                    <div className="card-actions absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                      <button
                        onClick={() => addToCart(p.name, p.id)}
                        className="cart-add flex-1 flex items-center justify-center gap-2 bg-gray-900/90 backdrop-blur hover:bg-red-600 text-white text-xs font-bold py-2 rounded-xl transition-all"
                      >
                        <ShoppingCart className="cart-icon w-3.5 h-3.5" />
                        Ajouter
                      </button>
                    </div>
                    {/* Badge */}
                    {p.badge && (
                      <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${badgeCfg[p.badge].cls}`}>
                        {badgeCfg[p.badge].label}
                      </span>
                    )}
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className={`wishlist-btn absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm ${wishlist.includes(p.id) ? "active" : "text-gray-400"}`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-red-600" : ""}`} />
                    </button>
                    {/* Low stock */}
                    {p.stock <= 5 && (
                      <span className="absolute bottom-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Plus que {p.stock} !
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{p.brand}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{p.rating}</span>
                        <span className="text-xs text-gray-400">({p.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">{p.name}</h3>

                    <span className="inline-block text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full font-medium mb-3 w-fit">
                      {p.category}
                    </span>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-xl font-black text-gray-900">
                          {p.price} <span className="text-sm font-normal text-gray-400">DT</span>
                        </div>
                        {p.originalPrice && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-gray-400 line-through">{p.originalPrice} DT</span>
                            <span className="text-xs font-bold text-red-600">-{discount(p.originalPrice, p.price)}%</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className={`p-2 rounded-xl border transition-all ${wishlist.includes(p.id) ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500"}`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-red-600" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── LIST VIEW ── */}
          {viewMode === "list" && (
            <div className="space-y-3">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="card-enter bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  style={{ animationDelay:`${i * 0.06}s` }}
                >
                  <div className="flex items-center gap-5 p-4">
                    <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      {p.badge && (
                        <span className={`absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeCfg[p.badge].cls}`}>
                          {badgeCfg[p.badge].label}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{p.brand}</span>
                        <span className="text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full font-medium">{p.category}</span>
                        {p.stock <= 5 && <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full font-medium">Stock limité</span>}
                      </div>
                      <h3 className="font-semibold text-gray-900 truncate mb-1">{p.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < Math.floor(p.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1 font-medium">{p.rating} ({p.reviews} avis)</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black text-gray-900" style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
                        {p.price} <span className="text-sm font-normal text-gray-400">DT</span>
                      </div>
                      {p.originalPrice && (
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="text-xs text-gray-400 line-through">{p.originalPrice} DT</span>
                          <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 rounded">-{discount(p.originalPrice, p.price)}%</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className={`p-2.5 rounded-xl border transition-all ${wishlist.includes(p.id) ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200 text-gray-300 hover:border-red-200 hover:text-red-500"}`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? "fill-red-600" : ""}`} />
                      </button>
                      <button
                        onClick={() => addToCart(p.name, p.id)}
                        className="cart-add flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-red-200"
                      >
                        <ShoppingCart className="cart-icon w-4 h-4" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24 fade-in">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-400 mb-6">Essayez d'autres mots-clés ou catégories</p>
              <button onClick={() => { setSearch(""); setCategory("Tous"); }} className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* ── Featured Banner ── */}
          <div className="mt-12 rounded-3xl overflow-hidden relative" style={{ height: 220 }}>
            <img
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1920&q=80"
              alt="Promo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/30" />
            <div className="relative h-full flex items-center px-10 gap-10">
              <div>
                <div className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Offre spéciale</div>
                <h3 className="text-white text-3xl font-black mb-3" style={{ fontFamily:"'Barlow Condensed',sans-serif" }}>
                  Jusqu'à <span className="text-red-500">-40%</span> sur l'entretien
                </h3>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105">
                  Découvrir les offres <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-auto hidden md:flex gap-6">
                {[
                  { icon:<Flame className="w-6 h-6"/>,   label:"Meilleures ventes" },
                  { icon:<Zap className="w-6 h-6"/>,     label:"Livraison rapide"  },
                  { icon:<Shield className="w-6 h-6"/>,  label:"Garantie 2 ans"   },
                  { icon:<Award className="w-6 h-6"/>,   label:"Qualité certifiée" },
                ].map((f, i) => (
                  <div key={i} className="text-center text-white opacity-80">
                    <div className="bg-white/10 rounded-2xl p-3 mb-2 mx-auto w-fit">{f.icon}</div>
                    <div className="text-xs font-semibold whitespace-nowrap">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ SHOWROOM GALLERY ══ */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-px bg-red-500" />
                <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Notre showroom</span>
              </div>
              <h2
                className="text-gray-900 leading-none"
                style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900 }}
              >
                Visitez notre espace
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Tunis,Tunisie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Voir l'itinéraire <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { src:"https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=600&q=80", label:"Rayon Freinage",    span:"md:col-span-2 md:row-span-2" },
              { src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", label:"Éclairage LED",     span:"" },
              { src:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80", label:"Lubrifiants",       span:"" },
              { src:"https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80", label:"Atelier & Outils",  span:"" },
              { src:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=600&q=80", label:"Pneus & Jantes",    span:"" },
            ].map((img, i) => (
              <div
                key={i}
                className={`card-enter relative rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
                style={{ height: i === 0 ? "100%" : 180, minHeight: 180, animationDelay:`${i*0.1}s` }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-white text-sm font-bold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Map + Info ── */}
          <div className="grid lg:grid-cols-5 gap-6">

            {/* Google Maps embed */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{ height: 380 }}>
              <iframe
                title="Localisation Showroom"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102427.47035949082!2d10.074520!3d36.806389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924705a0c718!2sTunis!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info card */}
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-7 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-3 py-1.5 rounded-full mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Showroom ouvert</span>
                </div>

                <h3
                  className="text-2xl font-black mb-5 leading-snug"
                  style={{ fontFamily:"'Barlow Condensed',sans-serif" }}
                >
                  AutoParts Tunisie<br />
                  <span className="text-red-500">— Siège principal</span>
                </h3>

                <div className="space-y-4">
                  {[
                    { icon:"📍", label:"Adresse",  value:"Avenue Habib Bourguiba, Tunis 1000" },
                    { icon:"📞", label:"Téléphone",value:"(+216) 71 123 456" },
                    { icon:"✉️", label:"Email",    value:"contact@autoparts.tn" },
                    { icon:"🕐", label:"Horaires", value:"Lun – Sam : 8h00 – 18h00" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg leading-none mt-0.5">{item.icon}</span>
                      <div>
                        <div className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-0.5">{item.label}</div>
                        <div className="text-white text-sm font-medium">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
                <a
                  href="https://maps.google.com/?q=Avenue+Habib+Bourguiba+Tunis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4" />
                  Itinéraire
                </a>
                <a
                  href="tel:+21671123456"
                  className="flex-1 flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                >
                  Appeler
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Toast notification ── */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 fade-in">
            <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl max-w-xs">
              <div className="bg-emerald-500 rounded-full p-1 flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium">{toast}</span>
              <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white ml-2 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}