import api from '@/lib/axios';
import type { Category, Brand } from '@/types/catalog';

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<{ data: Category[] }>('/categories');
  return data.data;
}

export async function fetchBrands(): Promise<Brand[]> {
  const { data } = await api.get<{ data: Brand[] }>('/brands');
  return data.data;
}