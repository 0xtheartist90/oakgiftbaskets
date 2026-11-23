'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';

import { baskets, cocktails, pending, site } from '@/lib/site';

const gifts = [...baskets, ...cocktails];

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error';

function push(event: string, gift: string) {
    // No names, emails, phone numbers, addresses or messages in the dataLayer: only the gift chosen.
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, gift });
}

export function OrderForm() {
    const [gift, setGift] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const started = useRef(false);

    // "Order" buttons on the gift cards carry data-gift: preselect that gift here.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = (e.target as HTMLElement).closest<HTMLElement>('[data-gift]');
            if (el?.dataset.gift) setGift(el.dataset.gift);
        };
        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, []);

    const onFocus = () => {
        if (started.current) return;
        started.current = true;
        push('gift_order_start', gift || 'none');
    };

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        const chosen = gifts.find((g) => g.id === data.gift);
        const giftLabel = chosen ? `${chosen.name} ($${chosen.price})` : 'Several gifts / not sure yet';

        if (pending.orderEndpoint) {
            setStatus('sending');
            try {
                const res = await fetch(pending.orderEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({ ...data, gift: giftLabel, _subject: `Holiday order: ${giftLabel}` })
                });
                if (!res.ok) throw new Error(String(res.status));
                setStatus('sent');
                push('gift_order_sent', data.gift || 'several');
            } catch {
                setStatus('error');
            }

            return;
        }

        // No endpoint yet: open a ready-to-send email to Melissa with everything filled in.
        const body = [
            `Hi ${site.contactName},`,
            '',
            `I would like to order: ${giftLabel}`,
            `Quantity: ${data.quantity || '1'}`,
            `Delivery address: ${data.address || ''}`,
            `Preferred delivery date: ${data.date || ''}`,
            `Gift message: ${data.message || ''}`,
            `Notes: ${data.notes || ''}`,
            '',
            `${data.name || ''}`,
            `${data.phone || ''}`,
            `${data.email || ''}`
        ].join('\n');
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Holiday order: ${giftLabel}`)}&body=${encodeURIComponent(body)}`;
        setStatus('mail');
        push('gift_order_email', data.gift || 'several');
    }

    if (status === 'sent') {
        return (
            <div className='form-done' role='status'>
                <p className='form-done-title'>Thank you, your order request is in.</p>
                <p>
                    {site.contactName} will be in touch to confirm the details. Questions in the meantime? Call{' '}
                    <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.
                </p>
            </div>
        );
    }

    return (
        <form className='order-form' onSubmit={onSubmit} onFocus={onFocus}>
            <div className='field field-wide'>
                <label htmlFor='f-gift'>Gift</label>
                <select id='f-gift' name='gift' value={gift} onChange={(e) => setGift(e.target.value)} required>
                    <option value='' disabled>
                        Choose a basket or cocktail kit
                    </option>
                    <optgroup label='Gift Baskets'>
                        {baskets.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name} (${g.price})
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label='Cocktail Kits'>
                        {cocktails.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name} (${g.price})
                            </option>
                        ))}
                    </optgroup>
                    <option value='several'>Several gifts / not sure yet</option>
                </select>
            </div>
            <div className='field'>
                <label htmlFor='f-qty'>Quantity</label>
                <input id='f-qty' name='quantity' type='number' min={1} defaultValue={1} inputMode='numeric' />
            </div>
            <div className='field'>
                <label htmlFor='f-date'>Preferred delivery date</label>
                <input id='f-date' name='date' type='date' />
            </div>
            <div className='field field-wide'>
                <label htmlFor='f-address'>Delivery address</label>
                <input id='f-address' name='address' autoComplete='street-address' placeholder='Street, city, postal code' />
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
                <textarea id='f-notes' name='notes' rows={2} placeholder='Hot or mild sausage, several addresses, timing' />
            </div>
            <div className='field-wide form-foot'>
                <button type='submit' className='btn btn-gold' disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending' : 'Send Order Request'}
                </button>
                <p className='form-note'>
                    {pending.orderEndpoint
                        ? `${site.contactName} confirms availability, delivery and payment with you. Nothing is charged yet.`
                        : `This opens an email to ${site.contactName} with your order filled in. Nothing is charged yet.`}
                </p>
                {status === 'mail' && (
                    <p className='form-note form-note-ok' role='status'>
                        Your email app should open now. If it did not, email {site.email} or call {site.phone.display}.
                    </p>
                )}
                {status === 'error' && (
                    <p className='form-note form-note-err' role='alert'>
                        Sending failed. Please call {site.phone.display} or email {site.email}.
                    </p>
                )}
            </div>
        </form>
    );
}
