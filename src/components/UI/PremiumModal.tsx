import React from 'react';
import { X, Crown, Check, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { stripeProducts, getProductsByMode } from '../../stripe-config';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const premiumProduct = stripeProducts.find(p => p.name === 'Muhajir Premium');

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!user) {
      onClose();
      navigate('/register', { state: { returnTo: '/dashboard', subscriptionIntent: true } });
      return;
    }

    if (!premiumProduct) {
      console.error('Premium product not found');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          price_id: premiumProduct.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/dashboard`,
          mode: premiumProduct.mode,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setLoading(false);
    }
  };

  const features = [
    'Accès aux offres d\'emploi premium exclusives',
    'Groupe WhatsApp privé avec la communauté',
    'Session de coaching mensuelle (1h)',
    'Support prioritaire 24/7',
    'Accès anticipé aux nouvelles destinations',
    'Guides détaillés téléchargeables',
    'Webinaires mensuels exclusifs',
    'Réseau de contacts professionnels'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {user ? 'Passez à Premium' : 'Devenez Premium'}
            </h2>
            <p className="text-yellow-50 text-lg">
              {user
                ? 'Améliorez votre expérience et accélérez votre Hijra'
                : 'Créez votre compte et accédez aux avantages premium'
              }
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-baseline">
              <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                {premiumProduct?.price || 99}
              </span>
              <span className="text-2xl font-semibold text-gray-600 ml-2">
                {premiumProduct?.currency || 'AED'}
              </span>
              <span className="text-gray-500 ml-2">/mois</span>
            </div>
            <p className="text-gray-600 mt-2">
              Annulez à tout moment
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-900 text-lg mb-4 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Avantages inclus :
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {user ? (
            <div className="space-y-4">
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={handleSubscribe}
                loading={loading}
              >
                <Crown className="mr-2 h-5 w-5" />
                S'abonner maintenant
              </Button>
              <p className="text-center text-sm text-gray-500">
                Paiement sécurisé par Stripe
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={handleSubscribe}
              >
                <Crown className="mr-2 h-5 w-5" />
                Créer mon compte premium
              </Button>
              <p className="text-center text-sm text-gray-600">
                Vous serez redirigé vers la page d'inscription
              </p>
              <div className="text-center">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/login');
                  }}
                  className="text-brand-green hover:text-brand-green-dark text-sm font-medium transition-colors"
                >
                  Déjà inscrit ? Se connecter
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 text-center">
              <strong>Garantie satisfait ou remboursé 30 jours</strong>
              <br />
              Si vous n'êtes pas satisfait, nous vous remboursons intégralement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
