import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Chat Group Links Directory - Find & Join Active X Groups",
  description: "The #1 directory for active X (Twitter) Chat groups. Browse categories, find niche communities, and share your X group links for free.",
  icons: {
    icon: [{ url: '/icon', sizes: '48x48', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: "X Chat Group Links Directory - Find & Join Active X Groups",
    description: "The #1 directory for active X (Twitter) Chat groups. Browse categories, find niche communities, and share your X group links for free.",
    url: "https://xchatgroups.chat",
    siteName: "XChat Groups Directory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col relative overflow-x-hidden`}>
        {/* Decorative Background Blobs for Glassmorphism */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]"></div>
        </div>

        <Header />
        <main className="flex-1 flex flex-col z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
