import { createPreference } from '@/features/checkout/services/mppreference.api';
import { useEffect, useState, useRef } from 'react';
import type { CartItem } from '@/types/cart';

// get cart items from local storage

export function usePreferenceId(items: CartItem[]) {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!items || items.length === 0) return;
        if (hasFetched.current) return;

        hasFetched.current = true;

        const fetchPreferenceId = async () => {
            try {
                const { id } = await createPreference(items);
                
                if (id) {
                    setPreferenceId(id);
                } else {
                    setError('La respuesta del servidor no incluye el ID de preferencia.');
                }
            } catch (err: any) {
                console.error('Error fetching preference ID:', err);
                setError(err.response?.data?.message || err.message || 'Error al obtener la preferencia de pago');
            }
        };
        fetchPreferenceId();
    }, [items]);

    return { preferenceId, error };
}