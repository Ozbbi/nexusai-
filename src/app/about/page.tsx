"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const team = [
  { name: "Maya Rodriguez", role: "CEO & Co-founder", bio: "Former ML lead at Google Brain. Passionate about democratizing AI." },
  { name: "James Park", role: "CTO & Co-founder", bio: "Built scalable platforms at AWS. Obsessed with developer experience." },
  { name: "Priya Sharma", role: "Head of Product", bio: "Product leader with 10+ years at top SaaS companies." },
  { name: "Alex Thompson", role: "Head of Community", bio: "Community builder and AI advocate. Previously at Hugging Face." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[#0f172a] mb-6">
            Making AI accessible to everyone
          </h1>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            We believe the future of AI should be open, accessible, and creator-driven. NexusAI is the platform where anyone can discover, build, and monetize AI — breaking down barriers between innovation and the people who need it most.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/5 to-accent-purple/5 rounded-2xl p-8 sm:p-12 mb-20 border border-primary/10"
        >
          <h2 className="text-2xl font-heading font-bold text-[#0f172a] mb-4">Our Vision</h2>
          <p className="text-[#475569] leading-relaxed mb-4">
            We envision a world where AI tools are as accessible as smartphone apps — where any creator can build and share intelligent solutions, and anyone can find the AI tools they need to enhance their work, creativity, and daily life.
          </p>
          <p className="text-[#475569] leading-relaxed">
            NexusAI sits at the intersection of innovation and accessibility, providing the infrastructure, marketplace, and community that empowers the next generation of AI builders.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-[#0f172a] text-center mb-10">
            Meet the team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{person.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[#0f172a]">{person.name}</h3>
                    <p className="text-sm text-primary">{person.role}</p>
                  </div>
                </div>
                <p className="text-sm text-[#475569]">{person.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[#0f172a] rounded-2xl p-10"
        >
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Join our team</h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            We&apos;re always looking for passionate people to help build the future of AI.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium px-6 py-3 rounded-full transition-all"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
