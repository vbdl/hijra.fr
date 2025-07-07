import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  FileText, 
  Users, 
  Briefcase, 
  Building, 
  Home,
  Shield,
  Plus,
  Minus,
  Calculator,
  ShoppingCart
} from 'lucide-react';
import { getCountryServices, ServiceOption } from '../data/countryServices';
import { OrderSummary } from '../types';
import Button from '../components/UI/Button';

const CountryServices: React.FC = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCalculator, setShowCalculator] = useState(false);

  const countryData = countryId ? getCountryServices(countryId) : undefined;

  if (!countryData) {
    return <Navigate to="/destinations" replace />;
  }

  const categories = [
    { id: 'all', name: 'Tous les services', icon: FileText },
    { id: 'visa', name: 'Visas', icon: Shield },
    { id: 'residence', name: 'Résidence', icon: Home },
    { id: 'employment', name: 'Emploi', icon: Briefcase },
    { id: 'family', name: 'Famille', icon: Users },
    { id: 'business', name: 'Business', icon: Building },
    { id: 'other', name: 'Autres', icon: FileText }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? countryData.services 
    : countryData.services.filter(service => service.category === selectedCategory);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = countryData.services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateFees = (subtotal: number) => {
    // 2% processing fee, minimum 5 EUR
    return Math.max(Math.round(subtotal * 0.02), 5);
  };

  const proceedToPayment = () => {
    const selectedServiceDetails = selectedServices.map(serviceId => {
      const service = countryData.services.find(s => s.id === serviceId);
      return {
        id: service?.id || '',
        name: service?.name || '',
        price: service?.price || 0
      };
    });

    const subtotal = calculateTotal();
    const fees = calculateFees(subtotal);
    const total = subtotal + fees;

    const orderData: OrderSummary = {
      services: selectedServiceDetails,
      subtotal,
      fees,
      total,
      currency: countryData.currency,
      country: countryData.countryName
    };

    navigate('/payment', { state: { orderData } });
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || FileText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/assistance"
            className="inline-flex items-center text-brand-green hover:text-brand-green-dark mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux services
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{countryData.flag}</span>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Services {countryData.countryName}
                </h1>
                <p className="text-xl text-gray-600">
                  Démarches administratives et services officiels
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Taux de change</p>
              <p className="font-semibold text-brand-green">{countryData.exchangeRate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  const count = category.id === 'all' 
                    ? countryData.services.length 
                    : countryData.services.filter(s => s.category === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-brand-green text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Processing Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informations de traitement</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{countryData.processingInfo.averageTime}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>
                      {countryData.processingInfo.urgentAvailable ? 'Service urgent disponible' : 'Pas de service urgent'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>
                      {countryData.processingInfo.onlineAvailable ? 'Demande en ligne possible' : 'Demande physique requise'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Services */}
            {selectedCategory === 'all' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services populaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {countryData.popularServices.map(serviceId => {
                    const service = countryData.services.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    const Icon = getCategoryIcon(service.category);
                    return (
                      <div key={service.id} className="bg-gradient-to-r from-brand-green to-primary-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="h-6 w-6" />
                          <span className="text-2xl font-bold">{service.price} {countryData.currency}</span>
                        </div>
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-green-100">{service.duration}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services List */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Tous les services' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{filteredServices.length} service{filteredServices.length > 1 ? 's' : ''}</span>
                {selectedServices.length > 0 && (
                  <Button
                    variant="primary"
                    onClick={() => setShowCalculator(!showCalculator)}
                    className="flex items-center"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculer ({selectedServices.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Price Calculator */}
            {showCalculator && selectedServices.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-brand-green">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Calculateur de prix</h3>
                <div className="space-y-3">
                  {selectedServices.map(serviceId => {
                    const service = countryData.services.find(s => s.id === serviceId);
                    if (!service) return null;
                    
                    return (
                      <div key={service.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{service.name}</span>
                        <span className="font-semibold">{service.price} {countryData.currency}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-700">Frais de traitement (2%)</span>
                    <span className="font-semibold">{calculateFees(calculateTotal())} {countryData.currency}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 text-lg font-bold text-brand-green">
                    <span>Total</span>
                    <span>{calculateTotal() + calculateFees(calculateTotal())} {countryData.currency}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    ≈ {Math.round((calculateTotal() + calculateFees(calculateTotal())) / parseFloat(countryData.exchangeRate.split(' = ')[1].split(' ')[0]))} EUR
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="primary" 
                    className="w-full flex items-center justify-center"
                    onClick={proceedToPayment}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6">
              {filteredServices.map((service, index) => {
                const Icon = getCategoryIcon(service.category);
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <div
                    key={service.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 animate-slide-up ${
                      isSelected ? 'ring-2 ring-brand-green' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-brand-green" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                            <p className="text-gray-600">{service.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-semibold">{service.price} {countryData.currency}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FileText className="h-4 w-4 mr-2 text-purple-600" />
                            <span className="capitalize">{service.category}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Documents requis:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.requirements.map((req, i) => (
                              <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="ml-6 flex flex-col items-end space-y-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-brand-green">{service.price}</p>
                          <p className="text-sm text-gray-500">{countryData.currency}</p>
                        </div>
                        
                        <button
                          onClick={() => toggleService(service.id)}
                          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            isSelected
                              ? 'bg-brand-green text-white hover:bg-brand-green-dark'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Minus className="h-4 w-4 mr-2" />
                              Retirer
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Ajouter
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun service trouvé
                </h3>
                <p className="text-gray-600">
                  Aucun service disponible dans cette catégorie pour le moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryServices;