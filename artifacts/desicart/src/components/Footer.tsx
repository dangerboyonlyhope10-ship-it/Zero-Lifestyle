import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="font-bold text-2xl tracking-tighter text-black block mb-4">
              DesiCart
            </Link>
            <p className="text-sm text-gray-600 mb-6">
              Pakistan's premium lifestyle tech brand. Bringing you the best in smart wear and audio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black hover:text-primary hover:shadow-md transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black hover:text-primary hover:shadow-md transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-black hover:text-primary hover:shadow-md transition-all">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/category/smart-watches" className="text-gray-600 hover:text-primary text-sm">Smart Watches</Link></li>
              <li><Link href="/category/earbuds" className="text-gray-600 hover:text-primary text-sm">Wireless Earbuds</Link></li>
              <li><Link href="/category/headphones" className="text-gray-600 hover:text-primary text-sm">Headphones</Link></li>
              <li><Link href="/category/speakers" className="text-gray-600 hover:text-primary text-sm">Bluetooth Speakers</Link></li>
              <li><Link href="/category/new-arrivals" className="text-gray-600 hover:text-primary text-sm">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">Warranty</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary text-sm">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex flex-col">
                <span className="font-semibold text-black mb-1">WhatsApp</span>
                <a href="https://wa.me/923265677778" target="_blank" rel="noreferrer" className="hover:text-primary">0326-5677778</a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-black mb-1">Email</span>
                <a href="mailto:hello@desicart.pk" className="hover:text-primary">hello@desicart.pk</a>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold text-black mb-1">Address</span>
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 DesiCart. Powered by passion.</p>
          <div className="flex gap-4">
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
            <div className="h-8 w-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
