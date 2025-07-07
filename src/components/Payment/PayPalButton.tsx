import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Lock, AlertCircle } from 'lucide-react';

interface PayPalButtonProps {
  amount: number;
  currency: string;
  onSuccess: (details: any) => void;
  onError: (error: string) => void;
  enablePayIn4?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  enablePayIn4 = false
}) => {
  // Get PayPal client ID from environment variables
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  // If no client ID is configured, show a configuration message
  if (!clientId) {
    return (
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Configuration PayPal requise
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Veuillez configurer votre VITE_PAYPAL_CLIENT_ID dans les variables d'environnement pour activer les paiements PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paypalOptions = {
    "client-id": clientId,
    currency: currency,
    intent: "capture",
    components: enablePayIn4 ? "buttons,messages" : "buttons"
  };

  return (
    <div className="space-y-4">
      <PayPalScriptProvider options={paypalOptions}>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-medium text-gray-900">
              {enablePayIn4 ? 'PayPal Pay in 4' : 'PayPal'}
            </span>
          </div>

          {enablePayIn4 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Payez en 4 fois sans frais :</strong> 4 paiements de {(amount / 4).toFixed(2)} {currency} 
                toutes les 2 semaines. Aucun intérêt ni frais cachés.
              </p>
            </div>
          )}

          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: enablePayIn4 ? "pay" : "paypal"
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                      currency_code: currency
                    }
                  }
                ],
                payment_source: enablePayIn4 ? {
                  pay_upon_invoice: {
                    experience_context: {
                      brand_name: "Hijra.fr",
                      locale: "fr-FR"
                    }
                  }
                } : undefined
              });
            }}
            onApprove={async (data, actions) => {
              if (actions.order) {
                const details = await actions.order.capture();
                onSuccess(details);
              }
            }}
            onError={(err) => {
              console.error('PayPal Error:', err);
              onError('Erreur lors du paiement PayPal');
            }}
            onCancel={() => {
              onError('Paiement annulé');
            }}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-blue-800">
              Paiement sécurisé par PayPal. Protection des achats incluse.
            </span>
          </div>
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;