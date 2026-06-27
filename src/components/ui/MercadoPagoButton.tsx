import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { usePreferenceId } from "@/features/checkout/hooks/usePreferenceId";
import type { CartItem } from "@/types/cart";

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
    locale: "es-AR",
});

interface MercadoPagoButtonProps {
    items: CartItem[];
}

export function MercadoPagoButton({ items }: MercadoPagoButtonProps) {
    const { preferenceId, error } = usePreferenceId(items);
    
    return (
        <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <h3 className="font-display font-extrabold text-xl text-ink">Pagar con MercadoPago</h3>
            
            {error ? (
                <div className="text-red-500 font-bold p-4 bg-red-50 rounded-xl w-full max-w-sm text-center">
                    Error al cargar MercadoPago: {error}
                </div>
            ) : preferenceId ? (
                <div className="w-full max-w-sm">
                    <Wallet initialization={{ preferenceId }} />
                </div>
            ) : (
                <div className="animate-pulse bg-line-soft h-12 w-full max-w-sm rounded-xl"></div>
            )}
        </div>
    );
}