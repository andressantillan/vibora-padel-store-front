import { Hero } from '../components/home/Hero';
import { CategoryRow } from '../components/home/CategoryRow';
import { ProductCard } from '../components/ui/ProductCard';

// Dummy data temporal para previsualizar el diseño
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    name: 'Víbora Black Mamba Edition 2026',
    price: 320000,
    category: 'Paletas',
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p2',
    name: 'Overgrip Víbora Pro (Pack 3)',
    price: 15000,
    category: 'Overgrips',
    imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p3',
    name: 'Víbora King Cobra Carbon',
    price: 350000,
    category: 'Paletas',
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Protector Transparente Pro',
    price: 8000,
    category: 'Protectores',
    imageUrl: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=400&auto=format&fit=crop'
  }
];

export function Home() {
  return (
    <main className="flex-1 bg-bg pb-8">
      <Hero />
      <CategoryRow />

      {/* Mejores Ventas / Destacados */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-extrabold text-xl text-ink">Destacados</h2>
          <button className="text-teal font-bold text-sm hover:text-teal-dark transition-colors">
            Ver más
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {DUMMY_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}
