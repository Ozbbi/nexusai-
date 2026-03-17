"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Eye, EyeOff, ArrowRight, Users, Sparkles, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Account created successfully!");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-white">NexusAI</span>
          </Link>

          <h2 className="text-4xl font-heading font-bold text-white mb-4 leading-tight">
            Start your AI
            <br />
            journey today
          </h2>
          <p className="text-lg text-white/60 max-w-md">
            Join thousands of creators and buyers on the fastest-growing AI marketplace.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: Users, text: "Join 500+ active creators" },
            { icon: Sparkles, text: "Publish AI in under 10 minutes" },
            { icon: TrendingUp, text: "$50K+ earned by creators" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-white/70">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8 lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold text-white">NexusAI</span>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Create account</h1>
            <p className="text-sm text-white/50">Join NexusAI and start your AI journey</p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm pr-10 transition-all"
                    placeholder="Min. 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">I want to...</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "buyer", label: "Buy AI", desc: "Browse & purchase", icon: "🛒" },
                    { value: "creator", label: "Sell AI", desc: "Publish & earn", icon: "🚀" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: opt.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        form.role === opt.value
                          ? "border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10"
                          : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="text-lg mb-1">{opt.icon}</div>
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-xs opacity-60">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-sm shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#0d0d14] text-white/30">or continue with</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] font-medium py-3.5 rounded-xl transition-all text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-white/40 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
