import type { Metadata } from 'next';
import { HaptticProjectPage } from '@/components/projects/hapttic-project-page';

export const metadata: Metadata = {
  title: 'Hapttic — Rati Nabijashvili',
  description: 'Hapttic brand intelligence platform product design case study.',
};

export default function Page() {
  return <HaptticProjectPage />;
}
