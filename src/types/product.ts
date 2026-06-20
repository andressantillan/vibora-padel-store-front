export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  category: string;
  brand: string;
  shape: string | null;
  level: string | null;
  image: string | null;   // mainImage cargada, pero el producto puede no tener imagen
  price_from: number;     // variants siempre cargadas ⇒ siempre presente
}

export interface ProductImage {
  url: string;
  is_main: boolean;
}

export interface ProductVariant {
  id: number;
  sku: string;
  color: string | null;
  size: string | null;
  weight: number | null;
  price: number;
  available: number; // stock disponible
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  brand: string;
  shape: string | null;
  level: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
}