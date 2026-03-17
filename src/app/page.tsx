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
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProductCard from "@/components/ui/ProductCard";
import { mockProducts } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const features = [
  { icon: Store, title: "AI Marketplace", desc: "Browse and discover 500+ AI tools across every category imaginable.", color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50" },
  { icon: Zap, title: "Instant Deploy", desc: "One-click install with auto-generated API keys. Start using AI in seconds.", color: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
  { icon: BarChart3, title: "Creator Dashboard", desc: "Real-time analytics, earnings tracking, and customer insights at your fingertips.", color: "from-emerald-500 to-green-500", bg: "bg-emerald-50" },
  { icon: Shield, title: "Secure Payments", desc: "Stripe-powered payments with instant payouts to your bank account.", color: "from-rose-500 to-pink-500", bg: "bg-rose-50" },
  { icon: Code, title: "API Access", desc: "RESTful APIs with WebSocket support for every AI product on the platform.", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50" },
  { icon: Users, title: "Community", desc: "Connect with creators, share tips, get support, and grow together.", color: "from-purple-500 to-violet-500", bg: "bg-purple-50" },
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

const categories = [
  { name: "Image Gen", icon: Sparkles, count: 120 },
  { name: "NLP & Text", icon: Bot, count: 89 },
  { name: "Voice & Audio", icon: Layers, count: 67 },
  { name: "Code & Dev", icon: Code, count: 54 },
  { name: "Analytics", icon: BarChart3, count: 43 },
  { name: "Automation", icon: Zap, count: 38 },
];

export default function HomePage() {
  const trendingProducts = mockProducts.slice(0, 5);

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 sm:pt-44 sm:pb-32 overflow-hidden hero-grid">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-transparent to-transparent" />
        <div className="gradient-orb w-[600px] h-[600px] bg-indigo-300/50 -top-20 -left-40 animate-float" />
        <div className="gradient-orb w-[500px] h-[500px] bg-purple-300/40 top-20 -right-20 animate-float-delay" />
        <div className="gradient-orb w-[400px] h-[400px] bg-cyan-200/30 bottom-0 left-1/3 animate-float-slow" />

        {/* Floating particles */}
        <div className="absolute top-32 left-[15%] w-2 h-2 rounded-full bg-indigo-400/60" style={{ animation: 'float-particle 4s ease-in-out infinite' }} />
        <div className="absolute top-48 right-[20%] w-3 h-3 rounded-full bg-purple-400/40" style={{ animation: 'float-particle 6s ease-in-out 1s infinite' }} />
        <div className="absolute top-64 left-[60%] w-1.5 h-1.5 rounded-full bg-cyan-400/50" style={{ animation: 'float-particle 5s ease-in-out 2s infinite' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-indigo-100 text-sm font-medium text-indigo-600 px-4 py-2 rounded-full mb-8 shadow-sm"
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
            <span className="text-gradient-bold relative">
              AI
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,8 Q25,0 50,6 T100,4" stroke="url(#underline-gradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#64748b] max-w-2xl mx-auto mb-10 leading-relaxed"
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
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Browse Store
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-[#0f172a] font-semibold px-8 py-4 rounded-2xl text-base transition-all"
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
                  className="w-10 h-10 rounded-full border-[3px] border-white shadow-sm"
                  style={{
                    background: `linear-gradient(135deg, hsl(${220 + i * 30}, 70%, 55%), hsl(${240 + i * 30}, 70%, 65%))`,
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
              <span className="text-sm text-[#64748b]">
                Trusted by <strong className="text-[#0f172a]">500+</strong> creators
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
            <div className="relative rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden border border-gray-200/60 bg-white group">
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-lg px-3 py-1.5 text-xs text-[#94a3b8] text-center border border-gray-100">
                      nexusai.dev/store
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#fafbff] to-white grid grid-cols-3 gap-4">
                  {mockProducts.slice(0, 3).map((p) => (
                    <div key={p.id} className="rounded-xl border border-gray-100 overflow-hidden bg-white hover:shadow-md transition-shadow">
                      <div className={`h-20 bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-bold text-[#0f172a]">{p.name}</div>
                        <div className="text-[10px] text-[#94a3b8] mt-0.5">{p.category}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            {p.rating}
                          </span>
                          <span className={`text-[10px] font-bold ${p.price === 0 ? 'text-emerald-600' : 'text-[#0f172a]'}`}>
                            {p.price === 0 ? "FREE" : `$${p.price}`}
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
      <section className="py-14 border-y border-gray-100 bg-white/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#94a3b8] mb-8">Powering AI creators worldwide</p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f8f9fc] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f8f9fc] to-transparent z-10" />
            <div className="flex gap-16 animate-marquee">
              {[...logos, ...logos].map((logo, i) => (
                <span key={`${logo}-${i}`} className="text-xl font-heading font-bold text-[#cbd5e1] hover:text-[#94a3b8] transition-colors cursor-default select-none whitespace-nowrap flex-shrink-0">
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
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                    <cat.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-[#0f172a]">{cat.name}</div>
                    <div className="text-xs text-[#94a3b8]">{cat.count} tools</div>
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">Features</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">Everything you need to sell AI</h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">From publishing to payments, we handle the infrastructure so you can focus on building.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-[0.03] rounded-full -translate-y-16 translate-x-16 group-hover:opacity-[0.08] transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-2">{f.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="gradient-orb w-[400px] h-[400px] bg-indigo-500/20 -top-40 -left-40" />
        <div className="gradient-orb w-[300px] h-[300px] bg-purple-500/15 -bottom-20 -right-20" />
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
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-bold text-white mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix || ""} />
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">How it works</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">Three simple steps</h2>
            <p className="text-lg text-[#64748b]">Get started in minutes, not days</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-heading font-bold text-lg flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2 block">Step {step.num}</span>
                <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-3">{step.title}</h3>
                <p className="text-sm text-[#64748b] max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-24 bg-gradient-to-b from-[#f1f5f9] to-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-2">Trending</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0f172a]">Popular This Week</h2>
            </div>
            <Link href="/store" className="group text-primary hover:text-primary-hover font-semibold text-sm flex items-center gap-1 bg-white px-4 py-2 rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all">
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

      {/* Pricing */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">Pricing</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-[#64748b]">Start free. Scale when you&apos;re ready.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 border hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-indigo-200 shadow-xl shadow-indigo-500/10 scale-[1.02]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#94a3b8] mb-5">{plan.desc}</p>
                <div className="mb-7">
                  <span className="text-5xl font-heading font-bold text-[#0f172a]">{plan.price}</span>
                  <span className="text-[#94a3b8] text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#475569]">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25"
                      : "border-2 border-gray-200 text-[#475569] hover:border-indigo-500 hover:text-indigo-600"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/pricing" className="text-primary hover:text-primary-hover font-semibold text-sm inline-flex items-center gap-1">
              Compare all features <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-[#f1f5f9] to-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">Testimonials</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">Loved by creators</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#475569] text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#94a3b8]">{t.role} at {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="gradient-orb w-[500px] h-[500px] bg-indigo-500/20 top-0 left-1/4" />
          <div className="gradient-orb w-[400px] h-[400px] bg-purple-500/15 bottom-0 right-1/4" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-300" />
            Join the AI revolution
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Ready to launch
            <br />
            your AI?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/50 mb-10">
            Join 200+ creators already earning on NexusAI
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold px-10 py-4 rounded-2xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-indigo-500/30">
              Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/store" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-medium px-8 py-4 rounded-2xl text-base transition-all">
              Browse Store
            </Link>
          </motion.div>
          <p className="text-sm text-white/30 mt-6">No credit card required</p>
        </div>
      </section>
    </>
  );
}
