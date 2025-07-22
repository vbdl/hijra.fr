import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Globe, 
  MessageCircle, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  MapPin,
  Briefcase,
  FileText,
  Phone
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Fraternité',
      description: 'Une communauté unie par la foi et l\'entraide mutuelle'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Des conseils fiables et une assistance professionnelle'
    },
    {
      icon: Globe,
      title: 'Expertise',
      description: 'Une connaissance approfondie des destinations musulmanes'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Un service de qualité pour réussir votre projet'
    }
  ];

  const services = [
    {
      icon: FileText,
      title: 'Démarches administratives',
      description: 'Assistance complète pour vos visas, permis de résidence et documents officiels'
    },
    {
      icon: Briefcase,
      title: 'Recherche d\'emploi',
      description: 'Accompagnement personnalisé pour trouver un travail dans votre destination'
    },
    {
      icon: MapPin,
      title: 'Guides par destination',
      description: 'Informations détaillées sur le coût de la vie, culture et démarches'
    },
    {
      icon: Users,
      title: 'Communauté active',
      description: 'Échanges avec d\'autres familles ayant vécu l\'expérience'
    }
  ];

  const destinations = [
    { name: 'Algérie', flag: '🇩🇿' },
    { name: 'Arabie Saoudite', flag: '🇸🇦' },
    { name: 'Bahreïn', flag: '🇧🇭' },
    { name: 'Égypte', flag: '🇪🇬' },
    { name: 'Émirats Arabes Unis', flag: '🇦🇪' },
    { name: 'Koweït', flag: '🇰🇼' },
    { name: 'Malaisie', flag: '🇲🇾' },
    { name: 'Maroc', flag: '🇲🇦' },
    { name: 'Oman', flag: '🇴🇲' },
    { name: 'Qatar', flag: '🇶🇦' },
    { name: 'Tunisie', flag: '🇹🇳' },
    { name: 'Turquie', flag: '🇹🇷' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-forest py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-sage to-brand-mint opacity-90"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            À propos de Hijra.fr
          </h1>
          <p className="text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto drop-shadow-sm">
            Plus qu'une plateforme, une communauté dédiée à votre réussite
          </p>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1669664321705-4fd219f489dc?q=80&w=2137&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=compress&cs=tinysrgb&w=800"
              alt="Communauté musulmane unie"
              className="rounded-xl shadow-2xl max-w-2xl w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-sage mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-brand-green">Hijra.fr</strong> est une communauté en ligne et une plateforme dédiée aux 
                  mouhajirouns de France, créée dans le but d'aider nos frères et sœurs à obtenir des informations 
                  fiables et à préparer leur hijra vers un pays musulman.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nous comprenons que la hijra est bien plus qu'un simple déménagement - c'est un voyage spirituel 
                  et pratique qui nécessite une préparation minutieuse, des conseils avisés et le soutien d'une 
                  communauté bienveillante.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Notre équipe, composée de musulmans ayant eux-mêmes vécu l'expérience de la hijra, met à votre 
                  disposition son expertise et son réseau pour vous accompagner à chaque étape de votre projet.
                </p>
              </div>

              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/8728392/pexels-photo-8728392.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Famille musulmane préparant leur hijra"
                  className="rounded-xl shadow-lg w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-brand-green/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre mission et notre engagement envers la communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-brand-green to-brand-sage p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Plus qu'une communauté, des services complets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous vous proposons des services professionnels pour chaque destination où nous avons des partenaires locaux, 
              garantissant un accompagnement de qualité adapté aux spécificités de chaque pays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-8 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-brand-green to-brand-sage p-3 rounded-lg flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Destinations Grid */}
          <div className="bg-gradient-to-br from-brand-green/10 to-brand-mint/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Nos destinations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destinations.map((destination, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-3xl mb-2 block">{destination.flag}</span>
                  <p className="text-sm font-medium text-gray-900">{destination.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-brand-green/10 to-brand-mint/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Rejoignez notre communauté WhatsApp
              </h2>
              <p className="text-xl text-gray-600">
                Connectez-vous avec des milliers de mouhajirouns partageant la même vision
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">Groupe principal</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Un espace de partage pour tous les mouhajirouns où vous pourrez échanger conseils, 
                    expériences et créer des liens durables avec la communauté.
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Plus de 2,500 membres actifs</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Groupes par destination</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Des groupes dédiés pour chaque destination où vous trouverez des informations 
                    spécifiques, des contacts locaux et des conseils adaptés à votre pays cible.
                  </p>
                  <div className="flex items-center text-sm text-blue-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>12 groupes spécialisés</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-bold mb-2">Avantages de la communauté :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Conseils en temps réel</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Retours d'expérience authentiques</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Réseau de contacts locaux</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Support moral et spirituel</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/8728401/pexels-photo-8728401.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Communauté WhatsApp Hijra.fr"
                  className="rounded-xl shadow-lg w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Communauté active 24/7</p>
                        <p className="text-sm text-gray-600">Réponses rapides et bienveillantes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            Rejoignez des milliers de familles qui ont fait confiance à notre expertise pour réussir leur projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-brand-navy px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg transform hover:scale-105 inline-flex items-center justify-center"
            >
              Créer mon compte gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;