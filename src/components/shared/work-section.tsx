'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects } from '@/lib/projects-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const fixedWidthTags = ['SaaS', 'B2B', 'B2C'];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    // A guard to ensure all refs are mounted
    if (!sectionRef.current || !headerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animate the header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1, // Makes the animation smooth and linked to scroll
          },
        }
      );

      // Animate each project item as it scrolls into view
      const projectItems = gsap.utils.toArray('.project-item');
      projectItems.forEach((item) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2, // Slower animation
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-40 px-8">
      <header ref={headerRef} className="mb-12">
        <h2 className="text-xl font-bold uppercase leading-none text-[#919191]">
          01 / WORK
        </h2>
      </header>
      <div className="flex flex-col">
        {projects.map((project, index) => {
          const projectImage = PlaceHolderImages.find(
            (p) => p.id === project.imageId
          );

          return (
            <div
              key={project.id}
              className="project-item grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 border-t border-[#DCDCDC]"
            >
              {/* Left Column */}
              <div className="flex flex-col justify-center space-y-10">
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className={cn(
                        'flex items-center justify-center h-10 border border-[#706F6F] rounded-full',
                        fixedWidthTags.includes(tag) ? 'w-20' : 'px-4'
                      )}
                    >
                      <span className="text-sm font-bold text-[#706F6F] capitalize leading-[120%]">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 lg:max-w-[720px]">
                  <h3 className="text-3xl font-bold uppercase text-[#030C0C]">
                    {project.name}
                  </h3>
                  <p className="text-xl font-medium text-[#919191] capitalize leading-[150%]">
                    {project.description}
                  </p>
                </div>

                <div>
                  {project.inDevelopment ? (
                    <div className="flex items-center gap-4">
                      <Button
                        variant="secondary"
                        disabled
                        className="bg-[#E4E4E4] text-[#030C0C] font-bold text-base leading-[120%] capitalize rounded-full h-12 px-6 hover:bg-[#E4E4E4] disabled:opacity-100"
                      >
                        In Development
                      </Button>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E4E4E4]">
                        <Lock className="w-6 h-6 text-[#030C0C]" />
                      </div>
                    </div>
                  ) : (
                    <Button className="w-[136px] h-12 rounded-full bg-[#181818] text-[#FCFAFA] font-bold text-base leading-[120%] capitalize hover:bg-[#181818]/90">
                      View Project
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex items-center justify-center">
                {projectImage && (
                  <div className="relative w-full aspect-[680/382] rounded-lg overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover"
                      data-ai-hint={projectImage.imageHint}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
