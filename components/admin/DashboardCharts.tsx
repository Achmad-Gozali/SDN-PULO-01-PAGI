"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

interface Props {
  chartDataHarian: { hari: string; pendaftar: number }[];
  chartDataJalur: { jalur: string; total: number; fill: string }[];
  chartDataStatus: { status: string; total: number; fill: string }[];
}

// FIX: custom label untuk pie chart yang tidak overflow di mobile
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.05) return null; // jangan tampilkan label kalau slice terlalu kecil
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: '11px', fontWeight: 'bold' }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardCharts({ chartDataHarian, chartDataJalur, chartDataStatus }: Props) {
  const tooltipStyle = {
    contentStyle: {
      backgroundColor: "#1e293b",
      border: "1px solid #334155",
      borderRadius: "12px",
      color: "#f1f5f9",
      fontSize: "12px"
    },
    cursor: { fill: "#334155" }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Bar Chart - Pendaftar per Hari */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 md:p-6">
        <h2 className="text-sm md:text-lg font-bold text-white mb-4 md:mb-6">Pendaftar per Hari (7 Hari Terakhir)</h2>
        {/* FIX: height lebih kecil di mobile */}
        <ResponsiveContainer width="100%" height={180} className="md:!h-[220px]">
          <BarChart data={chartDataHarian} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hari" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="pendaftar" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Pendaftar" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Jalur */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 md:p-6">
          <h2 className="text-sm md:text-lg font-bold text-white mb-3 md:mb-4">Distribusi Jalur</h2>
          <ResponsiveContainer width="100%" height={160} className="md:!h-[200px]">
            <PieChart>
              <Pie
                data={chartDataJalur}
                dataKey="total"
                nameKey="jalur"
                cx="50%" cy="50%"
                // FIX: outerRadius lebih kecil di mobile biar tidak kepotong
                outerRadius="70%"
                labelLine={false}
                label={renderCustomLabel}
              >
                {chartDataJalur.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle.contentStyle}
                formatter={(value, name) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* FIX: legend di bawah chart, tidak jadi label yang overlap */}
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {chartDataJalur.map(item => (
              <div key={item.jalur} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-400 text-xs">{item.jalur} ({item.total})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-4 md:p-6">
          <h2 className="text-sm md:text-lg font-bold text-white mb-3 md:mb-4">Distribusi Status</h2>
          <ResponsiveContainer width="100%" height={160} className="md:!h-[200px]">
            <PieChart>
              <Pie
                data={chartDataStatus}
                dataKey="total"
                nameKey="status"
                cx="50%" cy="50%"
                outerRadius="70%"
                labelLine={false}
                label={renderCustomLabel}
              >
                {chartDataStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle.contentStyle}
                formatter={(value, name) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-3">
            {chartDataStatus.map(item => (
              <div key={item.status} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-400 text-xs">{item.status} ({item.total})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}