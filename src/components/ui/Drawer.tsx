import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Foco inicial en el drawer para accesibilidad
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Menú lateral"}
        className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-card shadow-drawer transform transition-transform duration-300 ease-in-out outline-none flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-line">
          {title && <h2 className="font-display font-extrabold text-xl text-ink">{title}</h2>}
          <button 
            type="button" 
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 -mr-2 text-muted hover:text-teal transition-colors rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
