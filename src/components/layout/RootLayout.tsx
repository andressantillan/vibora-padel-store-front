import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Footer } from './Footer';

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
