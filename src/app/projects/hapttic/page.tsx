import type { Metadata } from 'next';
import { HaptticCasePage } from '@/components/projects/hapttic-case-page';
import { JsonLd } from '@/components/seo/json-ld';
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages } from '@/lib/site-config';
import { createCreativeWorkStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(seoPages.hapttic);

export default function Page() {
  return <><JsonLd data={createCreativeWorkStructuredData({ name: 'Hapttic brand intelligence SaaS UX case study', description: seoPages.hapttic.description, path: seoPages.hapttic.path, image: seoPages.hapttic.image, keywords: ['Brand intelligence SaaS', 'Dashboard UX', 'Campaign comparison', 'Unified inbox', 'Product design'] })} /><HaptticCasePage /></>;
}
