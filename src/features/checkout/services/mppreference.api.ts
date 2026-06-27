import api from '@/lib/axios';
import type { CartItem } from '@/types/cart';

interface PreferenceResponse {
  id: string;
}

export async function createPreference(items: CartItem[]): Promise<PreferenceResponse> {
  const response = await api.post<PreferenceResponse>('/create-preference', { items });
  return response.data;
}