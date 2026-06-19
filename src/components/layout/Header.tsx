import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md shadow-sm border-b border-line px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 text-ink hover:text-teal transition-colors"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center" aria-label="Ir a la página de inicio">
            <h1 className="text-2xl font-bold text-teal">Víbora Padel Store</h1>
          </Link>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}
