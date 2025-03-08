// app/(public)/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Features from "@/components/Features";
import Review from "@/components/Review";

export const metadata: Metadata = {
  title: "Sri Sai Enterprises - Best Corporate Gifting Platform",
  description:
    "Sri Sai Enterprises offers the best corporate gifting solutions. Explore our unique collections of corporate gifts, tech innovations, and printing solutions.",
  keywords: [
    "corporate gifting",
    "corporate gifts",
    "Sri Sai Enterprises",
    "business gifts",
    "customized gifts",
    "employee appreciation gifts",
  ],
  openGraph: {
    title: "Sri Sai Enterprises - Best Corporate Gifting Platform",
    description:
      "Sri Sai Enterprises offers the best corporate gifting solutions. Explore our unique collections of corporate gifts, tech innovations, and printing solutions.",
    type: "website",
    url: "https://www.thesrisaienterprises.com",
    images: [
      {
        url: "https://www.thesrisaienterprises.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Sai Enterprises - Corporate Gifting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Sai Enterprises - Best Corporate Gifting Platform",
    description:
      "Sri Sai Enterprises offers the best corporate gifting solutions. Explore our unique collections of corporate gifts, tech innovations, and printing solutions.",
    images: ["https://www.thesrisaienterprises.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.thesrisaienterprises.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />

      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
        <Gallery />
        <Features />
        <Review />
      </Suspense>

      <Footer />
    </div>
  );
}