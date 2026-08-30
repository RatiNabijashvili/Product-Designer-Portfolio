'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { projects } from '@/lib/projects-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

const supportsProjectHover = () =>
  window.matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine)').matches;

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showProjectCursor, setShowProjectCursor] = useState(false);

  const moveProjectCursor = (clientX: number, clientY: number) => {
    if (!cursorRef.current) return;
    cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
  };

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
            <ProjectItem
              key={project.id}
              project={project}
              projectImage={projectImage}
              onCursorEnter={(event) => {
                moveProjectCursor(event.clientX, event.clientY);
                setShowProjectCursor(true);
              }}
              onCursorMove={(event) => moveProjectCursor(event.clientX, event.clientY)}
              onCursorLeave={() => setShowProjectCursor(false)}
            />
          );
        })}
      </div>
      <div
        ref={cursorRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[#181818] px-6 py-3 text-base font-bold capitalize leading-[120%] text-[#FCFAFA] shadow-lg will-change-transform transition-[transform,opacity] duration-75 ease-out',
          showProjectCursor ? 'opacity-100' : 'opacity-0'
        )}
      >
        View Project
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  projectImage,
  onCursorEnter,
  onCursorMove,
  onCursorLeave,
}: {
  project: (typeof projects)[number];
  projectImage: (typeof PlaceHolderImages)[number] | undefined;
  onCursorEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  onCursorMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onCursorLeave: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (project.inDevelopment || !supportsProjectHover()) return;

    onCursorEnter(event);
    setIsHovered(true);
    void videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!project.inDevelopment) onCursorLeave();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (project.inDevelopment || !supportsProjectHover()) return;
    onCursorMove(event);
  };

  return (
    <div
      className={cn(
        'project-item tablet-project-item relative grid grid-cols-1 items-center gap-6 border-t border-[#DCDCDC] py-8 lg:grid-cols-2 lg:gap-12',
        !project.inDevelopment && 'min-[1201px]:cursor-none'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {(project.id === 'hapttic' || project.id === 'noxtton-wallet' || project.id === 'white-square') && (
        <Link
          href={`/projects/${project.id}`}
          className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C] focus-visible:ring-offset-4 min-[1201px]:cursor-none"
          aria-label={`View ${project.name} project`}
        >
          <span className="sr-only">View {project.name} project</span>
        </Link>
      )}
              {/* Left Column */}
              <div
                className={cn(
                  'tablet-project-content flex flex-col justify-center space-y-8 transition-[padding] duration-500 ease-out lg:space-y-10',
                  isHovered ? 'pl-4' : 'pl-0'
                )}
              >
                <div className="flex flex-wrap gap-2 sm:gap-3">
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
                  <h3 className="text-2xl font-bold uppercase text-[#030C0C] min-[1201px]:text-3xl">
                    {project.name}
                  </h3>
                  <p className="text-base font-medium leading-[150%] text-[#919191] min-[1201px]:text-xl">
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
                    <Button
                      aria-hidden="true"
                      tabIndex={-1}
                      className="pointer-events-none h-12 w-full rounded-full bg-[#181818] px-6 text-base font-bold capitalize leading-[120%] text-[#FCFAFA] min-[1201px]:hidden"
                    >
                      View Project
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div
                className={cn(
                  'tablet-project-media order-first flex items-center justify-center transition-[padding] duration-500 ease-out lg:order-none',
                  isHovered ? 'pr-4' : 'pr-0'
                )}
              >
                {projectImage && (
                  <ProjectMedia
                    videoRef={videoRef}
                    imageUrl={projectImage.imageUrl}
                    projectName={project.name}
                    projectId={project.id}
                    imageHint={projectImage.imageHint}
                    isHovered={isHovered}
                  />
                )}
              </div>

    </div>
  );
}

function ProjectMedia({ 
  videoRef,
  imageUrl, 
  projectName, 
  projectId,
  imageHint,
  isHovered,
}: { 
  videoRef: React.RefObject<HTMLVideoElement | null>;
  imageUrl: string; 
  projectName: string; 
  projectId: string;
  imageHint: string;
  isHovered: boolean;
}) {
  const videoSource = projectId === 'noxtton-wallet'
    ? '/Projects/Noxtton-Wallet/Noxxton-Video.webm'
    : projectId === 'hapttic'
      ? '/Projects/Happtic/Happtic-video.webm'
      : '/Projects/White-Square/WhiteSquare-Video.webm';

  return (
    <div className="group relative aspect-[680/382] w-full overflow-hidden rounded-lg">
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
        <source src={videoSource} type="video/webm" />
      </video>

    </div>
  );
}
