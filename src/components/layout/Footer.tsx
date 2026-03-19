"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Store", href: "/store" },
    { label: "API Docs", href: "/store" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/community" },
    { label: "Careers", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/store" },
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/contact" },
    { label: "Status", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/about" },
    { label: "Terms", href: "/about" },
    { label: "Cookies", href: "/about" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const isHidden = pathname?.startsWith("/dashboard") || pathname?.startsWith("/publish") || pathname === "/login" || pathname === "/register";

  if (isHidden) return null;

  return (
    <footer className="bg-[#09090b] text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-heading font-bold">NexusAI</span>
            </Link>
            <p className="text-sm text-white/40 mb-6">
              The AI marketplace. Discover, buy, and sell AI models, agents, and tools.
            </p>
            <div className="flex gap-4">
              {["X", "GH", "DC"].map((icon) => (
                <span
                  key={icon}
                  className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-xs text-white/40 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-purple-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 NexusAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 w-48"
            />
            <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
