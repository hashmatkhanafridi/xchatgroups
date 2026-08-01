import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact - XChat Groups Directory',
  description: 'Reach out to the XChat Groups admin for group reporting, listing takedowns, or general questions.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/contact',
  },
  openGraph: {
    title: 'Contact - XChat Groups Directory',
    description: 'Reach out to the XChat Groups admin for group reporting, listing takedowns, or general questions.',
    url: 'https://www.xchatgroups.chat/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        Contact
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Got a question, want to report a bad group, or need a listing taken down? Reach out at{' '}
          <a
            href="mailto:admin@xchatgroups.chat"
            className="text-primary font-medium hover:underline"
          >
            admin@xchatgroups.chat
          </a>.
        </p>

        <section className="space-y-4 pt-4 border-t border-border/50">
          <p className="text-foreground font-medium">
            A few quick notes before you message me:
          </p>

          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground">Reporting a group</h2>
              <p>
                tell me the group name/link and what&apos;s wrong (scam, dead link, spam, etc.) and I&apos;ll look into it.
              </p>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="text-lg font-semibold text-foreground">Getting your group listed</h2>
              <p>
                use the{' '}
                <Link
                  href="/submit"
                  className="text-primary font-medium hover:underline"
                >
                  Submit Group
                </Link>{' '}
                button instead, it&apos;s faster than emailing me directly.
              </p>
            </div>

            <div className="space-y-1 pt-2">
              <h2 className="text-lg font-semibold text-foreground">Response time</h2>
              <p>
                I run this solo, so give me a bit to get back to you. I do read everything.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
