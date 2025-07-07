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
    popularServices: ['residence-visa-new', 'emirates-id-new', 'family-visa', 'business-license'],
    processingInfo: {
      averageTime: '3-7 jours ouvrables',
      urgentAvailable: true,
      onlineAvailable: true
    },
    services: [
      // Visa & Residence Services
      {
        id: 'residence-visa-new',
        name: 'Nouveau visa de résidence',
        description: 'Demande de nouveau visa de résidence pour les EAU',
        price: 1200,
        duration: '5-7 jours ouvrables',
        category: 'visa',
        requirements: [
          'Passeport original valide',
          'Photos d\'identité récentes',
          'Certificat médical approuvé',
          'Contrat de travail ou sponsorship',
          'Assurance santé valide'
        ]
      },
      {
        id: 'residence-visa-renewal',
        name: 'Renouvellement visa de résidence',
        description: 'Renouvellement de visa de résidence existant',
        price: 800,
        duration: '3-5 jours ouvrables',
        category: 'visa',
        requirements: [
          'Visa de résidence actuel',
          'Emirates ID',
          'Certificat médical récent',
          'Preuve d\'emploi continu'
        ]
      },
      {
        id: 'emirates-id-new',
        name: 'Nouvelle Emirates ID',
        description: 'Demande de nouvelle carte d\'identité Emirates',
        price: 350,
        duration: '7-10 jours ouvrables',
        category: 'residence',
        requirements: [
          'Visa de résidence valide',
          'Photos biométriques',
          'Formulaire de demande complété',
          'Frais de service'
        ]
      },
      {
        id: 'emirates-id-renewal',
        name: 'Renouvellement Emirates ID',
        description: 'Renouvellement de carte Emirates ID existante',
        price: 250,
        duration: '5-7 jours ouvrables',
        category: 'residence',
        requirements: [
          'Emirates ID actuelle',
          'Visa de résidence valide',
          'Photos biométriques récentes'
        ]
      },
      // Family Services
      {
        id: 'family-visa',
        name: 'Visa familial',
        description: 'Visa de résidence pour membres de la famille',
        price: 1500,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat de mariage/naissance',
          'Passeports des membres de la famille',
          'Preuve de revenus suffisants',
          'Certificats médicaux',
          'Assurance santé familiale'
        ]
      },
      {
        id: 'birth-certificate',
        name: 'Certificat de naissance',
        description: 'Enregistrement de naissance aux EAU',
        price: 200,
        duration: '3-5 jours ouvrables',
        category: 'family',
        requirements: [
          'Certificat médical de naissance',
          'Passeports des parents',
          'Certificat de mariage',
          'Emirates ID des parents'
        ]
      },
      // Business Services
      {
        id: 'business-license',
        name: 'Licence commerciale',
        description: 'Nouvelle licence pour activité commerciale',
        price: 2500,
        duration: '10-15 jours ouvrables',
        category: 'business',
        requirements: [
          'Plan d\'affaires détaillé',
          'Preuve de capital initial',
          'Contrat de location commercial',
          'Approbations sectorielles si nécessaire'
        ]
      },
      {
        id: 'business-license-renewal',
        name: 'Renouvellement licence commerciale',
        description: 'Renouvellement de licence commerciale existante',
        price: 1800,
        duration: '5-7 jours ouvrables',
        category: 'business',
        requirements: [
          'Licence commerciale actuelle',
          'Rapports financiers',
          'Contrat de location valide',
          'Conformité réglementaire'
        ]
      },
      // Employment Services
      {
        id: 'work-permit',
        name: 'Permis de travail',
        description: 'Nouveau permis de travail pour employé',
        price: 600,
        duration: '5-7 jours ouvrables',
        category: 'employment',
        requirements: [
          'Contrat de travail signé',
          'Qualifications éducatives',
          'Certificat d\'expérience',
          'Approbation MOL'
        ]
      },
      {
        id: 'labour-card',
        name: 'Carte de travail',
        description: 'Carte de travail officielle du ministère',
        price: 400,
        duration: '3-5 jours ouvrables',
        category: 'employment',
        requirements: [
          'Permis de travail approuvé',
          'Contrat de travail',
          'Certificat médical',
          'Photos d\'identité'
        ]
      },
      // Other Services
      {
        id: 'police-clearance',
        name: 'Certificat de police',
        description: 'Certificat de bonne conduite des EAU',
        price: 150,
        duration: '2-3 jours ouvrables',
        category: 'other',
        requirements: [
          'Emirates ID',
          'Demande en ligne',
          'Frais de service'
        ]
      },
      {
        id: 'attestation-services',
        name: 'Services d\'attestation',
        description: 'Attestation de documents officiels',
        price: 300,
        duration: '3-5 jours ouvrables',
        category: 'other',
        requirements: [
          'Documents originaux',
          'Traductions certifiées si nécessaire',
          'Formulaires de demande'
        ]
      }
    ]
  },
  {
    countryId: 'qatar',
    countryName: 'Qatar',
    flag: '🇶🇦',
    currency: 'QAR',
    exchangeRate: '1 EUR = 4.02 QAR',
    popularServices: ['residence-permit', 'work-visa', 'family-visa', 'business-registration'],
    processingInfo: {
      averageTime: '5-10 jours ouvrables',
      urgentAvailable: true,
      onlineAvailable: true
    },
    services: [
      {
        id: 'residence-permit',
        name: 'Permis de résidence',
        description: 'Nouveau permis de résidence au Qatar',
        price: 1000,
        duration: '7-10 jours ouvrables',
        category: 'residence',
        requirements: [
          'Passeport valide',
          'Visa d\'entrée',
          'Certificat médical',
          'Contrat de travail',
          'Photos d\'identité'
        ]
      },
      {
        id: 'work-visa',
        name: 'Visa de travail',
        description: 'Visa de travail pour le Qatar',
        price: 800,
        duration: '5-7 jours ouvrables',
        category: 'employment',
        requirements: [
          'Offre d\'emploi approuvée',
          'Qualifications éducatives',
          'Certificat médical',
          'Casier judiciaire'
        ]
      },
      {
        id: 'family-visa',
        name: 'Visa familial',
        description: 'Visa de résidence pour la famille',
        price: 1200,
        duration: '7-10 jours ouvrables',
        category: 'family',
        requirements: [
          'Preuve de revenus minimum',
          'Certificats familiaux',
          'Certificats médicaux',
          'Assurance santé'
        ]
      },
      {
        id: 'business-registration',
        name: 'Enregistrement d\'entreprise',
        description: 'Création d\'entreprise au Qatar',
        price: 2000,
        duration: '10-15 jours ouvrables',
        category: 'business',
        requirements: [
          'Plan d\'affaires',
          'Capital minimum requis',
          'Partenaire local (si nécessaire)',
          'Licences sectorielles'
        ]
      }
    ]
  },
  {
    countryId: 'morocco',
    countryName: 'Maroc',
    flag: '🇲🇦',
    currency: 'MAD',
    exchangeRate: '1 EUR = 10.85 MAD',
    popularServices: ['carte-sejour', 'autorisation-travail', 'visa-investisseur', 'creation-entreprise'],
    processingInfo: {
      averageTime: '15-30 jours ouvrables',
      urgentAvailable: false,
      onlineAvailable: false
    },
    services: [
      {
        id: 'carte-sejour',
        name: 'Carte de séjour',
        description: 'Carte de séjour temporaire ou permanente',
        price: 200,
        duration: '15-20 jours ouvrables',
        category: 'residence',
        requirements: [
          'Passeport valide',
          'Justificatifs de revenus',
          'Certificat médical',
          'Casier judiciaire',
          'Contrat de location'
        ]
      },
      {
        id: 'autorisation-travail',
        name: 'Autorisation de travail',
        description: 'Permis de travail pour étrangers',
        price: 300,
        duration: '20-30 jours ouvrables',
        category: 'employment',
        requirements: [
          'Contrat de travail',
          'Diplômes et qualifications',
          'Certificat médical',
          'Autorisation employeur'
        ]
      },
      {
        id: 'visa-investisseur',
        name: 'Visa investisseur',
        description: 'Visa pour investissement au Maroc',
        price: 500,
        duration: '30-45 jours ouvrables',
        category: 'business',
        requirements: [
          'Plan d\'investissement',
          'Preuve de fonds',
          'Étude de faisabilité',
          'Garanties bancaires'
        ]
      },
      {
        id: 'creation-entreprise',
        name: 'Création d\'entreprise',
        description: 'Enregistrement de nouvelle société',
        price: 800,
        duration: '20-30 jours ouvrables',
        category: 'business',
        requirements: [
          'Statuts de la société',
          'Capital social',
          'Domiciliation',
          'Registre de commerce'
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