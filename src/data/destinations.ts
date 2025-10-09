import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'qatar',
    name: 'Qatar',
    nameAr: 'قطر',
    flag: '🇶🇦',
    region: 'Golfe Persique',
    description: 'Doha émerge du désert comme un mirage ultramoderne, où l\'architecture audacieuse des gratte-ciel dialogue avec les traditions bédouines...',
    highlights: {
      emploi: `Le marché de l'emploi est très porteur dans les secteurs de l'énergie, de la finance et de l'aviation...`,
      // ... autres highlights
    },
    livingCost: {
      rent: '1500-3000€/mois',
      food: '400-600€/mois',
      transport: '150-300€/mois'
    },
    exchangeRate: '1 EUR = 4.02 QAR',
    legalOptions: [
      {
        type: 'Visa de travail',
        description: 'Sponsorisé par un employeur qatari',
        requirements: ['Contrat de travail', 'Diplômes authentifiés', 'Certificat médical', 'Extrait de casier judiciaire'],
        duration: 'Liée au contrat (renouvelable)',
        benefits: ['Accès à la résidence', 'Couverture santé', 'Possibilité de faire venir la famille']
      },
      {
        type: 'Visa d\'investisseur',
        description: 'Pour investisseurs dans des projets approuvés',
        requirements: ['Investissement minimum de 200 000€', 'Business plan approuvé', 'Preuves de fonds'],
        duration: 'Renouvelable annuellement',
        benefits: ['Résidence sans sponsor employeur', 'Droit de travailler dans son entreprise']
      },
      {
        type: 'Visa familial',
        description: 'Pour les dépendants du titulaire de visa de travail',
        requirements: ['Revenu minimum du sponsor', 'Logement adapté', 'Relation familiale prouvée'],
        duration: 'Liée au visa du sponsor',
        benefits: ['Droit de résidence', 'Accès aux études', 'Couverture santé']
      }
    ],
    image: 'https://images.pexels.com/photos/13408685/pexels-photo-13408685.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'uae',
    name: 'Émirats Arabes Unis',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    region: 'Golfe Persique',
    description: 'Dubai et Abu Dhabi incarnent le vertige des superlatifs...',
    highlights: {
      emploi: `Le marché est extrêmement dynamique avec des opportunités dans tous les secteurs...`,
      // ... autres highlights
    },
    livingCost: {
      rent: '1200-2500€/mois',
      food: '350-550€/mois',
      transport: '200-400€/mois'
    },
    exchangeRate: '1 EUR = 4.05 AED',
    legalOptions: [
      {
        type: 'Golden Visa',
        description: 'Résidence longue durée pour talents et investisseurs',
        requirements: ['Investissement min. 500 000€ ou revenu mensuel > 15 000€', 'Diplômes reconnus pour les talents'],
        duration: '5-10 ans renouvelable',
        benefits: ['Résidence sans sponsor', 'Droit de travailler librement', 'Couverture famille étendue']
      },
      {
        type: 'Visa de travail standard',
        description: 'Sponsorisé par un employeur local',
        requirements: ['Contrat de travail attesté', 'Diplômes légalisés', 'Assurance santé obligatoire'],
        duration: '2-3 ans renouvelable',
        benefits: ['Accès aux services', 'Possibilité visa familial', 'Retraite possible après 15 ans']
      },
      {
        type: 'Visa de retraité',
        description: 'Pour retraités de plus de 55 ans',
        requirements: ['Preuve de retraite', 'Revenus mensuels > 4000€', 'Assurance santé valide'],
        duration: '5 ans renouvelable',
        benefits: ['Résidence sans droit de travail', 'Accès aux services', 'Exonération fiscale']
      },
      {
        type: 'Visa de propriétaire',
        description: 'Pour propriétaires immobiliers',
        requirements: ['Propriété d\'une valeur min. 270 000€', 'Assurance santé'],
        duration: '2 ans renouvelable',
        benefits: ['Résidence pour toute la famille', 'Droit de séjour continu']
      }
    ],
    image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'morocco',
    name: 'Maroc',
    nameAr: 'المغرب',
    flag: '🇲🇦',
    region: 'Afrique du Nord',
    description: 'Le Maroc est un pays-continent qui déploie ses paysages...',
    highlights: {
      emploi: `L'économie marocaine connaît une croissance soutenue...`,
      // ... autres highlights
    },
    livingCost: {
      rent: '200-600€/mois',
      food: '150-300€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 10.85 MAD',
    legalOptions: [
      {
        type: 'Carte de séjour temporaire',
        description: 'Pour séjours de moins d\'un an',
        requirements: ['Passeport valide', 'Justificatifs de ressources', 'Assurance santé'],
        duration: '1 an renouvelable',
        benefits: ['Droit de séjour', 'Accès aux services de base']
      },
      {
        type: 'Carte de résidence',
        description: 'Pour séjours de longue durée',
        requirements: ['Justificatifs de revenus stables', 'Casier judiciaire', 'Certificat médical'],
        duration: '1-10 ans selon situation',
        benefits: ['Accès au travail indépendant', 'Droit à la propriété', 'Regroupement familial']
      },
      {
        type: 'Statut de retraité',
        description: 'Pour retraités étrangers',
        requirements: ['Preuve de retraite', 'Revenus minimums', 'Assurance santé couvrant le Maroc'],
        duration: 'Illimitée sous conditions',
        benefits: ['Exonérations fiscales', 'Droit à la propriété', 'Accès aux soins']
      },
      {
        type: 'Visa d\'investisseur',
        description: 'Pour créateurs d\'entreprise',
        requirements: ['Business plan approuvé', 'Investissement minimum', 'Création d\'emplois'],
        duration: 'Liée au projet',
        benefits: ['Accès simplifié à la résidence', 'Aides à l\'investissement']
      }
    ],
    image: 'https://images.pexels.com/photos/28289056/pexels-photo-28289056.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'tunisia',
    name: 'Tunisie',
    nameAr: 'تونس',
    flag: '🇹🇳',
    region: 'Afrique du Nord',
    description: 'La Tunisie déploie sa douceur de vivre méditerranéenne...',
    highlights: {
      emploi: `Le marché du travail offre des opportunités dans le tourisme...`,
      // ... autres highlights
    },
    livingCost: {
      rent: '150-400€/mois',
      food: '100-250€/mois',
      transport: '30-100€/mois'
    },
    exchangeRate: '1 EUR = 3.45 TND',
    legalOptions: [
      {
        type: 'Carte de séjour temporaire',
        description: 'Séjour inférieur à un an',
        requirements: ['Passeport valide + visa', 'Justificatifs de séjour', 'Assurance maladie'],
        duration: '1 an maximum',
        benefits: ['Séjour légal', 'Accès aux services']
      },
      {
        type: 'Permis de séjour',
        description: 'Résidence de longue durée',
        requirements: ['Revenus stables prouvés', 'Logement décent', 'Casier judiciaire vierge'],
        duration: '1 à 5 ans renouvelable',
        benefits: ['Droit au travail indépendant', 'Regroupement familial', 'Accès propriété immobilière']
      },
      {
        type: 'Statut privilégié retraité',
        description: 'Pour retraités étrangers',
        requirements: ['Revenus de retraite > 1500€/mois', 'Assurance santé internationale'],
        duration: 'Illimitée',
        benefits: ['Exonérations douanières', 'Droit propriété illimité', 'Accès soins préférentiels']
      },
      {
        type: 'Visa d\'investissement',
        description: 'Pour investisseurs étrangers',
        requirements: ['Investissement min. 100 000€', 'Business plan viable', 'Engagement création emplois'],
        duration: 'Liée à l\'investissement',
        benefits: ['Aides fiscales', 'Procédures accélérées', 'Accès résidence permanente']
      }
    ],
    image: 'https://images.pexels.com/photos/891126/pexels-photo-891126.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'turkey',
    name: 'Turquie',
    nameAr: 'تركيا',
    flag: '🇹🇷',
    region: 'Eurasie',
    description: 'Istanbul, pont entre deux continents...',
    highlights: {
      emploi: `L'économie turque est dynamique avec des opportunités diverses...`,
      // ... autres highlights
    },
    livingCost: {
      rent: '300-800€/mois',
      food: '150-350€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 28.50 TRY',
    legalOptions: [
      {
        type: 'Permis de séjour court',
        description: 'Pour séjours touristiques ou courts',
        requirements: ['Passeport valide', 'Assurance santé', 'Preuves de ressources'],
        duration: 'Jusqu\'à 2 ans',
        benefits: ['Séjour légal', 'Accès services basiques']
      },
      {
        type: 'Permis de résidence longue durée',
        description: 'Pour résidents permanents',
        requirements: ['Revenus stables prouvés', 'Assurance santé turque', 'Logement adéquat'],
        duration: 'Illimitée sous conditions',
        benefits: ['Droit travail indépendant', 'Accès sécurité sociale', 'Regroupement familial']
      },
      {
        type: 'Citoyenneté par investissement',
        description: 'Naturalisation accélérée',
        requirements: ['Investissement min. 400 000€ immobilier', 'Création 50 emplois', 'Dépôt bancaire 500 000€'],
        duration: 'Permanente',
        benefits: ['Passeport turc', 'Liberté circulation', 'Droits civiques complets']
      },
      {
        type: 'Permis de travail',
        description: 'Pour emploi salarié',
        requirements: ['Contrat de travail approuvé', 'Diplômes reconnus', 'Autorisation employeur'],
        duration: '1 an renouvelable',
        benefits: ['Accès sécurité sociale', 'Droit résidence', 'Protection légale']
      }
    ],
    image: 'https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];
