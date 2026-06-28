import api from '@/lib/axios';
import type { PaymentMethod } from '@/types/paymentMethod';

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { data } = await api.get('/payment-methods', {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  return data?.data || data || [];
}
