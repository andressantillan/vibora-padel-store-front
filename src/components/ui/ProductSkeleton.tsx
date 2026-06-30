export function ProductSkeleton() {
  return (
    <article className="flex flex-col bg-card rounded-brand-sm shadow-add overflow-hidden border border-line animate-pulse">
      {/* Imagen Placeholder */}
      <div className="relative aspect-square bg-line-soft p-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-line/50"></div>
      </div>
      
      {/* Contenido Placeholder */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Brand */}
          <div className="h-3 w-1/3 bg-line-soft rounded mb-2"></div>
          {/* Name */}
          <div className="h-4 w-full bg-line-soft rounded mb-1"></div>
          <div className="h-4 w-4/5 bg-line-soft rounded mb-3"></div>
          {/* Price */}
          <div className="h-6 w-1/2 bg-line-soft rounded"></div>
        </div>
        
        {/* Button */}
        <div className="mt-2 w-full h-9 bg-line-soft rounded-lg"></div>
      </div>
    </article>
  );
}
