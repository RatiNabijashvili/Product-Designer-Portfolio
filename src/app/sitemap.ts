import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified: '2026-08-29' },
    { url: absoluteUrl('/projects/hapttic'), lastModified: '2026-08-29' },
    { url: absoluteUrl('/projects/noxtton-wallet'), lastModified: '2026-08-29' },
    { url: absoluteUrl('/projects/white-square'), lastModified: '2026-08-29' },
  ];
}
