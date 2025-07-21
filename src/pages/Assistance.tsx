import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, DollarSign, Clock, Star, Users, FileText, Briefcase, Building } from 'lucide-react';
import { destinations } from '../data/destinations';
import { countryServices } from '../data/countryServices';

const Assistance: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState('');

  const serviceCategories = [
    {
      id: 'administrative',
      name: 'Démarches administratives',
      description: 'Visas, permis de résidence, documents officiels',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'employment',
      name: 'Services emploi',
      description: 'Permis de travail, cartes professionnelles',
      icon: Briefcase,
      color: 'green'
    },
    {
      id: 'business',
      name: 'Services business',
      description: 'Création d\'entreprise, licences commerciales',
      icon: Building,
      color: 'purple'
    },
    {
      id: 'family',
      name: 'Services famille',
      description: 'Visas familiaux, certificats de naissance',
      icon: Users,
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-brand-green',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Services d'assistance par pays
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez votre destination pour découvrir tous les services administratifs disponibles avec tarification transparente
          </p>
        </div>

        {/* Destination Selector */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sélectionnez votre destination</h2>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green text-lg"
            >
              <option value="">Choisir une destination</option>
              {countryServices.map(country => (
                <option key={country.countryId} value={country.countryId}>
                  {country.flag} {country.countryName}
                </option>
              ))}
            </select>
            
            {selectedDestination && (
              <div className="mt-4">
                <Link
                  to={`/services/${selectedDestination}`}
                  className="w-full bg-brand-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-green-dark transition-colors inline-flex items-center justify-center group"
                >
                  Voir tous les services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Types de services disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-3 rounded-lg w-fit mb-4 ${getColorClasses(category.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Available Countries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Pays avec services détaillés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryServices.map((country, index) => (
              <Link
                key={country.countryId}
                to={`/services/${country.countryId}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors">
                          {country.countryName}
                        </h3>
                        <p className="text-sm text-gray-500">{country.currency}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-brand-green">{country.services.length}</div>
                      <div className="text-xs text-gray-600">Services</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-brand-green">{country.popularServices.length}</div>
                      <div className="text-xs text-gray-600">Populaires</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{country.processingInfo.averageTime}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{country.exchangeRate}</span>
                    </div>
                    {country.processingInfo.urgentAvailable && (
                      <div className="flex items-center text-sm text-green-600">
                        <Star className="h-4 w-4 mr-2" />
                        <span>Service urgent disponible</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* General Services */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Services d'accompagnement général
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation personnalisée</h3>
              <p className="text-gray-600 mb-4">Conseil adapté à votre situation et destination</p>
              <p className="text-2xl font-bold text-brand-green">150€</p>
              <p className="text-sm text-gray-500">par session</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Préparation de dossier</h3>
              <p className="text-gray-600 mb-4">Aide complète pour constituer vos documents</p>
              <p className="text-2xl font-bold text-brand-green">300€</p>
              <p className="text-sm text-gray-500">par dossier</p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi complet</h3>
              <p className="text-gray-600 mb-4">Accompagnement jusqu'à l'obtention</p>
              <p className="text-2xl font-bold text-brand-green">500€</p>
              <p className="text-sm text-gray-500">forfait</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-brand-green to-primary-600 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'aide pour vos démarches ?
            </h2>
            <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
              Nos experts vous accompagnent dans toutes vos démarches administratives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                to="/destinations"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-green transition-colors"
              >
                Explorer les destinations
              </Link>
              <Link
                to="/contact"
                className="bg-white text-brand-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistance;