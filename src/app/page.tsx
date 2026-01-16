
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="font-body">
        {/* The hero-scene defines the scrollable area for the animation. Its height dictates the animation's duration. */}
        <div id="hero-scene" className="relative h-[100vh]">
          {/* This container is pinned to the top and occupies the full viewport height. */}
          <div
            id="hero-pin-container"
            className="sticky top-0 flex h-screen flex-col p-8"
          >
            <header className="flex w-full items-center justify-between">
              <div className="font-bold tracking-wider text-2xl">LOGO</div>
              <Button
                className="h-14 w-40 rounded-full bg-primary font-bold text-xl leading-tight text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </header>

            {/* This container holds the main animated content and centers it vertically. */}
            <div className="flex flex-grow flex-col justify-center">
              <div className="relative flex w-full items-start justify-between">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-base leading-tight">
                    Scroll Me
                  </span>
                  <ArrowDown className="size-6" />
                </div>
                {/* The HeroVideo component is what will be animated */}
                <HeroVideo />
              </div>

              <div
                id="works-section-text"
                className="relative mt-12 flex w-full flex-col gap-4"
              >
                <div className="relative w-full font-bold text-xl uppercase leading-none">
                  <span className="absolute left-0">A</span>
                  <span className="text-center block">Quietly</span>
                  <span className="absolute right-0 top-0">Confident</span>
                </div>
                <div className="w-full mt-4 @container">
                  <h1 className="flex w-full justify-center gap-x-[5.5cqw] text-center font-headline text-[max(4rem,min(13.6cqw,20rem))] leading-[0.8] text-primary uppercase">
                    <span>Product</span>
                    <span>Designer</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="works-section">
          {/* The video will animate to fill this grid item */}
          <div className="grid grid-cols-1 gap-4">
            <div id="work-item-1" className="rounded-xl h-[100vh] bg-background">
              {/* This space is where the video will land */}
            </div>
          </div>
        </div>
        <PhilosophySection />
      </main>
    </div>
  );
}
