import { ChatIcon, GiftIcon, MailIcon, PhoneIcon, Sprig, TruckIcon } from '@/components/icons';
import { Lightbox, PageEffects } from '@/components/page-effects';
import { ProductImg, largestSrc } from '@/components/product-img';
import { SmoothScroll } from '@/components/smooth-scroll';
import { AddToOrder, OrderLink, ReviewLink } from '@/components/order-controls';
import { OrderForm } from '@/components/order-form';
import { type Product, baskets, cocktails, delivery, faqs, orderMailto, pending, site } from '@/lib/site';

const marquee = [
    'Prosecco',
    'Parmigiano Reggiano',
    'Prosciutto Rustico',
    'Panettone',
    'Truffle Salt',
    'Torrone',
    'Pistachio Amaretti',
    'Mortadella',
    'Acacia Honey',
    'Pandoro',
    'Almond Cantucci',
    'Fig Jam'
];

// Names and titles word for word from the Liberty Oak landing page (copy LO-61 to LO-65).
const about = {
    photos: [
        { name: 'lo-chandelier-event', alt: 'A Liberty Oak gala under chandeliers', cls: 'm-wide' },
        { name: 'lo-grazing', alt: 'Grazing table with grapes and cheese', cls: '' },
        { name: 'lo-canapes', alt: 'Chefs piping canapes', cls: '' },
        { name: 'lo-cocktails-tray', alt: 'A tray of cocktails with dried orange', cls: '' },
        { name: 'lo-table-service', alt: 'Plated dinner service', cls: '' }
    ],
    team: [
        { name: 'Michael Ewing', role: 'Corporate Executive Chef & VP Operations', image: 'team-michael-ewing' },
        { name: 'Davide Ciavattella', role: 'Michelin Chef, Don Alfonso 1890', image: 'team-davide-ciavattella' },
        { name: 'Daniele Corona', role: 'Michelin Chef, DaNico', image: 'team-daniele-corona' },
        { name: 'Christina Brown', role: 'Wine Director, Certified Sommelier', image: 'team-christina-brown' },
        { name: 'Jacob Martin', role: 'Bar Director & 2023 Worldclass Bartender Winner', image: 'team-jacob-martin' }
    ]
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Liberty Oak Holiday Gifting 2026',
    seller: {
        '@type': 'LocalBusiness',
        name: site.name,
        telephone: site.phone.tel,
        email: site.email,
        address: site.address,
        url: site.url
    },
    itemListElement: [...baskets, ...cocktails].map((p) => ({
        '@type': 'Offer',
        price: p.price,
        priceCurrency: 'CAD',
        itemOffered: { '@type': 'Product', name: `${p.name}, ${p.subtitle}`, description: p.blurb }
    }))
};

function CallButton({ where, label = 'Call to Order', className = 'btn btn-gold' }: { where: string; label?: string; className?: string }) {
    return (
        <a href={`tel:${site.phone.tel}`} className={className} data-cta={`call_${where}`}>
            <PhoneIcon />
            <span>{label}</span>
        </a>
    );
}

function ProductCard({ p, kind }: { p: Product; kind: 'basket' | 'cocktail' }) {
    return (
        <article className={`card card-${kind}`} id={p.id} data-reveal>
            <button
                type='button'
                className='card-media'
                data-zoom={largestSrc(p.image)}
                data-alt={p.alt}
                aria-label={`Enlarge photo of ${p.name}`}>
                <ProductImg
                    name={p.image}
                    alt={p.alt}
                    sizes={kind === 'basket' ? '(min-width: 1024px) 560px, 92vw' : '(min-width: 1024px) 400px, 92vw'}
                />
            </button>
            <div className='card-body'>
                {p.tier && <span className='pill'>{p.tier}</span>}
                <h3 className='card-title'>{p.name}</h3>
                <p className='card-sub'>{p.subtitle}</p>
                <p className='card-price'>${p.price}</p>
                <p className='card-blurb'>{p.blurb}</p>
                <details className='inside'>
                    <summary>
                        <span>What&rsquo;s inside</span>
                        <span className='plus' aria-hidden='true' />
                    </summary>
                    <p>{p.inside}</p>
                    {p.note && <p className='inside-note'>{p.note}</p>}
                </details>
                <div className='card-actions'>
                    <a href={`tel:${site.phone.tel}`} className='btn btn-gold' data-cta={`call_${p.id}`}>
                        <PhoneIcon />
                        <span>
                            Call<span className='hide-sm'> to Order</span>
                        </span>
                    </a>
                    <AddToOrder id={p.id} name={p.name} />
                </div>
                <ReviewLink id={p.id} />
                {pending.cardNote && <p className='card-note'>{pending.cardNote}</p>}
            </div>
        </article>
    );
}

export default function Page() {
    return (
        <>
            <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqs.map((f) => ({
                            '@type': 'Question',
                            name: f.q,
                            acceptedAnswer: { '@type': 'Answer', text: f.a }
                        }))
                    })
                }}
            />
            <SmoothScroll />
            <PageEffects />
            <Lightbox />

            <header className='nav'>
                <div className='nav-inner'>
                    <nav className='nav-links' aria-label='Sections'>
                        <a href='#baskets'>Baskets</a>
                        <a href='#cocktails'>Cocktails</a>
                        <a href='#about'>About</a>
                        <a href='#faq'>FAQ</a>
                    </nav>
                    <a href='#top' className='nav-logo' aria-label='Liberty Oak Catering & Events, back to top'>
                        <img src='/images/logo-wide.webp' alt='Liberty Oak' width={615} height={96} />
                    </a>
                    <div className='nav-end'>
                        <OrderLink className='btn btn-ghost btn-sm nav-order' cta='order_nav' />
                        <CallButton where='nav' label={site.phone.display} className='btn btn-gold btn-sm nav-call' />
                        <a
                            href={`tel:${site.phone.tel}`}
                            className='nav-call-icon'
                            data-cta='call_nav_mobile'
                            aria-label={`Call ${site.phone.display} to order`}>
                            <PhoneIcon />
                        </a>
                    </div>
                </div>
            </header>

            <main id='top'>
                {/* Hero */}
                <section className='hero'>
                    <div className='hero-glow' aria-hidden='true' />
                    <div className='hero-inner'>
                        <div className='hero-copy'>
                            <p className='eyebrow'>Holiday Gifting 2026</p>
                            <h1 className='hero-title'>
                                A season
                                <br />
                                of giving.
                            </h1>
                            <Sprig className='sprig' />
                            <p className='hero-lede'>
                                Italian gift baskets and cocktail kits, curated by Liberty Oak Catering &amp; Events and
                                delivered across Toronto.
                            </p>
                            <div className='hero-actions'>
                                <CallButton where='hero' />
                                <a href='#baskets' className='btn btn-ghost'>
                                    View the Collection
                                </a>
                            </div>
                            {pending.orderDeadline && (
                                <p className='deadline'>
                                    Order by {pending.orderDeadline} for delivery before Christmas
                                </p>
                            )}
                            <p className='hero-group'>
                                From the group behind Michelin-starred Don Alfonso 1890 and DaNico.
                            </p>
                            <p className='hero-meta'>
                                Gift baskets from <strong>$215</strong> <span aria-hidden='true'>·</span> Cocktail kits
                                from <strong>$275</strong>
                            </p>
                        </div>
                        <div className='hero-art'>
                            <button
                                type='button'
                                className='hero-basket'
                                data-zoom={largestSrc('l-arte-di-regalare')}
                                data-alt={baskets[3].alt}
                                aria-label='Enlarge photo of L’Arte di Regalare'>
                                <ProductImg
                                    name='l-arte-di-regalare'
                                    alt={baskets[3].alt}
                                    sizes='(min-width: 1024px) 46vw, 90vw'
                                    priority
                                />
                            </button>
                            <p className='hero-caption'>
                                <em>L&rsquo;Arte di Regalare</em> <span aria-hidden='true'>·</span> Prestige Collection
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quick picker */}
                <nav className='picker' aria-label='The collection at a glance'>
                    <ul className='picker-list'>
                        {[...baskets, ...cocktails].map((p) => (
                            <li key={p.id}>
                                <a href={`#${p.id}`} className='picker-item' data-cta={`picker_${p.id}`}>
                                    <span className='picker-img'>
                                        <ProductImg name={p.image} alt='' sizes='120px' />
                                    </span>
                                    <span className='picker-text'>
                                        <span className='picker-name'>{p.name}</span>
                                        <span className='picker-price'>${p.price}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Marquee */}
                <div className='marquee' aria-hidden='true'>
                    <div className='marquee-track'>
                        {[0, 1].map((k) => (
                            <span key={k}>
                                {marquee.map((m) => (
                                    <span key={m} className='marquee-item'>
                                        {m}
                                        <i>✦</i>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Gift baskets */}
                <section className='section section-cream' id='baskets' aria-labelledby='baskets-title'>
                    <div className='wrap'>
                        <div className='section-head' data-reveal>
                            <span className='band'>The Gift Basket Collection</span>
                            <h2 id='baskets-title' className='section-title'>
                                Four baskets, <em>one Italian table.</em>
                            </h2>
                            <p className='section-lede'>
                                Prosecco and wine, Parmigiano and prosciutto, panettone and torrone. Four sizes, from a
                                thoughtful seasonal thank-you to an abundant showpiece.
                            </p>
                        </div>
                        <div className='grid-baskets'>
                            {baskets.map((p) => (
                                <ProductCard key={p.id} p={p} kind='basket' />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cocktail kits */}
                <section className='section section-green' id='cocktails' aria-labelledby='cocktails-title'>
                    <div className='wrap'>
                        <div className='section-head' data-reveal>
                            <span className='band'>The Cocktail Collection</span>
                            <h2 id='cocktails-title' className='section-title'>
                                A bar in a basket, <em>shaken at home.</em>
                            </h2>
                            <p className='section-lede'>
                                Three signature cocktails with the spirits, the glassware, the tools and a printed recipe
                                card. Everything needed for a memorable round.
                            </p>
                        </div>
                        <div className='grid-cocktails'>
                            {cocktails.map((p) => (
                                <ProductCard key={p.id} p={p} kind='cocktail' />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Liberty Oak */}
                <section className='about' id='about' aria-labelledby='about-title'>
                    <div className='wrap'>
                        <div className='about-intro'>
                            <div data-reveal>
                                <span className='band'>Liberty Oak Catering &amp; Events</span>
                                <h2 id='about-title' className='section-title'>
                                    Toronto catering, <em>now in a basket.</em>
                                </h2>
                                <p>
                                    Liberty Oak is full-service catering for corporate events, galas and holiday parties
                                    across Toronto and the GTA, from the group behind Michelin-starred Don Alfonso 1890
                                    and DaNico. This season the same Italian table comes wrapped as a gift.
                                </p>
                            </div>
                            <div className='mosaic' data-reveal>
                                {about.photos.map((ph) => (
                                    <button
                                        key={ph.name}
                                        type='button'
                                        className={`mosaic-item ${ph.cls}`}
                                        data-zoom={largestSrc(ph.name)}
                                        data-alt={ph.alt}
                                        aria-label={`Enlarge photo: ${ph.alt}`}>
                                        <ProductImg name={ph.name} alt={ph.alt} sizes='(min-width: 1024px) 30vw, 50vw' />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <h3 className='team-title' data-reveal>
                            The people <em>behind Liberty Oak</em>
                        </h3>
                        <ul className='team'>
                            {about.team.map((t) => (
                                <li key={t.name} data-reveal>
                                    <ProductImg name={t.image} alt={t.name} sizes='(min-width: 1024px) 220px, 45vw' />
                                    <p className='team-name'>{t.name}</p>
                                    <p className='team-role'>{t.role}</p>
                                </li>
                            ))}
                        </ul>

                        <div className='party' data-reveal>
                            <div>
                                <p className='eyebrow'>Hosting this season?</p>
                                <p className='party-title'>
                                    Liberty Oak also caters <em>holiday parties.</em>
                                </p>
                            </div>
                            <a
                                href='https://book.libertyoakcateringandevents.com/?for=holiday'
                                className='btn btn-ghost'
                                data-cta='holiday_catering'>
                                Holiday Party Catering
                            </a>
                        </div>
                    </div>
                </section>

                {/* Teams & clients */}
                <section className='corporate' aria-labelledby='corp-title'>
                    <div className='wrap corporate-inner' data-reveal>
                        <div>
                            <p className='eyebrow eyebrow-dark'>For clients and teams</p>
                            <h2 id='corp-title' className='corporate-title'>
                                Sending more than one?
                            </h2>
                            <p>
                                Share your list with {site.contactName}: which baskets, how many and where they go. She
                                will put the whole order together with you.
                            </p>
                        </div>
                        <div className='corporate-actions'>
                            <CallButton where='corporate' label={`Call ${site.phone.display}`} className='btn btn-green' />
                            <a href={orderMailto()} className='btn btn-line-dark' data-cta='email_corporate'>
                                <MailIcon />
                                <span>Email {site.contactName}</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* How to order */}
                <section className='section section-cream' id='order' aria-labelledby='order-title'>
                    <div className='wrap'>
                        <div className='section-head' data-reveal>
                            <span className='band'>How to Order</span>
                            <h2 id='order-title' className='section-title'>
                                Three steps <em>to the doorstep.</em>
                            </h2>
                        </div>
                        <ol className='steps'>
                            <li data-reveal>
                                <GiftIcon />
                                <h3>Choose your gift</h3>
                                <p>Pick a basket or cocktail kit from the collection above.</p>
                            </li>
                            <li data-reveal>
                                <ChatIcon />
                                <h3>Call or email</h3>
                                <p>
                                    Reach {site.contactName} at{' '}
                                    <a href={`tel:${site.phone.tel}`} data-cta='call_steps'>
                                        {site.phone.display}
                                    </a>{' '}
                                    or{' '}
                                    <a href={orderMailto()} data-cta='email_steps'>
                                        {site.email}
                                    </a>{' '}
                                    with the address and date.
                                </p>
                            </li>
                            <li data-reveal>
                                <TruckIcon />
                                <h3>We deliver</h3>
                                <p>Delivered within 30 km, with the fee based on distance.</p>
                            </li>
                        </ol>

                        <div className='delivery' data-reveal>
                            <div className='delivery-table'>
                                <h3>Delivery</h3>
                                <dl>
                                    {delivery.map((d) => (
                                        <div key={d.range}>
                                            <dt>{d.range}</dt>
                                            <dd>{d.fee}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                            <ul className='fine'>
                                <li>HST and delivery fees are not included in the prices shown.</li>
                                <li>Items are subject to availability and may be substituted with an item of similar value.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Order form */}
                <section className='section section-green' id='order-form' aria-labelledby='form-title'>
                    <div className='wrap form-grid'>
                        <div className='form-intro' data-reveal>
                            <span className='band'>Order Online</span>
                            <h2 id='form-title' className='section-title'>
                                Start your <em>holiday order.</em>
                            </h2>
                            <p>
                                Tell us what you would like and where it goes. {site.contactName} confirms availability,
                                delivery and payment with you.
                            </p>
                            {pending.orderDeadline && (
                                <p className='deadline'>
                                    Order by {pending.orderDeadline} for delivery before Christmas
                                </p>
                            )}
                            {pending.cardNote && <p className='form-intro-note'>{pending.cardNote}</p>}
                            <div className='form-contact'>
                                <p>Prefer to talk?</p>
                                <a href={`tel:${site.phone.tel}`} data-cta='call_form'>
                                    <PhoneIcon /> {site.phone.display}
                                </a>
                                <a href={orderMailto()} data-cta='email_form'>
                                    <MailIcon /> {site.email}
                                </a>
                            </div>
                        </div>
                        <div className='form-card' data-reveal>
                            <OrderForm />
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className='section section-cream faq-section' id='faq' aria-labelledby='faq-title'>
                    <div className='wrap faq-wrap'>
                        <div className='section-head' data-reveal>
                            <span className='band'>Questions</span>
                            <h2 id='faq-title' className='section-title'>
                                Good to <em>know.</em>
                            </h2>
                        </div>
                        <div className='faq' data-reveal>
                            {faqs.map((f) => (
                                <details key={f.q} className='inside faq-item'>
                                    <summary>
                                        <span>{f.q}</span>
                                        <span className='plus' aria-hidden='true' />
                                    </summary>
                                    <p>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className='closing' aria-labelledby='closing-title'>
                    <div className='wrap closing-inner' data-reveal>
                        <Sprig className='sprig' />
                        <h2 id='closing-title' className='closing-title'>
                            Give something <em>worth gathering around.</em>
                        </h2>
                        <p>Order your holiday gifts with {site.contactName} today.</p>
                        <div className='hero-actions center'>
                            <CallButton where='closing' label={`Call ${site.phone.display}`} />
                            <a href={orderMailto()} className='btn btn-ghost' data-cta='email_closing'>
                                <MailIcon />
                                <span>{site.email}</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className='footer'>
                <div className='wrap footer-inner'>
                    <img src='/images/logo.webp' alt='Liberty Oak Catering & Events' width={520} height={392} className='footer-logo' />
                    <div className='footer-cols'>
                        <div>
                            <h4>Orders</h4>
                            <a href={`tel:${site.phone.tel}`} data-cta='call_footer'>
                                {site.phone.display}
                            </a>
                            <a href={orderMailto()} data-cta='email_footer'>
                                {site.email}
                            </a>
                        </div>
                        <div>
                            <h4>Liberty Oak</h4>
                            <p>{site.address}</p>
                            <a href={site.url} rel='noopener'>
                                Visit the main site
                            </a>
                        </div>
                    </div>
                </div>
                <p className='footer-legal'>© 2026 {site.name}</p>
            </footer>

            {/* Mobile order bar */}
            <div className='mobile-bar'>
                <a href={`tel:${site.phone.tel}`} className='btn btn-gold' data-cta='call_mobile_bar'>
                    <PhoneIcon />
                    <span>Call to Order</span>
                </a>
                <OrderLink className='btn btn-line' cta='order_mobile_bar' />
            </div>
        </>
    );
}
