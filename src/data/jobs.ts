import { Job } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Ingénieur Software Senior',
    company: 'Qatar Tech Solutions',
    location: 'Doha',
    country: 'Qatar',
    type: 'full-time',
    salary: '8000-12000€/mois',
    description: 'Recherche ingénieur expérimenté en développement web et mobile pour projets innovants.',
    requirements: ['5+ ans d\'expérience', 'React/Node.js', 'Anglais courant', 'Diplôme en informatique'],
    postedAt: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Consultant Finance Islamique',
    company: 'Dubai Islamic Bank',
    location: 'Dubai',
    country: 'UAE',
    type: 'full-time',
    salary: '6000-9000€/mois',
    description: 'Conseil en produits financiers conformes à la Sharia pour clientèle internationale.',
    requirements: ['Certification finance islamique', 'Expérience bancaire', 'Arabe et anglais', 'Mobilité internationale'],
    postedAt: '2024-01-14',
    featured: true
  },
  {
    id: '3',
    title: 'Professeur de Français',
    company: 'International School of Kuwait',
    location: 'Kuwait City',
    country: 'Kuwait',
    type: 'full-time',
    salary: '3500-5000€/mois',
    description: 'Enseignement du français langue étrangère dans école internationale prestigieuse.',
    requirements: ['Master FLE', '3+ ans d\'expérience', 'Certification internationale', 'Adaptabilité culturelle'],
    postedAt: '2024-01-13',
    featured: false
  },
  {
    id: '4',
    title: 'Chef de Projet Marketing',
    company: 'Bahrain Business Hub',
    location: 'Manama',
    country: 'Bahrain',
    type: 'full-time',
    salary: '4500-6500€/mois',
    description: 'Gestion de campagnes marketing digital pour marques régionales et internationales.',
    requirements: ['5+ ans marketing digital', 'Google Ads & Meta', 'Anglais natif', 'Créativité'],
    postedAt: '2024-01-12',
    featured: false
  },
  {
    id: '5',
    title: 'Architecte Urbanisme',
    company: 'Oman Development Company',
    location: 'Muscat',
    country: 'Oman',
    type: 'contract',
    salary: '5000-7500€/mois',
    description: 'Conception de projets urbains durables dans le cadre de la Vision Oman 2040.',
    requirements: ['Diplôme architecture', 'Expérience projets urbains', 'AutoCAD/3D', 'Vision durable'],
    postedAt: '2024-01-11',
    featured: false
  },
  {
    id: '6',
    title: 'Développeur Mobile Flutter',
    company: 'Casablanca Tech',
    location: 'Casablanca',
    country: 'Morocco',
    type: 'remote',
    salary: '2500-4000€/mois',
    description: 'Développement d\'applications mobiles pour startups marocaines en croissance.',
    requirements: ['Flutter/Dart', '3+ ans mobile', 'Firebase', 'Français/Arabe'],
    postedAt: '2024-01-10',
    featured: false
  },
  {
    id: '7',
    title: 'Médecin Généraliste',
    company: 'Clinique Internationale Tunis',
    location: 'Tunis',
    country: 'Tunisia',
    type: 'full-time',
    salary: '2000-3500€/mois',
    description: 'Consultation en médecine générale pour patientèle internationale francophone.',
    requirements: ['Diplôme médecine', 'Équivalence Tunisie', 'Français courant', 'Expérience clinique'],
    postedAt: '2024-01-09',
    featured: false
  },
  {
    id: '8',
    title: 'Guide Touristique Expert',
    company: 'Egyptian Heritage Tours',
    location: 'Le Caire',
    country: 'Egypt',
    type: 'part-time',
    salary: '1500-2500€/mois',
    description: 'Accompagnement de groupes francophones sur sites historiques et culturels.',
    requirements: ['Formation tourisme', 'Histoire de l\'Égypte', 'Multilingue', 'Charisme'],
    postedAt: '2024-01-08',
    featured: false
  }
];