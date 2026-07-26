import type { Metadata } from 'next';
import { NoxttonWalletProjectPage } from '@/components/projects/noxtton-wallet-project-page';

export const metadata: Metadata = {
  title: 'Noxtton Wallet — Rati Nabijashvili',
  description: 'Noxtton Wallet self-custodial mobile wallet product design case study.',
};

export default function Page() {
  return <NoxttonWalletProjectPage />;
}
