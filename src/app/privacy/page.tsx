import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - XChat Groups Directory',
  description: 'Read the Privacy Policy for XChat Groups to understand how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://www.xchatgroups.chat/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - XChat Groups Directory',
    description: 'Read the Privacy Policy for XChat Groups to understand how we collect, use, and protect your information.',
    url: 'https://www.xchatgroups.chat/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-center md:text-left">
        Privacy Policy
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground/70">Last updated: August 2026</p>
          <p>
            At XChat Groups, accessible from https://www.xchatgroups.chat, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by XChat Groups and how we use it.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
          <p>
            When you use our website or submit a group link, we may collect minimal information such as the group name, group link, category, description, and optional contact details provided during submission.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>To provide, operate, and maintain our directory website</li>
            <li>To review and publish user-submitted public group links</li>
            <li>To monitor, prevent, and remove abusive or broken links</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Third-Party Links</h2>
          <p>
            Our website contains outbound links to third-party chat groups hosted on X. We do not control or take responsibility for the privacy practices of external websites or groups.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
          <p>
            If you have questions about our Privacy Policy, please contact us at{' '}
            <a href="mailto:admin@xchatgroups.chat" className="text-primary hover:underline font-medium">
              admin@xchatgroups.chat
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
