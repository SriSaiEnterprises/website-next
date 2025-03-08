import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types/product';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/dashboard-components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client'; // Ensure Supabase client is properly configured

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product;
}

export function ProductForm({ isOpen, onClose, onSubmit, product }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    image_url: '',
    image_file: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description ?? '',
        category: product.category,
        subcategory: product.subcategory ?? '',
        image_url: product.image_url,
        image_file: null,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        image_url: '',
        image_file: null,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image file if exists
    let imageUrl = formData.image_url;
    if (formData.image_file) {
      const fileExt = formData.image_file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${formData.category}/${formData.subcategory || 'uncategorized'}/${fileName}`;

      // Upload the image to the 'images' bucket
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, formData.image_file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }

      // Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    }

    // Prepare the product data to be inserted into the `products` table
    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory || null, // Use null if subcategory is empty
      image_url: imageUrl,
    };

    // Insert the product data into the `products` table
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select(); // Use `.select()` to return the inserted data (optional)

    if (error) {
      console.error('Error inserting product:', error);
      return;
    }

    // Call the `onSubmit` prop with the inserted product data
    onSubmit(productData);

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            Fill in the product details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Product name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Product category"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Input
              id="subcategory"
              value={formData.subcategory || ''} // Fallback to empty string if null
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              placeholder="Product subcategory"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              onChange={(e) => setFormData({ ...formData, image_file: e.target.files?.[0] || null })}
              required={!formData.image_url}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}