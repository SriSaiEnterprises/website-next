// components/Features.tsx
"use client"; // Mark as a Client Component

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation'; // Updated import
import Image, { StaticImageData } from 'next/image';
import gift from '@/public/images/gift.gif';
import delivery from '@/public/images/delivery.gif';
import teamwork from '@/public/images/teamwork.gif';

interface CardProps {
  icon: StaticImageData;
  title: string;
  description: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const renderDescription = (desc: string, index: number) => {
    if (index === 0) {
      const parts = desc.split(/(business gift)/i);
      return parts.map((part, i) =>
        part.toLowerCase() === 'business gift' ? (
          <span key={i} style={{ color: '#0E0E55' }}>{part}</span>
        ) : (
          part
        )
      );
    } else if (index === 1) {
      const parts = desc.split(/(send gifts in bulk)/i);
      return parts.map((part, i) =>
        part.toLowerCase() === 'send gifts in bulk' ? (
          <span key={i} style={{ color: '#0E0E55' }}>{part}</span>
        ) : (
          part
        )
      );
    } else if (index === 2) {
      const parts = desc.split(/(automatically)/i);
      return parts.map((part, i) =>
        part.toLowerCase() === 'automatically' ? (
          <span key={i} style={{ color: '#0E0E55' }}>{part}</span>
        ) : (
          part
        )
      );
    }
    return desc;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="flex flex-col items-start text-left p-6 bg-white rounded-lg shadow-lg w-full max-w-xs hover:shadow-xl transition-shadow duration-300"
      style={{ borderRadius: '15px' }}
    >
      <Image src={icon} alt={`${title} icon`} width={64} height={64} className="w-16 h-16 mb-4 object-contain" />
      <h3 className="font-bold mb-2" style={{ fontSize: '18px', color: '#302c2c' }}>
        {title}
      </h3>
      <p className="text-gray-600" style={{ fontSize: '16px', color: '#302c2c' }}>
        {renderDescription(description, index)}
      </p>
    </motion.div>
  );
};

const GiftPlatform: React.FC = () => {
  const router = useRouter(); // Updated import

  const cards = [
    {
      icon: gift,
      title: 'Thousands of Gifts',
      description: 'One vendor of record. Shop our business gift marketplace. We handle all sourcing, vetting, and compliance for you.',
    },
    {
      icon: delivery,
      title: 'Send to Hundreds at Once',
      description: 'State-of-the-art, multi-recipient checkout that makes it easy to send gifts in bulk.',
    },
    {
      icon: teamwork,
      title: 'Automate Employee Gifting',
      description: 'Set up gift workflows, milestones, and triggers once, then gifts go out automatically.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="font-bold mb-4 text-center text-4xl md:text-5xl lg:text-6xl" style={{ color: '#302c2c' }}>
        Designed for <span style={{ color: '#0E0E55' }}>Frequent Gifters</span>
      </h1>
      <p className="text-center text-lg md:text-xl text-gray-600 mb-12 max-w-3xl" style={{ color: '#302c2c' }}>
        Our gifting platform features make recurrent gifting as simple as clicking a button. We take care of the planning, sourcing, customizing, budgeting, storing, and logistics so you can focus on appreciation.
      </p>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <Card key={index} icon={card.icon} title={card.title} description={card.description} index={index} />
        ))}
      </div>
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => router.push('/contact')}
          className="px-8 py-3 rounded-full border bg-white text-[#0E0E55] border-[#0E0E55] transition-all duration-300 hover:bg-[#0E0E55] hover:text-white"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default GiftPlatform;