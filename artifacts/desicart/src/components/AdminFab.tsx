import { useLocation } from "wouter";
import { AtSign } from "lucide-react";

export function AdminFab() {
  const [location, setLocation] = useLocation();

  // Hide on the admin page itself
  if (location.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      onClick={() => setLocation("/admin")}
      aria-label="Admin"
      title="Admin"
      className="fixed bottom-3 right-3 z-40 w-7 h-7 rounded-full bg-black/10 hover:bg-black/40 text-white/60 hover:text-white flex items-center justify-center transition-all opacity-40 hover:opacity-100 backdrop-blur-sm"
    >
      <AtSign className="w-3.5 h-3.5" />
    </button>
  );
}
