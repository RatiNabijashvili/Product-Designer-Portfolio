
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { HeroVideo } from '@/components/shared/hero-video';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="p-8 font-body">
        <div id="hero-section">
          <header className="flex justify-between items-center w-full">
            <div className="font-bold text-2xl tracking-wider">LOGO</div>
            <Button
              className="w-40 h-14 rounded-full bg-[#181818] text-[#FCFAFA] font-bold text-xl leading-tight hover:bg-[#181818]/90"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </header>

          <div className="mt-20 flex flex-col gap-[112px]">
            {/* Upper Block */}
            <div className="relative flex justify-end items-end w-full h-[40vh]">
              <div className="flex flex-col items-end gap-1 pt-2">
                <span className="font-bold text-base leading-tight">
                  Scroll Me
                </span>
                <ArrowDown className="size-6" />
              </div>
              {/* The video component is positioned absolutely by the animation hook */}
              <HeroVideo />
            </div>

            {/* Bottom Block */}
            <div
              id="works-section-text"
              className="relative flex flex-col gap-4 w-full"
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

        {/* New Works Section */}
        <div id="works-section" className="mt-12">
            {/* The grid that the video will become a background for */}
            <div className="grid grid-cols-2 gap-4 h-[100vh] -mt-32 -z-10">
              <div className="col-span-1 rounded-xl"></div>
              <div className="col-span-1 rounded-xl"></div>
              <div className="col-span-1 rounded-xl"></div>
              <div className="col-span-1 rounded-xl"></div>
            </div>
        </div>
      </main>
    </div>
  );
}
