"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Berita", href: "/berita" },
  { name: "Galeri", href: "/galeri" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logopulo.jpeg"
            alt="Logo SDN Pulo 01"
            width={44}
            height={44}
            className="rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <span className={cn("font-bold text-base md:text-lg leading-none transition-colors",
              isScrolled ? "text-blue-900" : "text-white")}>
              SDN PULO 01
            </span>
            <span className={cn("text-[9px] md:text-[10px] font-medium tracking-wider transition-colors",
              isScrolled ? "text-blue-600" : "text-blue-100")}>
              PAGI JAKARTA SELATAN
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.name} href={link.href} className={cn(
                "text-sm font-medium transition-colors hover:text-yellow-500 relative pb-0.5",
                isScrolled ? "text-slate-600" : "text-white/90",
                isActive && isScrolled && "text-blue-700 font-bold",
                isActive && !isScrolled && "text-yellow-400 font-bold"
              )}>
                {link.name}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />}
              </Link>
            );
          })}
          <Link href="/spmb" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-md">
            SPMB 2026
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "text-blue-900 hover:bg-slate-100" : "text-white hover:bg-white/10")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white mt-3 rounded-2xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="flex flex-col p-3 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.name} href={link.href}
                    className={cn("px-4 py-3.5 font-medium rounded-xl transition-colors text-sm",
                      isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700")}
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                );
              })}
              <Link href="/spmb"
                className="mt-1 bg-blue-700 text-white px-4 py-4 rounded-xl text-center font-bold text-sm"
                onClick={() => setIsMobileMenuOpen(false)}>
                SPMB 2026 — Daftar Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}