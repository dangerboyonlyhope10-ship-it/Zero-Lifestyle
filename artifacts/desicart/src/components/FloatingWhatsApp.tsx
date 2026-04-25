import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingWhatsApp() {
  const [location] = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  // Hide on checkout to keep focus on the order form
  const hidden = location.startsWith("/checkout");

  // Raise the button on product pages where a sticky bottom action bar exists on mobile
  const onProductPage = location.startsWith("/product/");
  const positionClass = onProductPage
    ? "bottom-28 md:bottom-6"
    : "bottom-6";

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 2500);
    const t2 = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [location]);

  if (hidden) return null;

  return (
    <div className={`fixed ${positionClass} right-4 md:right-6 z-50 flex items-end gap-2`}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 bg-white shadow-lg rounded-2xl pl-4 pr-2 py-2 mb-1 border border-gray-100"
          >
            <span className="text-sm font-medium text-gray-800">
              Need help? Chat on WhatsApp
            </span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/923265677778?text=Hello%20DesiCart%2C%20I%20need%20some%20help%20with%20my%20order."
        target="_blank"
        rel="noreferrer"
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="h-6 w-6 relative" />
      </a>
    </div>
  );
}
