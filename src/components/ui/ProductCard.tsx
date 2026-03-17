"use client";

import Link from "next/link";
import { Star, Download, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatNumber, formatPrice } from "@/lib/utils";
import { creatorNames } from "@/lib/mock-data";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/store/${product.slug}`}>
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-transparent">
          <div className={`h-36 bg-gradient-to-br ${product.gradient} p-5 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-heading font-bold text-[#0f172a] text-lg mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-[#94a3b8] mb-3">
              {creatorNames[product.creator_id] || "Unknown Creator"}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f1f5f9] text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[#0f172a] font-medium">{product.rating}</span>
                </span>
                <span className="flex items-center gap-1 text-sm text-[#94a3b8]">
                  <Download className="w-3.5 h-3.5" />
                  {formatNumber(product.download_count)}
                </span>
              </div>
              <span
                className={`text-sm font-bold ${
                  product.price === 0
                    ? "text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                    : "text-[#0f172a]"
                }`}
              >
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
