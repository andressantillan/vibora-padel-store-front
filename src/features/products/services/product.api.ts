import api from '@/lib/axios';
import type { ProductListItem, ProductDetail } from '@/types/product';
import type { Paginated } from '@/types/pagination';

export interface ProductFilters {
  category?: string; // slug
  brand?: string;    // slug
  search?: string;
  page?: number;
}

export async function fetchProducts(
  filters: ProductFilters = {}
): Promise<Paginated<ProductListItem>> {
  const { data } = await api.get<Paginated<ProductListItem>>('/products', {
    params: filters,
  });
  return data; // devolvemos data+meta+links completos, no solo data.data
}

export async function fetchProduct(slug: string): Promise<ProductDetail> {
  // El detalle es una Resource individual ⇒ Laravel la envuelve en { data: ... }
  const { data } = await api.get<{ data: ProductDetail }>(`/products/${slug}`);
  return data.data;
}

export async function fetchFeaturedProducts(): Promise<ProductListItem[]> {
  const { data } = await api.get<{ data: ProductListItem[] }>('/products/featured');
  return data.data;
}