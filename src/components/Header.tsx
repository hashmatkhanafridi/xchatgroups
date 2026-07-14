import Link from 'next/link';
import { MessageSquarePlus } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-background/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-white/5 border border-white/10 p-2 rounded-2xl text-primary group-hover:scale-105 transition-transform">
            <MessageSquarePlus size={24} />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight">
            XChat <span className="hidden sm:inline">Groups</span>
          </span>
        </Link>
        <nav className="flex items-center space-x-3 sm:space-x-4">
          <Link href="/about" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/submit" className="text-sm font-medium bg-primary text-primary-foreground px-4 sm:px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Submit <span className="hidden sm:inline">Group</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
