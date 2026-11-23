// Business facts and the 2026 holiday collection, from "Liberty Oak Catering Holiday Baskets.pdf".

export const site = {
    name: 'Liberty Oak Catering & Events',
    url: 'https://libertyoakcateringandevents.com',
    gtmId: 'GTM-KNHTCSVW',
    phone: { display: '416.575.4619', tel: '+14165754619' },
    email: 'melissa@libertygroup.com',
    contactName: 'Melissa',
    address: 'Exhibition Place, 25 British Columbia Rd, Toronto, ON M6K 3C3',
    title: 'Holiday Gift Baskets 2026 | Liberty Oak Catering & Events',
    description:
        'Italian holiday gift baskets and cocktail kits from Liberty Oak Catering & Events in Toronto. Prosecco, Parmigiano, prosciutto, panettone and more, from $215. Call 416.575.4619 to order.'
};

export const delivery = [
    { range: 'Up to 10 km', fee: '$25' },
    { range: '10 to 20 km', fee: '$50' },
    { range: '20 to 30 km', fee: '$75' }
];

export type Product = {
    id: string;
    name: string;
    subtitle: string;
    tier?: string;
    price: number;
    blurb: string;
    inside: string;
    note?: string;
    image: string;
    alt: string;
};

export const baskets: Product[] = [
    {
        id: 'una-dolce-attesa',
        name: 'Una Dolce Attesa',
        subtitle: 'A Sweet Anticipation',
        tier: 'Essential Collection',
        price: 215,
        blurb: 'Prosecco, Italian cheese, prosciutto, preserves and festive sweets. A thoughtful seasonal thank-you.',
        inside: 'Prosecco, cheese crostini, traditional grissini, Allessia rosemary grissini, Romano cheese, sliced Prosciutto Rustico, Martini Nicosie-style olives, fig jam, acacia honey, Allessia almond cantucci biscotti, Falcone pistachio amaretti, Novi extra dark chocolate with caramelized pistachios, whole-hazelnut chocolate, GiGi hard hazelnut nougat, Bauli mini panettone.',
        image: 'una-dolce-attesa',
        alt: 'Una Dolce Attesa gift basket with Prosecco, prosciutto, Romano cheese, olives, fig jam and Italian sweets'
    },
    {
        id: 'insieme-e-piu-bello',
        name: 'Insieme è Più Bello',
        subtitle: 'Better Together',
        tier: 'Signature Collection',
        price: 295,
        blurb: 'Prosecco and red wine with cheeses, charcuterie, antipasti and Italian sweets. Made for sharing.',
        inside: 'Prosecco, red wine, cheese crostini, rosemary crostini, traditional grissini, Cantarelli Parmigiano Reggiano, Romano cheese, Calabrese sausage (hot or mild), sliced Prosciutto Rustico, Frantoi Cutrera chilli pepper extra virgin olive oil, Martini Nicosie-style olives, Pastore sundried tomatoes, fig jam, acacia honey, Allessia almond cantucci biscotti, Novi extra dark chocolate with caramelized pistachios, GiGi hard hazelnut nougat, whole-pistachio chocolate, Falcone pistachio amaretti.',
        image: 'insieme-e-piu-bello',
        alt: 'Insieme è Più Bello gift basket with Prosecco, red wine, Parmigiano Reggiano, Calabrese sausage and antipasti'
    },
    {
        id: 'una-serata-da-ricordare',
        name: 'Una Serata da Ricordare',
        subtitle: 'An Evening to Remember',
        tier: 'Luxe Collection',
        price: 420,
        blurb: 'Prosecco, red and white wine, cheese, charcuterie, truffle specialities, panettone and chocolates.',
        inside: 'Prosecco, red and white wine, cheese and rosemary crostini, rosemary grissini, Parmigiano Reggiano, prosciutto, Calabrese sausage (hot or mild) and mortadella, lemon-infused olive oil, olives and grilled artichokes, mushroom and truffle sauce, truffle salt, fig jam, apricots and fruit in syrup, panettone, pistachio amaretti and almond biscotti, dark chocolates with caramelized pistachios and with orange peel and almonds, torrone hazelnut nougat, whole-pistachio chocolate.',
        image: 'una-serata-da-ricordare',
        alt: 'Una Serata da Ricordare gift basket with three wines, mortadella, truffle sauce, panettone and chocolates'
    },
    {
        id: 'l-arte-di-regalare',
        name: 'L’Arte di Regalare',
        subtitle: 'The Art of Giving',
        tier: 'Prestige Collection',
        price: 535,
        blurb: 'An abundant assortment of wines, cheeses, charcuterie, pantry specialities and Italian holiday sweets.',
        inside: 'Prosecco, red and white wine, cheese and rosemary crostini, traditional and rosemary grissini, Parmigiano Reggiano and Romano cheeses, prosciutto, Calabrese sausage (hot or mild), guanciale and mortadella, lemon and white-truffle-infused olive oils, olives, grilled artichokes, sundried tomatoes and anchovies, mushroom and truffle sauce, truffle salt and Calabrian hot spread, fig jam, acacia honey, apricots, fruit in syrup and peach halves, panettone, pandoro, pistachio amaretti and almond biscotti, dark chocolates with caramelized pistachios and with orange peel and almonds, torrone hazelnut nougat, whole-hazelnut and whole-pistachio chocolates.',
        image: 'l-arte-di-regalare',
        alt: 'L’Arte di Regalare gift basket with Prosecco, red and white wine, pandoro, panettone, cheeses, charcuterie and pantry specialities'
    }
];

export const cocktails: Product[] = [
    {
        id: 'il-fumo',
        name: 'Il Fumo',
        subtitle: 'Smoked Old Fashioned',
        price: 350,
        blurb: 'Whisky, Italian amaro and maple syrup, with a smoker kit, rocks glasses and recipe card.',
        inside: 'Glenlivet whisky (750 mL), Amaro Lucano, individual cocktail smoker and torch, cherry or oak wood chips, 2 crystal-style rocks glasses, large ice cube mould, Dillon’s orange bitters, Jakeman’s Amber maple syrup, printed recipe card.',
        image: 'il-fumo',
        alt: 'Il Fumo smoked Old Fashioned kit with Glenlivet, Amaro Lucano, cocktail smoker and rocks glasses'
    },
    {
        id: 'la-dolce-notte',
        name: 'La Dolce Notte',
        subtitle: 'Italian Espresso Martini',
        price: 275,
        blurb: 'Vodka, amaretto, espresso and vanilla, with coupe glasses, bar tools and recipe card.',
        inside: 'Grey Goose vodka (750 mL), Disaronno Amaretto (375 mL), Nespresso concentrate, Torani vanilla syrup, cocktail foamer, 2 coupe glasses, stainless-steel shaker with strainer, jigger, printed recipe card.',
        image: 'la-dolce-notte',
        alt: 'La Dolce Notte espresso martini kit with Grey Goose, Disaronno, coupe glasses and shaker'
    },
    {
        id: 'fico-e-pistacchio',
        name: 'Fico e Pistacchio',
        subtitle: 'Fig & Pistachio Gin Sour',
        price: 295,
        blurb: 'Gin, fig and pistachio, with coupe glasses, bar tools and recipe card. Inspired by Silk Road at Don Alfonso 1890.',
        inside: 'The Botanist gin (750 mL), fig syrup, pistachio syrup, cocktail foamer, 2 coupe glasses, cocktail shaker with built-in strainer, stainless-steel jigger, printed recipe card.',
        note: 'Fresh lemon is required for preparation and is not included.',
        image: 'fico-e-pistacchio',
        alt: 'Fico e Pistacchio gin sour kit with The Botanist gin, fig and pistachio syrups and coupe glasses'
    }
];

export function orderMailto(product?: Product) {
    const subject = product ? `Holiday order: ${product.name} ($${product.price})` : 'Holiday gift basket order';
    const body = [
        `Hi ${site.contactName},`,
        '',
        product ? `I would like to order: ${product.name} ($${product.price})` : 'I would like to order:',
        'Quantity:',
        'Delivery address:',
        'Preferred delivery date:',
        'Gift message (optional):',
        'My name and phone number:',
        ''
    ].join('\n');

    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Pending with Liberty Oak (2026-11-21). Fill in to show; null or empty keeps the block off the page.
export const pending = {
    /** e.g. 'December 15'. Shows the deadline in the hero, the order section and the mobile bar. */
    orderDeadline: null as string | null,
    /** e.g. 'Every gift includes a personal card with your message.' Shows on the cards and in the form. */
    cardNote: null as string | null,
    /**
     * Where the order form posts JSON. Empty: the form opens a ready-to-send email to Melissa instead.
     * Set NEXT_PUBLIC_ORDER_ENDPOINT (a Formspree URL or this site's own API route) once it is decided.
     */
    orderEndpoint: process.env.NEXT_PUBLIC_ORDER_ENDPOINT ?? ''
};

export type Faq = { q: string; a: string };

// Every answer below comes from the holiday menu PDF.
export const faqs: Faq[] = [
    {
        q: 'How do I order?',
        a: `Call ${site.contactName} at ${site.phone.display}, email ${site.email}, or send the order form on this page. ${site.contactName} confirms the details with you.`
    },
    {
        q: 'How much is delivery?',
        a: 'Delivery is $25 up to 10 km, $50 from 10 to 20 km and $75 from 20 to 30 km. HST and delivery fees are not included in the prices shown.'
    },
    {
        q: 'Can items in a basket change?',
        a: 'Items are subject to availability and may be substituted with an item of similar value.'
    },
    {
        q: 'Is the Calabrese sausage hot or mild?',
        a: 'Your choice. Insieme è Più Bello, Una Serata da Ricordare and L’Arte di Regalare come with Calabrese sausage, hot or mild. Tell us which when you order.'
    },
    {
        q: 'Is everything included in the cocktail kits?',
        a: 'Each kit comes with the spirits, glassware, tools and a printed recipe card. For Fico e Pistacchio, fresh lemon is required for preparation and is not included.'
    },
    {
        q: 'Can I order several gifts at once?',
        a: `Yes. Send ${site.contactName} your list, with which gifts, how many and where each one goes, and the order is put together with you.`
    }
];

// Proposed answers, not yet confirmed by Liberty Oak. Move one into `faqs` once it is confirmed.
export const faqsToConfirm: Faq[] = [
    { q: 'Which days do you deliver?', a: 'Deliveries run Monday to Friday; we confirm the date and window when you order.' },
    { q: 'Who can receive a basket with alcohol?', a: 'Baskets with alcohol must be received by an adult of legal drinking age (19+ in Ontario).' },
    { q: 'Can I pick up my order?', a: 'Pickup is available at Exhibition Place, Toronto.' },
    { q: 'How do I pay?', a: 'Payment is taken when the order is confirmed (credit card, or invoice for companies).' }
];
