import Stripe from 'stripe';

// Initialize Stripe (server-side key would be used in real backend)
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16',
});

export interface StripePaymentInfo {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created: number;
  payment_method?: {
    id: string;
    type: string;
    card?: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  };
  charges?: {
    data: Array<{
      id: string;
      status: string;
      failure_code?: string;
      failure_message?: string;
    }>;
  };
  refunds?: {
    data: Array<{
      id: string;
      amount: number;
      status: string;
      created: number;
    }>;
  };
}

export interface PayPalPaymentInfo {
  id: string;
  status: string;
  amount: {
    currency_code: string;
    value: string;
  };
  create_time: string;
  update_time?: string;
  payer?: {
    email_address: string;
    name?: {
      given_name: string;
      surname: string;
    };
  };
  payment_source?: {
    paypal?: {
      email_address: string;
    };
    card?: {
      brand: string;
      last_digits: string;
    };
  };
}

class PaymentService {
  // Stripe Methods
  async getStripePayment(paymentIntentId: string): Promise<StripePaymentInfo | null> {
    try {
      // In a real app, this would be called from your backend
      // For demo purposes, we'll simulate the response
      if (import.meta.env.VITE_STRIPE_SECRET_KEY && import.meta.env.VITE_STRIPE_SECRET_KEY !== 'sk_test_demo') {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
          expand: ['payment_method', 'charges', 'charges.data.refunds']
        });
        return paymentIntent as StripePaymentInfo;
      } else {
        // Mock data for demo
        return this.getMockStripePayment(paymentIntentId);
      }
    } catch (error) {
      console.error('Error fetching Stripe payment:', error);
      return null;
    }
  }

  async refundStripePayment(paymentIntentId: string, amount?: number): Promise<boolean> {
    try {
      if (import.meta.env.VITE_STRIPE_SECRET_KEY && import.meta.env.VITE_STRIPE_SECRET_KEY !== 'sk_test_demo') {
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
          amount: amount ? amount * 100 : undefined, // Convert to cents
        });
        return refund.status === 'succeeded';
      } else {
        // Mock success for demo
        return true;
      }
    } catch (error) {
      console.error('Error refunding Stripe payment:', error);
      return false;
    }
  }

  // PayPal Methods
  async getPayPalPayment(orderId: string): Promise<PayPalPaymentInfo | null> {
    try {
      // In a real app, this would call PayPal API from your backend
      // For demo purposes, we'll simulate the response
      return this.getMockPayPalPayment(orderId);
    } catch (error) {
      console.error('Error fetching PayPal payment:', error);
      return null;
    }
  }

  async refundPayPalPayment(captureId: string, amount?: { currency_code: string; value: string }): Promise<boolean> {
    try {
      // In a real app, this would call PayPal API from your backend
      // Mock success for demo
      return true;
    } catch (error) {
      console.error('Error refunding PayPal payment:', error);
      return false;
    }
  }

  // Mock data for demo purposes
  private getMockStripePayment(paymentIntentId: string): StripePaymentInfo {
    const statuses = ['succeeded', 'processing', 'requires_payment_method', 'canceled'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: paymentIntentId,
      status: randomStatus,
      amount: Math.floor(Math.random() * 100000) + 10000, // 100-1000 EUR in cents
      currency: 'eur',
      created: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 7), // Within last week
      payment_method: {
        id: 'pm_' + Math.random().toString(36).substr(2, 9),
        type: 'card',
        card: {
          brand: ['visa', 'mastercard', 'amex'][Math.floor(Math.random() * 3)] as any,
          last4: Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
          exp_month: Math.floor(Math.random() * 12) + 1,
          exp_year: 2025 + Math.floor(Math.random() * 5)
        }
      },
      charges: {
        data: [{
          id: 'ch_' + Math.random().toString(36).substr(2, 9),
          status: randomStatus === 'succeeded' ? 'succeeded' : 'failed',
          failure_code: randomStatus !== 'succeeded' ? 'card_declined' : undefined,
          failure_message: randomStatus !== 'succeeded' ? 'Your card was declined.' : undefined
        }]
      },
      refunds: {
        data: []
      }
    };
  }

  private getMockPayPalPayment(orderId: string): PayPalPaymentInfo {
    const statuses = ['COMPLETED', 'PENDING', 'DECLINED', 'CANCELLED'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: orderId,
      status: randomStatus,
      amount: {
        currency_code: 'EUR',
        value: (Math.floor(Math.random() * 1000) + 100).toString()
      },
      create_time: new Date(Date.now() - Math.floor(Math.random() * 86400 * 7 * 1000)).toISOString(),
      update_time: new Date().toISOString(),
      payer: {
        email_address: 'user@example.com',
        name: {
          given_name: 'John',
          surname: 'Doe'
        }
      },
      payment_source: {
        paypal: {
          email_address: 'user@example.com'
        }
      }
    };
  }

  // Utility methods
  formatStripeAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }

  formatPayPalAmount(amount: { currency_code: string; value: string }): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: amount.currency_code
    }).format(parseFloat(amount.value));
  }

  getPaymentStatusColor(status: string, provider: 'stripe' | 'paypal'): string {
    if (provider === 'stripe') {
      switch (status) {
        case 'succeeded': return 'text-green-600 bg-green-100';
        case 'processing': return 'text-blue-600 bg-blue-100';
        case 'requires_payment_method': return 'text-yellow-600 bg-yellow-100';
        case 'canceled': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    } else {
      switch (status) {
        case 'COMPLETED': return 'text-green-600 bg-green-100';
        case 'PENDING': return 'text-yellow-600 bg-yellow-100';
        case 'DECLINED': return 'text-red-600 bg-red-100';
        case 'CANCELLED': return 'text-gray-600 bg-gray-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    }
  }

  getPaymentStatusText(status: string, provider: 'stripe' | 'paypal'): string {
    if (provider === 'stripe') {
      switch (status) {
        case 'succeeded': return 'Réussi';
        case 'processing': return 'En cours';
        case 'requires_payment_method': return 'Échec';
        case 'canceled': return 'Annulé';
        default: return 'Inconnu';
      }
    } else {
      switch (status) {
        case 'COMPLETED': return 'Terminé';
        case 'PENDING': return 'En attente';
        case 'DECLINED': return 'Refusé';
        case 'CANCELLED': return 'Annulé';
        default: return 'Inconnu';
      }
    }
  }
}

export const paymentService = new PaymentService();