export interface CartItem {
  variantId: number;     // la unidad de compra
  productName: string;
  productSlug: string;   // para linkear de vuelta al producto
  variantLabel: string;  // compuesto para mostrar
  price: number;
  imageUrl: string | null;
  quantity: number;
  available: number;     // tope de stock
}

export interface CartState {
  items: CartItem[];
}