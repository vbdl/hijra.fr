import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import Button from '../components/UI/Button';

const Success: React.FC = () => {
  const { user } = useAuth();
  const [purchaseDetails, setPurchaseDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      if (!user) return;

      try {
        // Get the most recent order or subscription
        const { data: orderData } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false })
          .limit(1)
          .maybeSingle();

        const { data: subData } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        // Determine which purchase was most recent
        let details = null;
        if (orderData && subData) {
          const orderDate = new Date(orderData.order_date);
          const subDate = new Date(subData.updated_at || subData.created_at);
          details = orderDate > subDate ? orderData : subData;
        } else {
          details = orderData || subData;
        }

        setPurchaseDetails(details);
      } catch (error) {
        console.error('Error fetching purchase details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseDetails();
  }, [user]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  const isSubscription = purchaseDetails && 'subscription_id' in purchaseDetails;
  const product = purchaseDetails?.price_id ? getProductByPriceId(purchaseDetails.price_id) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isSubscription ? 'Abonnement activé !' : 'Paiement réussi !'}
              </h1>
              <p className="text-gray-600">
                {isSubscription 
                  ? 'Votre abonnement a été activé avec succès.'
                  : 'Votre commande a été confirmée et sera traitée dans les plus brefs délais.'
                }
              </p>
            </div>

            {purchaseDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de votre achat</h2>
                
                {product && (
                  <div className="text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Produit :</span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    
                    {isSubscription ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type :</span>
                          <span className="font-medium">Abonnement mensuel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Prix :</span>
                          <span className="font-medium">
                            {formatCurrency(product.price, product.currency)}/mois
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Statut :</span>
                          <span className="text-green-600 font-medium">Actif</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type :</span>
                          <span className="font-medium">Achat unique</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Montant :</span>
                          <span className="font-medium">
                            {formatCurrency(purchaseDetails.amount_total / 100, purchaseDetails.currency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Référence :</span>
                          <span className="font-mono text-sm">#{purchaseDetails.order_id}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Prochaines étapes</h3>
                <ul className="text-sm text-blue-800 text-left space-y-1">
                  {isSubscription ? (
                    <>
                      <li>• Accédez immédiatement à tous les avantages de votre abonnement</li>
                      <li>• Consultez votre tableau de bord pour voir vos nouveaux privilèges</li>
                      <li>• Un email de confirmation vous a été envoyé</li>
                    </>
                  ) : (
                    <>
                      <li>• Notre équipe va traiter votre demande dans les 24h</li>
                      <li>• Vous recevrez un email avec les détails du suivi</li>
                      <li>• Consultez votre tableau de bord pour suivre l'avancement</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Aller au tableau de bord
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.location.href = '/assistance'}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Voir nos services
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Une question ? Contactez notre équipe à{' '}
                <a href="mailto:support@hijra.fr" className="text-brand-green hover:text-brand-green-dark">
                  support@hijra.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;