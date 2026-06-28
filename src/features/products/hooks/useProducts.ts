import { fetchProducts, type ProductFilters } from '@/features/products/services/product.api.ts';
import type { ProductListItem } from '@/types/product';
import type { Paginated } from '@/types/pagination';
import { useEffect, useState } from "react";

export function useProducts(filters: ProductFilters = {}) {

    const [products, setProducts] = useState<ProductListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setError(null);
        fetchProducts(filters)
            .then((data: Paginated<ProductListItem>) => {
                setProducts(data.data); // Solo nos interesa el array de productos
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filters]); // Re-fetch si los filtros cambian

    return { products, loading, error };
}