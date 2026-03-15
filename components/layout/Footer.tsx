import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* School Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={28} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white leading-none">SDN PULO 01</span>
              <span className="text-xs font-medium text-blue-400 tracking-wider">PAGI JAKARTA SELATAN</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Mewujudkan generasi yang berakhlak mulia, cerdas, kreatif, dan mandiri melalui pendidikan dasar yang berkualitas dan berkarakter.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Tautan Cepat</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="hover:text-yellow-400 transition-colors">Beranda</Link></li>
            <li><Link href="/profil" className="hover:text-yellow-400 transition-colors">Profil Sekolah</Link></li>
            <li><Link href="/berita" className="hover:text-yellow-400 transition-colors">Berita Sekolah</Link></li>
            <li><Link href="/galeri" className="hover:text-yellow-400 transition-colors">Galeri Kegiatan</Link></li>
            <li><Link href="/spmb" className="hover:text-yellow-400 transition-colors">Pendaftaran SPMB 2026</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Hubungi Kami</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <span>PQWW+X33, Jl. Jemb. Sel., Pulo, Kec. Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12140</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-blue-500 shrink-0" />
              <span>(021) 7228205</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-blue-500 shrink-0" />
              <span>sdnpulo01pagi@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Map Location - FIX: pakai embed URL baru yang langsung ke titik lokasi SDN Pulo 01 Pagi */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Lokasi Sekolah</h4>
          <div className="w-full h-40 bg-slate-800 rounded-xl overflow-hidden relative border border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4265.606406283503!2d106.79259147531194!3d-6.252608993735871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f172da70838f%3A0xd9f4d35e92033aa5!2sSDN%20PULO%2001%20PAGI!5e1!3m2!1sid!2sid!4v1773603652176!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 SDN Pulo 01 Pagi. Seluruh Hak Cipta Dilindungi.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300">Kebijakan Privasi</a>
          <a href="#" className="hover:text-slate-300">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
}