import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';
import { WorkSection } from '@/components/shared/work-section';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="font-body">
        <div className="relative flex h-screen flex-col">
          <header className="flex w-full items-center justify-between p-8">
            <div className="font-bold tracking-wider text-2xl">LOGO</div>
            <Button
              variant="default"
              className="h-14 w-40 rounded-full bg-accent font-bold text-xl leading-tight text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </header>

          {/* This container holds the main hero content and centers it vertically. */}
          <div className="flex flex-grow flex-col justify-center px-8 pt-16">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col items-end gap-2 text-[#030C0C]">
                <span className="font-body text-base font-bold leading-tight">
                  Scroll Me
                </span>
                <ArrowDown className="h-6 w-6" />
              </div>

              <div className="h-[320px] w-[568px]">
                <HeroVideo />
              </div>
            </div>

            <div className="relative mt-12 flex w-full flex-col gap-4">
              <div className="relative w-full font-bold text-xl uppercase leading-none">
                <span className="absolute left-0">A</span>
                <span className="block text-center">Quietly</span>
                <span className="absolute right-0 top-0">Confident</span>
              </div>
              <div className="mt-4 w-full @container">
                <h1 className="flex w-full justify-center gap-x-[5.5cqw] text-center font-headline text-[max(4rem,min(13.6cqw,20rem))] leading-[0.8] uppercase text-primary">
                  <span>Product</span>
                  <span>Designer</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <PhilosophySection />
        <WorkSection />
      </main>
    </div>
  );
}
