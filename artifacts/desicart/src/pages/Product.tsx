import { useParams, useLocation } from "wouter";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, Check, Shield, Truck, Minus, Plus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCart } from "@/lib/CartContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Product() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  if (!product) {
    return <div className="p-20 text-center text-2xl font-bold">Product not found</div>;
  }

  const handleAddToCart = () => {
    addItem(product, qty);
    toast({
      title: "Added to Cart",
      description: `${qty} x ${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    setLocation("/checkout");
  };

  const getWhatsAppLink = () => {
    const text = `Hello, I want to order:\nProduct: ${product.name}\nQuantity: ${qty}\nTotal Price: PKR ${(product.price * qty).toLocaleString()}`;
    return `https://wa.me/923265677778?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="w-full">
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {product.images.map((img, idx) => (
                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative aspect-square">
                      <img 
                        src={img} 
                        alt={`${product.name} - Image ${idx + 1}`} 
                        className="w-full h-full object-contain mix-blend-multiply p-8"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider ${product.badge === 'Sale' ? 'bg-[#FF0000]' : 'bg-black'}`}>
                    {product.badge}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="bg-black/90 text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`w-20 h-20 rounded-xl bg-gray-50 flex-shrink-0 border-2 transition-colors overflow-hidden p-2
                    ${selectedIndex === idx ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-2 md:pt-8 pb-24 md:pb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">{product.reviewCount} Reviews</span>
              <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> In Stock
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:block">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-bold">Quantity</span>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-xl hover:text-primary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-xl hover:text-primary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-bold text-xl ml-auto">Total: Rs. {(product.price * qty).toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleAddToCart} variant="outline" className="h-14 rounded-full text-lg border-2 hover:bg-gray-50">
                  Add to Cart
                </Button>
                <Button onClick={handleBuyNow} className="h-14 rounded-full text-lg bg-primary hover:bg-primary/90 text-white">
                  Buy Now
                </Button>
                <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="col-span-2">
                  <Button className="w-full h-14 rounded-full text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white">
                    Order via WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 text-gray-600">
                <Truck className="w-6 h-6 text-primary" />
                <span className="font-medium">Free Delivery Across Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-medium">1 Year Official Warranty</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-gray-100 rounded-full">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-xl">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-xl">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-bold text-lg text-primary">Rs. {(product.price * qty).toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddToCart} variant="outline" className="flex-1 h-12 rounded-full border-2">
            Cart
          </Button>
          <Button onClick={handleBuyNow} className="flex-1 h-12 rounded-full bg-primary text-white">
            Buy
          </Button>
          <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="flex-1">
            <Button className="w-full h-12 rounded-full bg-[#25D366] text-white p-0">
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
