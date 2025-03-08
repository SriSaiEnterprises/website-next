// components/Footer.tsx
"use client"; // Mark as a Client Component

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We specialize in creating memorable corporate gifts that strengthen business relationships
              and enhance brand recognition.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>#924, 17th Main Road,3rd Block</li>
              <li> Rajajinagar, Bangalore - 560010</li>
              <li>vijay@thesrisaienterprises.com</li>
              <li>+91 9663467040</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Chat with us on WhatsApp</h3>
            <div className="mt-6 text-center">
              <div className="flex justify-center">
                <Image 
                  src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/whatsapp.png" 
                  alt="WhatsApp QR Code" 
                  width={96} 
                  height={96} 
                  className="w-24 h-24" 
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2018 Corporate Gifting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;