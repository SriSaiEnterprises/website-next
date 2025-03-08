import { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onClick: () => void; // Add onClick prop
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick} // Add onClick handler
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        {/* Product Name Tag */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {product.name}
        </div>
      </div>

      {/* Product Details */}
      <CardContent className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        </CardHeader>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <p className="text-sm text-gray-600 mt-2">Category: {product.category}</p>
      </CardContent>
    </Card>
  );
}