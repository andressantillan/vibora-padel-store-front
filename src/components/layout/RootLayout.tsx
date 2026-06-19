import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

export function RootLayout() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-md mx-auto bg-bg shadow-2xl relative overflow-hidden">
      <Header />
      
      {/* Contenedor principal scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
        <Outlet />
      </div>

      <BottomNavigation />
    </div>
  );
}
