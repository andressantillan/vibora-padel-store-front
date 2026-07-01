import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { Footer } from '@/components/layout/Footer';

export function RootLayout() {
  return (
    <div className="flex flex-col h-[100dvh] md:h-auto md:min-h-screen w-full bg-bg relative overflow-hidden md:overflow-visible">
      <Header />
      
      {/* Contenedor principal scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
        <Outlet />
        <Footer />
      </div>

      <BottomNavigation />
    </div>
  );
}
