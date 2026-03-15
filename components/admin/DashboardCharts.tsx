"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

interface Props {
  chartDataHarian: { hari: string; pendaftar: number }[];
  chartDataJalur: { jalur: string; total: number; fill: string }[];
  chartDataStatus: { status: string; total: number; fill: string }[];
}

export default function DashboardCharts({ chartDataHarian, chartDataJalur, chartDataStatus }: Props) {
  return (
    <div className="space-y-6">
      {/* Chart Pendaftar per Hari */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h2 className="text-lg font-bold text-white mb-6">Pendaftar per Hari (7 Hari Terakhir)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartDataHarian} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hari" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#f1f5f9" }}
              cursor={{ fill: "#334155" }}
            />
            <Bar dataKey="pendaftar" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Pendaftar" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Jalur & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Jalur */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Distribusi Jalur</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={chartDataJalur} dataKey="total" nameKey="jalur" cx="50%" cy="50%" outerRadius={80} label={({ jalur, percent }: any) => `${jalur} ${(percent * 100).toFixed(0)}%`}>
                {chartDataJalur.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#f1f5f9" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {chartDataJalur.map(item => (
              <div key={item.jalur} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-400 text-xs">{item.jalur} ({item.total})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Status */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Distribusi Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={chartDataStatus} dataKey="total" nameKey="status" cx="50%" cy="50%" outerRadius={80} label={({ status, percent }: any) => `${status} ${(percent * 100).toFixed(0)}%`}>
                {chartDataStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", color: "#f1f5f9" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {chartDataStatus.map(item => (
              <div key={item.status} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-400 text-xs">{item.status} ({item.total})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}