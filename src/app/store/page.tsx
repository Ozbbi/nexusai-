"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { mockProducts, categories } from "@/lib/mock-data";

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = useMemo(() => {
    let results = [...mockProducts];

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
  }, [search, category, sort, freeOnly]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-heading font-bold text-[#0f172a] mb-4">
            AI Store
          </h1>
          <p className="text-lg text-[#475569]">
            Discover the best AI tools built by creators worldwide
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search 500+ AI tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base shadow-sm"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-primary text-white"
                  : "bg-white text-[#475569] border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-[#475569] focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="top-rated">Top Rated</option>
            </select>

            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                freeOnly
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-white text-[#475569] border border-gray-200 hover:border-emerald-300"
              }`}
            >
              FREE
            </button>
          </div>

          <span className="text-sm text-[#94a3b8]">
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
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#94a3b8]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-2">No results found</h3>
            <p className="text-sm text-[#475569]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
