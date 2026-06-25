import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { fetchProduct } from '@/features/products/services/product.api';
import { Spinner } from '@/components/ui/Spinner';
import type { ProductDetail as ProductDetailType, ProductVariant } from '@/types/product';
import { useCart } from '@/features/cart/hooks/useCart';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Agregar un estado local para confirmar la acción visualmente
  const [added, setAdded] = useState(false);

  // Estado para la variante seleccionada
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchProduct(slug)
      .then((data) => {
        setProduct(data);
        // Seleccionar la primera variante por defecto si existe
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      })
      .catch(() => setError("No se pudo cargar la información del producto."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error || "Producto no encontrado"}</p>
        <Link to="/products" className="text-teal font-bold hover:underline">Volver al catálogo</Link>
      </div>
    );
  }

  const mainImage = product.images.find(img => img.is_main)?.url || product.images[0]?.url || '/placeholder.png';

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    // Armar un label para la variante combinando atributos
    const labelParts = [];
    if (selectedVariant.weight) labelParts.push(`${selectedVariant.weight}g`);
    if (selectedVariant.size) labelParts.push(selectedVariant.size);
    if (selectedVariant.color) labelParts.push(selectedVariant.color);
    const variantLabel = labelParts.length > 0 ? labelParts.join(" - ") : `Variante ${selectedVariant.id}`;

    addItem({
      variantId: selectedVariant.id,
      productName: product.name,
      productSlug: product.slug,
      variantLabel,
      price: selectedVariant.price,
      imageUrl: mainImage,
      quantity: 1,
      available: selectedVariant.available
    });
    
    // Feedback visual temporal
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="flex-1 bg-bg pb-24 md:pb-8">
      {/* Botón Volver */}
      <div className="px-4 py-4 md:px-8 max-w-5xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-ink hover:text-teal transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          <span>Volver</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de Imágenes */}
        <section className="bg-line-soft aspect-square md:rounded-2xl flex items-center justify-center p-8 overflow-hidden relative">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
          <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-ink text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
            {product.category}
          </span>
        </section>

        {/* Info del Producto */}
        <section className="px-4 md:px-0 flex flex-col">
          <h1 className="font-display font-black text-3xl md:text-4xl text-ink leading-tight mb-2">
            {product.name}
          </h1>
          <p className="text-muted text-sm font-bold uppercase tracking-wider mb-6">
            Marca: {product.brand} {product.level ? `• Nivel: ${product.level}` : ''}
          </p>

          {/* Precio (depende de la variante) */}
          <div className="mb-8">
            <p className="font-display font-extrabold text-4xl text-teal-ink">
              ${(selectedVariant?.price || 0).toLocaleString('es-AR')}
            </p>
            {selectedVariant && selectedVariant.available < 5 && (
              <p className="text-red-500 text-sm font-bold mt-1">¡Solo quedan {selectedVariant.available} disponibles!</p>
            )}
          </div>

          {/* Selector de Variantes */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-8 space-y-4">
              <h3 className="font-bold text-ink">Selecciona una opción:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  // Armar un label para la variante combinando atributos
                  const labelParts = [];
                  if (variant.weight) labelParts.push(`${variant.weight}g`);
                  if (variant.size) labelParts.push(variant.size);
                  if (variant.color) labelParts.push(variant.color);
                  const label = labelParts.length > 0 ? labelParts.join(" - ") : `Opción ${variant.id}`;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.available === 0}
                      className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                        isSelected 
                          ? 'border-teal-ink bg-teal-ink text-white shadow-md' 
                          : variant.available === 0
                            ? 'border-line bg-bg text-line cursor-not-allowed opacity-50'
                            : 'border-line hover:border-teal hover:text-teal bg-card'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Descripción */}
          {product.description && (
            <div className="mb-8">
              <h3 className="font-bold text-ink mb-2">Descripción</h3>
              <p className="text-muted leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA Fixed en Mobile, Normal en Desktop */}
          <div className="fixed bottom-16 left-0 right-0 p-4 bg-card border-t border-line md:relative md:p-0 md:bg-transparent md:border-t-0 md:bottom-auto z-30">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.available === 0 || added}
              className={`w-full md:w-auto md:px-12 flex items-center justify-center gap-2 py-4 rounded-xl font-extrabold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(142,212,76,0.39)] ${
                added 
                  ? 'bg-ink text-white' 
                  : 'bg-lime hover:bg-lime-dark text-teal-ink'
              }`}
            >
              <ShoppingCart size={24} />
              <span>
                {added 
                  ? '¡Añadido!' 
                  : selectedVariant && selectedVariant.available === 0 
                    ? 'Sin Stock' 
                    : 'Añadir al Carrito'}
              </span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
