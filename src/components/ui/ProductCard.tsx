import { Link } from 'react-router-dom';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  brand?: string;
  priority?: boolean;
}

export function ProductCard({ id, name, price, imageUrl, category, brand, priority = false }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-card rounded-brand-sm shadow-add overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-sticky">
      {/* Imagen del producto */}
      <Link to={`/products/${id}`} className="relative aspect-square bg-line-soft p-4 flex items-center justify-center overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          loading={priority ? "eager" : "lazy"}
          {...(priority ? { fetchPriority: "high" } : {})}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
        />
        {category && (
          <span className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            {category}
          </span>
        )}
      </Link>
      
      {/* Contenido */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          <Link to={`/products/${id}`}>
            {brand && <span className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1 block">{brand}</span>}
            <h3 className="font-sans font-bold text-sm text-ink leading-tight line-clamp-2 mb-1 group-hover:text-teal transition-colors">
              {name}
            </h3>
          </Link>
          <p className="font-display font-extrabold text-lg text-teal-ink">
            ${price.toLocaleString('es-AR')}
          </p>
        </div>
        
        <Link 
          to={`/products/${id}`}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-line-soft hover:bg-line text-ink py-2 rounded-lg font-bold text-sm transition-colors active:scale-95"
          aria-label={`Ver opciones de ${name}`}
        >
          <span>Ver opciones</span>
        </Link>
      </div>
    </article>
  );
}
