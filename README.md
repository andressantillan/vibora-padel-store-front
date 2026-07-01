# Vibora Padel Store — Frontend

Sitio comercial de **Vibora Padel Store**, una tienda online de artículos de pádel. Esta aplicación es el frontend de cara al cliente, que consume la API REST del backend para mostrar el catálogo y gestionar pedidos.

## Descripción

Tienda online especializada en artículos de pádel: paletas, overgrips y protectores. Los visitantes pueden explorar el catálogo, ver el detalle de cada producto con sus variantes, y realizar pedidos como invitados (sin necesidad de crear una cuenta).

## Stack tecnológico

- **Vite** — build tool y servidor de desarrollo
- **React** — librería de UI
- **TypeScript** — tipado estático

## Funcionalidades

- **Catálogo de productos** con filtros por categoría, marca y búsqueda
- **Detalle de producto** con sus variantes (color, peso, talle) y disponibilidad de stock
- **Carrito de compras** para agregar productos antes de finalizar
- **Checkout como invitado**: el cliente completa sus datos de contacto y dirección de envío, sin necesidad de registrarse

## Categorías

- **Paletas** — incluyen forma (redonda, lágrima, diamante) y nivel (iniciación, intermedio, avanzado)
- **Overgrips**
- **Protectores**

## Flujo del Sitio (User Flow)

El sitio cuenta con un flujo de compra sencillo y directo, diseñado para minimizar la fricción (guest checkout):

1. **Exploración (Catálogo / Inicio)**: El cliente ingresa a la tienda, explora los productos destacados y navega por el catálogo usando filtros de categoría o marca.
2. **Detalle del Producto**: Al seleccionar un artículo, el cliente visualiza toda su información, elige las variantes deseadas (talle, color, peso) y lo agrega al carrito.
3. **Carrito de Compras**: El usuario revisa sus productos, ajusta las cantidades o elimina ítems, y visualiza el subtotal de su pedido antes de avanzar.
4. **Checkout (Invitado)**: El cliente completa su compra de forma rápida y sin necesidad de crear una cuenta. Ingresa sus datos de contacto, dirección de envío y selecciona el método de pago en un proceso optimizado.
5. **Confirmación y Seguimiento**: Una vez finalizada la orden, se genera un código único de pedido. A través de la pantalla de "Seguimiento", el cliente puede consultar en cualquier momento el estado de su orden ingresando dicho código, viendo información actualizada sobre pagos y envíos.

## Integración con el backend

El frontend consume la **API REST** del backend (Laravel) mediante peticiones HTTP en formato JSON.

### Endpoints principales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/products` | Listado de productos (con filtros) |
| GET | `/api/products/{slug}` | Detalle de un producto con variantes |
| GET | `/api/categories` | Listado de categorías |
| GET | `/api/brands` | Listado de marcas |
| POST | `/api/orders` | Crear pedido (como invitado) |

La documentación completa de la API está disponible en `/docs` del backend.

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```