// components/providers.tsx
"use client"; // Mark as a Client Component

import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Phone } from "lucide-react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const phoneNumber = "919663467040";
  const message = `Hello Sri Sai Enterprises,\n\nI had some queries regarding your products/services. Can you please connect with me at your earliest convenience?\n\nThank you!`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Sonner Toaster */}
        <SonnerToaster position="bottom-right" richColors closeButton />

        <div className="relative">
          {/* Add Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Sri Sai Enterprises",
                "url": "https://thesrisaienterprises.com",
                "logo": "https://thesrisaienterprises.com/logo.png",
                "description": "Sri Sai Enterprises offers the best corporate gifting solutions.",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91 9663467040",
                  "contactType": "customer service",
                },
              }),
            }}
          />

          {children}

          {/* Call Now Button - Mobile Only */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 md:hidden bg-[#0E0E55] text-white p-3 rounded-full shadow-lg hover:bg-[#302c2c] transition-colors duration-300 z-50"
            aria-label="WhatsApp Now"
          >
            <Phone size={24} />
          </a>

          {/* Contact Div - Larger Screens Only */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block fixed bottom-4 right-4 bg-[#0E0E55] text-white rounded-lg shadow-lg hover:bg-[#302c2c] transition-colors duration-300 z-50 animate-subtle-zoom"
          >
            <div className="p-4 flex flex-col items-center">
              <p className="text-sm font-semibold">Get in touch</p>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={20} />
                <span className="text-lg">+91 9663467040</span>
              </div>
            </div>
          </a>
        </div>

        {/* Inline CSS for Animation */}
        <style>
          {`
            @keyframes subtle-zoom {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
            .animate-subtle-zoom {
              animation: subtle-zoom 2s ease-in-out infinite;
            }
          `}
        </style>
      </TooltipProvider>
    </QueryClientProvider>
  );
}