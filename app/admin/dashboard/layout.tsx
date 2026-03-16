import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900">
      <AdminSidebar />
      {/* pt-16 on mobile biar tidak ketutup tombol sidebar toggle */}
      <main className="md:ml-64 p-4 md:p-6 min-h-screen pt-14 md:pt-6">
        {children}
      </main>
    </div>
  );
}