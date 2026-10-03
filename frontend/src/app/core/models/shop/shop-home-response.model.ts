export interface ShopHomeResponse {
  shop: {
    name: string;
    slug: string;
    colorPalette: string;
  };
  featuredProducts: unknown[];
  bestSellingProducts: unknown[];
  categories: unknown[];
  reviews: unknown[];
}
