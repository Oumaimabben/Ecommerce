interface CatalogueHeaderProps {
  totalResults: number;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function CatalogueHeader({
  totalResults,
  search,
  onSearchChange,
}: CatalogueHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-10 md:px-16">
      <div className="flex items-end justify-between flex-wrap gap-4">
        {/* Title block */}
        <div>
          <div
            className="inline-flex items-center gap-3 text-red-600 text-xs font-bold tracking-[0.18em] uppercase mb-3"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            <span className="block w-6 h-[2px] bg-red-600" />
            CKF Equipements
          </div>
          <h1
            className="text-gray-900 leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              letterSpacing: "0.04em",
            }}
          >
            Catalogue <span className="text-red-600">Produits</span>
          </h1>
          <p
            className="text-gray-500 text-sm mt-2"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {totalResults} produit{totalResults > 1 ? "s" : ""} trouvé
            {totalResults > 1 ? "s" : ""}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-red-400 focus:bg-white transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          />
        </div>
      </div>
    </div>
  );
}