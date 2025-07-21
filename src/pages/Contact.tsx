import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    destination: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Message envoyé avec succès !
              </h2>
              <p className="text-gray-600 mb-6">
                Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
              </p>
              <Button
                variant="primary"
                onClick={() => setSubmitted(false)}
              >
                Envoyer un autre message
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-forest py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-sage to-brand-mint opacity-90"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Contactez-nous
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto drop-shadow-sm">
            Notre équipe est là pour vous accompagner dans votre projet de Hijra
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Nos coordonnées</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-brand-green p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contact@hijra.fr</p>
                    <p className="text-gray-600">support@hijra.fr</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">Paris, France</p>
                    <p className="text-sm text-gray-500">Rendez-vous sur demande</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Horaires</p>
                    <p className="text-gray-600">Lun-Ven: 9h-18h</p>
                    <p className="text-gray-600">Sam: 10h-16h</p>
                    <p className="text-gray-600">Dim: Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Community */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="h-6 w-6" />
                <h3 className="text-lg font-bold">Rejoignez notre communauté</h3>
              </div>
              <p className="text-green-100 mb-4">
                Plus de 2,500 mouhajirouns partagent leurs expériences et conseils
              </p>
              <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-green-600">
                <Users className="h-4 w-4 mr-2" />
                Rejoindre WhatsApp
              </Button>
            </div>

            {/* FAQ Link */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Questions fréquentes</h4>
              <p className="text-blue-800 text-sm mb-4">
                Consultez notre FAQ pour des réponses rapides aux questions les plus courantes.
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Voir la FAQ
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                      Destination souhaitée
                    </label>
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    >
                      <option value="">Sélectionner une destination</option>
                      <option value="qatar">Qatar</option>
                      <option value="uae">Émirats Arabes Unis</option>
                      <option value="saudi-arabia">Arabie Saoudite</option>
                      <option value="kuwait">Koweït</option>
                      <option value="bahrain">Bahreïn</option>
                      <option value="oman">Oman</option>
                      <option value="morocco">Maroc</option>
                      <option value="tunisia">Tunisie</option>
                      <option value="egypt">Égypte</option>
                      <option value="turkey">Turquie</option>
                      <option value="malaysia">Malaisie</option>
                      <option value="algeria">Algérie</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                    placeholder="Décrivez votre projet de Hijra, vos questions ou besoins..."
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Temps de réponse :</strong> Nous nous engageons à vous répondre sous 24h en semaine.
                    Pour les demandes urgentes, n'hésitez pas à nous appeler directement.
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;