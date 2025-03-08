"use client"; // Mark as a Client Component

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const reviews = [
  {
    name: 'Priya',
    review: 'I was skeptical about online gifting platforms, but this exceeded my expectations. The personalized options and timely delivery won me over!',
    image: '/images/girl.avif',
  },
  {
    name: 'Rahul ',
    review: 'Used it for our company’s employee appreciation program. The bulk ordering system is a lifesaver, though tracking could be a bit smoother.',
    image: '/images/boy.avif',
  },
  {
    name: 'Anjali M',
    review: 'The corporate gifting options are fantastic! We used it for Diwali gifts, and our clients loved the thoughtful choices. Highly recommend!',
    image: '/images/girl2.avif',
  },
  {
    name: 'Vikram R',
    review: 'Great platform for corporate gifting. The team was very responsive, and the gifts were delivered on time. Perfect for our annual client appreciation event.',
    image: '/images/boy2.webp',
  },
  {
    name: 'Neha ',
    review: 'We used this service for our year-end employee rewards. The customization options made it easy to add a personal touch. Everyone loved their gifts!',
    image: '/images/girl3.webp',
  },
  {
    name: 'Arjun P',
    review: 'Excellent service! The platform is user-friendly, and the gifts are high-quality. Our clients were thrilled with the Diwali hampers.',
    image: '/images/boy3.webp',
  },
  {
    name: 'Sneha T',
    review: 'The best corporate gifting platform we’ve used. The gifts are unique, and the delivery is always on time. Perfect for our corporate events.',
    image: '/images/girl4.png',
  },
  {
    name: 'Rajesh',
    review: 'We’ve been using this service for years for our corporate gifting needs. The quality and service are consistently excellent.',
    image: '/images/oldman.avif',
  },
];

const clientLogos = [
  '/images/Equal-experts.webp',
  '/images/TaeguTec.png',
  '/images/zeno.png',
  '/images/transNeuron.gif',
  '/images/relics.png',
];

interface ReviewCardProps {
  name: string;
  review: string;
  image: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 mx-8 w-[320px] min-h-[200px]" style={{ borderRadius: '15px' }}>
      <div className="flex items-center mb-4">
        <Image
          src={image}
          alt={`${name}'s profile`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-[#0E0E55]"
        />
        <h3 className="font-bold text-lg" style={{ color: '#302c2c' }}>
          {name}
        </h3>
      </div>
      <p className="text-gray-600 text-sm" style={{ color: '#302c2c' }}>
        &quot;{review}&quot;
      </p>
    </div>
  );
};

const Reviews: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: '-100%',
        transition: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 25,
          ease: 'linear',
        },
      });
    }
  }, [isInView, controls]);

  const handleAnimationUpdate = (latest: { x: string | number }) => {
    if (typeof latest.x === 'string') {
      setCurrentX(parseFloat(latest.x));
    } else {
      setCurrentX(latest.x);
    }
  };

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    controls.start({
      x: [currentX, '-100%'],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 60,
        ease: 'linear',
      },
    });
  };

  return (
    <div className="py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8" style={{ color: '#302c2c' }}>
            Trusted by Leading Companies
          </h2>
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
            >
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 mx-6" style={{ width: '150px', height: '80px' }}>
                  <Image
                    src={logo}
                    alt={`Client logo ${index + 1}`}
                    width={150}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#302c2c' }}>
          What Our Customers Say
        </h2>
        <div className="overflow-hidden py-8" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <motion.div
            className="flex gap-1"
            initial={{ x: '0%' }}
            animate={controls}
            onUpdate={handleAnimationUpdate}
            style={{ width: `${reviews.length * 40}%` }}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <ReviewCard key={index} name={review.name} review={review.review} image={review.image} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;