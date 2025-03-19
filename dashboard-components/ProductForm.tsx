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
  product?: Product;
}

export function ProductForm({ isOpen, onClose, product }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    image_url: '',
    image_file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [error, setError] = useState<string | null>(null); // Track errors

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

    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    setError(null); // Reset error state

    console.log('Form submission started'); // Debug log

    try {
      // Upload image file if exists
      let imageUrl = formData.image_url;
      if (formData.image_file) {
        console.log('Uploading image file...'); // Debug log

        const fileExt = formData.image_file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${formData.category}/${formData.subcategory || 'uncategorized'}/${fileName}`;

        // Upload the image to the 'images' bucket
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, formData.image_file);

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        console.log('Image uploaded successfully'); // Debug log

        // Get the public URL of the uploaded image
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
        console.log('Image URL:', imageUrl); // Debug log
      }

      // Prepare the product data to be inserted into the `products` table
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        subcategory: formData.subcategory || null, // Use null if subcategory is empty
        image_url: imageUrl,
      };

      console.log('Inserting product data:', productData); // Debug log

      // Insert the product data into the `products` table
      const { data, error: insertError } = await supabase
        .from('products')
        .insert([productData])
        .select(); // Use `.select()` to return the inserted data (optional)

      if (insertError) {
        throw new Error(`Error inserting product: ${insertError.message}`);
      }

      console.log('Product inserted successfully:', data); // Debug log
      // Close the dialog
      onClose();
    } catch (err) {
      console.error('Error during form submission:', err); // Debug log
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false); // Reset submission state
      console.log('Form submission completed'); // Debug log
    }
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
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : (product ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}