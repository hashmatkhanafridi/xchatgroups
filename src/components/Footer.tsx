import Link from 'next/link';
import { MessageSquarePlus, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-auto bg-background/60 backdrop-blur-xl overflow-hidden">
      {/* Subtle Cyan Gradient Top Divider Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start md:items-center mb-8">
          {/* Column 1: Brand Logo & Title (6 cols) */}
          <div className="md:col-span-6 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl text-primary">
                <MessageSquarePlus size={22} />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                XChat Groups
              </span>
            </div>
          </div>

          {/* Column 2: Pages & Legal (6 cols) */}
          <div className="md:col-span-6 md:pl-8">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-primary/90 mb-3">
              Pages & Legal
            </h4>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li><Link href="/guides/xchat-group-links" className="hover:text-primary transition-colors py-0.5">Group Link Guide</Link></li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors py-0.5"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors py-0.5"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors py-0.5"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full hover:bg-primary/20 transition-all"
                >
                  Submit Group
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Contact Bar */}
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
