import { fetchProducts, type ProductFilters } from '@/features/products/services/product.api.ts';
import type { ProductListItem } from '@/types/product';
import type { Paginated, PaginationMeta } from '@/types/pagination';
import { useEffect, useState } from "react";

export function useProducts(filters: ProductFilters = {}) {

    const [products, setProducts] = useState<ProductListItem[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setError(null);
        fetchProducts(filters)
            .then((data: Paginated<ProductListItem>) => {
                // Workaround: El backend en Vercel está hardcodeado a 12 items por página.
                // Como pidieron 8, recalculamos en el frontend (solo funciona bien si hay <= 12 items totales).
                const itemsPerPage = filters.per_page || 8;
                const currentPage = filters.page || 1;
                const total = data.meta.total;
                const lastPage = Math.ceil(total / itemsPerPage);
                
                const start = (currentPage - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                
                // Si la data viene toda en la pagina 1 (total <= 12), paginamos localmente
                if (data.meta.current_page === 1 && total <= 12) {
                    setProducts(data.data.slice(start, end));
                } else {
                    setProducts(data.data);
                }

                setMeta({
                    ...data.meta,
                    current_page: currentPage,
                    last_page: lastPage,
                    per_page: itemsPerPage,
                });
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("No se pudieron cargar los productos. Intenta de nuevo más tarde.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filters.category, filters.brand, filters.search, filters.page, filters.per_page]); // Dependencias explícitas

    return { products, meta, loading, error };
}