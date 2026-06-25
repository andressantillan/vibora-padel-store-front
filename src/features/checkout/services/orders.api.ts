import api from '@/lib/axios';
import type { OrderPayload, OrderResponse } from '@/types/order';

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  // OrderResource individual ⇒ Laravel envuelve en { data: ... } por defecto
  const { data } = await api.post<{ data: OrderResponse }>('/orders', payload);
  return data.data;
}