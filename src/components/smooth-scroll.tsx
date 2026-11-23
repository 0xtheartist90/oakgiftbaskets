'use client';

import { useEffect } from 'react';

import Lenis from 'lenis';

// Lenis on fine pointers only, and never with reduced motion. Anchor links glide to their section below the bar.
export function SmoothScroll() {
    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduced) return;

        const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.11 });
        let raf = requestAnimationFrame(function tick(t) {
            lenis.raf(t);
            raf = requestAnimationFrame(tick);
        });

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);

    return null;
}
