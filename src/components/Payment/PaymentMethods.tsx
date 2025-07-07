import React from 'react';
import { CreditCard, Building2, Smartphone } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe_card',
      type: 'card',
      name: 'Carte bancaire',
      description: 'Visa, Mastercard, American Express',
      icon: 'card',
      processingTime: 'Instantané',
      fees: 'Aucun frais'
    },
    {
      id: 'stripe_bank_transfer',
      type: 'bank_transfer',
      name: 'Virement bancaire',
      description: 'Virement SEPA sécurisé',
      icon: 'bank',
      processingTime: '1-3 jours ouvrables',
      fees: 'Aucun frais'
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      description: 'Compte PayPal ou carte via PayPal',
      icon: 'paypal',
      processingTime: 'Instantané',
      fees: 'Aucun frais'
    },
    {
      id: 'paypal_pay_in_4',
      type: 'paypal',
      name: 'PayPal Pay in 4',
      description: 'Payez en 4 fois sans frais',
      icon: 'paypal',
      processingTime: 'Instantané',
      fees: 'Aucun frais'
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'card':
        return <CreditCard className="h-6 w-6" />;
      case 'bank':
        return <Building2 className="h-6 w-6" />;
      case 'paypal':
        return <Smartphone className="h-6 w-6" />;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Méthode de paiement</h3>
      <div className="grid grid-cols-1 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-brand-green bg-green-50 ring-2 ring-brand-green'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onMethodSelect(method.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                selectedMethod === method.id ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {getIcon(method.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{method.name}</h4>
                  <input
                    type="radio"
                    checked={selectedMethod === method.id}
                    onChange={() => onMethodSelect(method.id)}
                    className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>⏱️ {method.processingTime}</span>
                  <span>💳 {method.fees}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;