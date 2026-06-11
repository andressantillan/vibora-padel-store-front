const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

export function formatVariantLabel(v: {
  color: string | null;
  size: string | null;
  weight: number | null;
}): string {
  const parts: string[] = [];
  if (v.color) parts.push(v.color);
  if (v.size) parts.push(`Talle ${v.size}`);
  if (v.weight) parts.push(`${v.weight}g`);
  return parts.join(' · ');
}