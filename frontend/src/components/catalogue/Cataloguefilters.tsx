import { Category, SortOption, ViewMode } from "../../types/catalogue.types";
import { categories } from "../../data/products.data";

interface CatalogueFiltersProps {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function CatalogueFilters({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: CatalogueFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all duration-150
              ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort + View toggle */}
      <div className="flex items-center gap-3">
        {/* Sort select */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="text-xs bg-white border border-gray-200 rounded-sm px-3 py-2 text-gray-600 focus:outline-none focus:border-red-400 cursor-pointer"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <option value="default">Trier par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Mieux notés</option>
        </select>

        {/* View mode toggle */}
        <div className="flex border border-gray-200 rounded-sm overflow-hidden">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-400 hover:text-gray-600"
            }`}
            title="Vue grille"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="7" height="7" rx="1" />
              <rect x="9" y="0" width="7" height="7" rx="1" />
              <rect x="0" y="9" width="7" height="7" rx="1" />
              <rect x="9" y="9" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 transition-colors ${
              viewMode === "list"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-400 hover:text-gray-600"
            }`}
            title="Vue liste"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="1" width="16" height="2" rx="1" />
              <rect x="0" y="7" width="16" height="2" rx="1" />
              <rect x="0" y="13" width="16" height="2" rx="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}