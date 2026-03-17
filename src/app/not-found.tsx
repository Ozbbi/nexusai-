"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Brain className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-[#0f172a] mb-4">404</h1>
        <p className="text-lg text-[#475569] mb-8">
          This page doesn&apos;t exist. Maybe the AI wandered off?
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3 rounded-full transition-all hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
