'use client';

import { type FormEvent, useRef, useState } from 'react';

import { Stepper } from '@/components/order-controls';
import { ProductImg } from '@/components/product-img';
import { clearOrder, money, useOrder } from '@/lib/order-store';
import { type Product, baskets, cocktails, pending, site } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error';

function push(event: string, items: string[], value: number) {
    // No names, emails, phone numbers, addresses or messages in the dataLayer: only the gifts chosen and their value.
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, gifts: items, value, currency: 'CAD' });
}

function GiftRows({ title, items, order }: { title: string; items: Product[]; order: Record<string, number> }) {
    return (
        <fieldset className='gift-group'>
            <legend>{title}</legend>
            {items.map((g) => {
                const qty = order[g.id] ?? 0;

                return (
                    <div key={g.id} className={qty > 0 ? 'gift-row is-chosen' : 'gift-row'}>
                        <span className='gift-thumb'>
                            <ProductImg name={g.image} alt='' sizes='56px' />
                        </span>
                        <span className='gift-text'>
                            <span className='gift-name'>{g.name}</span>
                            <span className='gift-price'>
                                {money(g.price)}
                                {qty > 1 && ` × ${qty} = ${money(g.price * qty)}`}
                            </span>
                        </span>
                        <Stepper id={g.id} name={g.name} qty={qty} />
                    </div>
                );
            })}
        </fieldset>
    );
}

export function OrderForm() {
    const { order, lines, count, subtotal } = useOrder();
    const [status, setStatus] = useState<Status>('idle');
    const [needsGift, setNeedsGift] = useState(false);
    const started = useRef(false);
    const list = useRef<HTMLDivElement>(null);

    const ids = lines.map((l) => `${l.gift.id}:${l.qty}`);

    const onFocus = () => {
        if (started.current) return;
        started.current = true;
        push('gift_order_start', ids, subtotal);
    };

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (count === 0) {
            setNeedsGift(true);
            list.current?.scrollIntoView({ block: 'center' });
            list.current?.querySelector<HTMLButtonElement>('[data-plus]')?.focus({ preventScroll: true });

            return;
        }
        setNeedsGift(false);

        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        const orderLines = lines.map(
            (l) => `${l.qty} x ${l.gift.name} (${money(l.gift.price)} each) = ${money(l.qty * l.gift.price)}`
        );
        const total = `${money(subtotal)} (before HST and delivery)`;
        const subject =
            lines.length === 1
                ? `Holiday order: ${lines[0].qty} x ${lines[0].gift.name}`
                : `Holiday order: ${count} gifts (${money(subtotal)})`;

        if (pending.orderEndpoint) {
            setStatus('sending');
            try {
                const res = await fetch(pending.orderEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({ ...data, order: orderLines.join('\n'), subtotal: total, _subject: subject })
                });
                if (!res.ok) throw new Error(String(res.status));
                setStatus('sent');
                push('gift_order_sent', ids, subtotal);
                clearOrder();
            } catch {
                setStatus('error');
            }

            return;
        }

        // No endpoint yet: open a ready-to-send email to the catering team with everything filled in.
        const body = [
            `Hi ${site.teamName},`,
            '',
            'I would like to order:',
            ...orderLines,
            `Subtotal: ${total}`,
            '',
            `Delivery address: ${data.address || ''}`,
            `Preferred delivery date: ${data.date || ''}`,
            `Gift message: ${data.message || ''}`,
            `Notes: ${data.notes || ''}`,
            '',
            data.name || '',
            data.phone || '',
            data.email || ''
        ].join('\n');
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('mail');
        push('gift_order_email', ids, subtotal);
    }

    if (status === 'sent') {
        return (
            <div className='form-done' role='status'>
                <p className='form-done-title'>Thank you, your order request is in.</p>
                <p>
                    Our {site.teamName} will be in touch to confirm the details. Questions in the meantime? Call{' '}
                    <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.
                </p>
            </div>
        );
    }

    return (
        <form className='order-form' onSubmit={onSubmit} onFocus={onFocus}>
            <div className='field-wide gift-list' ref={list}>
                <GiftRows title='Gift Baskets' items={baskets} order={order} />
                <GiftRows title='Cocktail Kits' items={cocktails} order={order} />
                {needsGift && count === 0 && (
                    <p className='form-note form-note-err' role='alert'>
                        Choose at least one gift to send your order.
                    </p>
                )}
                <div className='gift-total' aria-live='polite'>
                    <span>
                        Subtotal{count > 0 && `, ${count} ${count === 1 ? 'gift' : 'gifts'}`}
                        <small>HST and delivery not included</small>
                    </span>
                    <strong>{money(subtotal)}</strong>
                </div>
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-date'>Preferred delivery date</label>
                <input id='f-date' name='date' type='date' />
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-address'>Delivery address</label>
                <input
                    id='f-address'
                    name='address'
                    autoComplete='street-address'
                    placeholder='Street, city, postal code'
                    aria-describedby='f-address-hint'
                />
                <p className='form-note' id='f-address-hint'>
                    Sending gifts to different addresses? List which gift goes where in the notes.
                </p>
            </div>
            <div className='field'>
                <label htmlFor='f-name'>Your name</label>
                <input id='f-name' name='name' autoComplete='name' required />
            </div>
            <div className='field'>
                <label htmlFor='f-phone'>Phone</label>
                <input id='f-phone' name='phone' type='tel' autoComplete='tel' required />
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-email'>Email</label>
                <input id='f-email' name='email' type='email' autoComplete='email' required />
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-message'>Gift message (optional)</label>
                <textarea id='f-message' name='message' rows={2} />
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-notes'>Notes (optional)</label>
                <textarea
                    id='f-notes'
                    name='notes'
                    rows={3}
                    placeholder='Hot or mild sausage, several addresses, timing'
                />
            </div>
            <div className='field-wide form-foot'>
                <button type='submit' className='btn btn-gold' disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending' : 'Send Order Request'}
                </button>
                <p className='form-note'>
                    {pending.orderEndpoint
                        ? `Our ${site.teamName} confirms availability, delivery and payment with you. Nothing is charged yet.`
                        : `This opens an email to our ${site.teamName} with your order filled in. Nothing is charged yet.`}
                </p>
                {status === 'mail' && (
                    <p className='form-note form-note-ok' role='status'>
                        Your email app should open now. If it did not, call our {site.teamName} at {site.phone.display}.
                    </p>
                )}
                {status === 'error' && (
                    <p className='form-note form-note-err' role='alert'>
                        Sending failed. Please call our {site.teamName} at {site.phone.display}.
                    </p>
                )}
            </div>
        </form>
    );
}
