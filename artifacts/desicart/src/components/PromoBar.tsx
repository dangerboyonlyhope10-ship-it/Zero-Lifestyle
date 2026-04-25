export function PromoBar() {
  return (
    <div className="w-full bg-[#16a34a] text-white text-xs font-medium py-2 overflow-hidden whitespace-nowrap relative z-50">
      <div className="animate-[marquee_20s_linear_infinite] inline-block">
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
        <span className="mx-4">Congratulations 🎉! FREE DELIVERY applied.</span>
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
