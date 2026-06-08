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