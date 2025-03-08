"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Use next/navigation
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import Modal from "react-modal";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  image_url: string;
}

const PRODUCTS_PER_PAGE = 20;

// Map subcategories to their respective GIFs
const subcategoryGifs: { [key: string]: string } = {
  "Bags": "/images/bag.gif",
  "Caps": "/images/cap.gif",
  "Dairy": "/images/diary.gif",
  "Combo Sets": "/images/combo-sets.png",
  "Gift Box": "/images/gift.gif",
  "Hoodies": "/images/hoodie.gif",
  "Key Chains": "/images/keyChain.gif",
  "Laptop Sleeve": "/images/laptopSleeve.png",
  "Metal Visiting Cards": "/images/card.gif",
  "Mugs": "/images/mugs.gif",
  "Pen": "/images/pen.gif",
  "T Shirts": "/images/tshirt.gif",
  "Trolley": "/images/trolley.gif",
  "Trophies": "/images/trophy.gif",
  "Water Bottle": "/images/water-bottle.gif",
  "Printing Solutions": "/images/printer.gif",
  "Tech & Gadgets": "/images/tech.gif",
  "Electronics": "/images/electronics.gif",
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<{ [key: string]: string[] }>({});
  const router = useRouter(); // Use useRouter from next/navigation
  const searchParams = useSearchParams(); // Use useSearchParams to access query parameters

  // Get query parameters
  const currentCategory = searchParams.get("category") || "all";
  const currentSubcategory = searchParams.get("subcategory") || "";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setColumns] = useState(4);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ensure Modal.setAppElement is called after the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#root");
    }
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1);
  }, [currentCategory, currentSubcategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (pageToFetch: number) => {
    setIsLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .range((pageToFetch - 1) * PRODUCTS_PER_PAGE, pageToFetch * PRODUCTS_PER_PAGE - 1);

    if (currentCategory !== "all") {
      query = query.eq("category", currentCategory);
      if (currentSubcategory) {
        query = query.eq("subcategory", currentSubcategory);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts((prev) => [...prev, ...(data || [])]);
      setHasMore(data.length === PRODUCTS_PER_PAGE);
    }
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("products").select("category, subcategory");
    if (error) {
      console.error("Error fetching categories:", error);
    } else {
      const uniqueCategories = Array.from(new Set(data?.map((item) => item.category) || []));
      setCategories(uniqueCategories);
      const subcategoryMap: { [key: string]: string[] } = {};
      data.forEach((item) => {
        if (!subcategoryMap[item.category]) {
          subcategoryMap[item.category] = [];
        }
        if (item.subcategory && !subcategoryMap[item.category].includes(item.subcategory)) {
          subcategoryMap[item.category].push(item.subcategory);
        }
      });
      setSubcategories(subcategoryMap);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
      <div
        className="hover-card relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        style={{ borderRadius: "10px" }}
      >
        <div className="relative">
          {/* Replace next/image with img */}
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-[300px] object-cover transition-transform duration-800 ease-in-out hover:scale-110"
            style={{ borderRadius: "10px 10px 0 0" }}
            onClick={() => handleImageClick(product.image_url)}
          />
          {currentCategory === "all" && product.subcategory && (
            <div
              className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: "#0E0E55", opacity: "0.9" }}
            >
              {product.subcategory}
            </div>
          )}
          <div
            className="absolute bottom-2 right-2 p-1"
            style={{
              width: "fit-content",
              justifyContent: "end",
              backgroundColor: "#0E0E55",
              opacity: "0.9",
              borderRadius: "5px",
            }}
          >
            <h3 style={{ color: "white", textAlign: "right", fontWeight: "400", fontSize: "12px" }}>
              #{product.name}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const GridBatchAnimation: React.FC<{ products: Product[]; batchIndex: number }> = ({
    products,
    batchIndex,
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: batchIndex * 0.2, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    );
  };

  const productsPerRow = columns;
  const productsPerBatch = productsPerRow * 2;
  const productBatches: Product[][] = [];
  for (let i = 0; i < products.length; i += productsPerBatch) {
    productBatches.push(products.slice(i, i + productsPerBatch));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="relative w-full h-[400px] pt-24">
          {/* Replace next/image with img */}
          <img
            src="/images/products1.jpg"
            alt="Products Background"
            className="absolute inset-0 w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute bottom-0 w-full px-4 mx-auto pb-6">
            <div
              className="max-w-7xl mx-auto flex items-center justify-between border-b pb-3 text-gray-200"
              style={{ fontSize: "16px" }}
            >
              <div>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => router.push("/products")}
                >
                  Products
                </span>
                {currentCategory !== "all" && (
                  <span>
                    {" → "}
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push(`/products?category=${currentCategory}`)}
                    >
                      {currentCategory}
                    </span>
                  </span>
                )}
                {currentSubcategory && (
                  <span>
                    {" → "}
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() =>
                        router.push(
                          `/products?category=${currentCategory}&subcategory=${currentSubcategory}`
                        )
                      }
                    >
                      {currentSubcategory}
                    </span>
                  </span>
                )}
              </div>
              <div className="hidden md:flex gap-4">
                {categories.map((category) => (
                  <div key={category} className="relative group cursor-pointer">
                    <span
                      style={{ fontWeight: "500" }}
                      className={`px-3 py-1 rounded hover:bg-gray-700 ${
                        currentCategory === category ? "font-extrabold" : ""
                      }`}
                      onClick={() => router.push(`/products?category=${category}`)}
                    >
                      {category}
                    </span>
                    {subcategories[category] && subcategories[category].length > 0 && (
                      <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
                        {subcategories[category].map((subcategory) => (
                          <div
                            key={subcategory}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                            onClick={() =>
                              router.push(`/products?category=${category}&subcategory=${subcategory}`)
                            }
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-gray-200">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden bg-white shadow-lg rounded-md mt-2 p-4 z-20 absolute left-0 right-0 mx-4">
                {categories.map((category) => (
                  <div key={category} className="py-2">
                    <div
                      className={`font-medium text-gray-900 hover:text-gray-700 ${
                        currentCategory === category ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        router.push(`/products?category=${category}`);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category}
                    </div>
                    {subcategories[category] && subcategories[category].length > 0 && (
                      <div className="pl-4 mt-1 space-y-1">
                        {subcategories[category].map((subcategory) => (
                          <div
                            key={subcategory}
                            className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                            onClick={() => {
                              router.push(
                                `/products?category=${category}&subcategory=${subcategory}`
                              );
                              setIsMenuOpen(false);
                            }}
                          >
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content with Sidebar and Product Grid */}
        <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4 px-4">
            <div className="bg-white rounded-lg shadow-md p-4 md:sticky md:top-6">
              <div className="md:hidden flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ color: "#0E0E55" }}>
                  Categories
                </h2>
                <button onClick={toggleSidebar} className="text-gray-700">
                  {isSidebarOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>

              <div className={`${isSidebarOpen ? "block" : "hidden"} md:block space-y-3`}>
                <div
                  className={`cursor-pointer py-2 px-3 rounded-md ${
                    currentCategory === "all" ? "bg-[#0E0E55] text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => router.push("/products")}
                >
                  All Products
                </div>
                {categories.map((category) => (
                  <div key={category} className="space-y-2">
                    <div
                      className={`cursor-pointer py-2 px-3 rounded-md ${
                        currentCategory === category && !currentSubcategory
                          ? "bg-[#0E0E55] text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => router.push(`/products?category=${category}`)}
                    >
                      {category}
                    </div>
                    {subcategories[category] && subcategories[category].length > 0 && (
                      <div className="pl-4 space-y-1">
                        {subcategories[category].map((subcategory) => (
                          <div
                            key={subcategory}
                            className={`cursor-pointer py-1 px-3 flex items-center gap-2 rounded-md text-sm ${
                              currentSubcategory === subcategory
                                ? "bg-[#0E0E55] text-white"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              router.push(`/products?category=${category}&subcategory=${subcategory}`)
                            }
                          >
                            {/* Replace next/image with img */}
                            <img
                              src={subcategoryGifs[subcategory] || "/images/bag.gif"}
                              alt={`${subcategory} icon`}
                              className="w-4 h-4"
                            />
                            {subcategory}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4 px-4">
            {productBatches.map((batch, batchIndex) => (
              <div key={batchIndex} className="mb-6">
                <GridBatchAnimation products={batch} batchIndex={batchIndex} />
              </div>
            ))}
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-3 rounded-full transition-all duration-300 hover:bg-[#302c2c] hover:text-white"
                  style={{ backgroundColor: "#0E0E55", color: "white", opacity: isLoading ? "0.5" : "1" }}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1000 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            background: "transparent",
            padding: "0",
            maxWidth: "90vw",
            maxHeight: "90vh",
          },
        }}
      >
        {selectedImage && (
          <div className="relative">
            {/* Replace next/image with img */}
            <img
              src={selectedImage}
              alt="Product Image"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: "#0E0E55", opacity: "0.9" }}
            >
              ×
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;