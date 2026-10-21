export enum ProductCategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface ProductCategorySummary {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  status: ProductCategoryStatus;
}

export interface ProductCategoryDetail {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  status: ProductCategoryStatus;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductCategorySort {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  NAME_ASC = "NAME_ASC",
  NAME_DESC = "NAME_DESC",
  SORT_ORDER_ASC = "SORT_ORDER_ASC",
  SORT_ORDER_DESC = "SORT_ORDER_DESC",
}

export interface BrowseProductCategoriesFilter {
  status?: ProductCategoryStatus;
  sort?: ProductCategorySort;
}
