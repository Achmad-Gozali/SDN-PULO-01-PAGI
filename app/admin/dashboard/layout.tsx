import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900">
      <AdminSidebar />
      <main className="md:ml-64 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
}