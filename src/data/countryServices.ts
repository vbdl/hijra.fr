export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  requirements: string[];
  category: 'visa' | 'residence' | 'business' | 'family' | 'employment' | 'other';
}

export interface CountryService {
  countryId: string;
  countryName: string;
  flag: string;
  currency: string;
  exchangeRate: string;
  services: ServiceOption[];
  popularServices: string[];
  processingInfo: {
    averageTime: string;
    urgentAvailable: boolean;
    onlineAvailable: boolean;
  };
}

export const countryServices: CountryService[] = [
  {
    countryId: 'uae',
    countryName: 'Émirats Arabes Unis',
    flag: '🇦🇪',
    currency: 'AED',
    exchangeRate: '1 EUR = 4.05 AED',
    popularServices: ['spouse-visa-out-investor', 'spouse-visa-out-employee', 'children-visa-out-investor', 'children-visa-out-employee'],
    processingInfo: {
      averageTime: '3-7 jours ouvrables',
      urgentAvailable: true,
      onlineAvailable: true
    },
    services: [
      {
        id: 'spouse-visa-out-investor',
        name: 'Out of country - Spouse visa - Investor sponsor (including security deposit)',
        description: 'Spouse visa, personne se situant hors du territoire lors de la demande, sponsor de type investor. Inclus : entry permit, visite médicale, visa, emirates ID et deposit obligatoire.',
        price: 5600.00,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de mariage',
          'Passeport du conjoint',
          'Photos d\'identité',
          'Certificat médical',
          'Preuve de revenus du sponsor',
          'Entry permit',
          'Security deposit'
        ]
      },
      {
        id: 'spouse-visa-out-employee',
        name: 'Out of country - Spouse visa - Employee sponsor',
        description: 'Spouse visa, personne située hors du territoire des Emirats Arabes Unis lors de la demande, sponsor employé du secteur privé (freezone/mainland) ou public (gouvernement). Inclus : Entry permit, visite médicale, visa, emirates ID.',
        price: 2600.00,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de mariage',
          'Passeport du conjoint',
          'Photos d\'identité',
          'Certificat médical',
          'Preuve d\'emploi du sponsor',
          'Entry permit'
        ]
      },
      {
        id: 'children-visa-out-investor',
        name: 'Out of country - Children visa - Investor sponsor (including security deposit)',
        description: 'Visa de résidence pour un enfant, situé hors du territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, visa, emirates ID et deposit obligatoire.',
        price: 5250.00,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de naissance',
          'Passeport de l\'enfant',
          'Photos d\'identité',
          'Preuve de revenus du sponsor',
          'Entry permit',
          'Security deposit'
        ]
      },
      {
        id: 'children-visa-out-employee',
        name: 'Out of country - Children visa - Employee sponsor',
        description: 'Visa pour un enfant situé hors du territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (freezone/mainland) ou public (gouvernement).',
        price: 2250.00,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de naissance',
          'Passeport de l\'enfant',
          'Photos d\'identité',
          'Preuve d\'emploi du sponsor',
          'Entry permit'
        ]
      },
      {
        id: 'spouse-visa-inside-investor',
        name: 'Inside country - Spouse visa - Investor sponsor (including security deposit)',
        description: 'Spouse visa, personne située dans le territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, status change, visite médicale, visa, emirates ID et deposit obligatoire.',
        price: 6243.30,
        duration: '5-7 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de mariage',
          'Passeport du conjoint',
          'Photos d\'identité',
          'Certificat médical',
          'Entry permit',
          'Status change',
          'Security deposit'
        ]
      },
      {
        id: 'spouse-visa-inside-employee',
        name: 'Inside country - Spouse visa - Employee sponsor',
        description: 'Spouse visa, personne située dans le territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (freezone/mainland) ou public (gouvernement). Inclus : Entry permit, status change, visite médicale, visa et emirates ID.',
        price: 3243.30,
        duration: '5-7 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de mariage',
          'Passeport du conjoint',
          'Photos d\'identité',
          'Certificat médical',
          'Entry permit',
          'Status change'
        ]
      },
      {
        id: 'children-visa-inside-investor',
        name: 'Inside country - Children visa - Investor sponsor (including security deposit)',
        description: 'Visa de résidence pour un enfant, situé dans le territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, status change, visa, emirates ID et deposit obligatoire.',
        price: 5843.30,
        duration: '5-7 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de naissance',
          'Passeport de l\'enfant',
          'Photos d\'identité',
          'Entry permit',
          'Status change',
          'Security deposit'
        ]
      },
      {
        id: 'children-visa-inside-employee',
        name: 'Inside country - Children visa - Employee sponsor',
        description: 'Visa de résidence pour un enfant, situé dans le territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (Freezone/mainland) ou public (gouvernement). Inclus : Entry permit, status change, visa et emirates ID.',
        price: 2843.30,
        duration: '5-7 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de naissance',
          'Passeport de l\'enfant',
          'Photos d\'identité',
          'Entry permit',
          'Status change'
        ]
      }
    ]
  }
];

export const getCountryServices = (countryId: string): CountryService | undefined => {
  return countryServices.find(cs => cs.countryId === countryId);
};

export const getServicesByCategory = (countryId: string, category: string): ServiceOption[] => {
  const country = getCountryServices(countryId);
  return country ? country.services.filter(service => service.category === category) : [];
};