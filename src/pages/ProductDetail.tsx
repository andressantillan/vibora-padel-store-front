import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { fetchProduct } from '@/features/products/services/product.api';
import { Spinner } from '@/components/ui/Spinner';
import { optimizeCloudinaryUrl } from '@/utils/cloudinary';
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
  
  // Estado para la cantidad a agregar
  const [quantity, setQuantity] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

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
          setQuantity(1);
        }
        
        // Si hay una imagen marcada como principal, la mostramos primero
        if (data.images && data.images.length > 0) {
          const mainIdx = data.images.findIndex(img => img.is_main);
          if (mainIdx !== -1) {
            setCurrentImageIdx(mainIdx);
          } else {
            setCurrentImageIdx(0);
          }
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

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [{ url: '/placeholder.webp', is_main: true }];

  const currentImage = images[currentImageIdx]?.url || '/placeholder.webp';

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
      imageUrl: currentImage,
      quantity: quantity,
      available: selectedVariant.available
    });
    
    // Feedback visual temporal
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="flex-1 bg-bg pb-52 md:pb-8">
      {/* Botón Volver */}
      <div className="px-4 py-4 md:px-8 max-w-5xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-ink hover:text-teal transition-colors font-bold text-sm">
          <ChevronLeft size={20} />
          <span>Volver</span>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería de Imágenes */}
        <div className="flex flex-col gap-4">
          <section 
            className="bg-line-soft aspect-square md:rounded-2xl flex items-center justify-center p-8 overflow-hidden relative"
            role="region"
            aria-label="Imagen principal del producto"
          >
            <img 
              src={optimizeCloudinaryUrl(currentImage, 800, 800, 'c_pad')} 
              alt={`${product.name} - Vista ${currentImageIdx + 1}`} 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            <span className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm text-ink text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
              {product.category}
            </span>
          </section>

          {images.length > 1 && (
            <div 
              className="flex gap-3 overflow-x-auto py-2 px-1 -mx-1 hide-scrollbar" 
              role="group" 
              aria-label="Miniaturas de imágenes del producto"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  aria-label={`Ver imagen ${idx + 1}`}
                  aria-current={currentImageIdx === idx ? 'true' : 'false'}
                  className={`flex-shrink-0 w-20 h-20 bg-line-soft rounded-xl overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 ${
                    currentImageIdx === idx ? 'border-teal' : 'border-transparent hover:border-line'
                  }`}
                >
                  <img 
                    src={optimizeCloudinaryUrl(img.url, 150, 150, 'c_pad')} 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

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
              <h2 className="font-bold text-ink">Selecciona una opción:</h2>
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
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                      }}
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
              <h2 className="font-bold text-ink mb-2">Descripción</h2>
              <p className="text-muted leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          )}

          {/* CTA Fixed en Mobile, Normal en Desktop */}
          <div className="fixed bottom-16 left-0 right-0 p-4 bg-card border-t border-line md:relative md:p-0 md:bg-transparent md:border-t-0 md:bottom-auto z-30">
            
            {/* Controles de Cantidad */}
            {selectedVariant && selectedVariant.available > 0 && (
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="font-bold text-ink">Cantidad:</span>
                <div className="flex items-center gap-3 bg-bg border border-line rounded-xl px-2 py-1">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Restar cantidad"
                    className="p-1 text-muted hover:text-ink disabled:opacity-30 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-ink w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(selectedVariant.available, q + 1))}
                    disabled={quantity >= selectedVariant.available}
                    aria-label="Sumar cantidad"
                    className="p-1 text-muted hover:text-ink disabled:opacity-30 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className="text-xs text-muted">
                  ({selectedVariant.available} disponibles)
                </span>
              </div>
            )}

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
