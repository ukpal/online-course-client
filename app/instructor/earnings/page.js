// src/app/instructor/earnings/page.js
"use client";

import { instructorStats, payoutHistory, revenueData } from "@/data/instructor";
import { HiOutlineCurrencyDollar, HiOutlineDownload, HiOutlineClock } from "react-icons/hi";

export default function EarningsPage() {
  const pendingBalance = 4250;
  const lifetimeEarnings = instructorStats.totalRevenue;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Earnings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Available Balance", value: `$${pendingBalance.toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: "text-success bg-success/10", action: "Withdraw" },
          { label: "Pending", value: "$1,890", icon: HiOutlineClock, color: "text-warning bg-warning/10", action: null },
          { label: "Lifetime Earnings", value: `$${lifetimeEarnings.toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: "text-primary bg-primary/10", action: null },
        ].map((item, i) => (
          <div key={i} className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
            <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-xs opacity-60">{item.label}</p>
            {item.action && <button className="btn btn-success btn-sm rounded-lg mt-3 w-full">{item.action}</button>}
          </div>
        ))}
      </div>

      {/* Payout History */}
      <div className="bg-base-100 border border-base-300/50 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Payout History</h3>
          <button className="btn btn-ghost btn-xs gap-1"><HiOutlineDownload className="w-3.5 h-3.5" /> Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {payoutHistory.map((p) => (
                <tr key={p.id}>
                  <td className="text-sm">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="text-sm font-bold text-success">${p.amount.toLocaleString()}</td>
                  <td className="text-sm">{p.method}</td>
                  <td><span className="badge badge-success badge-sm capitalize">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}