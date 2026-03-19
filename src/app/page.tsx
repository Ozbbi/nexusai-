"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Store,
  Zap,
  BarChart3,
  Shield,
  Code,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Globe,
  Cpu,
  Bot,
  Layers,
  Check,
  Download,
  FileCode,
  FileText,
  MessageSquare,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/supabase";
import { Product } from "@/types";
import { useState, useEffect } from "react";

// Sparkle particle component
function SparkleField() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const pts = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-400/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `sparkle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const features = [
  { icon: Store, title: "AI Marketplace", desc: "Browse and discover 500+ AI tools across every category imaginable.", color: "from-purple-500 to-fuchsia-500" },
  { icon: Zap, title: "Instant Deploy", desc: "One-click install with auto-generated API keys. Start using AI in seconds.", color: "from-fuchsia-500 to-rose-500" },
  { icon: BarChart3, title: "Creator Dashboard", desc: "Real-time analytics, earnings tracking, and customer insights at your fingertips.", color: "from-cyan-500 to-blue-500" },
  { icon: Shield, title: "Secure Payments", desc: "Stripe-powered payments with instant payouts to your bank account.", color: "from-emerald-500 to-teal-500" },
  { icon: Code, title: "API Access", desc: "RESTful APIs with WebSocket support for every AI product on the platform.", color: "from-violet-500 to-purple-500" },
  { icon: Users, title: "Community", desc: "Connect with creators, share tips, get support, and grow together.", color: "from-rose-500 to-orange-500" },
];

const logos = ["TechCorp", "DataFlow", "MindLabs", "SynthAI", "NeuralWorks", "CloudForge", "DeepCore", "AlphaNet"];

const testimonials = [
  { quote: "NexusAI helped me monetize my voice cloning model. Made $3K in the first month.", name: "Alex Chen", role: "AI Developer", company: "NeuralVox", avatar: "AC" },
  { quote: "The platform is incredibly easy to use. Published my first AI in under 10 minutes.", name: "Sarah Kim", role: "ML Engineer", company: "DataMind", avatar: "SK" },
  { quote: "Best marketplace for AI tools. The community is super supportive and helpful.", name: "Marcus Johnson", role: "Founder", company: "CodePilot", avatar: "MJ" },
];

const steps = [
  { num: "01", title: "Browse & Discover", desc: "Explore hundreds of AI tools across 12+ categories curated for every use case.", icon: Globe },
  { num: "02", title: "Install & Integrate", desc: "One-click install with auto-generated API keys. SDKs for every major language.", icon: Cpu },
  { num: "03", title: "Scale & Earn", desc: "Creators earn from every sale with transparent analytics and instant payouts.", icon: TrendingUp },
];

const plans = [
  {
    name: "Starter",
    price: "$4.99",
    period: "/month",
    desc: "Perfect for getting started",
    features: ["Publish up to 2 AI products", "Max sale price: $20 per AI", "5% commission on each sale", "Basic analytics", "Community access", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$14.99",
    period: "/month",
    desc: "For serious creators",
    features: ["Publish up to 10 AI products", "No price limit on sales", "0% commission \u2014 keep 100%", "Advanced analytics dashboard", "Priority listing & Featured", "Priority email + chat support", "Custom creator profile page", "API usage analytics"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "/month",
    desc: "For teams and organizations",
    features: ["Unlimited AI products", "0% commission", "White-label / custom branding", "Dedicated account manager", "SLA guarantee (99.9%)", "Custom API integrations", "Priority review (<1 hour)", "Featured placement guaranteed"],
    cta: "Contact Sales",
    popular: false,
  },
];

const freeDownloads = [
  {
    title: "AI Chatbot Template",
    desc: "A ready-to-use chatbot UI template with smart response logic. Single HTML file — open and customize.",
    icon: MessageSquare,
    file: "/downloads/ai-chatbot-template.html",
    format: "HTML",
    size: "19 KB",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "AI Email Responder",
    desc: "Python script that analyzes emails, detects intent, and generates professional replies. Zero dependencies.",
    icon: FileCode,
    file: "/downloads/ai-email-responder.py",
    format: "Python",
    size: "23 KB",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Sentiment Analyzer",
    desc: "Lightweight offline sentiment analysis tool. Analyze text, files, or use interactive mode. No API keys needed.",
    icon: BarChart3,
    file: "/downloads/sentiment-analyzer.py",
    format: "Python",
    size: "14 KB",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Prompt Pack v1.0",
    desc: "50+ curated AI prompts for content writing, coding, marketing, data analysis, and more.",
    icon: FileText,
    file: "/downloads/nexusai-prompt-pack-v1.json",
    format: "JSON",
    size: "11 KB",
    color: "from-rose-500 to-pink-500",
  },
];

const categories = [
  { name: "Image Gen", icon: Sparkles, count: 120 },
  { name: "NLP & Text", icon: Bot, count: 89 },
  { name: "Voice & Audio", icon: Layers, count: 67 },
  { name: "Code & Dev", icon: Code, count: 54 },
  { name: "Analytics", icon: BarChart3, count: 43 },
  { name: "Automation", icon: Zap, count: 38 },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data || []))
      .catch(() => setProducts([]));
  }, []);

  const trendingProducts = products.slice(0, 5);

  return (
    <div className="bg-[#09090b] text-white min-h-screen">
      {/* Announcement Bar */}
      <div className="relative bg-gradient-to-r from-purple-600/90 via-fuchsia-600/90 to-rose-500/90 text-white text-center py-2.5 px-4 text-sm font-medium backdrop-blur-sm border-b border-white/10">
        <span className="mr-2">&#x2728; NexusAI is live! Start selling your AI today.</span>
        <Link href="/register" className="underline underline-offset-2 hover:text-white/90 transition-colors">
          Get Started &rarr;
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Gradient arcs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-purple-600/20 via-fuchsia-600/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-violet-600/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-fuchsia-600/10 to-transparent rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" />
        </div>

        <SparkleField />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-sm font-medium text-purple-300 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Over 500+ AI tools available</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold leading-[1.05] mb-6 tracking-tight"
          >
            The Marketplace
            <br />
            for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover, buy, and sell AI models, agents, and tools.
            <br className="hidden sm:block" />
            Built by creators, for everyone.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/store"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Browse Store
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.2] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all"
            >
              Start Selling
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-[3px] border-[#09090b] shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, hsl(${270 + i * 20}, 70%, 55%), hsl(${290 + i * 20}, 70%, 65%))`,
                  }}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-white/40">
                Trusted by <strong className="text-white/70">500+</strong> creators
              </span>
            </div>
          </motion.div>

          {/* Hero Preview Card */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] group backdrop-blur-sm">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white/[0.05] rounded-lg px-3 py-1.5 text-xs text-white/30 text-center border border-white/[0.06]">
                      nexusai.vercel.app/store
                    </div>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-3 gap-4">
                  {products.slice(0, 3).map((p) => (
                    <div key={p.id} className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className={`h-20 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{p.category}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] flex items-center gap-0.5 text-white/50">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            {p.rating}
                          </span>
                          <span className="text-[10px] font-bold text-purple-400">
                            ${p.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Marquee */}
      <section className="py-14 border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-white/30 mb-8">Powering AI creators worldwide</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#09090b] to-transparent z-10" />
            <div className="flex gap-16 animate-marquee">
              {[...logos, ...logos].map((logo, i) => (
                <span key={`${logo}-${i}`} className="text-xl font-heading font-bold text-white/10 hover:text-white/20 transition-colors cursor-default select-none whitespace-nowrap flex-shrink-0">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href="/store"
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-fuchsia-500/30 transition-colors">
                    <cat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-white">{cat.name}</div>
                    <div className="text-xs text-white/40">{cat.count} tools</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Features</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Everything you need to sell AI</h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">From publishing to payments, we handle the infrastructure so you can focus on building.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06] hover:-translate-y-1.5 hover:border-purple-500/20 hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-[0.05] rounded-full -translate-y-16 translate-x-16 group-hover:opacity-[0.1] transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: "+", label: "AI Tools Available", icon: Store },
              { end: 10, suffix: "K+", label: "Monthly Downloads", icon: TrendingUp },
              { end: 200, suffix: "+", label: "Active Creators", icon: Users },
              { prefix: "$", end: 50, suffix: "K+", label: "Creator Earnings", icon: BarChart3 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix || ""} />
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">How it works</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Three simple steps</h2>
            <p className="text-lg text-white/40">Get started in minutes, not days</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white font-heading font-bold text-lg flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-2 block">Step {step.num}</span>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">Trending</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">Popular This Week</h2>
            </div>
            <Link href="/store" className="group text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center gap-1 bg-white/[0.05] px-4 py-2 rounded-xl border border-white/[0.08] hover:border-purple-500/30 transition-all">
              View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Downloads */}
      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Free Resources</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Free Automation Samples</h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">Download ready-to-use AI tools and templates. No account required.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeDownloads.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white/[0.03] rounded-2xl border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-white/30">{item.format} &middot; {item.size}</span>
                    <span className="text-xs font-bold text-emerald-400">FREE</span>
                  </div>
                  <a
                    href={item.file}
                    download
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-medium transition-all border border-emerald-500/20 hover:border-emerald-500/30"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-white/40">Start free. Scale when you&apos;re ready.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white/[0.03] rounded-2xl p-8 border hover:-translate-y-1 transition-all duration-300 ${
                  plan.popular
                    ? "border-purple-500/40 shadow-xl shadow-purple-500/10 scale-[1.02]"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-heading font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-5">{plan.desc}</p>
                <div className="mb-7">
                  <span className="text-5xl font-heading font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500 shadow-lg shadow-purple-500/25"
                      : "border border-white/[0.1] text-white/60 hover:border-purple-500/40 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="text-purple-400 hover:text-purple-300 font-semibold text-sm inline-flex items-center gap-1">
              Compare all features <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Testimonials</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Loved by creators</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06] hover:border-purple-500/20 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role} at {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/20 via-fuchsia-600/15 to-rose-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-sm text-white/60 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Join the AI revolution
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to launch
            <br />
            your <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/40 mb-10">
            Join 200+ creators already earning on NexusAI
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/30">
              Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/store" className="inline-flex items-center gap-2 border border-white/[0.1] hover:border-white/[0.2] text-white/60 hover:text-white font-medium px-8 py-4 rounded-2xl text-base transition-all">
              Browse Store
            </Link>
          </motion.div>
          <p className="text-sm text-white/20 mt-6">No credit card required</p>
        </div>
      </section>
    </div>
  );
}
