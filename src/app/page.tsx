import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const logoImage = PlaceHolderImages.find(p => p.id === 'logo');
  const heroVideoImage = PlaceHolderImages.find(p => p.id === 'hero-video');

  return (
    <div className="bg-background min-h-screen text-primary antialiased">
      <main className="p-8 font-body max-w-[1440px] mx-auto">
        <header className="flex justify-between items-center w-full">
          {logoImage ? (
            <Image
              src={logoImage.imageUrl}
              alt={logoImage.description}
              width={120}
              height={20}
              data-ai-hint={logoImage.imageHint}
              priority
            />
          ) : (
             <div className="h-5 w-32 bg-muted rounded-sm" />
          )}
          <Button
            className="w-40 h-14 rounded-full bg-accent text-accent-foreground font-bold text-xl leading-tight hover:bg-accent/90"
            asChild
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </header>

        <div className="mt-20 flex flex-col gap-[112px]">
          {/* Upper Block */}
          <section className="flex justify-between items-start w-full">
            <div className="flex items-center gap-1 pt-2">
              <ArrowDown className="size-6" />
              <span className="font-bold text-base leading-tight">
                Scroll Me
              </span>
            </div>
            {heroVideoImage ? (
              <div className="w-[568px] h-[320px] bg-muted rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={heroVideoImage.imageUrl}
                  alt={heroVideoImage.description}
                  width={568}
                  height={320}
                  className="w-full h-full object-cover"
                  data-ai-hint={heroVideoImage.imageHint}
                />
              </div>
            ) : (
                <div className="w-[568px] h-[320px] bg-muted rounded-xl shadow-lg" />
            )}
          </section>

          {/* Bottom Block */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center w-full font-bold text-xl uppercase leading-none">
              <span>A</span>
              <span className="flex-grow text-center">Quietly</span>
              <span>Confident</span>
            </div>
            <div className="w-full mt-4">
              <h1 className="font-headline text-[clamp(4rem,20vw,14rem)] leading-[0.8] text-primary text-center uppercase -tracking-tight">
                Product Designer
              </h1>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
