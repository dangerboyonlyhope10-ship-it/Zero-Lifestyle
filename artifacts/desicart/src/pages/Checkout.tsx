import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: ""
  });

  if (items.length === 0 && !isSuccess) {
    setLocation("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
      setError("Please fill all required details before placing order.");
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-md w-full p-8 md:p-12 rounded-3xl shadow-xl text-center border"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We will contact you shortly to confirm your order details.
          </p>
          <Button 
            onClick={() => setLocation("/")}
            className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90 text-white"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-100"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name *</Label>
                    <Input 
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                      placeholder="Ali Khan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                      placeholder="03XX XXXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-gray-700">City *</Label>
                  <Input 
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                    placeholder="Karachi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">Complete Address *</Label>
                  <Textarea 
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="min-h-[120px] bg-gray-50 border-gray-200 focus:bg-white rounded-xl resize-none p-4"
                    placeholder="House No, Street, Area..."
                  />
                </div>

                <Button type="submit" className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90 text-white mt-8 shadow-lg shadow-primary/20">
                  Place Order (Cash on Delivery)
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto hide-scrollbar">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex-shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-sm">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">Pay via Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
