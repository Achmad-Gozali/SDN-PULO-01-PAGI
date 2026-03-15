"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Newspaper,
  Image,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/berita", label: "Manajemen Berita", icon: Newspaper },
  { href: "/admin/dashboard/galeri", label: "Manajemen Galeri", icon: Image },
  { href: "/admin/dashboard/spmb", label: "Manajemen SPMB", icon: GraduationCap },
];

// FIX: SidebarContent dipindah keluar dari component utama
function SidebarContent({
  pathname,
  onLinkClick,
  onLogout,
}: {
  pathname: string;
  onLinkClick: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">SDN PULO 01</p>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-800 min-h-screen fixed left-0 top-0 z-40">
        <SidebarContent
          pathname={pathname}
          onLinkClick={() => {}}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-800 p-2 rounded-lg text-white"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 w-64 bg-slate-800 h-full">
            <SidebarContent
              pathname={pathname}
              onLinkClick={() => setIsMobileOpen(false)}
              onLogout={handleLogout}
            />
          </aside>
        </div>
      )}
    </>
  );
}