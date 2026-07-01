/**
 * Optimiza una URL de Cloudinary inyectando parámetros de transformación.
 * Por defecto usa f_auto (sirve WebP o AVIF según el navegador) y q_auto.
 * 
 * @param url URL original de Cloudinary
 * @param width Ancho deseado en píxeles
 * @param height Alto deseado en píxeles 
 * @param cropMode Modo de recorte (por defecto c_limit para evitar pixelado)
 * @returns URL optimizada
 */
export function optimizeCloudinaryUrl(
  url: string | undefined | null, 
  width?: number, 
  height?: number,
  cropMode: string = 'c_limit'
): string {
  if (!url) return '/placeholder.webp';
  if (!url.includes('res.cloudinary.com')) return url;

  // Si la URL ya tiene transformaciones (ej. w_500), evitamos inyectar doble
  // aunque Cloudinary suele ignorar si se pisan, es más seguro chequear.
  // Pero asumimos que la DB devuelve URLs en formato /upload/v1234/
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transformations = ['f_auto', 'q_auto']; // f_auto incluye WebP/AVIF automático
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(cropMode);

  return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
}
