import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NoxttonCaseSection as Section } from '@/components/projects/noxtton-case-sections';
const swatches = [
  ['#8080FF', '#8080FF'],
  ['#9AE6E7', '#9AE6E7'],
  ['#FF6833', '#FF6833'],
  ['#FBE74D', '#FBE74D'],
  ['#8383A5', '#8383A5'],
];


function ReferenceVisual({
  className,
  src,
  label,
}: {
  className?: string;
  src: string;
  label: string;
}) {
  return (
    <div
      data-gallery-visual
      className={cn('relative overflow-hidden rounded-lg bg-[#E4E4E4]', className)}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1376px"
        className="object-cover"
      />
    </div>
  );
}


export function HaptticOverviewGallery() {
const assetBase = '/Projects/Happtic';
const isNoxtton = false;
const isWhiteSquare = false;
const projectSwatches = swatches;
const projectImageAlts = [          'Hapttic marketing website and analytics dashboard displayed on a laptop',
          'Hapttic website interface icon set',
          'Hapttic pricing plans displayed on a tablet',
          'Hapttic use-cases page displayed on a phone',
          'Hapttic demo booking form and website footer displayed on a phone',
          'Hapttic brand health page with a negative mention alert',
          'Hapttic inbox analysis dashboard showing message volume trends',
          'Hapttic conversation categorization dashboard with smart insights',
          'Hapttic monthly message volume comparison chart',
          'Hapttic campaign mentions comparison chart',
          'Hapttic date range comparison picker',
];
return <>          <section className="mt-12 flex flex-col gap-4" aria-label="Hapttic design gallery">
            <div data-gallery-row>
              <div data-gallery-item="up"><ReferenceVisual src={`${assetBase}/First Image.webp`} label={projectImageAlts[0]} className="aspect-[1376/640] w-full" /></div>
            </div>
            <div data-gallery-row className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
              <div data-gallery-item="left" className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-[304fr_480fr]">
                  <div data-gallery-visual className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#E4E4E4] p-6 md:h-[120px]"><img src={`${assetBase}/First Logo.svg`} alt="" className="h-8 w-auto max-w-[80%] object-contain md:h-10" /></div>
                  <div data-gallery-visual className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#222] p-6 md:h-[120px]"><img src={`${assetBase}/Second Logo.svg`} alt="" className="h-8 w-auto max-w-[80%] object-contain md:h-10" /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-4">
                    <ReferenceVisual src={`${assetBase}/Second image.webp`} label={projectImageAlts[1]} className="aspect-[392/294]" />
                    <ReferenceVisual src={`${assetBase}/Third Image.webp`} label={projectImageAlts[2]} className="aspect-[392/294]" />
                  </div>
                  <div data-gallery-visual className="grid grid-rows-5 gap-2">
                    {projectSwatches.map(([code, color]) => <div key={code} className={cn('flex h-20 items-center justify-center overflow-hidden rounded-lg p-2 font-body text-xl font-bold uppercase leading-[1.2] sm:h-auto sm:min-h-14 sm:text-2xl', (isNoxtton && code !== '#F7F7FF') || (isWhiteSquare && (code === '#283B40' || code === '#161414')) ? 'text-white' : 'text-[#030C0C]')} style={{ backgroundColor: color }}>{code}</div>)}
                  </div>
                </div>
              </div>
              <div data-gallery-item="right" className="h-full">
                <ReferenceVisual src={`${assetBase}/Fourth Image.webp`} label={projectImageAlts[3]} className="aspect-[560/740] h-full lg:aspect-auto" />
              </div>
            </div>
            <div data-gallery-row className="grid gap-4 md:grid-cols-2">
              <div data-gallery-item="up"><ReferenceVisual src={`${assetBase}/Fifth Image.webp`} label={projectImageAlts[4]} className="aspect-[680/510]" />
              </div>
              <div data-gallery-item="up"><ReferenceVisual src={`${assetBase}/Sixth Image.webp`} label={projectImageAlts[5]} className="aspect-[680/510]" />
              </div>
            </div>
          </section>

          <Section title="The Solution">
            <ul className="list-disc space-y-1 pl-6 text-base leading-[1.6] md:text-xl">
              {[
                ['Centralized Dashboard:', 'The redesigned dashboard organizes key brand intelligence data into a clear hierarchy, helping teams understand performance without moving between multiple views.'],
                ['Campaign Comparison:', 'A side-by-side comparison view allows teams to evaluate multiple campaigns and identify differences in performance more efficiently.'],
                ['Unified Inbox:', 'Messages and brand mentions are brought into one structured inbox, making important conversations easier to review and manage.'],
                ['Message Volume Trends:', 'Time-based visualizations help teams identify unusual activity, campaign peaks, and changes in brand conversation over time.'],
                ['Marketing Website:', 'The marketing website was redesigned with a clearer content structure and stronger visual identity to better communicate Hapttic’s capabilities and value.'],
              ].map(([label, description]) => <li key={label} className="pl-1 text-[#474747]"><strong>{label}</strong>{' '}<span className="font-medium text-[#919191]">{description}</span></li>)}
            </ul>
          </Section>

          <section className="mt-12 flex flex-col gap-4" aria-label="Hapttic design gallery">
            <div data-gallery-row className="grid gap-4 md:grid-cols-2">
              <div data-gallery-item="up"><ReferenceVisual src={`${assetBase}/Seventh Image.webp`} label={projectImageAlts[6]} className="aspect-[680/510]" />
              </div>
              <div data-gallery-item="up"><ReferenceVisual src={`${assetBase}/Eigth Image.webp`} label={projectImageAlts[7]} className="aspect-[680/510]" />
              </div>
            </div>
            <div data-gallery-row data-gallery-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div data-gallery-item="left"><ReferenceVisual src={`${assetBase}/Ninth Image.webp`} label={projectImageAlts[8]} className="aspect-[448/336]" />
              </div>
              <div data-gallery-item="left"><ReferenceVisual src={`${assetBase}/Tenth Image.webp`} label={projectImageAlts[9]} className="aspect-[448/336]" />
              </div>
              <div data-gallery-item="left" className="sm:col-span-2 lg:col-span-1">
                <ReferenceVisual src={`${assetBase}/Eleventh Image.webp`} label={projectImageAlts[10]} className="aspect-[448/336]" />
              </div>
            </div>
          </section>

</>;
}
