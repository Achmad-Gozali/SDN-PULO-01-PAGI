import { createClient } from "@/lib/supabase/server";
import { Users, Newspaper, Image, CheckCircle, Clock, XCircle } from "lucide-react";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  const [
    { count: totalBerita },
    { count: totalGaleri },
    { count: totalPendaftar },
    { count: totalDiterima },
    { count: totalProses },
    { count: totalDitolak },
    { count: totalZonasi },
    { count: totalAfirmasi },
    { count: totalMutasi },
  ] = await Promise.all([
    supabase.from("berita").select("*", { count: "exact", head: true }),
    supabase.from("galeri").select("*", { count: "exact", head: true }),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("status", "DITERIMA"),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("status", "PROSES"),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("status", "DITOLAK"),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("jalur", "ZONASI"),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("jalur", "AFIRMASI"),
    supabase.from("spmb_registrations").select("*", { count: "exact", head: true }).eq("jalur", "MUTASI"),
  ]);

  // Data untuk chart per hari (7 hari terakhir)
  const { data: recentRegs } = await supabase
    .from("spmb_registrations")
    .select("created_at, jalur, status")
    .order("created_at", { ascending: false })
    .limit(100);

  // Proses data chart per hari
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  });

  const chartDataHarian = last7Days.map(day => {
    const count = recentRegs?.filter(r => {
      const d = new Date(r.created_at);
      return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) === day;
    }).length || 0;
    return { hari: day, pendaftar: count };
  });

  const chartDataJalur = [
    { jalur: "Zonasi", total: totalZonasi ?? 0, fill: "#3b82f6" },
    { jalur: "Afirmasi", total: totalAfirmasi ?? 0, fill: "#a855f7" },
    { jalur: "Mutasi", total: totalMutasi ?? 0, fill: "#f97316" },
  ];

  const chartDataStatus = [
    { status: "Diterima", total: totalDiterima ?? 0, fill: "#10b981" },
    { status: "Proses", total: totalProses ?? 0, fill: "#f59e0b" },
    { status: "Ditolak", total: totalDitolak ?? 0, fill: "#ef4444" },
  ];

  const { data: recentRegistrations } = await supabase
    .from("spmb_registrations")
    .select("nama_lengkap, nik, jalur, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total Berita", value: totalBerita ?? 0, icon: Newspaper, color: "bg-blue-500/10 text-blue-400" },
    { label: "Total Galeri", value: totalGaleri ?? 0, icon: Image, color: "bg-purple-500/10 text-purple-400" },
    { label: "Total Pendaftar", value: totalPendaftar ?? 0, icon: Users, color: "bg-yellow-500/10 text-yellow-400" },
    { label: "Diterima", value: totalDiterima ?? 0, icon: CheckCircle, color: "bg-emerald-500/10 text-emerald-400" },
    { label: "Sedang Diproses", value: totalProses ?? 0, icon: Clock, color: "bg-amber-500/10 text-amber-400" },
    { label: "Ditolak", value: totalDitolak ?? 0, icon: XCircle, color: "bg-red-500/10 text-red-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Selamat datang di Dashboard Admin SDN Pulo 01 Pagi</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className={`inline-flex p-3 rounded-xl mb-4 ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts - Client Component */}
      <DashboardCharts
        chartDataHarian={chartDataHarian}
        chartDataJalur={chartDataJalur}
        chartDataStatus={chartDataStatus}
      />

      {/* Recent Registrations */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Pendaftar Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Nama</th>
                <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">NIK</th>
                <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Jalur</th>
                <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-bold text-slate-400 uppercase px-6 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {!recentRegistrations?.length && (
                <tr><td colSpan={5} className="text-center text-slate-500 py-8">Belum ada pendaftar</td></tr>
              )}
              {recentRegistrations?.map((reg, idx) => (
                <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-white text-sm font-medium">{reg.nama_lengkap}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{reg.nik.substring(0, 4)}****{reg.nik.substring(12)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      reg.jalur === "ZONASI" ? "bg-blue-500/10 text-blue-400" :
                      reg.jalur === "AFIRMASI" ? "bg-purple-500/10 text-purple-400" :
                      "bg-orange-500/10 text-orange-400"
                    }`}>{reg.jalur}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      reg.status === "DITERIMA" ? "bg-emerald-500/10 text-emerald-400" :
                      reg.status === "PROSES" ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>{reg.status}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(reg.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}