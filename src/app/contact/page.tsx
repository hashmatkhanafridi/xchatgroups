import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - XChat Groups Directory',
  description: 'Get in touch with the XChat Groups directory team for support, reporting broken links, or business inquiries.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/contact',
  },
  openGraph: {
    title: 'Contact Us - XChat Groups Directory',
    description: 'Get in touch with the XChat Groups directory team for support, reporting broken links, or business inquiries.',
    url: 'https://www.xchatgroups.chat/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-center md:text-left">
        Contact Us
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <p>
            Have a question, feedback, or need assistance? We are here to help. Reach out to our administrative team using the contact details below.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Email Us Directly</h2>
          <p>
            For general inquiries, support, reporting broken links, or moderation requests:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 inline-block">
            <a
              href="mailto:admin@xchatgroups.chat"
              className="text-primary font-semibold text-lg hover:underline"
            >
              admin@xchatgroups.chat
            </a>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Report a Broken Link or Violation</h2>
          <p>
            If you encounter a dead invite link, spam, or a listing that violates community guidelines, please send us the group URL and details via email so we can review and remove it promptly.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Submitting a Group</h2>
          <p>
            Looking to list your XChat group in our directory? You can submit your group link directly for free using our{' '}
            <a href="/submit" className="text-primary hover:underline font-medium">
              Submit Form
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
