import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative w-full rounded-b-brand overflow-hidden shadow-drawer">
      {/* Fondo con el gradiente de la marca */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: 'var(--background-image-hero)' }}
        aria-hidden="true"
      />
      
      {/* Decoración geométrica sutil (opcional para estilo premium) */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-lime/10 rounded-full blur-2xl" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative z-10 p-6 pt-10 pb-12 flex flex-col items-start">
        <span className="inline-block px-3 py-1 mb-4 rounded-full bg-lime/20 border border-lime/30 text-lime font-bold text-[10px] tracking-widest uppercase shadow-sm">
          Nueva Colección 2026
        </span>
        
        <h2 className="font-display font-black text-4xl text-white leading-tight tracking-tight mb-3">
          DOMINA <br /> LA PISTA.
        </h2>
        
        <p className="font-sans font-medium text-sm text-line mb-8 max-w-[250px] leading-relaxed">
          Encuentra la paleta perfecta para tu estilo de juego y eleva tu nivel.
        </p>
        
        <Link 
          to="/products"
          className="group inline-flex items-center gap-2 bg-lime hover:bg-lime-dark text-teal-ink px-6 py-3 rounded-full font-extrabold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-[0_4px_14px_0_rgba(142,212,76,0.39)]"
        >
          <span>Ver Colección</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
