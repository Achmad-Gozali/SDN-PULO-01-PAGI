import React from "react";
import Link from "next/link";
import { Instagram, Youtube, MapPin, Phone, Mail, GraduationCap } from "lucide-react";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
        {/* School Info */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-white leading-none">SDN PULO 01</span>
              <span className="text-xs font-medium text-blue-400 tracking-wider">PAGI JAKARTA SELATAN</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Mewujudkan generasi yang berakhlak mulia, cerdas, kreatif, dan mandiri melalui pendidikan dasar yang berkualitas.
          </p>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/sdnpulo_01/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram" className="p-1.5 transition-colors hover:text-pink-400">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@sdnpulo01_jaksel?_r=1&_t=ZS-94jjZrHuSFJ" target="_blank" rel="noopener noreferrer"
              aria-label="TikTok" className="p-1.5 transition-colors hover:text-white">
              <TikTokIcon size={20} />
            </a>
            <a href="https://www.youtube.com/@SDNPULO01-nf7yq" target="_blank" rel="noopener noreferrer"
              aria-label="YouTube" className="p-1.5 transition-colors hover:text-red-500">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Tautan Cepat</h4>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/", label: "Beranda" },
              { href: "/profil", label: "Profil Sekolah" },
              { href: "/berita", label: "Berita Sekolah" },
              { href: "/galeri", label: "Galeri Kegiatan" },
              { href: "/spmb", label: "Pendaftaran SPMB 2026" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-yellow-400 transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Hubungi Kami</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed text-xs md:text-sm">PQWW+X33, Jl. Jemb. Sel., Pulo, Kec. Kby. Baru, Jakarta Selatan 12140</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={16} className="text-blue-500 shrink-0" />
              <a href="tel:02172282050" className="hover:text-white transition-colors">(021) 7228205</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={16} className="text-blue-500 shrink-0" />
              <a href="mailto:sdnpulo01pagi@gmail.com" className="hover:text-white transition-colors break-all text-xs md:text-sm">sdnpulo01pagi@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Lokasi Sekolah</h4>
          <div className="w-full h-36 md:h-40 bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4265.606406283503!2d106.79259147531194!3d-6.252608993735871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f172da70838f%3A0xd9f4d35e92033aa5!2sSDN%20PULO%2001%20PAGI!5e1!3m2!1sid!2sid!4v1773603652176!5m2!1sid!2sid"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Lokasi SDN Pulo 01 Pagi" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 text-center">
        <p>© 2026 SDN Pulo 01 Pagi. Seluruh Hak Cipta Dilindungi.</p>
        <div className="flex gap-4">
          <Link href="/kebijakan-privasi" className="hover:text-slate-300">Kebijakan Privasi</Link>
          <Link href="/syarat-ketentuan" className="hover:text-slate-300">Syarat & Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}