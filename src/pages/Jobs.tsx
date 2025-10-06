import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Filter,
  Crown,
  Lock,
  Calendar,
  FileText,
  Video,
  Users,
  Mail,
  Phone,
  Building,
  Send,
  CheckCircle
} from 'lucide-react';
import { jobs } from '../data/jobs';
import { destinations } from '../data/destinations';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import PremiumModal from '../components/UI/PremiumModal';
import { supabase } from '../lib/supabase';

const Jobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [companyFormData, setCompanyFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    jobTitle: '',
    jobDescription: '',
    budget: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const { user } = useAuth();

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
    const matchesPremium = !showPremiumOnly || job.premium;
    
    return matchesSearch && matchesCountry && matchesType && matchesFeatured && matchesPremium;
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

  const handleCompanyFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormSubmitted(true);
    setTimeout(() => {
      setShowCompanyForm(false);
      setFormSubmitted(false);
      setCompanyFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        jobTitle: '',
        jobDescription: '',
        budget: '',
        message: ''
      });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCompanyFormData({
      ...companyFormData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setIsPremiumUser(false);
        setLoadingSubscription(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('subscription_status')
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription:', error);
          setIsPremiumUser(false);
        } else {
          setIsPremiumUser(data?.subscription_status === 'active');
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setIsPremiumUser(false);
      } finally {
        setLoadingSubscription(false);
      }
    };

    fetchSubscription();
  }, [user]);

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

        {/* Job Seeker Services */}
        <div className="bg-gradient-to-br from-brand-green to-brand-sage rounded-xl shadow-lg p-8 mb-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Services d'accompagnement emploi</h2>
            <p className="text-green-100 text-lg">
              Maximisez vos chances de décrocher l'emploi de vos rêves avec nos services personnalisés
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Calendar className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
              <h3 className="font-bold mb-2">Consultation gratuite</h3>
              <p className="text-sm text-green-100 mb-4">30 minutes avec un expert</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                Réserver
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
              <FileText className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
              <h3 className="font-bold mb-2">Optimisation CV</h3>
              <p className="text-sm text-green-100 mb-4">CV et profil LinkedIn</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                En savoir plus
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Video className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
              <h3 className="font-bold mb-2">Webinaires</h3>
              <p className="text-sm text-green-100 mb-4">Stratégies de recherche</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                S'inscrire
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Users className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
              <h3 className="font-bold mb-2">Coaching emploi</h3>
              <p className="text-sm text-green-100 mb-4">Suivi personnalisé</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white hover:bg-white hover:text-brand-green"
              >
                Découvrir
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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

            <div className="flex items-center space-x-4">
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
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="premium"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="premium" className="ml-2 text-sm text-gray-700 flex items-center">
                <Crown className="h-4 w-4 text-yellow-500 mr-1" />
                Premium seulement
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowCompanyForm(true)}
              className="flex items-center"
            >
              <Building className="h-4 w-4 mr-2" />
              Publier une offre
            </Button>
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
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 animate-slide-up relative ${
                job.premium && !isPremiumUser ? 'overflow-hidden' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Premium Overlay */}
              {job.premium && !isPremiumUser && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Offre Premium</h3>
                    <p className="text-gray-600 mb-6">
                      Accédez aux meilleures opportunités avec notre abonnement Premium
                    </p>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => setIsPremiumModalOpen(true)}
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Devenir Premium
                      </Button>
                      <p className="text-sm text-gray-500">
                        99 AED/mois • Accès illimité • Sans engagement
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Blur effect for premium jobs */}
              <div className={job.premium && !isPremiumUser ? 'filter blur-sm' : ''}>
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
                        {job.premium && (
                          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
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

        {/* Company Contact Form Modal */}
        {showCompanyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Publier une offre d'emploi</h2>
                  <button
                    onClick={() => setShowCompanyForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Demande envoyée avec succès !
                    </h3>
                    <p className="text-gray-600">
                      Nous vous contacterons dans les 24h pour discuter de votre offre.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCompanyFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de l'entreprise *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={companyFormData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom du contact *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          required
                          value={companyFormData.contactName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={companyFormData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          placeholder="contact@entreprise.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={companyFormData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site web
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={companyFormData.website}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          placeholder="https://www.entreprise.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget mensuel
                        </label>
                        <select
                          name="budget"
                          value={companyFormData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        >
                          <option value="">Sélectionner un budget</option>
                          <option value="100-300">100€ - 300€</option>
                          <option value="300-500">300€ - 500€</option>
                          <option value="500-1000">500€ - 1000€</option>
                          <option value="1000+">1000€+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titre du poste *
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        required
                        value={companyFormData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Ex: Développeur Full Stack Senior"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description du poste *
                      </label>
                      <textarea
                        name="jobDescription"
                        required
                        rows={4}
                        value={companyFormData.jobDescription}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Décrivez le poste, les missions, les compétences requises..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message complémentaire
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={companyFormData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Informations complémentaires, questions spécifiques..."
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Nos services incluent :</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Rédaction professionnelle de l'annonce</li>
                        <li>• Diffusion sur notre plateforme pendant 30 jours</li>
                        <li>• Promotion sur nos réseaux sociaux</li>
                        <li>• Présélection des candidats qualifiés</li>
                        <li>• Support dédié tout au long du processus</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowCompanyForm(false)}
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer la demande
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        <PremiumModal
          isOpen={isPremiumModalOpen}
          onClose={() => setIsPremiumModalOpen(false)}
        />

        {/* Job Alert CTA */}
        {filteredJobs.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6 mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Recevez les nouvelles offres par email
            </h3>
            <p className="text-gray-600 mb-4">
              Soyez le premier informé des opportunités qui correspondent à votre profil
            </p>
            <Button variant="primary">
              Créer une alerte emploi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;