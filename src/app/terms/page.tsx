import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - XChat Groups Directory',
  description: 'Read the Terms & Conditions for using XChat Groups directory service and submitting group links.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/terms',
  },
  openGraph: {
    title: 'Terms & Conditions - XChat Groups Directory',
    description: 'Read the Terms & Conditions for using XChat Groups directory service and submitting group links.',
    url: 'https://www.xchatgroups.chat/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-center md:text-left">
        Terms & Conditions
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground/70">Last updated: August 2026</p>
          <p>
            Welcome to XChat Groups. By accessing or using our directory website (https://www.xchatgroups.chat), you agree to comply with and be bound by the following Terms & Conditions.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Directory Service</h2>
          <p>
            XChat Groups provides an unofficial listing directory for public chat groups on X. We do not own, operate, or moderate any third-party groups listed on our site.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Group Submissions</h2>
          <p>
            By submitting a group link to our directory, you represent that the group is public, does not violate any terms of service, and does not contain illegal, harmful, or abusive content. We reserve the right to decline or remove any listing at our discretion.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
          <p>
            Joining third-party chat groups listed on XChat Groups is done entirely at your own risk. We are not responsible for interactions, content, or outcomes resulting from joining any external group.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Questions</h2>
          <p>
            If you have any questions regarding these Terms, please contact us at{' '}
            <a href="mailto:admin@xchatgroups.chat" className="text-primary hover:underline font-medium">
              admin@xchatgroups.chat
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
