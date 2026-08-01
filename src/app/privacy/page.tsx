import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - XChat Groups Directory',
  description: 'Read the plain-language Privacy Policy for XChat Groups to understand how your information and group submissions are handled.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - XChat Groups Directory',
    description: 'Read the plain-language Privacy Policy for XChat Groups to understand how your information and group submissions are handled.',
    url: 'https://www.xchatgroups.chat/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        Privacy Policy
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          I don&apos;t collect more than I need to run this thing. Here&apos;s the plain version of what happens with your info:
        </p>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">If you submit a group</h2>
          <p>
            I store whatever you put in the submission form (group name, invite link, category, and any contact info you give me) so I can review it and, if approved, list it. I don&apos;t sell this to anyone or hand it off to third parties for marketing.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">If you just browse the site</h2>
          <p>
            Once analytics are set up, I&apos;ll use basic, aggregated traffic data (things like page views and which categories are popular) to understand what&apos;s working. I&apos;m not tracking you individually or building a profile on you.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
          <p>
            Right now this site doesn&apos;t use tracking cookies. If that changes (say, I add analytics that use them), I&apos;ll update this page to say so.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Third-party links</h2>
          <p>
            Every group listed here is run by someone else, on X&apos;s platform, not by me. Once you click through and join a group, you&apos;re subject to that group&apos;s rules and X&apos;s own privacy policy — not mine.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Changes</h2>
          <p>
            If I update this policy, I&apos;ll update the date below. I&apos;m not going to bury changes or sneak in anything shady.
          </p>
        </section>

        <div className="pt-4 border-t border-border/50 text-sm text-muted-foreground/70">
          Last updated: August 1, 2026
        </div>
      </div>
    </div>
  );
}
