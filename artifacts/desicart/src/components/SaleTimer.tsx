import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { useSite } from "@/lib/SiteContext";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function SaleTimer() {
  const { sale } = useSite();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!sale.enabled) return null;

  const diff = Math.max(0, sale.endsAt - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const ended = diff <= 0;

  return (
    <section className="bg-gradient-to-r from-primary via-red-700 to-primary text-white">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Flame className="w-5 h-5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-sm md:text-base truncate">
              {ended ? "Sale Ended" : sale.title}
            </p>
            <p className="text-[11px] md:text-xs text-white/80 truncate">{sale.subtitle}</p>
          </div>
        </div>

        {!ended && (
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
            {[
              { label: "D", value: days },
              { label: "H", value: hours },
              { label: "M", value: minutes },
              { label: "S", value: seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-white/15 backdrop-blur-sm rounded-md px-2 py-1 min-w-[36px] md:min-w-[44px] text-center"
              >
                <div className="text-sm md:text-lg font-bold leading-tight">{pad(unit.value)}</div>
                <div className="text-[9px] md:text-[10px] text-white/70 uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
