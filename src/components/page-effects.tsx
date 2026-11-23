'use client';

import { useEffect, useState } from 'react';

// Fades [data-reveal] blocks in as they enter the screen, and toggles the solid nav once the hero is passed.
export function PageEffects() {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.add('js');

        const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-in');
                        io.unobserve(e.target);
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );
        items.forEach((el) => io.observe(el));

        const onScroll = () => root.classList.toggle('scrolled', window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            io.disconnect();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return null;
}

// A plain fullscreen lightbox: any element with data-zoom="<src>" opens it.
export function Lightbox() {
    const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>('[data-zoom]');
            if (!el) return;
            e.preventDefault();
            setShot({ src: el.dataset.zoom!, alt: el.dataset.alt ?? '' });
        };
        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        if (!shot) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShot(null);
        document.addEventListener('keydown', onKey);
        document.documentElement.classList.add('lb-open');

        return () => {
            document.removeEventListener('keydown', onKey);
            document.documentElement.classList.remove('lb-open');
        };
    }, [shot]);

    if (!shot) return null;

    return (
        <div className='lightbox' role='dialog' aria-modal='true' aria-label={shot.alt} onClick={() => setShot(null)}>
            <img src={shot.src} alt={shot.alt} />
            <button type='button' className='lightbox-close' aria-label='Close' autoFocus>
                <svg viewBox='0 0 24 24' width='22' height='22' aria-hidden='true'>
                    <path d='M5 5l14 14M19 5L5 19' stroke='currentColor' strokeWidth='1.6' fill='none' />
                </svg>
            </button>
        </div>
    );
}
