import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, CreditCard } from 'lucide-react';
import Button from '../UI/Button';

interface StripeCardFormProps {
  amount: number;
  currency: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const StripeCardForm: React.FC<StripeCardFormProps> = ({
  amount,
  currency,
  onSuccess,
  onError,
  loading,
  setLoading
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setCardError('');

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (methodError) {
        setCardError(methodError.message || 'Erreur lors de la création du moyen de paiement');
        setLoading(false);
        return;
      }

      // In a real app, you would send the payment method to your backend
      // to create a payment intent and confirm the payment
      
      // Simulate successful payment for demo
      setTimeout(() => {
        onSuccess({
          id: 'pi_demo_' + Date.now(),
          status: 'succeeded',
          amount: amount * 100, // Stripe uses cents
          currency: currency.toLowerCase(),
          payment_method: paymentMethod.id
        });
        setLoading(false);
      }, 2000);

    } catch (error) {
      setCardError('Une erreur est survenue lors du paiement');
      onError('Une erreur est survenue lors du paiement');
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Informations de carte</span>
        </div>
        
        <div className="border border-gray-300 rounded-lg p-3 focus-within:border-brand-green focus-within:ring-1 focus-within:ring-brand-green">
          <CardElement
            options={cardElementOptions}
            onChange={(event) => {
              if (event.error) {
                setCardError(event.error.message);
              } else {
                setCardError('');
              }
            }}
          />
        </div>
        
        {cardError && (
          <p className="mt-2 text-sm text-red-600">{cardError}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <Lock className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">
            Paiement sécurisé par Stripe. Vos données bancaires sont chiffrées et protégées.
          </span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!stripe || loading}
        className="w-full"
      >
        <Lock className="mr-2 h-5 w-5" />
        Payer {amount} {currency}
      </Button>
    </form>
  );
};

export default StripeCardForm;