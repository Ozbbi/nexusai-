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
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const features = [
  { icon: Store, title: "AI Marketplace", desc: "Browse and discover 500+ AI tools across every category imaginable.", color: "bg-indigo-100 text-indigo-600" },
  { icon: Zap, title: "Instant Deploy", desc: "One-click install with auto-generated API keys. Start using AI in seconds.", color: "bg-amber-100 text-amber-600" },
  { icon: BarChart3, title: "Creator Dashboard", desc: "Real-time analytics, earnings tracking, and customer insights at your fingertips.", color: "bg-emerald-100 text-emerald-600" },
  { icon: Shield, title: "Secure Payments", desc: "Stripe-powered payments with instant payouts to your bank account.", color: "bg-rose-100 text-rose-600" },
  { icon: Code, title: "API Access", desc: "RESTful APIs with WebSocket support for every AI product on the platform.", color: "bg-cyan-100 text-cyan-600" },
  { icon: Users, title: "Community", desc: "Connect with creators, share tips, get support, and grow together.", color: "bg-purple-100 text-purple-600" },
];

const logos = ["TechCorp", "DataFlow", "MindLabs", "SynthAI", "NeuralWorks", "CloudForge"];

const testimonials = [
  { quote: "NexusAI helped me monetize my voice cloning model. Made $3K in the first month.", name: "Alex Chen", company: "NeuralVox" },
  { quote: "The platform is incredibly easy to use. Published my first AI in under 10 minutes.", name: "Sarah Kim", company: "DataMind" },
  { quote: "Best marketplace for AI tools. The community is super supportive.", name: "Marcus Johnson", company: "CodePilot" },
];

const steps = [
  { num: "1", title: "Browse & Discover", desc: "Explore hundreds of AI tools across 12+ categories curated for every use case." },
  { num: "2", title: "Install & Integrate", desc: "One-click install with auto-generated API keys. SDKs for every major language." },
  { num: "3", title: "Scale & Earn", desc: "Creators earn from every sale with transparent analytics and instant payouts." },
];

const plans = [
  {
    name: "Starter",
    price: "$4.99",
    period: "/month",
    desc: "Perfect for getting started",
    features: ["Publish up to 2 AI products", "Max sale price: $20 per AI", "5% commission on each sale", "Basic analytics", "Community access", "Email support", "Standard listing placement"],
    cta: "Get Started",
    popular: false,
    style: "border border-gray-200",
  },
  {
    name: "Pro",
    price: "$14.99",
    period: "/month",
    desc: "For serious creators",
    features: ["Publish up to 10 AI products", "No price limit on sales", "0% commission — keep 100%", "Advanced analytics dashboard", "Priority listing & Featured eligibility", "Priority email + chat support", "Custom creator profile page", "API usage analytics"],
    cta: "Get Started",
    popular: true,
    style: "border-2 border-primary shadow-xl shadow-primary/10",
  },
  {
    name: "Enterprise",
    price: "$99.99",
    period: "/month",
    desc: "For teams and organizations",
    features: ["Unlimited AI products", "0% commission", "White-label / custom branding", "Dedicated account manager", "SLA guarantee (99.9%)", "Custom API integrations", "Priority review (<1 hour)", "Featured placement guaranteed"],
    cta: "Contact Sales",
    popular: false,
    style: "border border-gray-200",
  },
];

export default function HomePage() {
  const trendingProducts = mockProducts.slice(0, 5);

  return (
    <>
      <AnnouncementBar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="gradient-orb w-[500px] h-[500px] bg-indigo-200 top-20 -left-40 animate-float" />
        <div className="gradient-orb w-[400px] h-[400px] bg-cyan-200 top-40 right-0 animate-float-delay" />
        <div className="gradient-orb w-[300px] h-[300px] bg-green-100 bottom-20 left-1/3 animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
          >
            The Marketplace for{" "}
            <span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto mb-8"
          >
            Discover, buy, and sell AI models, agents, and tools. Built by creators, for everyone.
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link
              href="/store"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3.5 rounded-full text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              Browse Store <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 border-2 border-[#e2e8f0] text-[#475569] hover:text-[#0f172a] hover:border-[#cbd5e1] font-medium px-8 py-3.5 rounded-full text-base transition-all"
            >
              Start Selling
            </Link>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ background: `hsl(${220 + i * 30}, 70%, ${60 + i * 5}%)` }}
                />
              ))}
            </div>
            <span className="text-sm text-[#475569]">
              Trusted by <strong className="text-[#0f172a]">500+</strong> AI creators
            </span>
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative rounded-xl shadow-2xl shadow-black/10 overflow-hidden border border-gray-200/50 bg-white">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#f1f5f9] border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-[#94a3b8] text-center">
                    nexusai.dev/store
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#f8f9fc] to-white grid grid-cols-3 gap-4">
                {mockProducts.slice(0, 3).map((p) => (
                  <div key={p.id} className="rounded-lg border border-gray-100 overflow-hidden bg-white">
                    <div className={`h-16 bg-gradient-to-br ${p.gradient}`} />
                    <div className="p-3">
                      <div className="text-xs font-bold text-[#0f172a]">{p.name}</div>
                      <div className="text-[10px] text-[#94a3b8] mt-0.5">{p.category}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          {p.rating}
                        </span>
                        <span className="text-[10px] font-bold">
                          {p.price === 0 ? "FREE" : `$${p.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#94a3b8] mb-8">Powering AI creators worldwide</p>
          <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14">
            {logos.map((logo) => (
              <span key={logo} className="text-xl font-heading font-bold text-[#cbd5e1] hover:text-[#94a3b8] transition-colors cursor-default select-none">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0f172a] mb-4">Everything you need to sell AI</h2>
            <p className="text-lg text-[#475569] max-w-2xl mx-auto">From publishing to payments, we handle the infrastructure so you can focus on building.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-bold text-[#0f172a] mb-2">{f.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: "+", label: "AI Tools Available" },
              { end: 10, suffix: "K+", label: "Monthly Downloads" },
              { end: 200, suffix: "+", label: "Active Creators" },
              { prefix: "$", end: 50, suffix: "K+", label: "Creator Earnings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix || ""} />
                </div>
                <div className="text-sm text-[#475569]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0f172a] mb-4">How it works</h2>
            <p className="text-lg text-[#475569]">Three simple steps to get started</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-heading font-bold text-lg flex items-center justify-center mx-auto mb-5 relative z-10">{step.num}</div>
                <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-sm text-[#475569] max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-heading font-bold text-[#0f172a]">Trending This Week</h2>
            <Link href="/store" className="text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
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
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0f172a] mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-[#475569]">Start free. Scale when you&apos;re ready.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative bg-white rounded-2xl p-7 ${plan.style} hover:-translate-y-1 transition-all duration-300 hover:shadow-xl`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                )}
                <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#94a3b8] mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-heading font-bold text-[#0f172a]">{plan.price}</span>
                  <span className="text-[#94a3b8] text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">&#10003;</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className={`block text-center py-3 rounded-xl font-medium text-sm transition-all ${plan.popular ? "bg-primary text-white hover:bg-primary-hover" : "border border-gray-200 text-[#475569] hover:border-primary hover:text-primary"}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-primary hover:text-primary-hover font-medium text-sm inline-flex items-center gap-1">
              Compare all features <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0f172a] mb-4">Loved by creators</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[#475569] text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#94a3b8]">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-purple/10" />
        <div className="gradient-orb w-[400px] h-[400px] bg-primary/20 -top-20 -right-20" />
        <div className="gradient-orb w-[300px] h-[300px] bg-accent-purple/20 bottom-0 -left-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Ready to launch your AI?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/60 mb-8">
            Join 200+ creators already earning on NexusAI
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/register" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-10 py-4 rounded-full text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-white/40 mt-4">No credit card required</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
