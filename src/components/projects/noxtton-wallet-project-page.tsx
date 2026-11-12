'use client';

import { NoxttonFullCase } from '@/components/projects/noxtton-full-case';
import { HaptticProjectPage } from '@/components/projects/hapttic-project-page';
import { ProjectCaseTabs } from '@/components/projects/project-case-tabs';

export function NoxttonWalletProjectPage() {
  return <ProjectCaseTabs id="noxtton" label="Noxtton Wallet">{view => view === 'overview' ? <HaptticProjectPage project="noxtton" /> : <NoxttonFullCase />}</ProjectCaseTabs>;
}
