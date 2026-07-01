import type { CartItem, CartState } from '@/types/cart';

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: CartItem } }
  | { type: 'REMOVE_ITEM'; payload: { variantId: number } }
  | { type: 'UPDATE_QTY'; payload: { variantId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item } = action.payload;
      const existing = state.items.find((i) => i.variantId === item.variantId);
      if (existing) {
        const quantity = Math.min(existing.quantity + item.quantity, item.available);
        return {
          items: state.items.map((i) =>
            i.variantId === item.variantId ? { ...i, quantity } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: Math.min(item.quantity, item.available) }],
      };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.variantId !== action.payload.variantId) };
    case 'UPDATE_QTY': {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.variantId !== variantId) };
      }
      return {
        items: state.items.map((i) =>
          i.variantId === variantId ? { ...i, quantity: Math.min(quantity, i.available) } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}