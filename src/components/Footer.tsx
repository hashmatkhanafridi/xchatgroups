import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            Disclaimer: We do not own, manage, or verify the content of listed groups. Join at your own risk.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This is an unofficial, independent directory and is not affiliated with X Corp.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            About & Contact
          </Link>
          <Link href="/submit" className="text-sm text-muted-foreground hover:text-foreground">
            Submit Group
          </Link>
        </div>
      </div>
    </footer>
  );
}
