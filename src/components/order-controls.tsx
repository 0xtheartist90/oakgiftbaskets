'use client';

import { useRef } from 'react';

import { MAX_QTY, setQty, useOrder } from '@/lib/order-store';

export function Stepper({ id, name, qty }: { id: string; name: string; qty: number }) {
    return (
        <div className='stepper' role='group' aria-label={`Quantity of ${name}`}>
            <button
                type='button'
                aria-label={`One fewer ${name}`}
                disabled={qty === 0}
                onClick={() => setQty(id, qty - 1)}>
                <svg viewBox='0 0 16 16' width='14' height='14' aria-hidden='true'>
                    <path d='M2 8h12' stroke='currentColor' strokeWidth='1.6' />
                </svg>
            </button>
            <input
                type='text'
                inputMode='numeric'
                aria-label={`Quantity of ${name}`}
                value={qty}
                onFocus={(e) => e.target.select()}
                onChange={(e) => setQty(id, Number(e.target.value.replace(/\D/g, '')))}
            />
            <button
                type='button'
                data-plus
                aria-label={`One more ${name}`}
                disabled={qty >= MAX_QTY}
                onClick={() => setQty(id, qty + 1)}>
                <svg viewBox='0 0 16 16' width='14' height='14' aria-hidden='true'>
                    <path d='M2 8h12M8 2v12' stroke='currentColor' strokeWidth='1.6' />
                </svg>
            </button>
        </div>
    );
}

/** On a gift card: "Add to Order" first, a quantity stepper once it is in the order. The visitor stays where they are. */
export function AddToOrder({ id, name }: { id: string; name: string }) {
    const { order } = useOrder();
    const box = useRef<HTMLDivElement>(null);
    const qty = order[id] ?? 0;

    const add = () => {
        setQty(id, 1);
        // The button makes way for the stepper: keep keyboard focus in the same place.
        requestAnimationFrame(() =>
            box.current?.querySelector<HTMLButtonElement>('[data-plus]')?.focus({ preventScroll: true })
        );
    };

    return (
        <div className='add-to-order' ref={box}>
            {qty > 0 ? (
                <Stepper id={id} name={name} qty={qty} />
            ) : (
                <button
                    type='button'
                    className='btn btn-line'
                    data-cta={`add_${id}`}
                    onClick={add}
                    aria-label={`Add ${name} to your order`}>
                    <span>Add to Order</span>
                </button>
            )}
        </div>
    );
}

/** Link to the order form; shows how many gifts are in the order. */
export function OrderLink({ className, cta }: { className: string; cta: string }) {
    const { count } = useOrder();

    return (
        <a href='#order-form' className={className} data-cta={cta}>
            <span>{count > 0 ? `Your Order (${count})` : 'Order Online'}</span>
        </a>
    );
}

/** Under the stepper on a card, once something is in the order. */
export function ReviewLink({ id }: { id: string }) {
    const { order, count } = useOrder();
    if (!order[id]) return null;

    return (
        <p className='card-review' role='status'>
            Added. <a href='#order-form'>Review your order ({count})</a>
        </p>
    );
}
