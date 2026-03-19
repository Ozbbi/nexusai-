"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/store", label: "Store" },
  { href: "/pricing", label: "Pricing" },
  { href: "/community", label: "Community" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHidden = pathname?.startsWith("/dashboard") || pathname?.startsWith("/publish") || pathname === "/login" || pathname === "/register";
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHidden) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isHomepage
              ? "bg-[#09090b]/80 backdrop-blur-xl shadow-sm border-b border-white/[0.06] py-3"
              : "bg-white/80 backdrop-blur-xl shadow-sm border-b border-black/[0.06] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-heading font-bold ${isHomepage ? "text-white" : "text-[#0f172a]"}`}>
              NexusAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-purple-400"
                    : isHomepage
                    ? "text-white/60 hover:text-white"
                    : "text-[#475569] hover:text-[#0f172a]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                    isHomepage ? "text-white/60 hover:text-white" : "text-[#475569] hover:text-[#0f172a]"
                  }`}
                >
                  <User className="w-4 h-4" />
                  {profile?.full_name || "Dashboard"}
                </Link>
                <button
                  onClick={signOut}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    isHomepage ? "text-white/60 hover:text-red-400" : "text-[#475569] hover:text-red-500"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors ${
                    isHomepage ? "text-white/60 hover:text-white" : "text-[#475569] hover:text-[#0f172a]"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started &rarr;
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${isHomepage ? "text-white/60" : "text-[#475569]"}`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed inset-y-0 right-0 z-[60] w-72 shadow-2xl md:hidden ${
              isHomepage ? "bg-[#09090b] border-l border-white/[0.06]" : "bg-white"
            }`}
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setMobileOpen(false)}>
                <X className={`w-6 h-6 ${isHomepage ? "text-white/60" : "text-[#475569]"}`} />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium py-3 border-b ${
                    isHomepage
                      ? "text-white/60 hover:text-purple-400 border-white/[0.06]"
                      : "text-[#475569] hover:text-primary border-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-center text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 rounded-full"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setMobileOpen(false); }}
                      className={`text-center text-sm font-medium py-2.5 ${
                        isHomepage ? "text-white/60 hover:text-red-400" : "text-[#475569] hover:text-red-500"
                      }`}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={`text-center text-sm font-medium py-2.5 ${
                        isHomepage ? "text-white/60 hover:text-white" : "text-[#475569] hover:text-[#0f172a]"
                      }`}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="text-center text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-2.5 rounded-full"
                    >
                      Get Started &rarr;
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
