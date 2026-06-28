import api from '@/lib/axios';
import type { CartItem } from '@/types/cart';

interface PreferenceResponse {
  id: string;
}

export async function createPreference(items: CartItem[], orderId: number): Promise<PreferenceResponse> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await api.post<PreferenceResponse>('/create-preference', { items, order_id: orderId }, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  return response.data;
}