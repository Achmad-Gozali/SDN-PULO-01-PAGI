"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-700 p-2 rounded-lg text-white group-hover:bg-blue-600 transition-colors">
            <GraduationCap size={24} />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-bold text-lg leading-none transition-colors",
              isScrolled ? "text-blue-900" : "text-white"
            )}>
              SDN PULO 01
            </span>
            <span className={cn(
              "text-[10px] font-medium tracking-wider transition-colors",
              isScrolled ? "text-blue-600" : "text-blue-100"
            )}>
              PAGI JAKARTA SELATAN
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-yellow-500",
                isScrolled ? "text-slate-600" : "text-white/90"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/spmb"
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-md"
          >
            SPMB 2026
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "text-blue-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white mt-4 rounded-2xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/spmb"
                className="mt-2 bg-blue-700 text-white px-4 py-4 rounded-xl text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SPMB 2026 - Daftar Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
