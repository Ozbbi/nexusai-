"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { categories } from "@/lib/mock-data";
import toast from "react-hot-toast";

const stepLabels = ["Basic Info", "Description", "Pricing", "Technical", "Review"];

export default function PublishPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    category: "",
    tags: "",
    description: "",
    features: [""],
    price: "",
    isFree: false,
    apiEndpoint: "",
    docUrl: "",
    authType: "api_key",
    websocket: false,
  });

  const handleSubmit = () => {
    toast.success("AI submitted for review!");
    router.push("/dashboard/products");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-heading font-bold text-white mb-2">Publish New AI</h1>
        <p className="text-white/50 mb-8">Share your AI with the world</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-white/[0.06]"}`} />
              <span className={`text-xs mt-1.5 block ${i <= step ? "text-primary" : "text-white/30"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Name</label>
                <input
                  type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                  placeholder="My Awesome AI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Tagline</label>
                <input
                  type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                  placeholder="A short description of your AI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Category</label>
                <select
                  value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-primary text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Tags (comma separated)</label>
                <input
                  type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                  placeholder="e.g. NLP, Open Source, Real-time"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Description</label>
                <textarea
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm resize-none"
                  placeholder="Describe what your AI does, who it's for, and what makes it special..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Key Features</label>
                {form.features.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={f}
                      onChange={(e) => {
                        const newFeatures = [...form.features];
                        newFeatures[i] = e.target.value;
                        setForm({ ...form, features: newFeatures });
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                      placeholder={`Feature ${i + 1}`}
                    />
                    {form.features.length > 1 && (
                      <button
                        onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })}
                        className="text-white/30 hover:text-red-400 text-sm px-2"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setForm({ ...form, features: [...form.features, ""] })}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  + Add feature
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm({ ...form, isFree: !form.isFree })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.isFree ? "bg-emerald-500" : "bg-white/[0.1]"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isFree ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm text-white/60">Free product</span>
              </div>
              {!form.isFree && (
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1.5">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                    <input
                      type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                      placeholder="29.99" min="0" step="0.01"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">API Endpoint URL</label>
                <input
                  type="url" value={form.apiEndpoint} onChange={(e) => setForm({ ...form, apiEndpoint: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                  placeholder="https://api.yourservice.com/v1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Documentation URL</label>
                <input
                  type="url" value={form.docUrl} onChange={(e) => setForm({ ...form, docUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
                  placeholder="https://docs.yourservice.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Authentication Type</label>
                <select
                  value={form.authType} onChange={(e) => setForm({ ...form, authType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-primary text-sm"
                >
                  <option value="api_key">API Key</option>
                  <option value="oauth">OAuth 2.0</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm({ ...form, websocket: !form.websocket })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.websocket ? "bg-primary" : "bg-white/[0.1]"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.websocket ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm text-white/60">WebSocket support</span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">Review your submission</h3>
              <div className="space-y-3">
                {[
                  { label: "Name", value: form.name || "—" },
                  { label: "Tagline", value: form.tagline || "—" },
                  { label: "Category", value: form.category || "—" },
                  { label: "Price", value: form.isFree ? "Free" : form.price ? `$${form.price}` : "—" },
                  { label: "API Endpoint", value: form.apiEndpoint || "—" },
                  { label: "Auth Type", value: form.authType },
                  { label: "WebSocket", value: form.websocket ? "Yes" : "No" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-sm text-white/40">{label}</span>
                    <span className="text-sm text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white disabled:opacity-30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
            >
              <Check className="w-4 h-4" /> Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
