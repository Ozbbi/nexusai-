"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Zap, Key, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserPurchases } from "@/lib/supabase";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function DashboardLibrary() {
  const { user } = useAuth();
  const [installed, setInstalled] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserPurchases(user.id)
      .then((data) => setInstalled(data?.map((p: { product: Product }) => p.product).filter(Boolean) || []))
      .catch(() => setInstalled([]));
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">My Library</h1>

      {installed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {installed.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.1] transition-all group"
            >
              <div className={`h-24 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                <Brain className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <h3 className="font-heading font-bold text-white mb-1">{product.name}</h3>
                <p className="text-xs text-white/40 mb-4">{product.tagline}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.success(`Launching ${product.name}...`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-2 rounded-lg transition-all"
                  >
                    <Zap className="w-3.5 h-3.5" /> Launch
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("nxai_" + product.slug + "_xxxxx");
                      toast.success("API key copied!");
                    }}
                    className="flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 text-sm font-medium px-3 py-2 rounded-lg transition-all"
                  >
                    <Key className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white/20" />
          </div>
          <h3 className="text-lg font-heading font-bold text-white mb-2">No AIs installed yet</h3>
          <p className="text-sm text-white/40 mb-6">Browse the store to find your first AI</p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-lg"
          >
            <Store className="w-4 h-4" /> Browse Store
          </Link>
        </div>
      )}
    </div>
  );
}
