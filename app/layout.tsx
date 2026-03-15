import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'SDN Pulo 01 Pagi - Sistem Informasi Terpadu',
  description: 'Website resmi SDN Pulo 01 Pagi. Mewujudkan generasi cerdas, kreatif, dan berkarakter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
