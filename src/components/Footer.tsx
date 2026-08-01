import Link from 'next/link';

export function Footer() {
  const categories = [
    { name: 'Crypto & Trading', slug: 'crypto-trading' },
    { name: 'Tech & AI', slug: 'tech-ai' },
    { name: 'Business & Entrepreneurship', slug: 'business-entrepreneurship' },
    { name: 'Sports & Football', slug: 'sports-football' },
    { name: 'Gaming', slug: 'gaming' },
    { name: 'Movies & TV', slug: 'movies-tv' },
    { name: 'Education & Jobs', slug: 'education-jobs' },
    { name: 'Dating & Social', slug: 'dating-social' },
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'News & Current Affairs', slug: 'news-current-affairs' },
  ];

  return (
    <footer className="border-t border-border mt-auto bg-background/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="font-bold text-lg text-foreground">XChat Groups</h3>
            <p className="text-sm text-muted-foreground">
              The premier unofficial directory for discovering, sharing, and joining active chat communities on X (formerly Twitter).
            </p>
            <p className="text-xs text-muted-foreground/80 leading-relaxed pt-1">
              Disclaimer: Independent directory not affiliated with X Corp.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-sm text-foreground mb-3">Popular Categories</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Legal & Site Pages */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Pages & Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-foreground transition-colors">
                  Submit Group
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors text-xs text-muted-foreground/80"
                >
                  Sitemap XML
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} XChat Groups Directory. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
