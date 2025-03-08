// components/Hero.tsx
"use client"; // Mark as a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter for navigation
import Image from 'next/image';
import { Gift, CircuitBoard, Printer, Smartphone } from 'lucide-react';

const Hero = () => {
  const router = useRouter(); // Use useRouter for navigation
  const [activeText, setActiveText] = useState(0);
  const texts = ['Corporate Gifting', 'Printing Solutions', 'Tech Products'];
  console.log(activeText);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [texts.length]);

  const handleCategoryClick = (category: string) => {
    const formattedCategory = encodeURIComponent(category);
    router.push(`/products?category=${formattedCategory}`);
  };

  return (
    <div className="max-w-7xl mx-auto w-full min-h-screen flex flex-col md:flex-row items-center justify-between bg-white px-4 sm:px-6 py-12 relative overflow-hidden lg:pt-16 pt-24">
      <div className="w-full md:w-1/2 z-10 text-left px-4 md:px-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#302c2c' }}>
          THE PERFECT <span style={{ color: '#0E0E55' }}>GIFT</span> IS WAITING FOR YOU
        </h1>
        <p className="md:text-xl text-gray-600 mb-6" style={{ color: '#302c2c', fontSize: '18px' }}>
          Discover premium corporate gifts, innovative printing solutions, and cutting-edge tech
          products. Shop directly from our site to impress clients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border bg-white text-[#0E0E55] border-[#0E0E55] flex items-center gap-2 transition-colors duration-300 hover:bg-[#0E0E55] hover:text-white"
            onClick={() => handleCategoryClick('Corporate Gifting')}
          >
            <Gift size={40} />
            Corporate Gifting
          </button>
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border bg-white text-[#0E0E55] border-[#0E0E55] flex items-center gap-2 transition-colors duration-300 hover:bg-[#0E0E55] hover:text-white"
            onClick={() => handleCategoryClick('Tech & Gadgets')}
          >
            <CircuitBoard size={40} />
            Tech & Gadgets
          </button>
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border bg-white text-[#0E0E55] border-[#0E0E55] flex items-center gap-2 transition-colors duration-300 hover:bg-[#0E0E55] hover:text-white"
            onClick={() => handleCategoryClick('Printing Solutions')}
          >
            <Printer size={40} />
            Printing Solutions
          </button>
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border bg-white text-[#0E0E55] border-[#0E0E55] flex items-center gap-2 transition-colors duration-300 hover:bg-[#0E0E55] hover:text-white"
            onClick={() => handleCategoryClick('Electronics')}
          >
            <Smartphone size={30} />
            Electronics
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[400px] md:h-auto flex items-center justify-center z-10 relative">
        <div className="relative w-[90%] h-[90%]">
          <div
            className="absolute w-full md:h-full h-[75%] bg-black opacity-80"
            style={{
              transform: 'translate(15px, 15px)', 
              zIndex: 5,
            }}
          />
          <Image
            src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/heroImg10.jpg"
            alt="Corporate Gifting Adventure"
            width={800}
            height={800}
            className="relative w-full md:h-full object-contain max-h-[600px] md:max-h-[800px]"
            style={{ zIndex: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;