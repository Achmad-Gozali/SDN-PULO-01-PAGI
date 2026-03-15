import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CheckCircle, 
  Target, 
  BookOpen, 
  Monitor, 
  HeartPulse, 
  Dribbble, 
  Users, 
  Home, 
  User,
  Award,
  Calendar,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function ProfilePage() {
  const missions = [
    "Menyelenggarakan proses pembelajaran yang aktif, kreatif, efektif, dan menyenangkan.",
    "Menanamkan nilai-nilai keagamaan dan budi pekerti luhur dalam kehidupan sehari-hari.",
    "Mengembangkan potensi akademik dan non-akademik siswa secara optimal.",
    "Membangun lingkungan sekolah yang bersih, sehat, hijau, dan kondusif.",
    "Menjalin kerjasama yang harmonis antara sekolah, orang tua, dan masyarakat."
  ];

  const facilities = [
    { name: "Ruang Kelas", icon: Home, desc: "Ruang belajar yang nyaman dan ber-AC untuk mendukung fokus siswa." },
    { name: "Perpustakaan", icon: BookOpen, desc: "Koleksi buku lengkap untuk menumbuhkan minat baca sejak dini." },
    { name: "Lab Komputer", icon: Monitor, desc: "Fasilitas IT modern untuk pengenalan teknologi informasi." },
    { name: "UKS", icon: HeartPulse, desc: "Layanan kesehatan sekolah yang siap siaga bagi seluruh siswa." },
    { name: "Lapangan Olahraga", icon: Dribbble, desc: "Area luas untuk kegiatan olahraga dan upacara bendera." },
    { name: "Mushola", icon: Users, desc: "Sarana ibadah yang bersih untuk pembinaan karakter religius." }
  ];

  const teachers = [
    { name: "Hj. Siti Aminah, M.Pd", role: "Kepala Sekolah", desc: "Memimpin dengan visi untuk kemajuan pendidikan dasar." },
    { name: "Budi Santoso, S.Pd", role: "Guru Kelas 6", desc: "Berpengalaman dalam membimbing siswa menghadapi ujian akhir." },
    { name: "Dewi Lestari, S.Pd", role: "Guru Kelas 1", desc: "Sabar dan kreatif dalam meletakkan fondasi belajar bagi siswa baru." },
    { name: "Ahmad Fauzi, S.Or", role: "Guru Olahraga", desc: "Membangun semangat kompetitif dan kesehatan fisik siswa." }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Profil SDN Pulo 01 Pagi
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium leading-relaxed">
            Mewujudkan generasi cerdas, berakhlak mulia, dan berkarakter unggul sejak dini.
          </p>
        </div>
      </section>

      {/* 2. Sejarah & Identitas */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
              Sejarah Sekolah
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Dedikasi Pendidikan Sejak Puluhan Tahun</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                SDN Pulo 01 Pagi berdiri dengan semangat untuk memberikan akses pendidikan dasar yang berkualitas bagi masyarakat di wilayah Kebayoran Baru, Jakarta Selatan. Sejak awal berdirinya, sekolah ini telah menjadi rumah kedua bagi ribuan putra-putri bangsa untuk menimba ilmu dan membentuk karakter.
              </p>
              <p>
                Dengan dukungan tenaga pendidik yang berdedikasi dan fasilitas yang terus dikembangkan, kami berkomitmen untuk selalu beradaptasi dengan perkembangan zaman tanpa meninggalkan nilai-nilai luhur budaya bangsa. Perjalanan panjang kami telah melahirkan banyak alumni yang kini berkontribusi di berbagai bidang pembangunan.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="text-blue-600" /> Identitas Sekolah
            </h3>
            <div className="space-y-4">
              {[
                { label: "NPSN", value: "20101234", icon: ShieldCheck },
                { label: "Akreditasi", value: "A (Sangat Baik)", icon: Award },
                { label: "Status", value: "Negeri", icon: CheckCircle },
                { label: "Tahun Berdiri", value: "1978", icon: Calendar },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-blue-500" />
                    <span className="text-sm font-semibold text-slate-500">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visi & Misi */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest">
              Visi & Misi
            </div>
            <h2 className="text-4xl font-black text-slate-900">Arah dan Tujuan Kami</h2>
          </div>

          <div className="bg-blue-900 rounded-[3rem] p-12 mb-16 text-center text-white shadow-2xl shadow-blue-900/20">
            <h3 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-4">Visi</h3>
            <p className="text-2xl md:text-4xl font-bold leading-tight italic">
              &quot;Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Berprestasi, dan Berwawasan Lingkungan.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 h-fit">
                  <Target size={24} />
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {mission}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Fasilitas */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                Fasilitas Pendukung
              </div>
              <h2 className="text-4xl font-black">Sarana Belajar Unggulan</h2>
            </div>
            <p className="text-slate-400 max-w-md">
              Kami menyediakan berbagai fasilitas modern untuk menunjang kegiatan belajar mengajar dan pengembangan bakat siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-all">
                <div className="bg-yellow-400 text-blue-900 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <fac.icon size={32} />
                </div>
                <h4 className="text-xl font-bold mb-3">{fac.name}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Tenaga Pendidik */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
              Tim Kami
            </div>
            <h2 className="text-4xl font-black text-slate-900">Tenaga Pendidik & Staf Kami</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Dibimbing oleh para profesional yang berdedikasi tinggi untuk mencetak generasi masa depan yang gemilang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 text-center hover:shadow-xl transition-all group">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <User size={48} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">{teacher.name}</h4>
                <p className="text-blue-600 text-sm font-bold mb-4 uppercase tracking-wider">{teacher.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {teacher.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
