import { Product, ViewMode } from "../../types/catalogue.types";
import ProductCard from "./Productcard";
import ProductListItem from "./Productlistitem";

interface ProductGridProps {
  products: Product[];
  viewMode: ViewMode;
}

export default function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}