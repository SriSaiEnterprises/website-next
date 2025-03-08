export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  image_url: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  image_url: string;
  subcategory: string | null;
  image_file?: File | null;
}