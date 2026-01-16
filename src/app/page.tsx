
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="p-8 font-body">
        <header className="flex justify-between items-center w-full">
          <div className="font-bold text-2xl tracking-wider">LOGO</div>
          <Button
            className="w-40 h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl leading-tight hover:bg-primary/90"
            asChild
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </header>

        {/* This container defines the scrollable "scene" for the animation */}
        <div id="hero-scene" className="relative h-[100vh]">
          {/* This container will be "pinned" by GSAP, making it sticky during the animation */}
          <div id="hero-pin-container" className="sticky top-0 flex flex-col justify-start pt-20 h-screen">
            <div className="relative flex justify-between items-start w-full">
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
              className="relative flex flex-col gap-4 w-full mt-28"
            >
              <div className="relative w-full font-bold text-xl uppercase leading-none">
                <span className="absolute left-0">A</span>
                <span className="text-center block">Quietly</span>
                <span className="absolute right-0 top-0">Confident</span>
              </div>
              <div className="w-full mt-4 @container">
                <h1 className="flex justify-center text-center gap-x-[5.5cqw] font-headline text-[max(4rem,min(13.6cqw,20rem))] leading-[0.8] text-primary uppercase w-full">
                  <span>Product</span>
                  <span>Designer</span>
                </h1>
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
