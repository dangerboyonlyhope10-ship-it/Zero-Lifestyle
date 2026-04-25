import { Link } from "wouter";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const categories = [
  { name: "Smart Watches", image: "/images/smartwatch-1.png", slug: "smart-watches" },
  { name: "Earbuds", image: "/images/earbuds-1.png", slug: "earbuds" },
  { name: "Headphones", image: "/images/headphones-1.png", slug: "headphones" },
  { name: "Speakers", image: "/images/speaker-1.png", slug: "speakers" },
];

const testimonials = [
  {
    name: "Ali Khan",
    city: "Karachi",
    rating: 5,
    text: "The Opal Pro earbuds are incredible. Best ANC I've used in this price range. Delivery was super fast too!"
  },
  {
    name: "Sarah Ahmed",
    city: "Lahore",
    rating: 5,
    text: "Ordered the Lyf Smartwatch for my brother. Looks premium and the battery life is exactly as advertised."
  },
  {
    name: "Omer Tariq",
    city: "Islamabad",
    rating: 5,
    text: "Bass Pro Speaker lives up to its name. Fills the whole room. Extremely satisfied with DesiCart's service."
  }
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const bestSellers = products.filter(p => p.badge === "Bestseller" || p.rating >= 4.8).slice(0, 4);
  const newArrivals = products.filter(p => p.badge === "New" || p.category === "Headphones").slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] bg-[#fdfaf5] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffe4c4]/50 to-transparent z-0 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between h-full pt-8 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 text-center md:text-left z-20"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">New Launch</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-4 leading-tight">
              Opal Pro<br />Earbuds
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-md mx-auto md:mx-0">
              Silence the noise. Amplify the music. Experience 40 hours of pure, uninterrupted audio.
            </p>
            <Link href="/product/opal-pro-earbuds">
              <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-white">
                Shop Now
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 h-[300px] md:h-[500px] relative mt-8 md:mt-0"
          >
            <img 
              src="/images/hero-earbuds.png" 
              alt="Opal Pro Earbuds" 
              className="w-full h-full object-contain mix-blend-multiply"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-12 justify-start md:justify-center px-4 snap-x">
            {categories.map((category) => (
              <Link key={category.name} href={`/category/${category.slug}`} className="flex flex-col items-center gap-3 min-w-[80px] snap-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center p-4 border border-gray-100 group-hover:border-primary transition-colors">
                  <img src={category.image} alt={category.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium text-center whitespace-nowrap">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Trending Now</h2>
            <Link href="/category/all" className="text-primary font-medium hover:underline text-sm md:text-base">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-3xl overflow-hidden flex flex-col md:flex-row relative">
            <div className="p-8 md:p-16 flex flex-col justify-center md:w-1/2 z-10 text-white">
              <span className="text-red-500 font-bold uppercase tracking-wider text-sm mb-2">Limited Time</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Titan Smartwatch</h2>
              <p className="text-gray-400 mb-8 max-w-sm">
                Premium titanium finish with advanced health tracking. Your perfect workout companion.
              </p>
              <Link href="/product/titan-smartwatch">
                <Button className="rounded-full bg-white text-black hover:bg-gray-200 w-fit px-8">
                  Discover Titan
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 h-[300px] md:h-auto bg-gradient-to-tr from-gray-900 to-black relative">
              <img 
                src="/images/smartwatch-1.png" 
                alt="Titan Smartwatch" 
                className="absolute inset-0 w-full h-full object-contain p-8 md:scale-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-center">New Arrivals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#fdfaf5]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 flex-1 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-bold text-black">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
