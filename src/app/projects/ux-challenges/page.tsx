import type { Metadata } from 'next';
import { UxChallengesAnimations } from '@/components/projects/ux-challenges-animations';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/shared/footer';
import { ExploreMoreWork } from '@/components/projects/hapttic-project-page';
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages } from '@/lib/site-config';
import { JsonLd } from '@/components/seo/json-ld';
import { createCreativeWorkStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(seoPages.uxChallenges);

function ChallengeIcon({ name }: { name: string }) {
  return <Image src={`/${name}.svg`} alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0" />;
}

function Visual({ file, alt, small = false, hero = false }: { file: string; alt: string; small?: boolean; hero?: boolean }) {
  return <Image data-project-hero={hero || undefined} data-challenge-visual={!hero && !small || undefined} src={`/Projects/UX-Challenges/${file} Image.webp`} alt={alt} width={hero ? 2880 : small ? 1176 : 2400} height={hero ? 1600 : small ? 882 : 1350} sizes={hero ? '100vw' : small ? '(max-width: 768px) 100vw, 42vw' : '(max-width: 768px) 100vw, 84vw'} priority={hero} unoptimized className={`h-auto w-full ${hero ? '' : 'rounded-lg'}`} />;
}

function Copy({ title, children }: { title: string; children: React.ReactNode }) {
  return <div data-challenge-copy className="my-8 space-y-4 text-base font-medium leading-[1.5] text-[#919191] md:my-12 md:text-xl"><h3 className="text-2xl font-bold uppercase leading-[1.2] text-[#030C0C] md:text-[32px]">{title}</h3>{children}</div>;
}

function Challenge({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-16 md:mt-24"><h2 data-challenge-title className="mb-16 text-center font-headline text-4xl uppercase leading-[1.2] text-[#DCDCDC] md:mb-24 md:text-[72px]">{title}</h2>{children}</section>;
}

function Result({ children }: { children: React.ReactNode }) {
  return <div data-challenge-result className="mt-6"><p className="mb-3 text-base font-medium text-[#919191] md:text-xl">Demonstrable improvement</p><div className="flex flex-col items-center gap-3 rounded-lg border border-[#DCDCDC] px-6 py-8 text-center"><ChallengeIcon name="trophy-dark" /><p className="max-w-3xl text-base font-bold leading-[1.5] md:text-xl">{children}</p></div></div>;
}

const comparisonSteps = [
  { file: 'Sixth', title: 'Start a comparison', text: 'The shopper finds the Compare action on a product page and uses that product as the starting point.' },
  { file: 'Seventh', title: 'Choose what to compare', text: 'The shopper selects which products to compare with the original item and confirms their selection to see the results.' },
  { file: 'Eight', title: 'View the results', text: 'The results open in a read-only modal. To add or remove a product, the shopper has to close it and start over.' },
];

export default function Page() {
  return <UxChallengesAnimations>
    <JsonLd data={createCreativeWorkStructuredData({ name: 'Selected UX Challenges', description: seoPages.uxChallenges.description, path: seoPages.uxChallenges.path, image: seoPages.uxChallenges.image, keywords: ['UX improvements', 'Mobile UX', 'Web UX', 'Product design'] })} />
    <header className="px-4 pt-8 sm:px-8"><nav aria-label="Primary navigation" className="flex items-center justify-between">
      <Link href="/" aria-label="Rati Nabijashvili — Home"><Image src="/Logos/Logo.svg" alt="Rati Nabijashvili" width={153} height={35} className="h-8 w-auto" /></Link>
      <a href="mailto:r.nabijashvili@gmail.com" className="flex h-12 w-32 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground sm:h-14 sm:w-40 sm:text-xl">Contact Me</a>
    </nav></header>
    <main>
      <div data-project-heading className="mb-12 mt-16 flex flex-col gap-4 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold uppercase leading-[1.2] md:text-[32px]">Selected UX Challenges</h1>
        <div className="flex flex-wrap gap-3">{['UX Improvements', 'Mobile & Web'].map(tag => <span key={tag} className="flex h-10 items-center rounded-full border border-[#706F6F] px-3 text-sm font-bold text-[#706F6F]">{tag}</span>)}</div>
      </div>
      <Visual file="First" hero alt="These examples are based on my client work. The screens have been reconstructed using fictional branding and sample content. The explanations reflect my original design decisions." />
      <div className="mx-auto w-full max-w-[2464px] px-4 sm:px-8 md:w-5/6 md:px-0">
        <Challenge title="Problem 1: A primary shopping journey was hidden">
          <Copy title="The problem">
            <p>Customers do not always arrive knowing the exact product they want. Category browsing gives them a starting point: they can explore a relevant part of the catalog before choosing a product.</p>
            <p>In the app, this starting point was buried inside the menu. Users had to navigate through Online Pharmacy before reaching Categories, where they could browse or choose to view all.</p>
            <p>This placed category browsing behind three interactions:</p>
            <ol className="flex flex-col items-stretch gap-3 text-base font-bold text-[#030C0C] sm:flex-row sm:items-center md:text-xl">{[{ label: 'Open Menu', icon: 'cursor' }, { label: 'Online Pharmacy', icon: 'medicine-pill' }, { label: 'Categories', icon: 'layout-grid' }].map(({ label, icon }, i) => <li key={label} className="flex flex-1 flex-col items-center gap-3 sm:flex-row"><span className="flex min-h-14 w-full flex-1 items-center justify-start gap-3 rounded-lg border border-[#DCDCDC] px-3 sm:justify-center"><ChallengeIcon name={icon} />{label}</span>{i < 2 && <><Image src="/arrow-right.svg" alt="" aria-hidden="true" width={24} height={24} className="hidden h-6 w-6 shrink-0 sm:block" /><Image src="/arrow-down.svg" alt="" aria-hidden="true" width={24} height={24} className="h-6 w-6 shrink-0 sm:hidden" /></>}</li>)}</ol>
            <p>Meanwhile, Notifications had a permanent position in the bottom navigation. An important shopping journey required discovering and navigating a hierarchy, while a supporting function remained immediately accessible.</p>
          </Copy>
          <Visual file="Second" alt="Original mobile category journey: open menu, online pharmacy, then categories" />
          <Copy title="The solution">
            <p>I moved Categories into the bottom navigation and relocated Notifications to the top bar.</p>
            <p>This gave category browsing a visible, persistent entry point alongside the other main shopping destinations. Customers could recognize where to browse without first opening a menu and inspecting its contents.</p>
            <p>Notifications remained available, while the primary navigation better reflected the journey from discovering products to purchasing them.</p>
          </Copy>
          <Visual file="Third" alt="Categories in the bottom navigation reduce the entry path from three taps to one tap" />
        </Challenge>
        <Challenge title="Problem 2: More results without enough help choosing">
          <Copy title="The problem">
            <p>The original search experience organized matches into groups such as Products, Categories, Offers and Brands. Users could preview three products, then select “View all” with its result count to display the complete Products group.</p>
            <p>That interaction answered “Show me more products”, but left the harder task unresolved: “Help me find the right one.”</p>
            <p>The selector distinguished result types. Selecting Products removed categories, offers and other content from view, but did not narrow the matching products themselves. For a broad query, users still faced a potentially long list to inspect.</p>
            <p>As the number of matches increased, more of the selection work fell on the user: scanning products, comparing their details and deciding which results were relevant.</p>
          </Copy>
          <Visual file="Fourth" alt="Original grouped search results and an expanded product list without filters" />
          <Copy title="The solution">
            <p>I kept the grouped overview and its existing “View all” actions with result counts, increasing the previews from three to five items per section.</p>
            <p>The main change was the expanded experience. Selecting “View all” opened a dedicated product-results page with relevant filters.</p>
            <p>This gave each stage a clear purpose:</p>
            <div className="grid auto-rows-fr gap-3 text-base font-bold text-[#030C0C] sm:grid-cols-2 md:text-xl"><div className="flex items-center gap-3 rounded-lg border border-[#DCDCDC] p-4"><ChallengeIcon name="grid-maginfying-glass" />Explore Matching Result Types</div><div className="flex items-center gap-3 rounded-lg border border-[#DCDCDC] p-4"><ChallengeIcon name="settings-slider" />Narrow Products With Relevant Filters</div></div>
            <p>Users could progressively reduce the products they needed to inspect instead of relying entirely on scanning the complete list.</p>
          </Copy>
          <Visual file="Fifth" alt="Improved search with five previews and a dedicated product results page with filters" />
          <Result>Users found a relevant product in 60 seconds, down from 90 seconds, reducing discovery time by 33%.</Result>
        </Challenge>
        <Challenge title="Problem 3: Changing a comparison meant starting over">
          <Copy title="The problem">
            <p>Shoppers could start a comparison from a product page, choose another product and view the results in a modal. Once the results appeared, they couldn’t add or remove products. To compare a different option, they had to close the modal and start the flow again.</p>
            <p>The comparison helped shoppers see which materials met their requirements, but it gave them no way to revise their shortlist. For example, if one product turned out to have the wrong dimensions, a shopper couldn’t replace it while keeping the other options in view. They had to close the modal and rebuild the comparison, even though only one choice had changed.</p>
          </Copy>
          <div className="space-y-8">{comparisonSteps.map((step, index) => <div key={step.file} data-comparison-step className="grid items-center gap-6 md:grid-cols-2 md:gap-8"><div className={index === 1 ? 'order-2' : 'order-2 md:order-1'}><Visual file={step.file} small alt={step.title} /></div><div className={`order-1 space-y-2 md:space-y-3 ${index === 1 ? '' : 'md:order-2'}`}><h3 className="text-xl font-bold uppercase">{step.title}</h3><p className="text-base font-medium leading-[1.5] text-[#919191] md:text-xl">{step.text}</p></div></div>)}</div>
          <Copy title="The solution">
            <p>I moved the comparison to a dedicated page with more room to read product details side by side. Shoppers could add or remove products directly from the page and compare up to six products at once.</p>
            <p>They could keep the options they were still considering and replace only the ones they wanted to reconsider. That made comparison useful throughout the decision, even as the shortlist changed.</p>
          </Copy>
          <Visual file="Nineth" alt="Dedicated comparison page with up to six products and controls to add or remove individual products" />
          <Result>Shoppers can revise their shortlist without reselecting products they’ve already reviewed. This keeps the comparison in view and lets them focus on whether the new option meets their requirements.</Result>
        </Challenge>
        <ExploreMoreWork currentProjectId="ux-challenges" />
      </div>
    </main>
    <div className="[&>footer]:!mt-16"><Footer showHomeLink /></div>
  </UxChallengesAnimations>;
}
