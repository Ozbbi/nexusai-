import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NexusAI — The Marketplace for AI",
    template: "%s | NexusAI",
  },
  description:
    "Discover, buy, and sell AI models, agents, and tools. Built by creators, for everyone.",
  keywords: ["AI", "marketplace", "machine learning", "AI tools", "AI models", "AI agents", "NexusAI"],
  openGraph: {
    title: "NexusAI — The Marketplace for AI",
    description: "Discover, buy, and sell AI models, agents, and tools.",
    url: "https://nexusai.vercel.app",
    siteName: "NexusAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI — The Marketplace for AI",
    description: "Discover, buy, and sell AI models, agents, and tools.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-[#f8f9fc] text-[#0f172a]">
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
