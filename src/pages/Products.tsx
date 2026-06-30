import { useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductSkeleton } from '@/components/ui/ProductSkeleton';
import { useProducts } from '@/features/products/hooks/useProducts';
import { fetchCategories, fetchBrands } from '@/features/products/services/taxonomies.api';
import type { Category, Brand } from '@/types/catalog';
import type { ProductCardProps } from '@/components/ui/ProductCard';
import { Filter } from 'lucide-react';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentBrand = searchParams.get('brand') || '';

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchBrands()])
      .then(([cats, brnds]) => {
        setCategories(cats);
        setBrands(brnds);
      })
      .catch(err => console.error("Error loading taxonomies", err));
  }, []);

  const filters = useMemo(() => {
    const f: any = {};
    if (currentCategory) f.category = currentCategory;
    if (currentBrand) f.brand = currentBrand;
    return f;
  }, [currentCategory, currentBrand]);
  
  const { products, loading, error } = useProducts(filters);

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <main className="flex-1 p-4 md:p-8 bg-bg max-w-7xl mx-auto w-full">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-ink">Catálogo</h1>
          <p className="mt-2 text-muted">Encuentra el equipamiento perfecto para elevar tu nivel.</p>
        </div>
        {(currentCategory || currentBrand) && (
          <button 
            onClick={handleClearFilters} 
            className="hidden md:flex items-center gap-1 text-sm font-bold bg-card border border-line text-ink px-4 py-2 rounded-xl hover:border-red-500 hover:text-red-600 transition-colors shadow-sm mb-2 active:scale-95"
          >
            Limpiar filtros
          </button>
        )}
      </header>

      {/* Barra de Filtros (Categorías) */}
      <div className="mb-4">
        <h2 className="text-xs font-bold text-muted mb-3 uppercase tracking-wider">Categorías</h2>
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button
            onClick={() => setParam('category', '')}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all active:scale-95 border ${
              currentCategory === '' 
                ? 'bg-teal-ink text-lime border-teal-ink shadow-md' 
                : 'bg-card text-ink border-line hover:border-teal hover:text-teal'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setParam('category', cat.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all active:scale-95 border ${
                currentCategory === cat.slug 
                  ? 'bg-teal-ink text-lime border-teal-ink shadow-md' 
                  : 'bg-card text-ink border-line hover:border-teal hover:text-teal'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de Filtros (Marcas) */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-muted mb-3 uppercase tracking-wider flex justify-between items-center pr-2">
          <span>Marcas</span>
          {(currentCategory || currentBrand) && (
            <button 
              onClick={handleClearFilters} 
              className="md:hidden flex items-center gap-1 text-xs font-bold bg-card border border-line text-ink px-3 py-1.5 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors active:scale-95"
            >
              Limpiar filtros
            </button>
          )}
        </h2>
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button
            onClick={() => setParam('brand', '')}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all active:scale-95 border ${
              currentBrand === '' 
                ? 'bg-teal-ink text-lime border-teal-ink shadow-md' 
                : 'bg-card text-ink border-line hover:border-teal hover:text-teal'
            }`}
          >
            Todas
          </button>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => setParam('brand', brand.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all active:scale-95 border ${
                currentBrand === brand.slug 
                  ? 'bg-teal-ink text-lime border-teal-ink shadow-md' 
                  : 'bg-card text-ink border-line hover:border-teal hover:text-teal'
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido Principal */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200 font-bold text-center">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 bg-card rounded-3xl border border-line border-dashed">
          <div className="w-16 h-16 bg-line rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="text-muted" size={24} />
          </div>
          <h2 className="font-display font-bold text-xl text-ink mb-2">No se encontraron productos</h2>
          <p className="text-muted">Intenta seleccionando otra combinación de filtros.</p>
          {(currentCategory || currentBrand) && (
            <button 
              onClick={handleClearFilters} 
              className="mt-6 flex items-center gap-2 font-bold bg-card border border-line text-ink px-6 py-3 rounded-xl hover:border-red-500 hover:text-red-600 transition-colors shadow-sm mx-auto active:scale-95"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
            const cardProps: ProductCardProps = {
              id: product.slug, // Usamos slug para la URL
              name: product.name,
              price: product.price_from,
              imageUrl: product.image || '/placeholder.webp',
              category: product.category,
              brand: product.brand,
              priority: index < 4,
            };
            return <ProductCard key={product.id} {...cardProps} />;
          })}
        </div>  
      )}
    </main>
  );
}
