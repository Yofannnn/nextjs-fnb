export enum ProductType {
  FOOD = "FOOD",
  DRINK = "DRINK",
  SNACK = "SNACK",
}

export enum ProductStatus {
  UPCOMING = "UPCOMING",
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  DISCONTINUED = "DISCONTINUED",
}
export enum ProductSort {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
}

export interface ProductImage {
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductDetail {
  id: string;
  category: { id: string; name: string; description: string | null; imageUrl: string | null };
  name: string;
  price: number;
  description: string | null;
  type: ProductType;
  ingredients: string | null;
  preparationTimeInMinutes: number | null;
  stockQuantity: number;
  status: ProductStatus;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSummary {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  status: ProductStatus;
  primaryImageUrl: string;
}

export interface BrowseProductsFilter {
  categoryId?: string;
  type?: ProductType;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  limit?: number;
}
