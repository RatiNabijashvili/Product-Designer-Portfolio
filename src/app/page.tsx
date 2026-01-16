import { Button } from '@/components/ui/button';
import { HeroVideo } from '@/components/shared/hero-video';
import { PhilosophySection } from '@/components/shared/philosophy-section';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="font-body">
        <div className="flex h-screen flex-col p-8">
          <header className="flex w-full items-center justify-between">
            <div className="font-bold tracking-wider text-2xl">LOGO</div>
            <Button
              className="h-14 w-40 rounded-full bg-primary font-bold text-xl leading-tight text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </header>

          {/* This container holds the main hero content and centers it vertically. */}
          <div className="flex flex-grow flex-col justify-center">
            
            {/* The video is now statically positioned to the right */}
            <div className="relative flex w-full justify-end">
               <div className="w-[568px] h-[320px]">
                 <HeroVideo />
               </div>
            </div>

            <div
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

        <PhilosophySection />
      </main>
    </div>
  );
}
