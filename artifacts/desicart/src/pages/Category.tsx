import { useParams, Link } from "wouter";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Category() {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("recommended");

  let categoryProducts = products;
  let categoryTitle = "All Products";

  if (slug && slug !== "all") {
    const formattedSlug = slug.replace(/-/g, " ").toLowerCase();
    categoryProducts = products.filter(
      (p) => p.category.toLowerCase() === formattedSlug
    );
    categoryTitle = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  // Sort logic
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return b.badge === "New" ? 1 : -1;
    return 0; // recommended
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{categoryTitle}</h1>
          <p className="text-gray-500 mt-2">{sortedProducts.length} Products</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Recommended" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-6">No products found in this category.</p>
          <Link href="/">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
