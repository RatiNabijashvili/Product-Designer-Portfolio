import NextImage from 'next/image';
import { ProjectImage as Image } from '@/components/shared/project-image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { ExploreMoreWork } from '@/components/projects/hapttic-project-page';
import { UxChallengesAnimations as ProjectPageAnimations } from '@/components/projects/ux-challenges-animations';

const overview = [['Role', 'Product Designer'], ['Timeline', 'Two weeks'], ['Market', 'Georgia'], ['Status', 'Shipped'], ['Industry', 'Real Estate'], ['Team', 'Product Manager, Developers, QA']];
const needs = [
  { icon: 'eye', title: 'Visitors', description: ['Recognizable patterns across', 'different developments'] },
  { icon: 'layers', title: 'Design', description: ['Shared decisions that could be', 'maintained centrally'] },
  { icon: 'code-insert', title: 'Development', description: ['Documented behavior beyond the', 'default desktop screen'] },
];
const decisions = [
  ['Distinguish Developments', 'Give Project Identity And Key Details Clear Visual Roles'],
  ['Support Scanning', 'Separate Primary Information From Supporting Content'],
  ['Accommodate Variation', 'Use A Shared Structure Across Different Project Content'],
  ['Work Across Screen Sizes', 'Define Responsive Behavior Alongside The Desktop Layout'],
];
const outcomes = [
  ['color-palette', 'Shared Typography, Color And Spacing Decisions.'],
  ['layers-two', 'Reusable Components With Configurable Variants'],
  ['page-text', 'Documented States, Validation And Responsive Behavior'],
  ['refresh', 'A Central Reference For Consistent Updates'],
];

function Icon({ name }: { name: string }) {
  return <Image src={`/${name}.svg`} alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0" />;
}

function Visual({ file, height = 1350, alt }: { file: string; height?: number; alt: string }) {
  if (file === 'Fourth') {
    return <picture data-challenge-visual className="block">
      <source media="(max-width: 767px)" srcSet="/Projects/White-Square/Fourth%20Image%20Mobile.webp" width={716} height={360} />
      <NextImage src="/Projects/White-Square/Fourth Image.webp" alt={alt} width={2400} height={height} unoptimized className="h-auto w-full rounded-lg" />
    </picture>;
  }
  const filename = file === 'Second' ? 'Second image.webp' : `${file} Image.webp`;
  return <Image data-challenge-visual src={`/Projects/White-Square/${filename}`} alt={alt} width={2400} height={height} sizes="(max-width: 768px) 100vw, 84vw" loading={file === 'Second' ? 'eager' : 'lazy'} className="h-auto w-full rounded-lg" />;
}

function Section({ title, children, compact = false }: { title: string; children: React.ReactNode; compact?: boolean }) {
  return <section data-challenge-copy className={`mt-12 text-base font-medium leading-[1.5] text-[#919191] md:text-xl ${compact ? 'mb-4' : 'mb-8 md:mb-12'}`}><h2 className="mb-2 text-2xl font-bold uppercase leading-[1.5] md:leading-[1.2] text-[#030C0C] md:mb-3 md:text-[32px]">{title}</h2><div className="space-y-4">{children}</div></section>;
}

export function WhiteSquareProjectPage() {
  return <ProjectPageAnimations>
    <header className="px-4 pt-8 sm:px-8"><nav aria-label="Primary navigation" className="flex items-center justify-between">
      <Link href="/" aria-label="Rati Nabijashvili — Home" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#030C0C]"><Image src="/Logos/Logo.svg" alt="Rati Nabijashvili" width={153} height={35} className="h-8 w-auto" loading="eager" /></Link>
      <a href="mailto:r.nabijashvili@gmail.com" className="flex h-12 w-32 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl">Contact Me</a>
    </nav></header>
    <main>
      <div data-project-heading className="mb-12 mt-16 flex flex-col gap-4 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold uppercase leading-[1.5] md:leading-[1.2] md:text-[32px]">White Square Design System</h1>
        <div className="flex flex-wrap gap-3">{['Real Estate', 'Design System'].map(tag => <span key={tag} className="flex h-10 items-center rounded-full border border-[#706F6F] px-3 text-sm font-bold text-[#706F6F]">{tag}</span>)}</div>
      </div>
      <div data-project-hero className="aspect-[1440/811] w-full overflow-hidden bg-[#E4E4E4]"><video autoPlay muted playsInline loop preload="auto" poster="/Projects/White-Square/First Image.webp" className="block h-full w-full object-cover"><source src="/Projects/White-Square/WhiteSquare-Video.webm" type="video/webm" />Your browser does not support the video tag.</video></div>
      <div className="mx-auto w-full max-w-[2464px] px-4 sm:px-8 md:w-5/6 md:px-0">
        <Section title="One system, distinct projects">
          <p>White Square’s website needed to present multiple residential developments, detailed property information and clear routes to sales. Each project had its own story, but the interface needed to feel like one product.</p>
          <p>As the sole Product Designer, I built a documented Figma system from scratch alongside the website redesign. It connected visual foundations, configurable components and responsive behavior and became the developers’ design reference for the launched website.</p>
          <dl className="!mt-8 grid overflow-hidden rounded-lg border border-[#DCDCDC] sm:grid-cols-2 lg:grid-cols-3">
            {overview.map(([label, value], index) => <div key={label} className={[
              'flex flex-col items-center justify-center gap-1.5 p-8 text-center md:min-h-40',
              index < 5 && 'border-b', index >= 4 && 'sm:border-b-0',
              index % 2 === 0 && 'sm:border-r', index % 3 === 2 && 'lg:border-r-0',
              index % 3 !== 2 && 'lg:border-r', index < 3 && 'lg:border-b', index >= 3 && 'lg:border-b-0',
            ].filter(Boolean).join(' ')}>
              <dt className="text-base font-medium leading-[1.2] text-[#919191] md:text-xl">{label}</dt>
              <dd className="text-xl font-bold leading-[1.4] text-[#030C0C] md:text-2xl">{value}</dd>
            </div>)}
          </dl>
        </Section>
        <Visual file="Second" alt="White Square foundations: Noto Sans Georgian typography, colors, buttons and icon library" />
        <Section title="Designing for differences">
          <p>The website contained repeated patterns, but not identical content. Project names varied in length, imagery differed and developments needed different supporting information.</p>
          <p>The central challenge was deciding what should remain consistent and what should be allowed to change.</p>
          <p>I standardized the visual language and component behavior while using properties, variants and responsive layouts to accommodate variation. This gave individual pages flexibility without requiring every element to be designed independently.</p>
          <p>The system addressed three needs:</p>
          <div className="grid auto-rows-fr gap-3 sm:grid-cols-3">{needs.map(need => <div key={need.title} className="flex flex-col justify-center gap-2 rounded-lg border border-[#DCDCDC] p-6 text-center"><h3 className="flex items-center gap-2 font-bold leading-[1.5] text-[#030C0C] justify-center md:leading-[1.5]"><Icon name={need.icon} />{need.title}</h3><p>{need.description[0]}<br className="hidden md:block" /><span className="md:hidden"> </span>{need.description[1]}</p></div>)}</div>
        </Section>
        <Visual file="Third" height={948} alt="Shared project cards accommodate Filigreen 2, Shartava and Mindeli with different imagery, status and property information" />
        <Section title="Shared visual foundations" compact>
          <p>I defined shared typography and color styles, supported by an 8px-based spacing system.</p>
          <p>Spacing provided a consistent reference for component padding, gaps and separation between content groups. Typography followed a separate, curated scale:</p>
        </Section>
        <Visual file="Fourth" height={480} alt="Curated typography scale: 12, 14, 16, 20, 24, 32, 40 and 48 pixels" />
        <div data-challenge-visual className="mb-8 mt-4 space-y-4 text-base font-medium leading-[1.5] text-[#919191] md:mb-12 md:text-xl"><p>The scale accommodated both detailed property information and larger project storytelling. Shared styles kept those choices connected across the website.</p><p>The important relationship was between the rules and their application: the foundations needed to support dense interface elements as well as spacious, image-led sections.</p></div>
        <Visual file="Fifth" alt="White Square homepage with annotated navigation spacing and layout measurements" />
        <Section title="Clearer project cards">
          <p>Project cards were the system’s most demanding component.</p>
          <p>A name and image provided too little context. Including every property detail would make the cards difficult to scan. I needed a hierarchy that helped visitors decide whether a development deserved further exploration.</p>
          <p>I brought forward project identity, location, status and key characteristics, with deeper information reserved for the project page.</p>
          <p>The component needed to balance:</p>
          <div className="overflow-hidden rounded-lg border border-[#DCDCDC]"><table className="w-full table-fixed text-left text-sm md:text-base"><thead><tr><th scope="col" className="w-1/2 border-b border-r p-3 font-bold md:p-4 md:text-base">Requirement</th><th scope="col" className="border-b p-3 font-bold md:p-4 md:text-base">Design Response</th></tr></thead><tbody className="font-bold text-[#030C0C] md:text-xl md:leading-[1.6]">{decisions.map(([requirement, response], index) => <tr key={requirement}><th scope="row" className={`border-r p-3 md:p-4 ${index < decisions.length - 1 ? 'border-b' : ''}`}>{requirement}</th><td className={`p-3 md:p-4 ${index < decisions.length - 1 ? 'border-b' : ''}`}>{response}</td></tr>)}</tbody></table></div>
          <p>The target was a useful first impression rather than a compressed version of the entire project page.</p>
        </Section>
        <Visual file="Sixth" alt="Project card anatomy: status, imagery, name, location, available apartments, starting price and call to action" />
        <Section title="Flexible components">
          <p>I built the library with Auto Layout, component properties and variants so common differences could be handled within shared components.</p>
          <p>The system covered buttons, form elements, cards, navigation and reusable content patterns. Their definitions included interaction states and responsive behavior, rather than only a default appearance.</p>
          <p>This made the component itself a reference for its supported configurations. Changes could be maintained centrally, while individual instances accommodated the content required by each page.</p>
        </Section>
        <Visual file="Seventh" height={752} alt="Primary, secondary and tertiary button variants in default, hovered and disabled states" />
        <Section title="System outcomes">
          <p>The library was used to implement White Square’s launched website within the two-month redesign.</p>
          <p>It established:</p>
          <div className="grid auto-rows-fr gap-3 sm:grid-cols-2">{outcomes.map(([icon, text]) => <div key={icon} className="flex items-center gap-3 rounded-lg border border-[#DCDCDC] p-4 text-base font-bold text-[#030C0C] md:text-xl"><Icon name={icon} />{text}</div>)}</div>
          <p>Development time savings and future designer onboarding were not measured. The demonstrated outcome is a documented library used by developers in a live website.</p>
        </Section>
        <Visual file="Eigth" alt="Documented form guidance covering labels, placeholders, validation, phone input, focus and responsive behavior" />
        <Section title="Reflection">
          <p>Project cards made the central systems challenge tangible: consistency had to survive real differences in content.</p>
          <p>A component could look coherent in isolation yet become less useful when repeated across developments or adapted to a smaller screen. Its value depended on the hierarchy, variation and behavior defined around it.</p>
          <p>The work reinforced a principle I would carry into larger systems:</p>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-[#DCDCDC] px-6 py-8 text-center text-[#030C0C]"><Icon name="compass" /><p className="max-w-3xl font-bold">Standardize the decisions people should not have to make repeatedly. Make the remaining choices clear.</p></div>
        </Section>
        <ExploreMoreWork currentProjectId="white-square" />
      </div>
    </main>
    <div className="[&>footer]:!mt-16"><Footer showHomeLink /></div>
  </ProjectPageAnimations>;
}
