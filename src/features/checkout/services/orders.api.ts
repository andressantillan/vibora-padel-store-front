import api from '@/lib/axios';
import type { OrderPayload, OrderResponse } from '@/types/order';

export async function createOrder(payload: OrderPayload): Promise<OrderResponse> {
  // OrderResource individual ⇒ Laravel envuelve en { data: ... } por defecto
  const apiKey = import.meta.env.VITE_API_KEY;
  const { data } = await api.post<{ data: OrderResponse }>('/orders', payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  return data.data;
}

export async function getOrder(code: string): Promise<OrderResponse> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { data } = await api.get<{ data: OrderResponse }>(`/orders/status/${code}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  return data.data;
}