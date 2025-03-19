import { useState } from 'react';
import { Plus, X, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Product, ProductFormData } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { ProductForm } from './ProductForm';
import { ProductCard } from './ProductCard';
import ContactSubmissions from './ContactSubmissions';
import Image from 'next/image';

const ProductDashboard = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const { signOut } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('products');

  const categories = Array.from(new Set(products.map(product => product.category)));
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId); // Call the deleteProduct function from useProducts
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#0E0E55]">
          Product Dashboard</h1>
        <div className="flex gap-4">
          <Button 
            variant={selectedTab === 'products' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('products')}
          >
            Products
          </Button>
          <Button 
            variant={selectedTab === 'contacts' ? 'default' : 'outline'} 
            onClick={() => setSelectedTab('contacts')}
          >
            Contacts
          </Button>
          <Button 
            variant={selectedTab === 'Add_product' ? 'default' : 'outline'} 
            onClick={() => handleOpenDialog()}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {selectedTab === 'products' && (
        <div>
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full "
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
                {selectedCategory === category && (
                  <X 
                    className="ml-2 h-4 w-4 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(null);
                    }}
                  />
                )}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleOpenDialog(product)} // Open dialog for editing
                onDelete={handleDeleteProduct} // Pass delete handler
              />
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'contacts' && <ContactSubmissions />}

      {/* Product Form Dialog */}
      <ProductForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        product={selectedProduct || undefined}
      />
    </div>
  );
};

export default ProductDashboard;