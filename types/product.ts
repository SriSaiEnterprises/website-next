
export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  image_url: string;
}
