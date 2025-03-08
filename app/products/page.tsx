// app/products/page.tsx
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsContent from './ProductContext'; // New Client Component

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}