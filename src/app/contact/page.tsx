"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-[#0f172a] mb-4">Get in touch</h1>
          <p className="text-lg text-[#475569]">We&apos;d love to hear from you</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Name</label>
                  <input
                    type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    placeholder="Your name" required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Email</label>
                  <input
                    type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    placeholder="you@example.com" required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Subject</label>
                <input
                  type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  placeholder="How can we help?" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">Message</label>
                <textarea
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
                  placeholder="Tell us more..." required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: Mail, title: "Email", value: "hello@nexusai.dev", desc: "For general inquiries" },
              { icon: MessageCircle, title: "Discord", value: "discord.gg/nexusai", desc: "Join our community" },
              { icon: Clock, title: "Response Time", value: "Within 24 hours", desc: "Mon-Fri, 9am-6pm" },
            ].map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 p-5">
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-heading font-bold text-[#0f172a] text-sm mb-1">{title}</h3>
                <p className="text-sm text-primary font-medium mb-0.5">{value}</p>
                <p className="text-xs text-[#94a3b8]">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
