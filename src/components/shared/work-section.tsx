'use client';

import { useLayoutEffect, useRef, useState } from 'react';
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
        { opacity: 0, y: 64 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1, // Makes the animation smooth and linked to scroll
            once: true, // Run the animation only once
          },
        }
      );

      // Set initial state for project items
      const projectItems = gsap.utils.toArray<HTMLElement>('.project-item');
      gsap.set(projectItems, { opacity: 0, y: 64 });

      // Batch animate project items. Each item will be its own trigger.
      ScrollTrigger.batch(projectItems, {
        start: 'top 85%', // Start when the top of an item is 85% from the top of the viewport
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power2.out',
            stagger: 0.2,
          }),
        once: true, // Run the animation only once for each batch
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mt-[72px] px-4 md:mt-40 md:px-8">
      <header ref={headerRef} className="mb-12">
        <h2 className="text-base font-bold uppercase leading-none text-[#919191] md:text-xl">
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
              className="project-item tablet-project-item grid grid-cols-1 items-center gap-6 border-t border-[#DCDCDC] py-8 lg:grid-cols-2 lg:gap-12"
            >
              {/* Left Column */}
              <div className="tablet-project-content flex flex-col justify-center space-y-8 lg:space-y-10">
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className={cn(
                        'flex h-10 w-fit shrink-0 items-center justify-center rounded-full border border-[#706F6F] px-3'
                      )}
                    >
                      <span className="text-sm font-bold text-[#706F6F] capitalize leading-[120%]">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 lg:max-w-[720px]">
                  <h3 className="text-2xl font-bold uppercase text-[#030C0C] lg:text-3xl">
                    {project.name}
                  </h3>
                  <p className="text-base font-medium capitalize leading-[150%] text-[#919191] lg:text-xl">
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
                        <img src="/block.svg" alt="Locked" className="w-6 h-6" />
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
              <div className="tablet-project-media order-first flex items-center justify-center lg:order-none">
                {projectImage && (
                  <ProjectMedia
                    imageUrl={projectImage.imageUrl}
                    projectName={project.name}
                    imageHint={projectImage.imageHint}
                    inDevelopment={project.inDevelopment}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectMedia({ 
  imageUrl, 
  projectName, 
  imageHint,
  inDevelopment 
}: { 
  imageUrl: string; 
  projectName: string; 
  imageHint: string;
  inDevelopment?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!inDevelopment) {
      setIsHovered(true);
      setShowTooltip(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && !inDevelopment) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[680/382] rounded-lg overflow-hidden cursor-none group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Image */}
      <Image
        src={imageUrl}
        alt={projectName}
        fill
        unoptimized
        className={cn(
          "object-cover transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )}
        data-ai-hint={imageHint}
      />
      
      {/* Video */}
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        loop
        muted
        playsInline
      >
        <source src="/Slideshow-Loop-[remix] - 720p 30fps.webm" type="video/webm" />
      </video>

      {/* Tooltip - follows cursor, bottom-centered */}
      {showTooltip && !inDevelopment && (
        <div 
          className="pointer-events-none absolute rounded-full bg-[#181818] px-6 py-3 text-base font-bold leading-[120%] capitalize text-[#FCFAFA] shadow-lg"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y + 20}px`, // 20px below cursor
            transform: 'translateX(-50%)', // Center horizontally to cursor
          }}
        >
          View Project
        </div>
      )}
    </div>
  );
}
