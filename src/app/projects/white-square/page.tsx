import type { Metadata } from 'next';
import { WhiteSquareProjectPage } from '@/components/projects/white-square-project-page';

export const metadata: Metadata = {
  title: 'White Square — Rati Nabijashvili',
  description: 'White Square real estate website product design case study.',
};

export default function Page() {
  return <WhiteSquareProjectPage />;
}
