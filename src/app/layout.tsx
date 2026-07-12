import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XChat Groups Directory",
  description: "Browse and join public XChat groups. An unofficial directory for X Corp's XChat messaging app.",
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
