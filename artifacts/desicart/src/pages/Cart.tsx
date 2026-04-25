import { useCart } from "@/lib/CartContext";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trash2 className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Let's change that!
        </p>
        <Link href="/">
          <Button className="bg-primary text-white rounded-full px-8 py-6 h-auto text-lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-[#16a34a]/10 text-[#16a34a] p-4 rounded-xl font-bold mb-6 flex items-center gap-2">
            <span>🎉</span> Congratulations! You are eligible for FREE Delivery.
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.product.id} 
                className="flex gap-4 md:gap-6 border-b pb-6"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="font-bold text-lg hover:text-primary transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-primary font-bold mt-1 text-lg">Rs. {item.product.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-100 rounded-full border border-gray-200">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:text-primary transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 md:w-10 text-center font-bold text-sm md:text-base">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:text-primary transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <span className="font-bold text-lg hidden md:block">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-lg">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-black">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold text-primary">Rs. {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              onClick={() => setLocation("/checkout")}
              className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90 text-white mb-4 shadow-lg shadow-primary/30"
            >
              Proceed to Checkout
            </Button>
            
            <Link href="/" className="block text-center text-primary font-medium hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
