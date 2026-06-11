export function App() {
  return (
    <div className="mx-auto min-h-full max-w-[480px] bg-bg">
      <h1 className="font-display font-extrabold text-3xl text-center mt-10">Bienvenidos a Vibora Padel Store</h1>
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-center text-muted">
          Aquí podrás encontrar todo lo necesario para disfrutar del pádel, desde palas hasta accesorios. ¡Explora nuestra tienda y encuentra el equipo perfecto para ti!
        </p>
        <button className="bg-teal text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-dark transition-colors">
          Explorar Productos
        </button>
      </div>
    </div>
  );
}