import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Star, Filter } from 'lucide-react';
import { jobs } from '../data/jobs';
import { destinations } from '../data/destinations';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const countries = Array.from(new Set(jobs.map(job => job.country)));
  const jobTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'full-time', label: 'Temps plein' },
    { value: 'part-time', label: 'Temps partiel' },
    { value: 'contract', label: 'Contrat' },
    { value: 'remote', label: 'Télétravail' },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || job.country === selectedCountry;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesFeatured = !showFeaturedOnly || job.featured;
    
    return matchesSearch && matchesCountry && matchesType && matchesFeatured;
  });

  const getJobTypeLabel = (type: string) => {
    const typeMap = {
      'full-time': 'Temps plein',
      'part-time': 'Temps partiel',
      'contract': 'Contrat',
      'remote': 'Télétravail'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getDestinationFlag = (country: string) => {
    const destination = destinations.find(d => d.name === country);
    return destination?.flag || '🏳️';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`;
    return `Il y a ${Math.ceil(diffDays / 30)} mois`;
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Offres d'emploi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez votre opportunité professionnelle dans les pays musulmans
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un emploi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            >
              <option value="all">Tous les pays</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {getDestinationFlag(country)} {country}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="h-4 w-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Offres à la une seulement
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} trouvée{filteredJobs.length > 1 ? 's' : ''}
          </p>
          <div className="text-sm text-gray-500">
            Mis à jour il y a quelques minutes
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900 hover:text-brand-green transition-colors">
                        {job.title}
                      </h3>
                      {job.featured && (
                        <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="h-3 w-3 mr-1" />
                          À la une
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">{getDestinationFlag(job.country)}</span>
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}, {job.country}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {getJobTypeLabel(job.type)}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 3).map((req, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        +{job.requirements.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:items-end space-y-3 lg:ml-6 mt-4 lg:mt-0">
                  <div className="text-sm text-gray-500">
                    {formatDate(job.postedAt)}
                  </div>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <button className="bg-brand-green text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-green-dark transition-colors">
                      Voir l'offre
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune offre trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('all');
                setSelectedType('all');
                setShowFeaturedOnly(false);
              }}
              className="bg-brand-green text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-green-dark transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Job Alert CTA */}
        {filteredJobs.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6 mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Recevez les nouvelles offres par email
            </h3>
            <p className="text-gray-600 mb-4">
              Soyez le premier informé des opportunités qui correspondent à votre profil
            </p>
            <button className="bg-brand-green text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-green-dark transition-colors">
              Créer une alerte emploi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;