import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-28 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgb(255, 241, 230), rgb(249, 250, 251))`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: '#302c2c' }} // Secondary color for heading
          >
            Crafting <span style={{ color: '#0E0E55' }}>Connections</span> That Matter
          </h1>
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#302c2c' }} // Secondary color for description
          >
            At Sri Sai Enterprises, we transform business relationships with premium gifts, innovative printing, 
            and cutting-edge tech solutions. Discover our story and how we make every moment count.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,80 70,80 100,100" fill="none" stroke="#f97316" strokeWidth="2" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
              <Image
                src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/group.jpg"
                alt="Our Team"
                className="w-full h-full object-cover"
                width={600}
                height={400}
              />
            </div>
            <div>
              <h2 
                className="text-3xl md:text-4xl font-semibold mb-6"
                style={{ color: '#0E0E55' }} // Secondary color for heading
              >
                Our Story
              </h2>
              <p 
                className="leading-relaxed mb-4"
                style={{ color: '#302c2c' }} // Secondary color for text
              >
                Founded in 2018, Sri Sai Enterprises emerged from a simple idea: to make business relationships more meaningful. 
                What started as a small venture crafting personalized gifts has grown into a trusted name offering premium 
                corporate gifting, state-of-the-art printing solutions, and innovative tech products across India.
              </p>
              <p 
                className="leading-relaxed"
                style={{ color: '#302c2c' }} // Secondary color for text
              >
                Our team of passionate creatives, designers, and tech enthusiasts works tirelessly to blend quality 
                craftsmanship with modern innovation, ensuring every product tells a story of appreciation and excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-semibold text-center mb-12"
            style={{ color: '#302c2c' }} // Secondary color for heading
          >
            What We Bring to the Table
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Corporate Gifting */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <Image
                src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/corporate_gifts.jpg"
                alt="Corporate Gifting"
                className="w-full h-56 object-cover"
                width={300}
                height={200}
              />
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#0E0E55' }} // Secondary color for heading
                >
                  Corporate Gifting
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#302c2c' }} // Secondary color for text
                >
                  Elevate your brand with our curated selection of premium gifts, perfect for clients, employees, 
                  and special occasions—crafted to leave a lasting impression.
                </p>
              </div>
            </div>

            {/* Printing Solutions */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <Image
                src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/printing.jpg"
                alt="Printing Solutions"
                className="w-full h-56 object-cover"
                width={300}
                height={200}
              />
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#0E0E55' }} // Secondary color for heading
                >
                  Printing Solutions
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#302c2c' }} // Secondary color for text
                >
                  From business cards to large-format banners, our advanced printing services deliver 
                  unparalleled quality and precision for all your branding needs.
                </p>
              </div>
            </div>

            {/* Tech & Gadgets */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <Image
                src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/tech&Gadgets.jpg"
                alt="Tech & Gadgets"
                className="w-full h-56 object-cover"
                width={300}
                height={200}
              />
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#0E0E55' }} // Secondary color for heading
                >
                  Tech & Gadgets
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#302c2c' }} // Secondary color for text
                >
                  Stay ahead with our innovative tech gadgets, designed to impress, enhance productivity, 
                  and keep your team connected in style.
                </p>
              </div>
            </div>

            {/* Electronic Items */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <Image
                src="https://wshuzhrqeawdphkftpoa.supabase.co/storage/v1/object/public/images/static/electronics.jpg"
                alt="Electronic Items"
                className="w-full h-56 object-cover"
                width={300}
                height={200}
              />
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ color: '#0E0E55' }} // Secondary color for heading
                >
                  Electronic Items
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#302c2c' }} // Secondary color for text
                >
                  Explore our range of high-quality electronics, blending functionality with modern design 
                  for every occasion, from gifting to corporate use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-orange-50 rounded-xl p-8 shadow-lg" style={{ marginBottom: '30px' }}>
          <h2 
            className="text-3xl md:text-4xl font-semibold text-center mb-10"
            style={{ color: '#302c2c' }} // Secondary color for heading
          >
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  style={{ color: '#f87c44' }} // Primary color for icon
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#302c2c' }} // Secondary color for heading
              >
                Unmatched Quality
              </h3>
              <p 
                className="text-sm"
                style={{ color: '#302c2c' }} // Secondary color for text
              >
                Every product undergoes strict quality checks to ensure excellence and durability that you can trust.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  style={{ color: '#f87c44' }} // Primary color for icon
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#302c2c' }} // Secondary color for heading
              >
                On-Time Delivery
              </h3>
              <p 
                className="text-sm"
                style={{ color: '#302c2c' }} // Secondary color for text
              >
                We pride ourselves on punctuality, ensuring your orders arrive exactly when you need them.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  style={{ color: '#f87c44' }} // Primary color for icon
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#302c2c' }} // Secondary color for heading
              >
                Personalized Service
              </h3>
              <p 
                className="text-sm"
                style={{ color: '#302c2c' }} // Secondary color for text
              >
                Our dedicated team tailors solutions to your unique needs, ensuring complete satisfaction.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 
            className="text-3xl md:text-4xl font-semibold text-center mb-12"
            style={{ color: '#302c2c' }} // Secondary color for heading
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#0E0E55' }} // Secondary color for heading
              >
                Innovation
              </h3>
              <p style={{ color: '#302c2c' }}>
                We constantly push boundaries to bring you the latest in gifting and technology, keeping your brand ahead of the curve.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#0E0E55' }} // Secondary color for heading
              >
                Integrity
              </h3>
              <p style={{ color: '#302c2c' }}>
                Transparency and honesty guide our relationships with clients, delivering on promises every time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#0E0E55' }} // Secondary color for heading
              >
                Sustainability
              </h3>
              <p style={{ color: '#302c2c' }}>
                We’re committed to eco-friendly practices, offering sustainable options that benefit both business and the planet.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#0E0E55' }} // Secondary color for heading
              >
                Excellence
              </h3>
              <p style={{ color: '#302c2c' }}>
                From product quality to customer service, we strive for excellence in everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16 text-center bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-8 shadow-lg">
          <h2 
            className="text-3xl md:text-4xl font-semibold mb-6"
            style={{ color: '#0E0E55' }} // Secondary color for heading
          >
            Ready to Get Started?
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: '#302c2c' }} // Secondary color for text
          >
            Whether you need a single gift or a complete corporate solution, we’re here to help. 
            Let’s turn your ideas into reality.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#0E0E55] text-white rounded-full font-medium hover:bg-[#0e0e55e4] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Contact Us Today
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;