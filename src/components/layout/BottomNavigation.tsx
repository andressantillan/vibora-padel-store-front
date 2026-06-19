import { NavLink } from 'react-router-dom';
import { Home, Search, ShoppingCart } from 'lucide-react';

export function BottomNavigation() {
  return (
    <nav 
      aria-label="Navegación principal" 
      className="sticky bottom-0 z-40 bg-card border-t border-line shadow-sticky pb-safe"
    >
      <ul className="flex justify-around items-center h-16">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? 'text-teal font-bold' : 'text-muted hover:text-ink'
              }`
            }
            aria-label="Inicio"
          >
            {({ isActive }) => (
              <>
                <Home size={24} className={isActive ? 'fill-teal-ink' : ''} />
                <span className="text-[10px] uppercase tracking-wider">Inicio</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? 'text-teal font-bold' : 'text-muted hover:text-ink'
              }`
            }
            aria-label="Catálogo"
          >
            {({ isActive }) => (
              <>
                <Search size={24} className={isActive ? 'stroke-teal-ink' : ''} />
                <span className="text-[10px] uppercase tracking-wider">Catálogo</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                isActive ? 'text-teal font-bold' : 'text-muted hover:text-ink'
              }`
            }
            aria-label="Carrito"
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <ShoppingCart size={24} className={isActive ? 'fill-teal-ink' : ''} />
                  {/* Badge placeholder */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime text-[9px] font-bold text-teal-ink">
                    0
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider">Carrito</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
