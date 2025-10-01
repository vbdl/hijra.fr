import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Briefcase, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
  Crown,
  CreditCard,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { stripeProducts, getProductByPriceId } from '../stripe-config';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user, session } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const stats = {
    activeRequests: 2,
    completedRequests: 1,
    savedJobs: 8,
    documentsCompleted: 75
  };

  const recentRequests = [
    {
      id: '1',
      type: 'Démarches administratives',
      destination: 'Qatar',
      status: 'in-progress',
      createdAt: '2024-01-10',
      nextStep: 'Attente validation documents'
    },
    {
      id: '2',
      type: 'Recherche d\'emploi',
      destination: 'UAE',
      status: 'pending',
      createdAt: '2024-01-08',
      nextStep: 'Analyse de profil en cours'
    }
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Ingénieur Software Senior',
      company: 'Qatar Tech Solutions',
      location: 'Doha, Qatar',
      savedAt: '2024-01-12'
    },
    {
      id: '2',
      title: 'Consultant Finance Islamique',
      company: 'Dubai Islamic Bank',
      location: 'Dubai, UAE',
      savedAt: '2024-01-11'
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (subError) {
          console.error('Error fetching subscription:', subError);
        } else {
          setSubscription(subData);
        }

        // Fetch orders data
        const { data: ordersData, error: ordersError } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false })
          .limit(5);

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        } else {
          setOrders(ordersData || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!session?.access_token) {
      console.error('No access token available');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/dashboard`,
          mode,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-green/5 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-green/5 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent">
            Bonjour, {user?.user_metadata?.name || user?.email} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Voici un aperçu de votre progression vers votre Hijra
          </p>
          {subscription && subscription.subscription_status === 'active' && (
            <div className="mt-4 inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg">
              <Crown className="h-4 w-4 mr-2" />
              <span className="font-medium">
                {getProductByPriceId(subscription.price_id)?.name || 'Plan Premium'}
              </span>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Demandes actives</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent">{stats.activeRequests}</p>
              </div>
              <div className="bg-gradient-to-br from-brand-green to-brand-sage p-3 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Demandes terminées</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">{stats.completedRequests}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emplois sauvegardés</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{stats.savedJobs}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents complétés</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">{stats.documentsCompleted}%</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mes demandes d'assistance</h2>
                <Link
                  to="/assistance"
                  className="text-brand-green hover:text-brand-green-dark text-sm font-medium transition-colors"
                >
                  Nouvelle demande
                </Link>
              </div>

              <div className="space-y-4">
                {recentRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-brand-green/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{request.type}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {getStatusText(request.status)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.destination}
                            <Calendar className="h-4 w-4 ml-4 mr-1" />
                            {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                          <p className="text-sm text-gray-700">{request.nextStep}</p>
                        </div>
                        <button className="text-brand-green hover:text-brand-green-dark text-sm font-medium transition-colors">
                          Voir détails
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {recentRequests.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune demande d'assistance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Commencez votre projet d'expatriation en demandant de l'aide
                  </p>
                  <Link
                    to="/assistance"
                    className="bg-gradient-to-r from-brand-green to-brand-sage text-white px-4 py-2 rounded-lg font-medium hover:from-brand-green-dark hover:to-brand-green transition-all duration-300 shadow-sm"
                  >
                    Faire une demande
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Orders */}
            {orders.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mes achats récents</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.order_id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            Commande #{order.order_id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.order_date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-brand-green">
                            {formatCurrency(order.amount_total / 100, order.currency)}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.payment_status === 'paid' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
                          }`}>
                            {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Jobs */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Emplois sauvegardés</h2>
                <Link
                  to="/jobs"
                  className="text-brand-green hover:text-brand-green-dark text-sm font-medium transition-colors"
                >
                  Voir tous les emplois
                </Link>
              </div>

              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-brand-green/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                          <span className="ml-4">
                            Sauvegardé le {new Date(job.savedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <button className="text-brand-green hover:text-brand-green-dark text-sm font-medium transition-colors">
                        Voir l'offre
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  to="/destinations"
                  className="flex items-center p-3 rounded-lg hover:bg-brand-green/5 transition-colors group border border-transparent hover:border-brand-green/20"
                >
                  <div className="bg-gradient-to-br from-brand-green to-brand-sage p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 group-hover:text-brand-green transition-colors">Explorer les destinations</span>
                </Link>
                <Link
                  to="/jobs"
                  className="flex items-center p-3 rounded-lg hover:bg-brand-green/5 transition-colors group border border-transparent hover:border-brand-green/20"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 group-hover:text-brand-green transition-colors">Rechercher un emploi</span>
                </Link>
                <Link
                  to="/assistance"
                  className="flex items-center p-3 rounded-lg hover:bg-brand-green/5 transition-colors group border border-transparent hover:border-brand-green/20"
                >
                  <div className="bg-gradient-to-br from-brand-sage to-brand-mint p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 group-hover:text-brand-green transition-colors">Demander de l'aide</span>
                </Link>
              </div>
            </div>

            {/* Available Products */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Services disponibles</h3>
              <div className="space-y-4">
                {stripeProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                      <span className="text-brand-green font-bold text-sm">
                        {formatCurrency(product.price, product.currency)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handlePurchase(product.priceId, product.mode)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-2" />
                      {product.mode === 'subscription' ? 'S\'abonner' : 'Acheter'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="bg-gradient-forest rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-sage to-brand-mint opacity-90"></div>
              <div className="relative">
                <h3 className="text-lg font-bold mb-4">Votre progression</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Documents préparés</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full shadow-sm" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Recherche d'emploi</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full shadow-sm" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-green-100 text-sm mt-4">
                  Continuez sur cette lancée ! Vous êtes sur la bonne voie.
                </p>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-brand-green/10">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-brand-green" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    Nouvelle offre d'emploi correspondant à votre profil au Qatar
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Il y a 2 heures</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    Votre demande d'assistance administrative a été mise à jour
                  </p>
                  <p className="text-xs text-green-600 mt-1">Hier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;