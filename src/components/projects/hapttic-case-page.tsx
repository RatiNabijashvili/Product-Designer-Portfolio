'use client';

import { HaptticCaseContent } from '@/components/projects/hapttic-case-content';
import { ProjectCaseTabs } from '@/components/projects/project-case-tabs';

export function HaptticCasePage() {
  return <ProjectCaseTabs id="hapttic" label="Hapttic">{view => <HaptticCaseContent full={view === 'full-case'} />}</ProjectCaseTabs>;
}
