'use client';

import { useEffect, useSyncExternalStore } from 'react';

import { baskets, cocktails } from '@/lib/site';

// The visitor's order: gift id to quantity, shared by the cards, the nav, the mobile bar and the form. Kept for the
// browser tab only, so a reload does not empty it.

export const gifts = [...baskets, ...cocktails];
export const MAX_QTY = 999;

type Order = Record<string, number>;

const KEY = 'lo-gift-order';
const EMPTY: Order = {};
let order: Order = EMPTY;
let restored = false;
const listeners = new Set<() => void>();

const clamp = (n: number) => (Number.isFinite(n) ? Math.min(MAX_QTY, Math.max(0, Math.floor(n))) : 0);

function commit(next: Order) {
    order = next;
    try {
        sessionStorage.setItem(KEY, JSON.stringify(order));
    } catch {
        // Storage blocked: the order still lives in memory.
    }
    listeners.forEach((l) => l());
}

function restore() {
    if (restored) return;
    restored = true;
    try {
        const saved = JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Record<string, unknown>;
        const next: Order = {};
        for (const g of gifts) {
            const n = clamp(Number(saved[g.id] ?? 0));
            if (n > 0) next[g.id] = n;
        }
        if (Object.keys(next).length) commit({ ...next, ...order });
    } catch {
        // Nothing usable saved.
    }
}

export function setQty(id: string, qty: number) {
    const next = { ...order };
    const n = clamp(qty);
    if (n > 0) next[id] = n;
    else delete next[id];
    commit(next);
}

export const clearOrder = () => commit({});

function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function useOrder() {
    const current = useSyncExternalStore(
        subscribe,
        () => order,
        () => EMPTY
    );
    useEffect(restore, []);

    const lines = gifts.filter((g) => current[g.id] > 0).map((gift) => ({ gift, qty: current[gift.id] }));

    return {
        order: current,
        lines,
        count: lines.reduce((n, l) => n + l.qty, 0),
        subtotal: lines.reduce((n, l) => n + l.qty * l.gift.price, 0)
    };
}

export const money = (n: number) => `$${n.toLocaleString('en-CA')}`;
