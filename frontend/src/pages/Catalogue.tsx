import { useState } from "react";
import { Category, SortOption, ViewMode } from "../types/catalogue.types";
import { products } from "../data/products.data";

// ── Components ────────────────────────────────────────────────────────────────
import CatalogueHeader  from "../components/catalogue/Catalogueheader";
import CatalogueFilters from "../components/catalogue/Cataloguefilters";
import ProductGrid      from "../components/catalogue/Productgrid";
import EmptyState       from "../components/catalogue/Emptystate";

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [search, setSearch]                 = useState("");
  const [sortBy, setSortBy]                 = useState<SortOption>("default");
  const [viewMode, setViewMode]             = useState<ViewMode>("grid");

  // ── Filtering & sorting ───────────────────────────────────────────────────
  const filtered = products
    .filter((p) => activeCategory === "Tous" || p.category === activeCategory)
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating")     return b.rating - a.rating;
      return 0;
    });

  const handleReset = () => {
    setSearch("");
    setActiveCategory("Tous");
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="bg-[#f5f5f3] min-h-screen"
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Header (title + search) ── */}
      <CatalogueHeader
        totalResults={filtered.length}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="px-6 py-8 md:px-16">
        {/* ── Filters (categories + sort + view toggle) ── */}
        <CatalogueFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* ── Products or empty state ── */}
        {filtered.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          <ProductGrid products={filtered} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
}