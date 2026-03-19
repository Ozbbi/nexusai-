"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Pin, Plus } from "lucide-react";
import Link from "next/link";
import { getPosts } from "@/lib/supabase";
import { getTimeAgo } from "@/lib/utils";
import { Post } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const categoryTabs = ["All", "General", "Tips & Tricks", "Showcase", "Help", "Feature Requests"];

const categoryColors: Record<string, string> = {
  general: "bg-blue-100 text-blue-600",
  tips: "bg-amber-100 text-amber-600",
  showcase: "bg-purple-100 text-purple-600",
  help: "bg-red-100 text-red-600",
  "feature-requests": "bg-emerald-100 text-emerald-600",
};

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]));
  }, []);

  const filtered = activeTab === "All"
    ? posts
    : posts.filter((p) => p.category === activeTab.toLowerCase().replace(/ & /g, "").replace(/ /g, "-"));

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#0f172a] mb-2">Community</h1>
            <p className="text-[#475569]">Connect with AI creators and enthusiasts</p>
          </div>
          <Link
            href={user ? "/community" : "/login"}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
          >
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white text-[#475569] border border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {post.author?.full_name?.charAt(0) || "?"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {post.pinned && (
                      <Pin className="w-3.5 h-3.5 text-primary fill-primary" />
                    )}
                    <h3 className="font-heading font-bold text-[#0f172a] text-base truncate">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#94a3b8]">
                    <span className="text-[#475569] font-medium">{post.author?.full_name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                    <span>{getTimeAgo(post.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0 text-xs text-[#94a3b8]">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> {post.upvotes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> {post.reply_count}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
