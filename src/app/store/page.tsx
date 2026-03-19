"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { categories } from "@/lib/mock-data";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types";

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [freeOnly, setFreeOnly] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]));
  }, []);

  const filtered = useMemo(() => {
    let results = [...products];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "All") {
      results = results.filter((p) => p.category === category);
    }

    if (freeOnly) {
      results = results.filter((p) => p.price === 0);
    }

    switch (sort) {
      case "newest":
        results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "top-rated":
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        results.sort((a, b) => b.download_count - a.download_count);
    }

    return results;
  }, [search, category, sort, freeOnly, products]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            500+ AI tools available
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">
            AI Store
          </h1>
          <p className="text-lg text-[#64748b] max-w-lg mx-auto">
            Discover the best AI tools built by creators worldwide
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8] group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search AI tools, models, agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-white text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/10 text-base transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-white text-[#475569] border border-gray-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[#475569] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>

          </div>

          <span className="text-sm text-[#94a3b8] font-medium">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <Search className="w-8 h-8 text-[#94a3b8]" />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-2">No results found</h3>
            <p className="text-sm text-[#64748b] mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setFreeOnly(false); }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 px-5 py-2 rounded-xl hover:bg-indigo-50 transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
