import { Link } from "wouter";
import { Product } from "@/data/products";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-gray-50 rounded-xl overflow-hidden relative mb-4">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.badge === "Sale" && (
            <span className="bg-[#FF0000] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              Sale
            </span>
          )}
          {product.badge === "New" && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              New
            </span>
          )}
          {product.badge === "Bestseller" && (
            <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
              Best Seller
            </span>
          )}
        </div>
        
        {/* Discount Tag */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-black/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              -{product.discountPercent}%
            </span>
          </div>
        )}

        <div className="aspect-square bg-gray-100 flex items-center justify-center p-4 group-hover:bg-gray-200 transition-colors">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      <div className="px-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        
        <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="font-bold text-primary text-sm md:text-base">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs md:text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
