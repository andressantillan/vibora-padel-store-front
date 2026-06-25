import { Link } from 'react-router-dom';
import { Drawer } from '@/components/ui/Drawer';
import { Info, HelpCircle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Menú">
      <div className="flex flex-col h-full justify-between pb-6">
        <nav aria-label="Navegación secundaria">
          {/* Categorías */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Categorías</h3>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/products?category=paletas" onClick={handleLinkClick} className="block py-3 text-ink font-medium hover:text-teal transition-colors">
                  Paletas
                </Link>
              </li>
              <li>
                <Link to="/products?category=overgrips" onClick={handleLinkClick} className="block py-3 text-ink font-medium hover:text-teal transition-colors">
                  Overgrips
                </Link>
              </li>
              <li>
                <Link to="/products?category=protectores" onClick={handleLinkClick} className="block py-3 text-ink font-medium hover:text-teal transition-colors">
                  Protectores
                </Link>
              </li>
            </ul>
          </div>

          <div className="h-px bg-line mx-4 my-2" aria-hidden="true" />

          {/* Información */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Información</h3>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/about" onClick={handleLinkClick} className="flex items-center gap-3 py-3 text-ink font-medium hover:text-teal transition-colors">
                  <Info size={20} className="text-muted" />
                  <span>Sobre Nosotros</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleLinkClick} className="flex items-center gap-3 py-3 text-ink font-medium hover:text-teal transition-colors">
                  <HelpCircle size={20} className="text-muted" />
                  <span>Contacto / Ayuda</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Drawer>
  );
}
