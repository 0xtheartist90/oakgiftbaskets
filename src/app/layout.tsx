import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import { Playfair_Display } from 'next/font/google';
import Script from 'next/script';

import { site } from '@/lib/site';

import 'lenis/dist/lenis.css';
import './globals.css';

const display = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-display'
});

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url);

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: site.title,
    description: site.description,
    openGraph: {
        type: 'website',
        siteName: site.name,
        locale: 'en_CA',
        title: 'A season of giving. Holiday Gift Baskets 2026',
        description: site.description,
        images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Liberty Oak holiday gift basket' }]
    }
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#263522',
    viewportFit: 'cover'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html lang='en-CA' suppressHydrationWarning>
        <body className={display.variable}>
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
                    height='0'
                    width='0'
                    style={{ display: 'none', visibility: 'hidden' }}
                />
            </noscript>
            {children}
            <Script id='gtm-loader' strategy='afterInteractive'>
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
            </Script>
        </body>
    </html>
);

export default Layout;
