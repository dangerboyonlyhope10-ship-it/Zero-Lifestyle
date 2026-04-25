import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/lib/CartContext";
import { useSite, PaymentLabel } from "@/lib/SiteContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Truck,
  Smartphone,
  Wallet,
  Building2,
  BadgePercent,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const WHATSAPP_NUMBER = "923265677778";
const ONLINE_DISCOUNT_RATE = 0.05;

type PaymentMethod = "cod" | "jazzcash" | "easypaisa" | "bank";

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  online: boolean;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives",
    icon: Truck,
    online: false,
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    description: "Mobile wallet — instant payment",
    icon: Smartphone,
    online: true,
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    description: "Mobile wallet — instant payment",
    icon: Wallet,
    online: true,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    description: "Direct transfer from any Pakistani bank",
    icon: Building2,
    online: true,
  },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useSite();
  const [, setLocation] = useLocation();
  const [savedOrderId, setSavedOrderId] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  if (items.length === 0 && !isSuccess) {
    setLocation("/cart");
    return null;
  }

  const selectedPayment = paymentOptions.find((p) => p.id === payment)!;
  const isOnlinePayment = selectedPayment.online;
  const onlineDiscount = isOnlinePayment ? Math.round(subtotal * ONLINE_DISCOUNT_RATE) : 0;
  const total = subtotal - onlineDiscount;

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, "");
    return /^(\+?92|0)?3\d{9}$/.test(cleaned);
  };

  const buildWhatsAppMessage = (orderId: string) => {
    const lines: string[] = [];
    lines.push("Hello DesiCart, I want to place a new order.");
    lines.push("");
    lines.push(`Order ID: ${orderId}`);
    lines.push("");
    lines.push("Customer Details:");
    lines.push(`Name: ${formData.fullName}`);
    lines.push(`Phone: ${formData.phone}`);
    lines.push(`City: ${formData.city}`);
    lines.push(`Address: ${formData.address}`);
    if (formData.notes.trim()) {
      lines.push(`Notes: ${formData.notes.trim()}`);
    }
    lines.push("");
    lines.push("Items:");
    items.forEach((item, i) => {
      const lineTotal = item.product.price * item.quantity;
      lines.push(
        `${i + 1}. ${item.product.name} x ${item.quantity} = PKR ${lineTotal.toLocaleString()}`,
      );
    });
    lines.push("");
    lines.push(`Subtotal: PKR ${subtotal.toLocaleString()}`);
    lines.push(`Delivery: FREE`);
    if (isOnlinePayment) {
      lines.push(`Online Payment Discount (5%): -PKR ${onlineDiscount.toLocaleString()}`);
    }
    lines.push(`Total Payable: PKR ${total.toLocaleString()}`);
    lines.push("");
    lines.push(`Payment Method: ${selectedPayment.label}`);
    if (payment === "jazzcash") {
      lines.push("Please share JazzCash payment details.");
    } else if (payment === "easypaisa") {
      lines.push("Please share EasyPaisa payment details.");
    } else if (payment === "bank") {
      lines.push("Please share bank account details for transfer.");
    }
    lines.push("");
    lines.push("Thank you!");
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.address.trim()) {
      setError("Please fill all required details before placing order.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid Pakistani phone number (e.g. 03XX XXXXXXX).");
      return;
    }

    setIsPlacing(true);

    const orderId = `DC-${Date.now().toString().slice(-8)}`;
    const message = buildWhatsAppMessage(orderId);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab — must happen synchronously to avoid popup blockers
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Save the order to the admin order book
    addOrder({
      id: orderId,
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim() || undefined,
      },
      items: items.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        image: it.product.images[0],
        price: it.product.price,
        quantity: it.quantity,
        lineTotal: it.product.price * it.quantity,
      })),
      subtotal,
      onlineDiscount,
      total,
      paymentMethod: selectedPayment.label as PaymentLabel,
    });

    setSavedOrderId(orderId);

    // Show confirmation animation, then clear cart
    setTimeout(() => {
      setIsSuccess(true);
      setIsPlacing(false);
      setTimeout(() => clearCart(), 200);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white max-w-md w-full p-8 md:p-12 rounded-3xl shadow-xl text-center border"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-3xl font-bold mb-3 text-gray-900"
          >
            Order Placed Successfully
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-gray-600 mb-2"
          >
            Your order has been sent to our WhatsApp team.
          </motion.p>
          {savedOrderId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 inline-block mb-2"
            >
              <span className="text-xs text-gray-500 mr-2">Order ID:</span>
              <span className="font-mono font-bold text-sm text-black">{savedOrderId}</span>
            </motion.div>
          )}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-gray-500 text-sm mb-8"
          >
            We will contact you shortly on <span className="font-semibold text-black">{formData.phone}</span> to confirm your order.
          </motion.p>
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
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">Complete your order in a few easy steps</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="lg:w-2/3 space-y-6">
            {/* Delivery details */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Delivery Details</h2>
              </div>

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

              <form onSubmit={handleSubmit} className="space-y-5" id="checkout-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl"
                    placeholder="Karachi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="min-h-[110px] bg-gray-50 border-gray-200 focus:bg-white rounded-xl resize-none p-4"
                    placeholder="House No, Street, Area, Landmark..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-gray-700">Order Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="min-h-[70px] bg-gray-50 border-gray-200 focus:bg-white rounded-xl resize-none p-4"
                    placeholder="e.g. Please deliver after 5 PM"
                  />
                </div>
              </form>
            </div>

            {/* Payment method */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Payment Method</h2>
              </div>
              <p className="text-sm text-gray-500 mb-6 ml-12">
                <BadgePercent className="w-4 h-4 inline-block mr-1 -mt-0.5 text-green-600" />
                <span className="text-green-700 font-semibold">Save 5%</span> when you pay online
              </p>

              <div className="grid gap-3">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = payment === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setPayment(option.id)}
                      className={`group relative text-left flex items-center gap-4 p-4 md:p-5 rounded-2xl border-2 transition-all ${
                        selected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          selected ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-base text-black">{option.label}</span>
                          {option.online && (
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              -5% Off
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selected ? "border-primary bg-primary" : "border-gray-300"
                        }`}
                      >
                        {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isOnlinePayment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900 leading-relaxed">
                        After placing your order, our team will share the {selectedPayment.label} account details on WhatsApp. Once we verify your payment, your order will be dispatched.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-[260px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg p-1 flex-shrink-0 relative">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.product.name}</h4>
                      <p className="text-gray-500 text-xs">PKR {item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="font-bold text-sm whitespace-nowrap">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2.5 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                <AnimatePresence>
                  {isOnlinePayment && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-green-700 overflow-hidden"
                    >
                      <span className="flex items-center gap-1">
                        <BadgePercent className="w-4 h-4" />
                        Online Discount (5%)
                      </span>
                      <span className="font-semibold">- Rs. {onlineDiscount.toLocaleString()}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">Rs. {total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">Including all taxes</p>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isPlacing}
                className="w-full h-14 rounded-full text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {isPlacing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>Place Order via WhatsApp</>
                )}
              </Button>

              <p className="text-[11px] text-center text-gray-500 mt-3 leading-relaxed">
                By placing your order you agree to our terms.<br />
                You will be redirected to WhatsApp to confirm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
