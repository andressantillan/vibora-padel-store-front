import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null;

  // Mostramos todas las páginas (o podríamos hacer un rango si son muchas)
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <nav aria-label="Navegación de páginas" className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Ir a la página anterior"
        aria-disabled={currentPage === 1}
        className="p-2 rounded-lg border border-line bg-card text-ink hover:bg-line-soft transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      <ul className="flex items-center gap-1 md:gap-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={page === currentPage ? `Página ${page}` : `Ir a la página ${page}`}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 ${
                page === currentPage
                  ? "bg-teal-ink text-lime border border-teal-ink shadow-md"
                  : "bg-card text-ink border border-line hover:border-teal hover:text-teal"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        aria-label="Ir a la página siguiente"
        aria-disabled={currentPage === lastPage}
        className="p-2 rounded-lg border border-line bg-card text-ink hover:bg-line-soft transition-colors disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
    </nav>
  );
}
