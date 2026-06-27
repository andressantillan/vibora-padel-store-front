import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { ProductCard } from '@/components/ui/ProductCard';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/features/products/hooks/useProducts';
import type { ProductCardProps } from '@/components/ui/ProductCard';

const CATEGORIES = [
  { id: '', label: 'Todos' },
  { id: 'paletas', label: 'Paletas' },
  { id: 'overgrips', label: 'Overgrips' },
  { id: 'protectores', label: 'Protectores' },
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';

  // Solo pasamos el filtro de categoría si existe uno seleccionado
  const filters = useMemo(() => {
    return currentCategory ? { category: currentCategory } : {};
  }, [currentCategory]);
  
  const { products, loading, error } = useProducts(filters);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({}); // Limpiar parámetros para "Todos"
    }
  };

  return (
    <main className="flex-1 p-4 md:p-8 bg-bg max-w-7xl mx-auto w-full">
      <header className="mb-6">
        <h1 className="font-display font-extrabold text-3xl text-ink">Catálogo</h1>
        <p className="mt-2 text-muted">Encuentra el equipamiento perfecto para elevar tu nivel.</p>
      </header>

      {/* Barra de Filtros (Categorías) */}
      <div className="flex overflow-x-auto gap-2 pb-4 mb-6 hide-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-bold text-sm transition-all active:scale-95 border ${
                isActive 
                  ? 'bg-teal-ink text-lime border-teal-ink shadow-md' 
                  : 'bg-card text-ink border-line hover:border-teal hover:text-teal'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Contenido Principal */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-line border-dashed">
          <h3 className="font-display font-bold text-xl text-ink mb-2">No se encontraron productos</h3>
          <p className="text-muted">Intenta seleccionando otra categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const cardProps: ProductCardProps = {
              id: product.slug, // Usamos slug para la URL
              name: product.name,
              price: product.price_from,
              imageUrl: product.image || '/placeholder.png',
              category: product.category,
            };
            return <ProductCard key={product.id} {...cardProps} />;
          })}
        </div>  
      )}
    </main>
  );
}
