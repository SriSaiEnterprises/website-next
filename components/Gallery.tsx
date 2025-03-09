"use client"; // Mark as a Client Component

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product'; // Import the Product type from types/product.ts

const Gallery = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[][]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category', { ascending: true })
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    // Use a Set to get unique categories
    const uniqueCategories: string[] = [];
    const seen = new Set<string>();

    for (const item of data) {
      if (item.category && !seen.has(item.category)) {
        seen.add(item.category);
        uniqueCategories.push(item.category);
      }
    }

    // Randomly select 2 categories
    const randomCategories: string[] = [];
    while (randomCategories.length < 2 && uniqueCategories.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueCategories.length);
      randomCategories.push(uniqueCategories.splice(randomIndex, 1)[0]);
    }

    fetchProductsForCategories(randomCategories);
  }, []);

  const fetchProductsForCategories = async (categories: string[]) => {
    const results: Product[][] = [];

    for (const category of categories) {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, category, image_url, created_at, updated_at')
        .eq('category', category);

      if (error) {
        console.error(`Error fetching products for ${category}:`, error);
        results.push([]); // Push an empty array if there's an error
        continue;
      }

      results.push(data as Product[]);
    }

    setFeaturedProducts(results);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleProductClick = (category: string) => {
    router.push(`/products?category=${category}`);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-10 mx-auto" style={{ padding: '1.5% 10%' }}>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: '#302c2c' }}>
        Showcase Your <span style={{ color: '#0E0E55' }}>Brand</span> with Style
      </h1>
      <p className="text-center text-lg text-gray-600 mb-8" style={{ color: '#302c2c' }}>
        Explore our handpicked collections of corporate gifts, tech innovations, and printing
        solutions crafted to elevate your business and leave a lasting impression.
      </p>

      {featuredProducts.map((products, index) => (
        <div key={index} className="slider-container overflow-hidden relative w-full mb-8">
          <div 
            className="flex animate-loop-scroll"
            style={{
              animation: index === 0 
                ? 'loop-scroll-left 40s linear infinite'
                : 'loop-scroll-right 40s linear infinite',
            }}
          >
            {products.map((product, i) => (
              <div
                key={`${product.id}-${i}`} // Use product.id as a key for uniqueness
                className="hover-card relative flex-shrink-0 w-64 mx-4 cursor-pointer"
                onClick={() => handleProductClick(product.category)}
              >
                <div className="relative">
                  <Image
                    src={encodeURI(product.image_url)}
                    alt={product.name}
                    width={256}
                    height={300}
                    className="w-full h-[300px] object-cover transition-transform duration-800 ease-in-out hover:scale-110"
                    style={{ borderRadius: "7px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(product.image_url);
                    }}
                    loading="lazy"
                    onError={(e) => {
                      console.error("Error loading image:", e);
                      e.currentTarget.src = "https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/fallback_image.webp"; // Fallback image
                    }}
                  />
                  <div
                    className="absolute bottom-2 right-2 p-1"
                    style={{
                      width: 'fit-content',
                      backgroundColor: '#0E0E55',
                      opacity: '0.9',
                      borderRadius: '5px',
                    }}
                  >
                    <h3
                      style={{
                        color: 'white',
                        textAlign: 'right',
                        fontWeight: '400',
                        fontSize: '15px',
                      }}
                    >
                      #{product.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeOverlay}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={encodeURI(selectedImage)}
              alt="Selected product"
              width={800}
              height={600}
              className="w-full h-auto object-contain"
              onError={(e) => {
                console.error("Error loading selected image:", e);
                e.currentTarget.src = "https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/fallback_image.webp"; // Fallback image
              }}
            />
            <button
              className="absolute top-2 right-2 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: '#0E0E55',
                opacity: '0.9',
              }}
              onClick={closeOverlay}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes loop-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes loop-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .slider-container {
          position: relative;
          overflow: hidden;
        }
        .animate-loop-scroll {
          display: flex;
        }
        .slider-container:hover .animate-loop-scroll {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default Gallery;