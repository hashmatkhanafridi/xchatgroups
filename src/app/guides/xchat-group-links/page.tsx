import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'XChat Group Links: Finding Groups and Checking Invitations';
const description = 'Learn how to browse XChat group links, check invitations, handle links that do not open, and submit your community to the directory.';
const url = 'https://www.xchatgroups.chat/guides/xchat-group-links';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: 'article' },
};

export default function GroupLinksGuide() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-10 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">Home</Link> / Group Link Guide
      </nav>
      <h1 className="text-3xl sm:text-4xl font-bold mb-5">XChat group links: find a community and check its invitation</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">A useful group starts with a shared interest. This independent directory helps you browse user-submitted communities on X and find their invitation links. The group owner controls access; this directory cannot grant membership or restore an invitation.</p>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">Find a group that fits what you want</h2>
        <p>Start with the <Link href="/#categories" className="text-primary underline">category directory</Link>. Read each group description and ask what you want from the conversation: learning a skill, discussing an interest, or meeting other people in that community. A specific description gives you more to work with than a broad promise of an active group.</p>
        <p>Open a listing to see its details and invitation. If you decide to follow it, check the destination and the group information shown on X before joining. Do not assume that every listed community has the same rules, language, or membership requirements.</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">When an invitation does not open</h2>
        <p>A link that reaches a sign-in screen has not yet confirmed whether the invitation works. If you choose to sign in, use the official X app or website and then retry the original invitation. Never enter your password on this directory or on an unfamiliar page claiming to unlock a group.</p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>The link looks incomplete:</strong> compare it with the original invitation. A missing part can send you to the wrong destination.</li>
          <li><strong>You see a post or article:</strong> it may discuss the group without being its invitation. Look for the invitation from the group owner.</li>
          <li><strong>X says the invitation is unavailable:</strong> ask the owner for a current link. Repeatedly opening the same URL cannot restore access.</li>
          <li><strong>The destination is a different group:</strong> stop and <Link href="/contact" className="text-primary underline">report the listing</Link>, including its directory URL and what you saw.</li>
        </ul>
        <p>We cannot determine the cause of every failed invitation. A login requirement, an access restriction, and an invalid link are different outcomes; avoid treating them as interchangeable.</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">What a directory listing tells you</h2>
        <p>A listing describes a submitted community and points to its link. It is not an endorsement by X or a promise about current activity, member behavior, or future availability. Review the group rules and avoid sharing passwords, verification codes, or sensitive personal information with strangers.</p>
        <p>Community descriptions can become outdated. If a listing is inaccurate, send its URL and the correction through our <Link href="/contact" className="text-primary underline">contact page</Link>.</p>
      </section>

      <section className="mt-10 space-y-4 leading-relaxed">
        <h2 className="text-2xl font-bold">Submit your XChat group</h2>
        <p>Use the <Link href="/submit" className="text-primary underline">group submission form</Link> with a current invitation, a clear group name, the closest category, and a description explaining its topic and intended audience. Mention the language or entry requirements when relevant. Avoid unsupported claims about membership, official status, or guaranteed results.</p>
        <p>Submit a link only when you have permission to share it publicly. Check whether the community is already listed before submitting it again. Submissions are reviewed before publication.</p>
      </section>

      <Link href="/#categories" className="inline-block mt-10 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Browse XChat group categories</Link>
    </article>
  );
}
