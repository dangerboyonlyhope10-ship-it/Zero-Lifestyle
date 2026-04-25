import { Link } from "wouter";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left font-bold text-2xl tracking-tighter">DesiCart</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium py-2 border-b">Home</Link>
                <Link href="/category/smart-watches" className="text-lg font-medium py-2 border-b">Smart Watches</Link>
                <Link href="/category/earbuds" className="text-lg font-medium py-2 border-b">Earbuds</Link>
                <Link href="/category/headphones" className="text-lg font-medium py-2 border-b">Headphones</Link>
                <Link href="/category/speakers" className="text-lg font-medium py-2 border-b">Speakers</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link href="/" className="font-bold text-2xl tracking-tighter text-black">
            DesiCart
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 mx-8">
          <Link href="/category/smart-watches" className="text-sm font-medium hover:text-primary transition-colors">Smart Watches</Link>
          <Link href="/category/earbuds" className="text-sm font-medium hover:text-primary transition-colors">Earbuds</Link>
          <Link href="/category/headphones" className="text-sm font-medium hover:text-primary transition-colors">Headphones</Link>
          <Link href="/category/speakers" className="text-sm font-medium hover:text-primary transition-colors">Speakers</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-black">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-black">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
