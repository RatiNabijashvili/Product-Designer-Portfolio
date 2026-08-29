import type { Metadata } from 'next';
import { NoxttonWalletProjectPage } from '@/components/projects/noxtton-wallet-project-page';
import { JsonLd } from '@/components/seo/json-ld';
import { createPageMetadata } from '@/lib/seo-metadata';
import { seoPages } from '@/lib/site-config';
import { createCreativeWorkStructuredData } from '@/lib/structured-data';

export const metadata: Metadata = createPageMetadata(seoPages.noxttonWallet);

export default function Page() {
  return <><JsonLd data={createCreativeWorkStructuredData({ name: 'Noxtton Wallet fintech mobile UX case study', description: seoPages.noxttonWallet.description, path: seoPages.noxttonWallet.path, image: seoPages.noxttonWallet.image, keywords: ['Self-custodial wallet', 'Fintech product design', 'Mobile UX', 'EVM wallet', 'Guardian Mode'] })} /><NoxttonWalletProjectPage /></>;
}
