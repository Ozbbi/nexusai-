"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "AI enthusiast and creator.",
    website: "https://johndoe.dev",
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-6">Settings</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl space-y-6"
      >
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">Website</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <button
              onClick={() => toast.success("Profile updated!")}
              className="bg-primary hover:bg-primary-hover text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Subscription</h2>
          <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <div>
              <div className="text-sm font-bold text-primary">Free Plan</div>
              <div className="text-xs text-white/40">Browse and buy AI tools</div>
            </div>
            <a href="/pricing" className="text-sm font-medium text-primary hover:text-primary/80">
              Upgrade
            </a>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h2 className="text-lg font-heading font-bold text-white mb-4">Danger Zone</h2>
          <button className="text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-all">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
