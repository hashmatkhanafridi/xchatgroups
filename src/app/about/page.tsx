import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About XChat Groups - The Unofficial X Chat Directory',
  description: 'Learn why XChat Groups was built and how our community directory helps you discover active public chat groups on X.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/about',
  },
  openGraph: {
    title: 'About XChat Groups - The Unofficial X Chat Directory',
    description: 'Learn why XChat Groups was built and how our community directory helps you discover active public chat groups on X.',
    url: 'https://www.xchatgroups.chat/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        About XChat Groups
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          I started XChat Groups because I kept running into the same problem myself — X launched XChat, but there was no real way to find groups that matched what I was actually into. You&apos;d stumble across an invite link buried in some random tweet, or someone would DM you one, and that was basically it. No browsing, no categories, nothing.
        </p>

        <p>
          So I built this. It&apos;s a directory — nothing fancier than that. Groups are sorted by category (crypto, gaming, dating, general chat, and a bunch more) so you can actually look through what&apos;s out there instead of hoping the algorithm shows you something.
        </p>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">How listings work</h2>
          <p>
            If you run a group, you can submit it through the form on this site. I go through submissions manually — not everything gets approved automatically, and I do clean out groups that go dead or turn into spam. It&apos;s a small project, so bear with me if it takes a bit for a listing to show up.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">One important thing</h2>
          <p>
            This site isn&apos;t run by X Corp, isn&apos;t affiliated with them, and isn&apos;t an official product. &quot;XChat&quot; is just the name of the feature these groups exist inside of — I&apos;m using it to describe what this directory is for, not claiming any connection to the company. If you&apos;re a group admin and something on here is wrong, or you want a listing taken down, reach out and I&apos;ll sort it out.
          </p>
        </section>
      </div>
    </div>
  );
}
