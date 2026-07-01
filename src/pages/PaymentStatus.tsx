import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export function PaymentStatus() {
  const [searchParams] = useSearchParams();
  
  const status = searchParams.get('status');
  const paymentId = searchParams.get('payment_id');
  const externalReference = searchParams.get('external_reference');

  const getStatusContent = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle size={64} className="text-lime mx-auto mb-4" />,
          title: '¡Pago Aprobado!',
          message: 'Tu pago se procesó correctamente y estamos preparando tu pedido.',
          bgColor: 'bg-lime/10',
          borderColor: 'border-lime/30'
        };
      case 'rejected':
      case 'cancelled':
        return {
          icon: <XCircle size={64} className="text-red-500 mx-auto mb-4" />,
          title: 'Pago Rechazado',
          message: 'Lo sentimos, hubo un problema al procesar tu pago. Por favor, intenta con otro medio de pago.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'in_process':
      case 'pending':
        return {
          icon: <Clock size={64} className="text-yellow-500 mx-auto mb-4" />,
          title: 'Pago Pendiente',
          message: 'Tu pago está siendo procesado. Te enviaremos un correo cuando se confirme.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          icon: <Clock size={64} className="text-muted mx-auto mb-4" />,
          title: 'Estado Desconocido',
          message: 'No pudimos determinar el estado actual de tu pago, pero puedes revisar tu correo para más detalles.',
          bgColor: 'bg-line-soft',
          borderColor: 'border-line'
        };
    }
  };

  const content = getStatusContent();

  return (
    <main className="flex-1 bg-bg p-4 md:p-8 flex flex-col items-center justify-center">
      <div className={`max-w-md w-full p-8 rounded-3xl border ${content.borderColor} ${content.bgColor} text-center shadow-sm`}>
        {content.icon}
        
        <h1 className="font-display font-black text-2xl md:text-3xl text-ink mb-4">
          {content.title}
        </h1>
        
        <p className="text-ink mb-8">
          {content.message}
        </p>

        {paymentId && paymentId !== 'null' && (
          <div className="bg-card p-4 rounded-xl border border-line mb-8 text-sm">
            <p className="text-muted">ID de Pago: <strong className="text-ink">{paymentId}</strong></p>
            {externalReference && externalReference !== 'null' && (
              <p className="text-muted mt-1">Referencia: <strong className="text-ink">{externalReference}</strong></p>
            )}
          </div>
        )}

        <Link
          to="/"
          className="inline-flex w-full items-center justify-center bg-teal hover:bg-teal-dark text-white font-bold py-3 px-8 rounded-xl transition-colors active:scale-95"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
