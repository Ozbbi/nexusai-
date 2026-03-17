"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Download,
  Heart,
  Brain,
  ArrowLeft,
  Globe,
  Key,
  Zap,
  Clock,
  Shield,
  Tag,
  Copy,
  Check,
} from "lucide-react";
import { mockProducts, creatorNames, mockReviews } from "@/lib/mock-data";
import { formatNumber, formatPrice, getTimeAgo } from "@/lib/utils";
import toast from "react-hot-toast";

const tabs = ["Overview", "Documentation", "Reviews", "Changelog"];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [copied, setCopied] = useState(false);

  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h1 className="text-2xl font-heading font-bold text-[#0f172a] mb-4">Product not found</h1>
        <Link href="/store" className="text-primary hover:text-primary-hover font-medium">
          &larr; Back to Store
        </Link>
      </div>
    );
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWishlist = () => {
    toast.success(`Added ${product.name} to wishlist`);
  };

  const handleInstall = () => {
    if (product.price === 0) {
      toast.success(`${product.name} installed successfully!`);
    } else {
      toast.success(`Redirecting to checkout for ${product.name}...`);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl bg-gradient-to-br ${product.gradient} p-8 sm:p-12 mb-8 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                  {product.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                  {product.category}
                </span>
              </div>
              <p className="text-white/80 text-lg mb-4">{product.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1 text-white">
                  <Star className="w-4 h-4 fill-white" />
                  <strong>{product.rating}</strong>
                  <span className="text-white/60">({mockReviews.length} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-white/70">
                  <Download className="w-4 h-4" /> {formatNumber(product.download_count)} downloads
                </span>
                <span className="text-white/60 text-sm">
                  by{" "}
                  <span className="text-white font-medium">
                    {creatorNames[product.creator_id]}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <button
                onClick={handleInstall}
                className="bg-white text-[#0f172a] font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] text-base shadow-lg"
              >
                {product.price === 0 ? "Install Free" : `Buy ${formatPrice(product.price)}`}
              </button>
              <button
                onClick={handleWishlist}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Heart className="w-4 h-4" /> Add to Wishlist
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "text-[#475569] hover:text-[#0f172a] hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8"
            >
              {activeTab === "Overview" && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#0f172a] mb-4">About</h2>
                  <p className="text-[#475569] leading-relaxed mb-8">{product.description}</p>

                  <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-3 text-sm text-[#475569]">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: product.accent_color }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-[#f1f5f9] text-sm text-[#475569]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Documentation" && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#0f172a] mb-4">API Documentation</h2>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#0f172a] mb-2">Endpoint</h3>
                    <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-lg px-4 py-3">
                      <code className="text-sm font-mono text-primary flex-1">{product.api_endpoint}</code>
                      <button onClick={() => handleCopy(product.api_endpoint)} className="text-[#94a3b8] hover:text-primary">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#0f172a] mb-2">Authentication</h3>
                    <p className="text-sm text-[#475569]">
                      This API uses <strong>{product.auth_type === "api_key" ? "API Key" : "OAuth 2.0"}</strong> authentication.
                      Include your API key in the request headers.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-[#0f172a] mb-2">Example Request</h3>
                    <div className="bg-[#0f172a] rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm font-mono text-emerald-400">
{`curl -X POST ${product.api_endpoint} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "Hello, world!"}'`}
                      </pre>
                    </div>
                  </div>

                  {product.websocket_support && (
                    <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-3 rounded-lg">
                      <Zap className="w-4 h-4" /> WebSocket streaming is supported
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-bold text-[#0f172a]">Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#0f172a]">{product.rating}</span>
                      <span className="text-sm text-[#94a3b8]">({mockReviews.length} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">
                                {review.user?.full_name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#0f172a]">{review.user?.full_name}</div>
                              <div className="text-xs text-[#94a3b8]">{getTimeAgo(review.created_at)}</div>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-3.5 h-3.5 ${
                                  j < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#475569] leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Changelog" && (
                <div>
                  <h2 className="text-xl font-heading font-bold text-[#0f172a] mb-6">Changelog</h2>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#0f172a]">v{product.version}</span>
                        <span className="text-xs text-[#94a3b8]">{getTimeAgo(product.updated_at)}</span>
                      </div>
                      <ul className="text-sm text-[#475569] space-y-1">
                        <li>- Performance improvements and bug fixes</li>
                        <li>- Updated API response format</li>
                        <li>- Added new configuration options</li>
                      </ul>
                    </div>
                    <div className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#0f172a]">v{(parseFloat(product.version) - 0.1).toFixed(1)}.0</span>
                        <span className="text-xs text-[#94a3b8]">2mo ago</span>
                      </div>
                      <ul className="text-sm text-[#475569] space-y-1">
                        <li>- Major feature release</li>
                        <li>- Improved accuracy and speed</li>
                        <li>- New SDK support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#94a3b8] uppercase tracking-wider mb-4">Creator</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {(creatorNames[product.creator_id] || "U").charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-bold text-[#0f172a]">
                    {creatorNames[product.creator_id]}
                  </div>
                  <div className="text-xs text-[#94a3b8]">Creator</div>
                </div>
              </div>
              <p className="text-sm text-[#475569] mb-4">
                Building AI tools for the future. Passionate about making technology accessible.
              </p>
              <div className="text-xs text-[#94a3b8]">
                {Math.floor(Math.random() * 5) + 1} products on NexusAI
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#94a3b8] uppercase tracking-wider mb-4">Details</h3>
              <div className="space-y-4">
                {[
                  { icon: Tag, label: "Version", value: product.version },
                  { icon: Clock, label: "Updated", value: getTimeAgo(product.updated_at) },
                  { icon: Shield, label: "License", value: product.license },
                  { icon: Key, label: "Auth", value: product.auth_type === "api_key" ? "API Key" : "OAuth" },
                  { icon: Globe, label: "API Type", value: product.websocket_support ? "REST + WebSocket" : "REST" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-[#475569]">
                      <Icon className="w-4 h-4 text-[#94a3b8]" /> {label}
                    </span>
                    <span className="text-sm font-medium text-[#0f172a] capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
