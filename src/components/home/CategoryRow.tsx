import { Link } from 'react-router-dom';
import { Shield, Zap, CircleDot } from 'lucide-react';

const categories = [
  { id: 'paletas', name: 'Paletas', icon: Zap },
  { id: 'overgrips', name: 'Overgrips', icon: CircleDot },
  { id: 'protectores', name: 'Protectores', icon: Shield },
];

export function CategoryRow() {
  return (
    <section className="mt-8 mb-6">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="font-display font-extrabold text-xl text-ink">Explorar</h2>
      </div>
      
      {/* Scroll horizontal container */}
      <div className="flex overflow-x-auto gap-3 px-4 pt-2 pb-4 hide-scrollbar snap-x">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="snap-start shrink-0 flex items-center gap-2 bg-card border border-line hover:border-teal hover:shadow-add text-ink px-4 py-3 rounded-xl transition-all active:scale-95"
            >
              <div className="p-2 bg-bg rounded-lg text-teal">
                <Icon size={20} />
              </div>
              <span className="font-bold text-sm pr-2">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
