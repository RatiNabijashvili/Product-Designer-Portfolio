import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/projects/ux-challenges'), lastModified: '2026-11-10' },
    { url: absoluteUrl('/'), lastModified: '2026-11-11' },
    { url: absoluteUrl('/projects/hapttic'), lastModified: '2026-11-11' },
    { url: absoluteUrl('/projects/noxtton-wallet'), lastModified: '2026-11-11' },
    { url: absoluteUrl('/projects/white-square'), lastModified: '2026-11-10' },
  ];
}
