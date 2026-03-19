"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: { monthly: "$4.99", annual: "$3.99" },
    desc: "Perfect for getting started",
    features: [
      "Publish up to 2 AI products",
      "Maximum sale price: $20 per AI",
      "5% commission on each sale",
      "Basic analytics",
      "Community access",
      "Email support",
      "Standard listing placement",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: "$14.99", annual: "$11.99" },
    desc: "For serious creators",
    features: [
      "Publish up to 10 AI products",
      "No price limit on sales",
      "0% commission — keep 100% of earnings",
      "Advanced analytics dashboard",
      'Priority listing & "Featured" badge eligibility',
      "Priority email + chat support",
      "Custom creator profile page",
      "API usage analytics",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: "$99.99", annual: "$79.99" },
    desc: "For teams and organizations",
    features: [
      "Unlimited AI products",
      "0% commission",
      "White-label / custom branding",
      "Dedicated account manager",
      "SLA guarantee (99.9% uptime)",
      "Custom API integrations",
      "Priority review (publish in <1 hour)",
      "Featured placement guaranteed",
      "Bulk licensing options",
      "Phone + Slack support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  { q: "Can I switch plans anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated." },
  { q: "What payment methods do you accept?", a: "Payment integration is coming soon. We will support local and international payment methods." },
  { q: "How does the commission work?", a: "Starter plan takes a 5% commission on each sale. Pro and Enterprise plans have 0% commission — you keep 100% of your earnings." },
  { q: "Can I publish for free?", a: "You need at least the Starter plan to publish AI products. Browsing and buying AI tools on the marketplace is always free for everyone." },
  { q: "What happens if I downgrade?", a: "Your published AI products stay live on the marketplace. However, you won't be able to publish new ones beyond your new plan's limit." },
  { q: "Do you offer annual pricing?", a: "Yes! Save 20% when you choose annual billing. Toggle the billing period above to see annual prices." },
  { q: "How do payouts work?", a: "Payout system is coming soon. Creators will receive earnings directly to their bank accounts." },
  { q: "Is there a free trial?", a: "Yes, the Pro plan comes with a 14-day free trial. No credit card required to start." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-[#475569] mb-8">
            Start free. Scale when you&apos;re ready.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                annual ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  annual ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
              Annual
            </span>
            {annual && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-xl font-heading font-bold text-[#0f172a] mb-1">{plan.name}</h3>
              <p className="text-sm text-[#94a3b8] mb-4">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-4xl font-heading font-bold text-[#0f172a]">
                  {annual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-[#94a3b8] text-sm">/month</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#475569]">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                disabled
                className={`block w-full text-center py-3 rounded-xl font-medium text-sm cursor-not-allowed opacity-60 ${
                  plan.popular
                    ? "bg-primary text-white"
                    : plan.name === "Enterprise"
                    ? "bg-[#0f172a] text-white"
                    : "border border-gray-200 text-[#475569]"
                }`}
              >
                Coming Soon
              </button>

              {plan.popular && (
                <p className="text-xs text-center text-[#94a3b8] mt-3">14-day free trial included</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#0f172a] text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-[#0f172a]">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-[#94a3b8]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#94a3b8]" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-[#475569] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
