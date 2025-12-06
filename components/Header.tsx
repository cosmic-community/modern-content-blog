import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-primary">Cosmic Blog</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Latest Posts
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://www.cosmicjs.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Cosmic CMS
          </a>
        </div>
      </div>
    </header>
  );
}