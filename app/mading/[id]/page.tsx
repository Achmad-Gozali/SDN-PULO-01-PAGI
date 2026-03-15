import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { madingPosts } from "@/lib/mading-data";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Facebook, 
  MessageCircle, 
  Twitter,
  Clock,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MadingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = madingPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header / Breadcrumb */}
      <div className="pt-32 pb-8 px-6 max-w-4xl mx-auto">
        <Link 
          href="/mading" 
          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Mading
        </Link>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              post.category === "PENTING" 
                ? "bg-red-100 text-red-700" 
                : "bg-blue-100 text-blue-700"
            )}>
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar size={14} /> {post.date}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Penulis</p>
              <p className="text-sm font-bold text-slate-700">{post.author}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-slate-400 text-sm">
              <Clock size={14} /> 5 menit baca
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div 
          className="prose prose-slate prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black 
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-justify
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-li:text-slate-600
            prose-img:rounded-3xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags & Share */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-slate-400" />
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">#SDNPulo01</span>
              <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">#KabarSekolah</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
              <Share2 size={18} /> Bagikan:
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors">
                <MessageCircle size={20} />
              </button>
              <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white transition-colors">
                <Twitter size={20} />
              </button>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
