import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';
import PaymentMethods from '../components/Payment/PaymentMethods';
import StripeCardForm from '../components/Payment/StripeCardForm';
import PayPalButton from '../components/Payment/PayPalButton';
import BankTransferForm from '../components/Payment/BankTransferForm';
import { OrderSummary } from '../types';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_demo_key');

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe_card');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'error'>('pending');
  const [paymentError, setPaymentError] = useState('');
  const [orderReference] = useState(`HJR-${Date.now()}`);

  // Get order data from navigation state
  const orderData: OrderSummary = location.state?.orderData || {
    services: [],
    subtotal: 0,
    fees: 0,
    total: 0,
    currency: 'EUR',
    country: 'France'
  };

  useEffect(() => {
    // Redirect if no order data
    if (!location.state?.orderData) {
      navigate('/assistance');
    }
  }, [location.state, navigate]);

  const handlePaymentSuccess = (paymentDetails: any) => {
    setPaymentStatus('success');
    console.log('Payment successful:', paymentDetails);
    
    // In a real app, you would send this to your backend
    setTimeout(() => {
      navigate('/dashboard', { 
        state: { 
          paymentSuccess: true, 
          orderReference,
          paymentDetails 
        } 
      });
    }, 3000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    setPaymentError(error);
    setLoading(false);
  };

  const handleBankTransferConfirm = () => {
    setPaymentStatus('processing');
    // In a real app, you would create a pending order
    setTimeout(() => {
      navigate('/dashboard', { 
        state: { 
          bankTransferPending: true, 
          orderReference 
        } 
      });
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'stripe_card':
        return (
          <Elements stripe={stripePromise}>
            <StripeCardForm
              amount={orderData.total}
              currency={orderData.currency}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              loading={loading}
              setLoading={setLoading}
            />
          </Elements>
        );
      
      case 'stripe_bank_transfer':
        return (
          <BankTransferForm
            amount={orderData.total}
            currency={orderData.currency}
            orderReference={orderReference}
            onConfirm={handleBankTransferConfirm}
          />
        );
      
      case 'paypal':
        return (
          <PayPalButton
            amount={orderData.total}
            currency={orderData.currency}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
      
      case 'paypal_pay_in_4':
        return (
          <PayPalButton
            amount={orderData.total}
            currency={orderData.currency}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            enablePayIn4={true}
          />
        );
      
      default:
        return null;
    }
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Traitement en cours...
            </h3>
            <p className="text-gray-600">
              Votre demande de virement a été enregistrée. Nous traiterons votre commande dès réception du paiement.
            </p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Paiement réussi !
            </h3>
            <p className="text-gray-600 mb-4">
              Votre commande a été confirmée. Vous allez être redirigé vers votre tableau de bord.
            </p>
            <p className="text-sm text-gray-500">
              Référence : {orderReference}
            </p>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Erreur de paiement
            </h3>
            <p className="text-gray-600 mb-4">{paymentError}</p>
            <button
              onClick={() => {
                setPaymentStatus('pending');
                setPaymentError('');
              }}
              className="bg-brand-green text-white px-6 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
            >
              Réessayer
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (paymentStatus !== 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {renderPaymentStatus()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/assistance"
            className="inline-flex items-center text-brand-green hover:text-brand-green-dark mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finaliser votre commande</h1>
          <p className="text-gray-600 mt-2">Choisissez votre méthode de paiement préférée</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 mb-6">
                {orderData.services.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{service.name}</span>
                    <span className="font-medium">{service.price} {orderData.currency}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sous-total</span>
                  <span>{orderData.subtotal} {orderData.currency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frais de traitement</span>
                  <span>{orderData.fees} {orderData.currency}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-brand-green border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>{orderData.total} {orderData.currency}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-brand-green mr-2" />
                  <div className="text-sm text-brand-green-dark">
                    <p className="font-medium">Paiement 100% sécurisé</p>
                    <p>Vos données sont protégées</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>Référence : {orderReference}</p>
                <p>Pays : {orderData.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <PaymentMethods
                selectedMethod={selectedPaymentMethod}
                onMethodSelect={setSelectedPaymentMethod}
              />

              <div className="mt-8">
                {renderPaymentForm()}
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Sécurité et confidentialité</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Chiffrement SSL 256 bits pour toutes les transactions</li>
                    <li>• Conformité PCI DSS pour la protection des données bancaires</li>
                    <li>• Aucune donnée bancaire stockée sur nos serveurs</li>
                    <li>• Partenaires certifiés : Stripe et PayPal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;