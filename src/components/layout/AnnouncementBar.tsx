"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary to-accent-purple text-white text-center py-2.5 px-4 text-sm font-medium">
      <span className="mr-2">&#x1F680; NexusAI is live! Start selling your AI today.</span>
      <Link
        href="/register"
        className="underline underline-offset-2 hover:text-white/90 transition-colors"
      >
        Get Started &rarr;
      </Link>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
