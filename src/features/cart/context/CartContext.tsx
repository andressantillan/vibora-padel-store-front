import { createContext, useReducer, useEffect, useMemo, type ReactNode } from 'react';
import { cartReducer } from '@/features/cart/context/cartReducer';
import type { CartItem, CartState } from '@/types/cart';

const STORAGE_KEY = 'vibora_cart';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue | null>(null);

function init(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartState) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, init);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: { item } }),
      removeItem: (variantId) => dispatch({ type: 'REMOVE_ITEM', payload: { variantId } }),
      updateQuantity: (variantId, quantity) =>
        dispatch({ type: 'UPDATE_QTY', payload: { variantId, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}