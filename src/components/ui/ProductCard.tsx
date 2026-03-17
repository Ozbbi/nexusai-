"use client";

import Link from "next/link";
import { Star, Download, ArrowUpRight } from "lucide-react";
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
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 relative">
          {/* Gradient header */}
          <div className={`h-36 bg-gradient-to-br ${product.gradient} p-5 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
            <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5" />

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14a4 4 0 0 0-8 0v4a4 4 0 0 0 8 0v-4z" />
                <line x1="12" y1="10" x2="12" y2="14" />
              </svg>
            </div>

            {/* Arrow on hover */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-heading font-bold text-[#0f172a] text-base mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-[#94a3b8] mb-3">
              by {creatorNames[product.creator_id] || "Unknown Creator"}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-[#64748b] border border-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[#0f172a] font-semibold">{product.rating}</span>
                </span>
                <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                  <Download className="w-3 h-3" />
                  {formatNumber(product.download_count)}
                </span>
              </div>
              <span
                className={`text-sm font-bold ${
                  product.price === 0
                    ? "text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs"
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
