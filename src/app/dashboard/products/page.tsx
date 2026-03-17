"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Star, Download, DollarSign, Brain } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function MyProductsPage() {
  const myProducts = mockProducts.slice(0, 4).map((p, i) => ({
    ...p,
    status: i === 0 ? "published" : i === 1 ? "published" : i === 2 ? "review" : "draft",
    revenue: Math.floor(Math.random() * 5000) + 500,
  }));

  const statusColors: Record<string, string> = {
    published: "bg-emerald-500/10 text-emerald-400",
    review: "bg-amber-500/10 text-amber-400",
    draft: "bg-white/[0.06] text-white/40",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">My Products</h1>
        <Link
          href="/publish"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Publish New AI
        </Link>
      </div>

      <div className="space-y-3">
        {myProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 hover:border-white/[0.1] transition-all"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center flex-shrink-0`}>
              <Brain className="w-6 h-6 text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-heading font-bold text-white truncate">{product.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${statusColors[product.status]}`}>
                  {product.status === "review" ? "In Review" : product.status}
                </span>
              </div>
              <p className="text-xs text-white/40 truncate">{product.tagline}</p>
            </div>
            <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <Download className="w-3.5 h-3.5 text-white/40" />
                  {formatNumber(product.download_count)}
                </div>
                <div className="text-xs text-white/30">Downloads</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <DollarSign className="w-3.5 h-3.5 text-white/40" />
                  {product.revenue.toLocaleString()}
                </div>
                <div className="text-xs text-white/30">Revenue</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {product.rating}
                </div>
                <div className="text-xs text-white/30">Rating</div>
              </div>
            </div>
            <Link
              href={`/store/${product.slug}`}
              className="text-xs text-primary hover:text-primary/80 font-medium flex-shrink-0"
            >
              View
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
