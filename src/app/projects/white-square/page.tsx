import type { Metadata } from 'next';
import { WhiteSquareProjectPage } from '@/components/projects/white-square-project-page';
import { JsonLd } from '@/components/seo/json-ld';
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages } from '@/lib/site-config';
import { createCreativeWorkStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(seoPages.whiteSquare);

export default function Page() {
  return <><JsonLd data={createCreativeWorkStructuredData({ name: 'White Square real estate website UX case study', description: seoPages.whiteSquare.description, path: seoPages.whiteSquare.path, image: seoPages.whiteSquare.image, keywords: ['Real estate website UX', 'Project discovery', 'Website redesign', 'Design system', 'Product design'] })} /><WhiteSquareProjectPage /></>;
}
