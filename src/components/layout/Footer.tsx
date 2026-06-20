import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="hidden md:block bg-teal-ink text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="font-display font-black text-2xl tracking-tight text-white hover:text-lime transition-colors">
            VÍBORA PADEL STORE
          </Link>
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} Víbora Padel Store. Todos los derechos reservados.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Navegación del pie de página">
          <ul className="flex items-center gap-8 font-medium">
            <li>
              <Link to="/about" className="text-line-soft hover:text-lime transition-colors">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-line-soft hover:text-lime transition-colors">
                Contacto / Ayuda
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
