import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Automate Your Cloud Migration with Confidence
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MigrateIQ analyzes your existing infrastructure and provides an automated, AI-powered pathway to the cloud, minimizing risk and downtime.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
               <Link href="/page">
                <Button size="lg" variant="secondary">
                  View Demo
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
  );
}
