import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - XChat Groups Directory',
  description: 'Learn more about XChat Groups, the premier independent directory for discovering public chat communities on X (formerly Twitter).',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/about',
  },
  openGraph: {
    title: 'About Us - XChat Groups Directory',
    description: 'Learn more about XChat Groups, the premier independent directory for discovering public chat communities on X (formerly Twitter).',
    url: 'https://www.xchatgroups.chat/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-center md:text-left">
        About XChat Groups
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Welcome to XChat Groups</h2>
          <p>
            XChat Groups is an independent directory designed to help users discover, share, and join active public chat communities on X (formerly Twitter).
          </p>
          <p>
            Whether you are looking for discussions in crypto, tech, gaming, sports, or business, our platform makes it easy to find niche communities and connect with like-minded people.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Our Purpose</h2>
          <p>
            Finding relevant and active groups across X can be challenging. We organize user-submitted group links into clear categories so you can quickly find active communities that match your interests.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
          <p className="text-sm">
            XChat Groups is an independent directory and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with X Corp or any of its subsidiaries. All trademarks and brand names belong to their respective owners.
          </p>
        </section>
      </div>
    </div>
  );
}
