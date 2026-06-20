export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null; // logo_url, puede no tener
}