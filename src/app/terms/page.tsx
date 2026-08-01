import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - XChat Groups Directory',
  description: 'Read the plain-language Terms & Conditions for using XChat Groups directory service and group submission guidelines.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/terms',
  },
  openGraph: {
    title: 'Terms & Conditions - XChat Groups Directory',
    description: 'Read the plain-language Terms & Conditions for using XChat Groups directory service and group submission guidelines.',
    url: 'https://www.xchatgroups.chat/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        Terms & Conditions
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Using this site means you&apos;re okay with the following:
        </p>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">What this site is</h2>
          <p>
            A directory. I list XChat groups submitted by their admins or members. I don&apos;t run, moderate, or control the groups themselves.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">What I don&apos;t guarantee</h2>
          <p>
            Groups can go inactive, change their rules, or get shut down after they&apos;re listed here. I do my best to clean out dead links when I notice them, but I can&apos;t promise every listing is current at all times.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Submitting a group</h2>
          <p>
            Don&apos;t submit groups that are illegal, involve scams, harassment, or anything designed to exploit people. If a listing turns out to be one of these, I&apos;ll remove it — no warning required.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">No liability</h2>
          <p>
            I&apos;m not responsible for anything that happens inside a group you join through this directory. Disputes, bad actors, scams — that&apos;s between you and the group in question, and ultimately falls under X&apos;s own terms of service.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Changes to the site</h2>
          <p>
            I can add, remove, or change how listings work at any time without notice. This is a small, independently run project, not a formal service with an SLA.
          </p>
        </section>

        <div className="pt-4 border-t border-border/50 text-sm text-muted-foreground/70">
          Last updated: August 1, 2026
        </div>
      </div>
    </div>
  );
}
