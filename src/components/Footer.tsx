import Link from 'next/link';
import { MessageSquarePlus, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-auto bg-background/60 backdrop-blur-xl overflow-hidden">
      {/* Subtle Cyan Gradient Top Divider Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10">
          {/* Column 1: Brand & Disclaimer (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-white/5 border border-white/10 p-2 rounded-2xl text-primary">
                <MessageSquarePlus size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                XChat Groups
              </span>
            </div>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              The premier unofficial directory for discovering, sharing, and joining active chat communities on X (formerly Twitter).
            </p>

            <div className="pt-1">
              <p className="text-xs text-muted-foreground/70 leading-relaxed bg-white/5 border border-white/5 rounded-xl p-3 max-w-md">
                <strong className="text-muted-foreground">Disclaimer:</strong> Independent directory not affiliated, endorsed, or connected with X Corp. Group links are user-submitted.
              </p>
            </div>
          </div>

          {/* Column 2: Pages & Legal (5 cols) */}
          <div className="md:col-span-5 md:pl-8">
            <h4 className="font-semibold text-sm text-foreground mb-4 tracking-wide uppercase text-xs text-primary/90">
              Pages & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors inline-block py-0.5"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors inline-block py-0.5"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors inline-block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors inline-block py-0.5"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full hover:bg-primary/20 transition-all"
                >
                  Submit Group
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Contact Bar (No Duplicate Links) */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-3">
          <p>© {new Date().getFullYear()} XChat Groups Directory. All rights reserved.</p>
          <a
            href="mailto:admin@xchatgroups.chat"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Mail size={13} className="text-primary" />
            <span>admin@xchatgroups.chat</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
