import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  FileText, 
  Camera,
  CheckCircle,
  Info,
  TrendingUp
} from 'lucide-react';
import { destinations } from '../data/destinations';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(d => d.id === id);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/destinations"
            className="inline-flex items-center text-brand-green hover:text-brand-green-dark mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux destinations
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{destination.flag}</span>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {destination.name}
              </h1>
              <p className="text-xl text-gray-600">{destination.nameAr} • {destination.region}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Aperçu général
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {destination.description}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-brand-green" />
                Points forts de la destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-blue-600" />
                Documents et démarches requises
              </h2>
              <div className="space-y-3">
                {destination.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> Les exigences peuvent évoluer. Nous recommandons de vérifier les informations 
                  les plus récentes auprès des autorités consulaires avant votre départ.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Living Costs */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Coût de la vie
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Logement</span>
                  <span className="font-semibold text-gray-900">{destination.livingCost.rent}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Alimentation</span>
                  <span className="font-semibold text-gray-900">{destination.livingCost.food}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transport</span>
                  <span className="font-semibold text-gray-900">{destination.livingCost.transport}</span>
                </div>
                <div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded-lg">
                  <span className="text-brand-green font-medium">Taux de change</span>
                  <span className="font-bold text-brand-green-dark">{destination.exchangeRate}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-brand-green to-primary-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-xl font-bold mb-4">
                Besoin d'aide pour {destination.name} ?
              </h3>
              <p className="text-green-100 mb-6">
                Nos experts vous accompagnent personnellement dans vos démarches.
              </p>
              <div className="space-y-3">
                <Link
                  to="/assistance"
                  className="block w-full bg-yellow-500 text-brand-navy py-3 px-4 rounded-lg font-medium hover:bg-yellow-400 transition-colors text-center"
                >
                  Demander de l'aide
                </Link>
                <Link
                  to="/jobs"
                  className="block w-full border-2 border-white text-white py-3 px-4 rounded-lg font-medium hover:bg-white hover:text-brand-green transition-colors text-center"
                >
                  Voir les emplois
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Informations rapides
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Région</span>
                  <span className="font-medium">{destination.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom local</span>
                  <span className="font-medium">{destination.nameAr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guides disponibles</span>
                  <span className="font-medium text-green-600">✓ Complet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;