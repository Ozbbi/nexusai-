"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Brain, Star, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserWishlist, supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { formatPrice, formatNumber } from "@/lib/utils";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlisted, setWishlisted] = useState<{ id: string; product: Product }[]>([]);

  useEffect(() => {
    if (!user) return;
    getUserWishlist(user.id)
      .then((data) => setWishlisted(data || []))
      .catch(() => setWishlisted([]));
  }, [user]);

  const removeFromWishlist = async (wishlistId: string, productName: string) => {
    await supabase.from("wishlists").delete().eq("id", wishlistId);
    setWishlisted((prev) => prev.filter((w) => w.id !== wishlistId));
    toast.success(`Removed ${productName} from wishlist`);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Wishlist</h1>

      {wishlisted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {wishlisted.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden group hover:border-white/[0.1] transition-all"
            >
              <div className={`h-20 bg-gradient-to-br ${item.product.gradient} flex items-center justify-center relative`}>
                <Brain className="w-8 h-8 text-white/80" />
                <button
                  onClick={() => removeFromWishlist(item.id, item.product.name)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/40 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-white text-sm mb-1">{item.product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {item.product.rating} ({formatNumber(item.product.download_count)})
                  </span>
                  <span className={`text-xs font-bold ${item.product.price === 0 ? "text-emerald-400" : "text-white"}`}>
                    {formatPrice(item.product.price)}
                  </span>
                </div>
                <Link
                  href={`/store/${item.product.slug}`}
                  className="block text-center text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-lg transition-all"
                >
                  View Product
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-bold text-white mb-2">Your wishlist is empty</h3>
          <p className="text-sm text-white/40">Browse the store and save AIs you like</p>
        </div>
      )}
    </div>
  );
}
