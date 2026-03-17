"use client";

import { motion } from "framer-motion";
import { DollarSign, Download, Users, Star, TrendingUp } from "lucide-react";

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "$12,453", change: "+23%", color: "text-emerald-400" },
  { icon: Download, label: "Total Downloads", value: "34,291", change: "+12%", color: "text-blue-400" },
  { icon: Users, label: "Active Users", value: "1,284", change: "+8%", color: "text-purple-400" },
  { icon: Star, label: "Avg Rating", value: "4.7", change: "+0.2", color: "text-amber-400" },
];

const monthlyData = [
  { month: "Jul", revenue: 1200, downloads: 2100 },
  { month: "Aug", revenue: 1800, downloads: 2800 },
  { month: "Sep", revenue: 2400, downloads: 3200 },
  { month: "Oct", revenue: 2100, downloads: 3800 },
  { month: "Nov", revenue: 3200, downloads: 4200 },
  { month: "Dec", revenue: 3800, downloads: 5100 },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  const maxDownloads = Math.max(...monthlyData.map(d => d.downloads));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Analytics</h1>
        <select className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/60 focus:outline-none">
          <option>Last 6 months</option>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <div className="text-2xl font-heading font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-sm font-heading font-bold text-white mb-6">Monthly Revenue</h3>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden transition-all hover:bg-primary/30"
                  style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/40">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
          <h3 className="text-sm font-heading font-bold text-white mb-6">Monthly Downloads</h3>
          <div className="flex items-end gap-3 h-48">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-cyan-500/20 rounded-t-lg relative overflow-hidden transition-all hover:bg-cyan-500/30"
                  style={{ height: `${(d.downloads / maxDownloads) * 160}px` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-cyan-500 rounded-t-lg"
                    style={{ height: `${(d.downloads / maxDownloads) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/40">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="mt-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
        <h3 className="text-sm font-heading font-bold text-white mb-6">Category Breakdown</h3>
        <div className="space-y-3">
          {[
            { name: "Developer Tools", pct: 35, color: "bg-orange-500" },
            { name: "Voice & Audio", pct: 25, color: "bg-purple-500" },
            { name: "Image Generation", pct: 20, color: "bg-cyan-500" },
            { name: "Chatbots", pct: 12, color: "bg-emerald-500" },
            { name: "Other", pct: 8, color: "bg-gray-500" },
          ].map((cat) => (
            <div key={cat.name} className="flex items-center gap-4">
              <span className="text-xs text-white/60 w-32">{cat.name}</span>
              <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
              </div>
              <span className="text-xs text-white/40 w-10 text-right">{cat.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
