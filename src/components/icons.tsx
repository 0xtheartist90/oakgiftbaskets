type P = { className?: string };

export const PhoneIcon = ({ className }: P) => (
    <svg viewBox='0 0 24 24' width='18' height='18' className={className} aria-hidden='true'>
        <path
            d='M6.6 3.5h2.6l1.4 4.1-2 1.5a12 12 0 0 0 6.3 6.3l1.5-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinejoin='round'
        />
    </svg>
);

export const MailIcon = ({ className }: P) => (
    <svg viewBox='0 0 24 24' width='18' height='18' className={className} aria-hidden='true'>
        <rect x='3.5' y='5.5' width='17' height='13' rx='1.5' fill='none' stroke='currentColor' strokeWidth='1.5' />
        <path d='m4 6.5 8 6.2 8-6.2' fill='none' stroke='currentColor' strokeWidth='1.5' />
    </svg>
);

export const GiftIcon = ({ className }: P) => (
    <svg viewBox='0 0 32 32' width='30' height='30' className={className} aria-hidden='true'>
        <g fill='none' stroke='currentColor' strokeWidth='1.2'>
            <rect x='5' y='12' width='22' height='15' />
            <rect x='3.5' y='8.5' width='25' height='4' />
            <path d='M16 8.5V27M16 8.5c-2-4-7-5-7-2s5 2 7 2Zm0 0c2-4 7-5 7-2s-5 2-7 2Z' />
        </g>
    </svg>
);

export const ChatIcon = ({ className }: P) => (
    <svg viewBox='0 0 32 32' width='30' height='30' className={className} aria-hidden='true'>
        <g fill='none' stroke='currentColor' strokeWidth='1.2'>
            <path d='M9.4 5.5h3l1.6 4.6-2.3 1.7a13 13 0 0 0 7 7l1.7-2.3 4.6 1.6v3a2.3 2.3 0 0 1-2.5 2.3A19 19 0 0 1 7 8a2.3 2.3 0 0 1 2.4-2.5Z' />
        </g>
    </svg>
);

export const TruckIcon = ({ className }: P) => (
    <svg viewBox='0 0 32 32' width='30' height='30' className={className} aria-hidden='true'>
        <g fill='none' stroke='currentColor' strokeWidth='1.2'>
            <path d='M3.5 8.5h15v14h-15zM18.5 13.5h5.5l4.5 4.5v4.5h-10z' />
            <circle cx='9' cy='23.5' r='2.3' fill='var(--cream)' />
            <circle cx='23' cy='23.5' r='2.3' fill='var(--cream)' />
        </g>
    </svg>
);

// A sprig of holly-like leaves in gold line, echoing the garland on the printed menu.
export const Sprig = ({ className }: P) => (
    <svg viewBox='0 0 120 24' width='120' height='24' className={className} aria-hidden='true'>
        <g fill='none' stroke='currentColor' strokeWidth='1'>
            <path d='M2 12h46M72 12h46' />
            <path d='M60 4c-4 3-6 6-6 8s2 5 6 8c4-3 6-6 6-8s-2-5-6-8Z' />
            <path d='M50 12c-3-4-7-5-10-4 1 3 5 5 10 4Zm20 0c3-4 7-5 10-4-1 3-5 5-10 4Z' />
        </g>
        <circle cx='60' cy='12' r='1.6' fill='currentColor' />
    </svg>
);
