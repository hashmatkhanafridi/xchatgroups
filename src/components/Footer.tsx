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
    { name: 'Religion & Spirituality', slug: 'religion-spirituality' },
    { name: 'Motorcycles & Automotive', slug: 'motorcycles-automotive' },
    { name: 'Country Specific', slug: 'country-specific' },
    { name: 'General Chat', slug: 'general-chat' },
  ];

  return (
    <footer className="border-t border-border mt-auto bg-background/40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-bold text-lg text-foreground">XChat Groups Directory</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              The premier unofficial directory for discovering, sharing, and joining active chat communities on X (formerly Twitter).
            </p>
            <p className="text-xs text-muted-foreground/80 leading-relaxed pt-2">
              Disclaimer: We do not own, manage, or verify the content of listed groups. Joining any listed group is done at your own discretion and risk. Not affiliated with X Corp.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Categories & Pages */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">More Categories & Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.slice(7, 12).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-foreground transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border/50">
                <Link href="/about" className="hover:text-foreground transition-colors font-medium">
                  About & Contact
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-foreground transition-colors font-medium">
                  Submit a Group
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Sitemap XML
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} XChat Groups Directory. All rights reserved.</p>
          <p>
            Contact: <a href="mailto:admin@xchatgroups.chat" className="text-primary hover:underline">admin@xchatgroups.chat</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
