import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'qatar',
    name: 'Qatar',
    nameAr: 'قطر',
    flag: '🇶🇦',
    region: 'Golfe Persique',
    description: 'Économie dynamique, fiscalité avantageuse, et qualité de vie élevée dans un cadre moderne.',
    highlights: ['Aucun impôt sur le revenu', 'Système de santé de qualité', 'Sécurité exceptionnelle', 'Proximité avec l\'Arabie Saoudite'],
    livingCost: {
      rent: '1500-3000€/mois',
      food: '400-600€/mois',
      transport: '150-300€/mois'
    },
    exchangeRate: '1 EUR = 4.02 QAR',
    requirements: ['Visa de travail', 'Contrat d\'emploi', 'Certificat médical', 'Diplômes authentifiés'],
    image: 'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'uae',
    name: 'Émirats Arabes Unis',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    region: 'Golfe Persique',
    description: 'Hub international des affaires avec Dubai et Abu Dhabi, lifestyle cosmopolite.',
    highlights: ['Économie diversifiée', 'Visa de résidence longue durée', 'Hub des affaires', 'Multiculturalisme'],
    livingCost: {
      rent: '1200-2500€/mois',
      food: '350-550€/mois',
      transport: '200-400€/mois'
    },
    exchangeRate: '1 EUR = 4.05 AED',
    requirements: ['Visa de résidence', 'Sponsorship employeur', 'Assurance santé', 'Certificat de bonne conduite'],
    image: 'https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'kuwait',
    name: 'Koweït',
    nameAr: 'الكويت',
    flag: '🇰🇼',
    region: 'Golfe Persique',
    description: 'Richesse pétrolière, stabilité politique, et généreuses opportunités d\'emploi.',
    highlights: ['Salaires attractifs', 'Avantages sociaux', 'Proximité culturelle', 'Stabilité économique'],
    livingCost: {
      rent: '800-1800€/mois',
      food: '300-500€/mois',
      transport: '100-250€/mois'
    },
    exchangeRate: '1 EUR = 0.34 KWD',
    requirements: ['Visa de travail', 'Certificat médical', 'Diplômes attestés', 'Contrat d\'emploi'],
    image: 'https://images.pexels.com/photos/981093/pexels-photo-981093.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'bahrain',
    name: 'Bahreïn',
    nameAr: 'البحرين',
    flag: '🇧🇭',
    region: 'Golfe Persique',
    description: 'Centre financier du Golfe, fiscalité attractive, et style de vie moderne.',
    highlights: ['Hub financier', 'Facilité d\'installation', 'Tolérance culturelle', 'Coût de vie modéré'],
    livingCost: {
      rent: '600-1400€/mois',
      food: '250-400€/mois',
      transport: '80-200€/mois'
    },
    exchangeRate: '1 EUR = 0.42 BHD',
    requirements: ['Permis de travail', 'Visa de résidence', 'Examen médical', 'Certification des diplômes'],
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'oman',
    name: 'Oman',
    nameAr: 'عُمان',
    flag: '🇴🇲',
    region: 'Golfe Persique',
    description: 'Beauté naturelle exceptionnelle, culture traditionnelle préservée, et paix sociale.',
    highlights: ['Nature préservée', 'Culture authentique', 'Sécurité remarquable', 'Hospitalité légendaire'],
    livingCost: {
      rent: '500-1200€/mois',
      food: '200-350€/mois',
      transport: '100-200€/mois'
    },
    exchangeRate: '1 EUR = 0.42 OMR',
    requirements: ['Visa de travail', 'Sponsorship', 'Certificat de santé', 'Diplômes légalisés'],
    image: 'https://images.pexels.com/photos/4825715/pexels-photo-4825715.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'morocco',
    name: 'Maroc',
    nameAr: 'المغرب',
    flag: '🇲🇦',
    region: 'Afrique du Nord',
    description: 'Proximité avec l\'Europe, coût de la vie abordable, et richesse culturelle.',
    highlights: ['Coût de vie bas', 'Proximité Europe', 'Diversité géographique', 'Patrimoine culturel'],
    livingCost: {
      rent: '200-600€/mois',
      food: '150-300€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 10.85 MAD',
    requirements: ['Carte de séjour', 'Justificatifs de revenus', 'Casier judiciaire', 'Certificat médical'],
    image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'tunisia',
    name: 'Tunisie',
    nameAr: 'تونس',
    flag: '🇹🇳',
    region: 'Afrique du Nord',
    description: 'Douceur de vivre méditerranéenne, histoire millénaire, et accueil chaleureux.',
    highlights: ['Climat méditerranéen', 'Coût de vie attractif', 'Francophonie', 'Patrimoine historique'],
    livingCost: {
      rent: '150-400€/mois',
      food: '100-250€/mois',
      transport: '30-100€/mois'
    },
    exchangeRate: '1 EUR = 3.45 TND',
    requirements: ['Titre de séjour', 'Justificatifs financiers', 'Certificat médical', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/4825715/pexels-photo-4825715.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'egypt',
    name: 'Égypte',
    nameAr: 'مصر',
    flag: '🇪🇬',
    region: 'Afrique du Nord',
    description: 'Berceau de la civilisation, université Al-Azhar, et coût de la vie très abordable.',
    highlights: ['Université Al-Azhar', 'Coût de vie très bas', 'Histoire pharaonique', 'Centre culturel arabe'],
    livingCost: {
      rent: '100-300€/mois',
      food: '80-200€/mois',
      transport: '20-80€/mois'
    },
    exchangeRate: '1 EUR = 32.85 EGP',
    requirements: ['Visa de résidence', 'Permis de travail', 'Certificat de santé', 'Diplômes traduits'],
    image: 'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'turkey',
    name: 'Turquie',
    nameAr: 'تركيا',
    flag: '🇹🇷',
    region: 'Eurasie',
    description: 'Pont entre l\'Europe et l\'Asie, économie dynamique, et richesses naturelles.',
    highlights: ['Position géostratégique', 'Économie en croissance', 'Beauté naturelle', 'Histoire ottomane'],
    livingCost: {
      rent: '300-800€/mois',
      food: '150-350€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 28.50 TRY',
    requirements: ['Permis de résidence', 'Assurance santé', 'Justificatifs de revenus', 'Certificat de bonne conduite'],
    image: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'malaysia',
    name: 'Malaisie',
    nameAr: 'ماليزيا',
    flag: '🇲🇾',
    region: 'Asie du Sud-Est',
    description: 'Modernité asiatique, diversité culturelle, et programme Malaysia My Second Home.',
    highlights: ['Programme MM2H', 'Diversité culturelle', 'Technologie avancée', 'Coût de vie modéré'],
    livingCost: {
      rent: '300-700€/mois',
      food: '200-400€/mois',
      transport: '80-200€/mois'
    },
    exchangeRate: '1 EUR = 5.15 MYR',
    requirements: ['Programme MM2H', 'Justificatifs financiers', 'Assurance santé', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'saudi-arabia',
    name: 'Arabie Saoudite',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    region: 'Péninsule Arabique',
    description: 'Terre sainte de l\'Islam, Vision 2030, et opportunités d\'investissement majeures.',
    highlights: ['Lieux saints', 'Vision 2030', 'Opportunités d\'affaires', 'Transformation économique'],
    livingCost: {
      rent: '400-1000€/mois',
      food: '200-400€/mois',
      transport: '100-250€/mois'
    },
    exchangeRate: '1 EUR = 4.12 SAR',
    requirements: ['Visa de travail', 'Sponsorship', 'Certificat médical', 'Diplômes authentifiés'],
    image: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'algeria',
    name: 'Algérie',
    nameAr: 'الجزائر',
    flag: '🇩🇿',
    region: 'Afrique du Nord',
    description: 'Plus grand pays d\'Afrique, richesses naturelles, et patrimoine berbère et arabe.',
    highlights: ['Vaste territoire', 'Richesses naturelles', 'Francophonie', 'Patrimoine culturel'],
    livingCost: {
      rent: '100-400€/mois',
      food: '80-200€/mois',
      transport: '30-100€/mois'
    },
    exchangeRate: '1 EUR = 148.50 DZD',
    requirements: ['Visa de séjour', 'Justificatifs de revenus', 'Certificat médical', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];