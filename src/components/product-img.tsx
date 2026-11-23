import manifest from '@/lib/image-manifest.json';

type Entry = { w: number; h: number; variants: { src: string; w: number }[] };

export function imageEntry(name: string) {
    const entry = (manifest as Record<string, Entry>)[name];
    if (!entry) throw new Error(`Missing image: ${name}`);

    return entry;
}

export function largestSrc(name: string) {
    const { variants } = imageEntry(name);

    return variants[variants.length - 1].src;
}

type Props = {
    name: string;
    alt: string;
    sizes: string;
    className?: string;
    priority?: boolean;
};

export function ProductImg({ name, alt, sizes, className, priority }: Props) {
    const { w, h, variants } = imageEntry(name);

    return (
        <img
            src={variants[0].src}
            srcSet={variants.map((v) => `${v.src} ${v.w}w`).join(', ')}
            sizes={sizes}
            width={w}
            height={h}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding='async'
        />
    );
}
