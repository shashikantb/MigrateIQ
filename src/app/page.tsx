import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center font-headline" prefetch={false}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
            >
                <path d="M15 13l-3-3a1 1 0 00-1.41 1.41L12.17 16H4a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"></path>
                <path d="M22 17a2 2 0 01-2 2h-1"></path>
                <path d="M20 12v-2h-3"></path>
                <path d="M3 13a1 1 0 00-1 1v2a1 1 0 001 1h1"></path>
                <path d="m19 15-3 3 3 3"></path>
            </svg>
            <span className="sr-only">MigrateQ</span>
            <span className="ml-2 text-lg font-bold">MigrateQ</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Automate Your Cloud Migration with Confidence
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MigrateQ analyzes your existing infrastructure and provides an automated, AI-powered pathway to the cloud, minimizing risk and downtime.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">
                      Start Migration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                   <Link href="/page">
                    <Button size="lg" variant="secondary">
                      View Projects
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full -inset-4 blur-3xl opacity-30"></div>
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="cloud abstract"
                    alt="Hero"
                    className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
                  />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
