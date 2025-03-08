"use client"; // Mark as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter for navigation
import { supabase } from '@/integrations/supabase/client';

interface Product {
  name: string;
  category: string;
  subcategory: string | null; // Make subcategory optional
  image_url: string;
}

const Gallery = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[][]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter(); // Use useRouter for navigation

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('subcategory')
      .order('subcategory', { ascending: true })
      .not('subcategory', 'is', null);

    if (error) {
      console.error('Error fetching subcategories:', error);
      return;
    }

    // Use a Set to get unique subcategories
    const uniqueSubcategories: string[] = [];
    const seen = new Set<string>();

    for (const item of data) {
      if (item.subcategory && !seen.has(item.subcategory)) {
        seen.add(item.subcategory);
        uniqueSubcategories.push(item.subcategory);
      }
    }

    setSubcategories(uniqueSubcategories);

    // Randomly select 2 subcategories
    const randomSubcategories: string[] = [];
    while (randomSubcategories.length < 2 && uniqueSubcategories.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueSubcategories.length);
      randomSubcategories.push(uniqueSubcategories.splice(randomIndex, 1)[0]);
    }

    fetchProductsForSubcategories(randomSubcategories);
  };

  const fetchProductsForSubcategories = async (subcategories: string[]) => {
    const results: Product[][] = [];

    for (const subcategory of subcategories) {
      const { data, error } = await supabase
        .from('products')
        .select('name, category, subcategory, image_url')
        .eq('subcategory', subcategory);

      if (error) {
        console.error(`Error fetching products for ${subcategory}:`, error);
        results.push([]); // Push an empty array if there's an error
        continue;
      }

      const products: Product[] = [];
      for (const item of data) {
        products.push({
          name: item.name,
          category: item.category,
          subcategory: item.subcategory,
          image_url: item.image_url,
        });
      }

      results.push(products);
    }

    // Log the final featuredProducts array
    console.log("Featured Products:", results);

    setFeaturedProducts(results);
  };

  const handleProductClick = (subcategory: string) => {
    router.push(`/products?subcategory=${subcategory}`);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  // Function to calculate animation duration based on the number of images
  const calculateAnimationDuration = (count: number) => {
    if (count <= 10) {
      return 25; // 25 seconds for up to 10 images
    } else if (count <= 20) {
      return 30; // 30 seconds for up to 20 images
    } else if (count <= 30) {
      return 40; // 40 seconds for up to 30 images
    } else {
      return 60; // 60 seconds for more than 30 images
    }
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

      {featuredProducts.map((products, index) => {
        const animationDuration = calculateAnimationDuration(products.length);

        return (
          <div key={index} className="slider-container overflow-hidden relative w-full mb-8">
            <div 
              className="flex animate-loop-scroll"
              style={{
                animation: index === 0 
                  ? `loop-scroll-left ${animationDuration}s linear infinite`
                  : `loop-scroll-right ${animationDuration}s linear infinite`,
              }}
            >
              {(() => {
                const productElements = [];
                for (let i = 0; i < products.length; i++) {
                  const product = products[i];
                  productElements.push(
                    <div
                      key={`${product.name}-${i}`} // Use product.name as a key
                      className="hover-card relative flex-shrink-0 w-64 mx-4 cursor-pointer"
                      onClick={() => handleProductClick(product.subcategory!)}
                    >
                      <div className="relative">
                        {/* Replace next/image with img */}
                        <img
                          src={encodeURI(product.image_url)} // Encode the URL
                          alt={product.name}
                          className="w-full h-[300px] object-cover transition-transform duration-800 ease-in-out hover:scale-110"
                          style={{ borderRadius: "7px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageClick(product.image_url);
                          }}
                          loading="lazy"
                          onError={(e) => {
                            // Handle broken images
                            console.error("Error loading image:", e);
                            e.currentTarget.src = "/fallback-image.png"; // Provide a fallback image
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
                  );
                }
                return productElements;
              })()}
            </div>
          </div>
        );
      })}

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeOverlay}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Replace next/image with img */}
            <img
              src={encodeURI(selectedImage)} // Encode the URL
              alt="Selected product"
              className="w-full h-auto object-contain"
              onError={(e) => {
                console.error("Error loading selected image:", e);
                e.currentTarget.src = "/fallback-image.png"; // Provide a fallback image
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