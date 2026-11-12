import NextImage, { type ImageProps } from 'next/image';
import imageManifest from '@/lib/project-image-manifest.json';

type ProjectImageEntry = {
  variants: Array<{ width: number; src: string }>;
  blurDataURL: string;
};
const manifest: Record<string, ProjectImageEntry> = imageManifest;

// Static responsive files avoid sending the full case-study export to phones
// and avoid a cold image-optimizer request on the production host.
export function ProjectImage(props: ImageProps) {
  const entry = typeof props.src === 'string' ? manifest[props.src] : undefined;
  if (!entry) return <NextImage {...props} />;

  const srcSet = entry.variants.map(variant => `${encodeURI(variant.src)} ${variant.width}w`).join(', ');
  const sizes = props.sizes || '100vw';
  return <>
    {props.priority && <link rel="preload" as="image" imageSrcSet={srcSet} imageSizes={sizes} fetchPriority="high" />}
    <picture className="block min-w-0">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} style={{ display: 'none' }} />
      <NextImage
        {...props}
        unoptimized
        priority={false}
        loading={props.priority ? 'eager' : props.loading}
        fetchPriority={props.priority ? 'high' : props.fetchPriority}
        placeholder={props.placeholder || 'blur'}
        blurDataURL={props.blurDataURL || entry.blurDataURL}
      />
    </picture>
  </>;
}
