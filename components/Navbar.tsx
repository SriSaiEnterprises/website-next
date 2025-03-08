// components/Navbar.tsx
"use client"; // Mark as a Client Component

import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current route path

  return (
    <nav className="fixed w-full backdrop-blur-md z-50 px-4 sm:px-6 py-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.jpg"
              alt="Sri Sai Enterprises Logo"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
            />
            <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#302c2c' }}>
              Sri Sai Enterprises
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full max-w-3xl ml-8">
            <div className="flex items-center space-x-6 lg:space-x-8">
              <Link
                href="/"
                className="relative group transition-colors duration-300"
                style={{ color: '#302c2c' }}
              >
                Home
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    pathname === '/' ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
              <Link
                href="/products"
                className="relative group transition-colors duration-300"
                style={{ color: '#302c2c' }}
              >
                Products
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    pathname === '/products' ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
              <Link
                href="/about"
                className="relative group transition-colors duration-300"
                style={{ color: '#302c2c' }}
              >
                About Us
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    pathname === '/about' ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 sm:px-6 sm:py-2 rounded-full border border-[#0E0E55] bg-white text-[#0E0E55] transition-all duration-300 ease-in-out hover:bg-[#0E0E55] hover:text-white animate-wiggle"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: '#302c2c' }}
              className="focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              href="/"
              className="block relative transition-colors duration-300 hover:text-[#0E0E55]"
              onClick={() => setIsOpen(false)}
              style={{ color: pathname === '/' ? '#0E0E55' : '#302c2c' }}
            >
              Home
              {pathname === '/' && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55]" />
              )}
            </Link>
            <Link
              href="/products"
              className="block relative transition-colors duration-300 hover:text-[#0E0E55]"
              onClick={() => setIsOpen(false)}
              style={{ color: pathname === '/products' ? '#0E0E55' : '#302c2c' }}
            >
              Products
              {pathname === '/products' && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55]" />
              )}
            </Link>
            <Link
              href="/about"
              className="block relative transition-colors duration-300 hover:text-[#0E0E55]"
              onClick={() => setIsOpen(false)}
              style={{ color: pathname === '/about' ? '#0E0E55' : '#302c2c' }}
            >
              About Us
              {pathname === '/about' && (
                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#0E0E55]" />
              )}
            </Link>
            <Link
              href="/contact"
              className="block w-full px-6 py-2 rounded-full border transition-all duration-300 ease-in-out hover:bg-[#0E0E55] hover:text-white text-center animate-wiggle"
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;