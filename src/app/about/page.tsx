import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About XChat Groups - The Unofficial X Chat Directory',
  description: 'Learn about XChat Groups, the premier independent directory for discovering and joining public chat communities on X (formerly Twitter).',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/about',
  },
  openGraph: {
    title: 'About XChat Groups - The Unofficial X Chat Directory',
    description: 'Learn about XChat Groups, the premier independent directory for discovering and joining public chat communities on X (formerly Twitter).',
    url: 'https://www.xchatgroups.chat/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About XChat Groups',
    description: 'XChat Groups is an independent directory designed to help users find and join active public chat communities on X (formerly Twitter).',
    url: 'https://www.xchatgroups.chat/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'XChat Groups Directory',
      url: 'https://www.xchatgroups.chat',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'admin@xchatgroups.chat',
        contactType: 'customer support',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">About XChat Groups</h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Our Mission</h2>
            <p className="text-base sm:text-lg text-foreground/90 mb-4">
              XChat Groups is the leading independent, user-curated directory built specifically for discovering, sharing, and joining active chat groups on X (formerly Twitter).
            </p>
            <p>
              With thousands of discussions happening across X, finding targeted communities in crypto, tech, sports, business, gaming, and regional topics can be difficult. Our platform simplifies community discovery by categorizing public group links and making them easily accessible in one place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">1. Discover Communities</h3>
                <p className="text-sm">Browse our organized categories or search for niche topics that match your exact interests.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">2. Join Directly</h3>
                <p className="text-sm">Click to open official chat invite links directly inside your X app or browser seamless integration.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-2">3. Submit Your Group</h3>
                <p className="text-sm">Group admins can submit public group links for free to grow their audience and active membership.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Community & Content Moderation</h2>
            <p>
              We maintain high directory standards. Every submitted group link undergoes automated and manual review prior to publication to prevent spam, dead links, or harmful material. Users can report broken links or inappropriate content directly to our admin team.
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-6">
            <h2 className="text-xl font-semibold text-foreground">Disclaimer & Trademarks</h2>
            <p className="text-sm">
              We are an independent directory platform and are <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected with X Corp</strong> or any of its subsidiaries or affiliates.
            </p>
            <p className="text-sm">
              The name &quot;X&quot; as well as related names, marks, emblems, and images are registered trademarks of their respective owners. We do not host or moderate the conversations taking place inside third-party groups. Joining any listed group is done at your own discretion and risk.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact & Abuse Reporting</h2>
            <p className="text-sm mb-3">
              Have questions, feedback, or need to report a broken link or guideline violation? Reach out to our administrative team anytime:
            </p>
            <a
              href="mailto:admin@xchatgroups.chat"
              className="inline-flex items-center text-primary font-medium hover:underline text-base"
            >
              admin@xchatgroups.chat
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
