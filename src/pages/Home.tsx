import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/home/Hero';
import { CategoryRow } from '@/components/home/CategoryRow';
import { ProductCard } from '@/components/ui/ProductCard';
import { useProducts } from '@/features/products/hooks/useProducts';
import type { ProductListItem } from '@/types/product';
import { Spinner } from '@/components/ui/Spinner';

export function Home() {
  const { products, loading, error } = useProducts({});
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>([]);

  // Seleccionar 3 productos aleatorios una vez que carguen los datos
  useEffect(() => {
    if (products.length > 0 && featuredProducts.length === 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeaturedProducts(shuffled.slice(0, 3));
    }
  }, [products, featuredProducts.length]);

  return (
    <main className="flex-1 bg-bg pb-8 max-w-7xl mx-auto w-full">
      <Hero />
      <CategoryRow />

      {/* Mejores Ventas / Destacados */}
      <section className="px-4 md:px-8 mt-12 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-extrabold text-2xl text-ink">Destacados</h2>
          <Link to="/products" className="text-teal font-bold text-sm hover:text-teal-dark transition-colors">
            Ver catálogo completo
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
            No se pudieron cargar los productos destacados.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.slug} 
                name={product.name}
                price={product.price_from}
                category={product.category}
                imageUrl={product.image || '/placeholder.png'}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
