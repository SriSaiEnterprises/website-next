import { useState } from 'react';
import { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from 'lucide-react'; // Import Trash icon

interface ProductCardProps {
  product: Product;
  onClick?: () => void; // Make onClick optional with ?
  onDelete?: (productId: number) => void; // Callback for delete action
}

export function ProductCard({ product, onClick, onDelete }: ProductCardProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(product.id); // Call the onDelete callback
    }
    setIsDeleteModalOpen(false); // Close the modal
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the modal
  };

  return (
    <>
      <Card 
        className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={onClick} // Will only trigger if onClick is provided
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full"
          />
          {/* Product Name Tag */}
          <div className="absolute bottom-2 right-2 bg-[#0E0E55]/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {product.name}
          </div>
        </div>

        {/* Product Details */}
        <CardContent className="p-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-[#0E0E55]">
              {product.name}
            </CardTitle>
          </CardHeader>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          <p className="text-sm text-gray-600 mt-2">Category: {product.category}</p>
          {/* Edit and Delete Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="text-[#0E0E55] hover:text-[#1E1E75] transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                onClick?.(); // Trigger the edit dialog
              }}
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
              onClick={handleDeleteClick}
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold text-[#0E0E55]">Delete Product</h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleCancelDelete}
              >
                No, Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}