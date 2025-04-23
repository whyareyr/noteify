import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StickyNote } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <StickyNote className="h-6 w-6" />
            <span className="text-xl font-bold">Noteify</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your thoughts, organized and summarized
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Capture ideas, organize thoughts, and let AI summarize your notes instantly.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button className="px-8">Get Started</Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline">Log in</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <StickyNote className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Easy Note Taking</h3>
                <p className="text-muted-foreground">
                  Create and edit notes with a clean, intuitive interface. Format text, add links, and organize your thoughts.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <StickyNote className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">AI Summaries</h3>
                <p className="text-muted-foreground">
                  Let AI summarize your lengthy notes into concise summaries, saving you time and helping you focus on what matters.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <StickyNote className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Secure Access</h3>
                <p className="text-muted-foreground">
                  Access your notes from anywhere with secure authentication, ensuring your thoughts are private and protected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Noteify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}