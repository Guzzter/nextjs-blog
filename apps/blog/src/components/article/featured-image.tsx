interface FeaturedImageProps {
  src: string;
  alt: string;
}

export function FeaturedImage({ src, alt }: FeaturedImageProps) {
  return (
    <div className="aspect-video mb-8 overflow-hidden relative rounded border border-rule/5 shadow-sm">
      <img src={src} alt={alt} className="h-full object-cover w-full" />
    </div>
  );
}
