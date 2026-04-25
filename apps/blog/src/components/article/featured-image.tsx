import Image from 'next/image';

interface FeaturedImageProps {
  src: string;
  alt: string;
}

export function FeaturedImage({ src, alt }: FeaturedImageProps) {
  return (
    <div className="aspect-video mb-8 overflow-hidden relative rounded border border-rule/5 shadow-sm">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
