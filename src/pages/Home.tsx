import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, Users, Shield, Globe, Star } from 'lucide-react';
import { destinations } from '../data/destinations';
import ImageCarousel from '../components/UI/ImageCarousel';

const Home: React.FC = () => {
  const featuredDestinations = destinations.slice(0, 6);

  // Carousel images from our destinations
  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/13408685/pexels-photo-13408685.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Skyline de Doha avec ses gratte-ciels modernes',
      destination: 'Qatar - Doha'
    },
    {
    url: 'https://images.pexels.com/photos/9254283/pexels-photo-9254283.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Ghardaia, la sentinelle du Sahara',
      destination: 'Ghardaïa - Algérie'
    },
    {
    url: 'https://images.pexels.com/photos/11259857/pexels-photo-11259857.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Médine, ville sainte',
      destination: 'Médine - Arabie Saoudite'
    },
    {
      url: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Burj Khalifa et skyline de Dubai',
      destination: 'Émirats Arabes Unis - Dubai'
    },
    {
      url: 'https://images.pexels.com/photos/28289056/pexels-photo-28289056.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Mosquée Hassan II à Casablanca',
      destination: 'Maroc - Casablanca'
    },
      {
    url: 'https://images.pexels.com/photos/6188071/pexels-photo-6188071.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Manama capitale du royaume de Bahreïn',
      destination: 'Manama - Bahreïn'
    },
      {
    url: 'https://images.pexels.com/photos/3414922/pexels-photo-3414922.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Skyline de Koweit city',
      destination: 'Koweït City - Koweït'
    },
    {
    url: 'https://images.pexels.com/photos/6327724/pexels-photo-6327724.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Montagnes du Dhofar',
      destination: 'Mascate - Oman'
    },
    {
      url: 'https://images.pexels.com/photos/3815533/pexels-photo-3815533.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Tours Petronas illuminées à Kuala Lumpur',
      destination: 'Malaisie - Kuala Lumpur'
    },
    {
      url: 'https://images.pexels.com/photos/19820376/pexels-photo-19820376.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Assouan, rives du Nil',
      destination: 'Égypte - Assouan'
    },
      {
      url: 'https://images.pexels.com/photos/891126/pexels-photo-891126.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Ruelles typiques de Sousse',
      destination: 'Sousse - Tunisie'
    },
    {
      url: 'https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Mosquée Bleue et Sainte-Sophie à Istanbul',
      destination: 'Turquie - Istanbul'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-[600px] lg:min-h-[700px]">
        {/* Image Carousel Background */}
        <ImageCarousel images={carouselImages} autoPlay={true} interval={6000} />
        
        {/* Content Overlay */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Votre <span className="bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent drop-shadow-lg">Hijra</span> commence ici
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white animate-slide-up drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
وَمَن يُهَاجِرْ فِى سَبِيلِ ٱللَّهِ يَجِدْ فِى ٱلْأَرْضِ مُرَٰغَمًۭا كَثِيرًۭا وَسَعَةًۭ ۞ 
            </p><p>
              Et quiconque émigre dans le sentier d’Allah trouvera sur terre maints refuges et abondance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/destinations"
                className="bg-gradient-to-r from-brand-green to-brand-sage text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-brand-green-dark hover:to-brand-green transition-all duration-300 inline-flex items-center group shadow-lg transform hover:scale-105"
              >
                Explorer les destinations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/assistance"
                className="border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
              >
                Demander de l'aide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/5 to-brand-mint/5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent mb-2">12</div>
              <div className="text-gray-600 font-medium">Destinations</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-600 font-medium">Familles accompagnées</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-gray-600 font-medium">Taux de satisfaction</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-green to-brand-sage bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-br from-gray-50 to-brand-green/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos services d'accompagnement
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un accompagnement complet pour chaque étape de votre projet d'expatriation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up group border border-brand-green/10">
              <div className="bg-gradient-to-br from-brand-green to-brand-sage p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Guides par destination</h3>
              <p className="text-gray-600 mb-6">
                Informations détaillées sur les démarches administratives, coût de la vie, et culture locale pour chaque pays.
              </p>
              <Link
                to="/destinations"
                className="text-brand-green font-medium hover:text-brand-green-dark inline-flex items-center group-hover:translate-x-1 transition-all duration-300"
              >
                Voir les destinations
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up group border border-brand-green/10" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recherche d'emploi</h3>
              <p className="text-gray-600 mb-6">
                Accès à des offres d'emploi ciblées et accompagnement personnalisé pour votre recherche professionnelle.
              </p>
              <Link
                to="/jobs"
                className="text-brand-green font-medium hover:text-brand-green-dark inline-flex items-center group-hover:translate-x-1 transition-all duration-300"
              >
                Parcourir les offres
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 animate-slide-up group border border-brand-green/10" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-brand-sage to-brand-mint p-3 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Assistance personnalisée</h3>
              <p className="text-gray-600 mb-6">
                Conseil individualisé selon votre situation et accompagnement step-by-step dans vos démarches.
              </p>
              <Link
                to="/assistance"
                className="text-brand-green font-medium hover:text-brand-green-dark inline-flex items-center group-hover:translate-x-1 transition-all duration-300"
              >
                Demander de l'aide
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Destinations les plus populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les pays qui attirent le plus de musulmans francophones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden animate-scale-in border border-brand-green/10 hover:border-brand-green/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <span className="text-2xl mr-2">{destination.flag}</span>
                    <span className="font-medium text-gray-900">{destination.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{destination.region}</span>
                    <div className="flex items-center text-brand-green group-hover:text-brand-green-dark">
                      <span className="text-sm font-medium mr-1">Découvrir</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="bg-gradient-to-r from-brand-green to-brand-sage text-white px-8 py-3 rounded-lg font-semibold hover:from-brand-green-dark hover:to-brand-green transition-all duration-300 inline-flex items-center group shadow-lg transform hover:scale-105"
            >
              Voir toutes les destinations
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-brand-green/10 to-brand-mint/10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Hijra.fr ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre expertise et notre engagement à vos côtés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up">
              <div className="bg-gradient-to-br from-brand-green to-brand-sage p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise reconnue</h3>
              <p className="text-gray-600">Plus de 5 ans d'expérience dans l'accompagnement à l'expatriation</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-brand-sage to-brand-mint p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Réseau international</h3>
              <p className="text-gray-600">Partenaires locaux dans tous les pays de destination</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-brand-mint to-brand-green p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Communauté active</h3>
              <p className="text-gray-600">Échanges avec d'autres familles ayant vécu l'expérience</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Suivi personnalisé</h3>
              <p className="text-gray-600">Accompagnement jusqu'à votre installation complète</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-forest py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-sage to-brand-mint opacity-90"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Prêt à commencer votre Hijra ?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Rejoignez des centaines de familles qui ont déjà fait confiance à notre expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Créer mon compte gratuit
            </Link>
            <Link
              to="/assistance"
              className="border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;