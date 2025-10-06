import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Crown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import PremiumModal from '../components/UI/PremiumModal';
import { stripeProducts } from '../stripe-config';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [accountType, setAccountType] = useState<'free' | 'premium' | null>(null);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const premiumProduct = stripeProducts.find(p => p.name === 'Muhajir Premium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accountType) {
      setError('Veuillez sélectionner un type de compte');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name);

      if (accountType === 'premium') {
        setIsPremiumModalOpen(true);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Créer votre compte
          </h2>
          <p className="mt-2 text-gray-600">
            Rejoignez la communauté Hijra.fr gratuitement
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de compte
              </label>
              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType('free')}
                  className={`relative border-2 rounded-xl p-4 text-left transition-all ${
                    accountType === 'free'
                      ? 'border-brand-green bg-brand-green/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Compte Gratuit</h3>
                      <p className="text-sm text-gray-600">Accès aux fonctionnalités de base</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-brand-green mr-2 flex-shrink-0" />
                          Guides de destinations
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-brand-green mr-2 flex-shrink-0" />
                          Demandes d'assistance
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-brand-green mr-2 flex-shrink-0" />
                          Offres d'emploi de base
                        </li>
                      </ul>
                    </div>
                    {accountType === 'free' && (
                      <div className="ml-4">
                        <div className="bg-brand-green rounded-full p-1">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 font-bold text-lg text-brand-green">Gratuit</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType('premium')}
                  className={`relative border-2 rounded-xl p-4 text-left transition-all ${
                    accountType === 'premium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                        <h3 className="font-semibold text-gray-900">Muhajir Premium</h3>
                      </div>
                      <p className="text-sm text-gray-600">Toutes les fonctionnalités + avantages exclusifs</p>
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          Offres d'emploi premium exclusives
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          Groupe WhatsApp privé
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          Session de coaching mensuelle (1h)
                        </li>
                        <li className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          Support prioritaire 24/7
                        </li>
                      </ul>
                    </div>
                    {accountType === 'premium' && (
                      <div className="ml-4">
                        <div className="bg-yellow-500 rounded-full p-1">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline">
                    <span className="font-bold text-lg text-yellow-600">{premiumProduct?.price || 99} {premiumProduct?.currency || 'AED'}</span>
                    <span className="text-sm text-gray-600 ml-1">/mois</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  placeholder="Minimum 8 caractères"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                  placeholder="Confirmez votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                J'accepte les{' '}
                <Link to="/terms" className="text-brand-green hover:text-brand-green-dark">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="text-brand-green hover:text-brand-green-dark">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Créer mon compte
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{' '}
              <Link
                to="/login"
                className="text-brand-green hover:text-brand-green-dark font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>

      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => {
          setIsPremiumModalOpen(false);
          navigate('/dashboard');
        }}
      />
    </div>
  );
};

export default Register;