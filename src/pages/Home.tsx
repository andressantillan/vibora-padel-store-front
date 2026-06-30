import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/home/Hero';
import { CategoryRow } from '@/components/home/CategoryRow';
import { ProductCard } from '@/components/ui/ProductCard';
import { fetchFeaturedProducts } from '@/features/products/services/product.api';
import { fetchBrands } from '@/features/products/services/taxonomies.api';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';
import type { ProductListItem } from '@/types/product';
import type { Brand } from '@/types/catalog';
import { Spinner } from '@/components/ui/Spinner';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargar marcas y productos destacados
  useEffect(() => {
    fetchBrands()
      .then(setBrands)
      .catch(err => console.error("Error loading brands", err));

    fetchFeaturedProducts()
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading featured products", err);
        setError(true);
        setLoading(false);
      });
  }, []);

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
                imageUrl={product.image || '/placeholder.webp'}
                priority={true}
              />
            ))}
          </div>
        )}
      </section>

      {/* Marcas */}
      {brands.length > 0 && (
        <section className="px-4 md:px-8 mt-12 mb-16">
          <h2 className="font-display font-extrabold text-2xl text-ink mb-6 text-center md:text-left">Comprá por Marca</h2>
          <div className="flex overflow-x-auto gap-4 pt-2 pb-4 px-2 -mx-2 hide-scrollbar">
            {brands.map(brand => (
              <Link 
                key={brand.id} 
                to={`/products?brand=${brand.slug}`}
                className="flex-shrink-0 bg-card border border-line rounded-2xl w-32 h-32 md:w-40 md:h-40 flex items-center justify-center p-4 hover:border-teal hover:shadow-add transition-all group hover:-translate-y-1"
              >
                {brand.logo_url ? (
                  <img src={optimizeCloudinaryUrl(brand.logo_url, 200, 100, 'c_fit')} alt={brand.name} className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                ) : (
                  <span className="font-display font-bold text-ink text-center group-hover:text-teal">{brand.name}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
