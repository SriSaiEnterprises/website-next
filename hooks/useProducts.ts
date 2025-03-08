
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductFormData } from '@/types/product';
import { useToast } from "@/hooks/use-toast";

export function useProducts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      return data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { data: insertedData, error } = await supabase
        .from('products')
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return insertedData;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return [data];
        return [data, ...oldData];
      });
      toast({
        title: "Success",
        description: "Product created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductFormData }) => {
      const { data: updatedData, error } = await supabase
        .from('products')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return updatedData;
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return [updatedProduct];
        return oldData.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        );
      });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(['products'], (oldData: Product[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(product => product.id !== deletedId);
      });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  return {
    products,
    isLoading,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
  };
}
