import { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from 'lucide-react'; // Add this import

interface ProductCardProps {
  product: Product;
  onClick?: () => void; // Make onClick optional with ?
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
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
        {/* Edit Button */}
        <div className="mt-4 flex justify-end">
          <button
            className="text-[#0E0E55] hover:text-[#1E1E75] transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onClick?.(); // Trigger the edit dialog
            }}
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}