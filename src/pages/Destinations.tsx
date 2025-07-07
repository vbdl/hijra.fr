import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { destinations } from '../data/destinations';

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { value: 'all', label: 'Toutes les régions' },
    { value: 'Golfe Persique', label: 'Golfe Persique' },
    { value: 'Afrique du Nord', label: 'Afrique du Nord' },
    { value: 'Eurasie', label: 'Eurasie' },
    { value: 'Asie du Sud-Est', label: 'Asie du Sud-Est' },
    { value: 'Péninsule Arabique', label: 'Péninsule Arabique' },
  ];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.nameAr.includes(searchTerm) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || destination.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choisissez votre destination
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez nos guides détaillés pour chaque pays et trouvez la destination parfaite pour votre Hijra
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher une destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              >
                {regions.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredDestinations.length} destination{filteredDestinations.length > 1 ? 's' : ''} trouvée{filteredDestinations.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xl mr-2">{destination.flag}</span>
                  <span className="font-medium text-gray-900">{destination.name}</span>
                </div>
                <div className="absolute top-4 right-4 bg-brand-green text-white px-2 py-1 rounded text-sm font-medium">
                  {destination.region}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <span className="text-gray-500 text-sm">{destination.nameAr}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Key Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span>Loyer: {destination.livingCost.rent}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{destination.exchangeRate}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 2).map((highlight, i) => (
                      <span
                        key={i}
                        className="bg-green-50 text-brand-green px-2 py-1 rounded text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        +{destination.highlights.length - 2} autres
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/destinations/${destination.id}`}
                  className="w-full bg-brand-green text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-green-dark transition-colors inline-flex items-center justify-center group"
                >
                  Voir le guide complet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune destination trouvée
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;