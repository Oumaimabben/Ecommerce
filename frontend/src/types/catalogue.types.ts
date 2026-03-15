export type Category = "Tous" | "Freinage" | "Moteur" | "Filtration" | "Électrique" | "Suspension";

export type BadgeType = "Nouveau" | "Promo" | "Populaire";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating";

export type ViewMode = "grid" | "list";

export interface Product {
  id: number;
  name: string;
  brand: string;
  ref: string;
  price: number;
  oldPrice?: number;
  category: Exclude<Category, "Tous">;
  badge?: BadgeType;
  inStock: boolean;
  rating: number;
  reviews: number;
}