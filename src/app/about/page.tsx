export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About XChat Groups</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <p className="text-lg text-foreground">
          XChat Groups is an unofficial directory designed to help users find and join public chat communities on X (formerly Twitter).
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">Disclaimer</h2>
        <p>
          We are an independent platform and are <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected with X Corp</strong> or any of its subsidiaries or its affiliates.
        </p>
        <p>
          The name &quot;X&quot;, as well as related names, marks, emblems and images are registered trademarks of their respective owners.
        </p>
        <p>
          We do not own, manage, moderate, or verify the content of any groups listed in this directory. Group links are submitted by users and administrators of those groups. 
          By joining any group listed here, you do so at your own risk. We are not responsible for the content, interactions, or any outcomes that occur within these third-party groups.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">Reporting Abuse or Broken Links</h2>
        <p>
          If you find a group that violates terms of service, contains abusive content, or if a link is broken/dead, please let us know so we can remove it from our directory.
        </p>
        <p>
          Contact us at: <a href="mailto:admin@xchatgroups.chat" className="text-primary hover:underline">admin@xchatgroups.chat</a>
        </p>
      </div>
    </div>
  );
}
