// lib/fetchProducts.ts
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: number;
  name: string;
  image_url: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image_url");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as Product[];
};