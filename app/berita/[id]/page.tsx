import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, User, Share2, Facebook, MessageCircle, Twitter, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps { params: Promise<{ id: string }>; }

export default async function BeritaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("berita").select("*").eq("id", id).single();
  if (!post) notFound();

  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://sdnpulo01pagi.sch.id"}/berita/${id}`;
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(post.title + " " + pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`,
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 md:pt-32 pb-6 px-4 md:px-6 max-w-4xl mx-auto">
        <Link href="/berita"
          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 active:opacity-70 transition-all mb-5 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Berita
        </Link>
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              post.category === "PENTING" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            )}>
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs md:text-sm">
              <Calendar size={12} /> {post.date}
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <User size={15} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Penulis</p>
              <p className="text-xs md:text-sm font-bold text-slate-700">{post.author}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock size={12} /> 5 menit baca
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 mb-6 md:mb-12">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-[2rem] overflow-hidden shadow-lg md:shadow-2xl border border-slate-100">
          <Image src={post.image_url} alt={post.title} fill priority className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 md:px-6 pb-14 md:pb-20">
        <div
          className="prose prose-slate prose-sm md:prose-lg max-w-none
            prose-headings:text-slate-900 prose-headings:font-black
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-justify
            prose-strong:text-slate-900 prose-li:text-slate-600
            prose-img:rounded-xl md:prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 md:mt-16 pt-5 border-t border-slate-100 flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-slate-400" />
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">#SDNPulo01</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">#KabarSekolah</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
              <Share2 size={14} /> Bagikan:
            </span>
            <div className="flex gap-2">
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-600 active:scale-95 transition-all">
                <MessageCircle size={18} />
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 active:scale-95 transition-all">
                <Facebook size={18} />
              </a>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="p-2.5 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white active:scale-95 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}