"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email atau password salah. Silakan coba lagi.");
      setIsLoading(false);
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  };

  const inputClass = "w-full py-3 bg-slate-700/80 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm";

  return (
    <main className="min-h-screen relative flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0">
        <img
          src="https://mbifzvgceswygbvzjvjk.supabase.co/storage/v1/object/public/gallery-images/LATAR-ADMIN.jpeg"
          alt="Background" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-600/30">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">Admin Dashboard</h1>
          <p className="text-slate-300 text-sm mt-1">SDN Pulo 01 Pagi</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sdnpulo01.sch.id" required className={cn(inputClass, "pl-11 pr-4")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                  className={cn(inputClass, "pl-11 pr-12")} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoading}
              className={cn("w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 text-sm",
                isLoading ? "bg-slate-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30")}>
              {isLoading ? <><Loader2 className="animate-spin" size={16} /> Masuk...</> : "Masuk ke Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-5">
          © 2026 SDN Pulo 01 Pagi. Akses Terbatas.
        </p>
      </div>
    </main>
  );
}