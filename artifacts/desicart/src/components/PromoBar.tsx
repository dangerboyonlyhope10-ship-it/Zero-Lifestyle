import { useSite } from "@/lib/SiteContext";

export function PromoBar() {
  const { promoMessages } = useSite();
  // Repeat enough times to fill the marquee width
  const repeated = Array.from({ length: 6 }, (_, i) => promoMessages[i % promoMessages.length]);

  return (
    <div className="w-full bg-[#16a34a] text-white text-xs font-medium py-2 overflow-hidden whitespace-nowrap relative z-50">
      <div className="animate-[marquee_25s_linear_infinite] inline-block">
        {repeated.map((msg, i) => (
          <span key={i} className="mx-4">
            {msg}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
