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
      emploi: `Le marché de l'emploi est très porteur dans les secteurs de l'énergie, de la finance et de l'aviation. Les salaires sont attractifs avec une exonération fiscale totale sur le revenu. La plupart des contrats incluent des avantages substantiels comme le logement et les frais scolaires.`,
      logement: `Le marché locatif offre des standards de qualité dans les complexes résidentiels modernes. Les zones comme West Bay et The Pearl sont très prisées des expatriés. Les prix sont élevés mais généralement pris en charge par l'employeur.`,
      education: `Le Qatar dispose d'excellentes écoles internationales (britanniques, américaines, françaises) et d'universités prestigieuses comme Carnegie Mellon. Les frais scolaires sont souvent inclus dans les packages de rémunération.`,
      santé: `Le système de santé est de classe mondiale avec Hamad Medical Corporation. L'assurance santé obligatoire offre une couverture complète. Les hôpitaux sont ultra-modernes avec du personnel médical international.`,
      coûtVie: `Le coût de la vie est élevé mais compensé par les salaires généreux. L'alimentation importée et les loisirs représentent les postes de dépense principaux. Aucune TVA n'est actuellement appliquée.`,
      social: `Les aides sociales pour les familles en difficulté sont limitées. Le consulat de France peut apporter un soutien aux ressortissants. Quelques associations caritatives locales existent mais l'employeur reste le premier recours.`
    },
    livingCost: {
      rent: '1500-3000€/mois',
      food: '400-600€/mois',
      transport: '150-300€/mois'
    },
    exchangeRate: '1 EUR = 4.02 QAR',
    requirements: ['Visa de travail', 'Contrat d\'emploi', 'Certificat médical', 'Diplômes authentifiés'],
    image: 'https://images.pexels.com/photos/13408685/pexels-photo-13408685.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'uae',
    name: 'Émirats Arabes Unis',
    nameAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    region: 'Golfe Persique',
    description: 'Dubai et Abu Dhabi incarnent le vertige des superlatifs : plus haute tour, plus grand centre commercial, îles artificielles...',
    highlights: {
      emploi: `Le marché est extrêmement dynamique avec des opportunités dans tous les secteurs. Les salaires attractifs sont complétés par des avantages en nature. Le Golden Visa permet une résidence longue durée pour les talents et investisseurs.`,
      logement: `L'offre immobilière est vaste, des appartements modernes aux villas de standing. Les communautés fermées comme Palm Jumeirah offrent un cadre de vie exceptionnel. Les prix varient considérablement entre les émirats.`,
      education: `Les Émirats abritent les meilleures écoles internationales de la région et des universités de renom comme la Sorbonne Abu Dhabi. La qualité éducative est excellente mais les frais sont élevés.`,
      santé: `Le système de santé compte parmi les meilleurs au monde avec des hôpitaux équipés des dernières technologies. L'assurance santé obligatoire offre une couverture complète et de qualité.`,
      coûtVie: `Dubai présente un coût de la vie élevé, tandis que les autres émirats sont plus abordables. Le loyer constitue le poste de dépense principal. L'alimentation variée mais importée reste coûteuse.`,
      social: `Les aides sociales pour expatriés sont quasi inexistantes. Le consulat de France à Dubai et Abu Dhabi est très actif. Les associations communautaires françaises constituent un réseau d'entraide important.`
    },
    livingCost: {
      rent: '1200-2500€/mois',
      food: '350-550€/mois',
      transport: '200-400€/mois'
    },
    exchangeRate: '1 EUR = 4.05 AED',
    requirements: ['Visa de résidence', 'Sponsorship employeur', 'Assurance santé', 'Certificat de bonne conduite'],
    image: 'https://images.pexels.com/photos/2115367/pexels-photo-2115367.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'morocco',
    name: 'Maroc',
    nameAr: 'المغرب',
    flag: '🇲🇦',
    region: 'Afrique du Nord',
    description: 'Le Maroc est un pays-continent qui déploie ses paysages comme un livre d\'images...',
    highlights: {
      emploi: `L'économie marocaine connaît une croissance soutenue dans les technologies et les services. Les salaires sont modestes mais le coût de vie faible. De nombreuses délocalisations françaises offrent des opportunités intéressantes.`,
      logement: `Le marché immobilier propose un large choix à des prix très abordables. Les standards de confort européens sont disponibles dans les grandes villes. Les communautés résidentielles sécurisées sont appréciées des expatriés.`,
      education: `Le réseau d'écoles françaises (Lyautey, Descartes) est excellent et les universités proposent des programmes de qualité. Les frais scolaires restent raisonnables comparé à l'Europe.`,
      santé: `Le système de santé offre une double approche : public basique et privé de très bon niveau. Les cliniques privées de Casablanca et Rabat disposent d'équipements modernes à coûts abordables.`,
      coûtVie: `Le coût de la vie est très attractif, surtout hors des grandes villes. L'alimentation locale de qualité et les services domestiques sont accessibles. Le rapport qualité-prix est excellent.`,
      social: `La communauté française importante constitue un réseau d'entraide solide. Le consulat et les associations françaises sont très actifs. Des programmes sociaux gouvernementaux existent pour les situations difficiles.`
    },
    livingCost: {
      rent: '200-600€/mois',
      food: '150-300€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 10.85 MAD',
    requirements: ['Carte de séjour', 'Justificatifs de revenus', 'Casier judiciaire', 'Certificat médical'],
    image: 'https://images.pexels.com/photos/28289056/pexels-photo-28289056.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'tunisia',
    name: 'Tunisie',
    nameAr: 'تونس',
    flag: '🇹🇳',
    region: 'Afrique du Nord',
    description: 'La Tunisie déploie sa douceur de vivre méditerranéenne entre mer transparente et histoire millénaire...',
    highlights: {
      emploi: `Le marché du travail offre des opportunités dans le tourisme et les technologies. Les salaires modestes sont compensés par un coût de vie faible. Un statut avantageux existe pour les retraités étrangers.`,
      logement: `Les prix immobiliers sont très attractifs, particulièrement sur le littoral. Le rapport qualité-prix est excellent et les procédures d'acquisition sont simplifiées pour les étrangers.`,
      education: `Le réseau d'écoles françaises est de bon niveau et les universités francophones sont reconnues. Les coûts éducatifs restent très raisonnables pour une qualité correcte.`,
      santé: `Les soins dans le secteur privé sont de qualité à des prix abordables. Le medical tourism se développe rapidement avec un personnel médical bien formé.`,
      coûtVie: `La Tunisie présente un des coûts de vie les plus bas de la Méditerranée. L'alimentation et les services sont très accessibles, offrant un excellent rapport qualité-prix.`,
      social: `La solidarité communautaire est forte et les associations françaises sont présentes. Le consulat français peut intervenir dans les situations d'urgence. Les aides de l'État tunisien restent limitées.`
    },
    livingCost: {
      rent: '150-400€/mois',
      food: '100-250€/mois',
      transport: '30-100€/mois'
    },
    exchangeRate: '1 EUR = 3.45 TND',
    requirements: ['Titre de séjour', 'Justificatifs financiers', 'Certificat médical', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/891126/pexels-photo-891126.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'turkey',
    name: 'Turquie',
    nameAr: 'تركيا',
    flag: '🇹🇷',
    region: 'Eurasie',
    description: 'Istanbul, pont entre deux continents, résume à elle seule la complexité turque...',
    highlights: {
      emploi: `L'économie turque est dynamique avec des opportunités diverses. Le programme de résidence attire investisseurs et retraités. Les secteurs du tourisme, de l'immobilier et du textile sont particulièrement porteurs.`,
      logement: `Le marché immobilier est abordable, surtout en province. Les standards de construction sont de bonne qualité et les procédures d'achat simplifiées pour les étrangers.`,
      education: `Les écoles internationales d'Istanbul offrent un bon niveau éducatif. Les universités se développent rapidement avec des coûts modérés comparé à l'Europe.`,
      santé: `Le système médical s'améliore constamment avec un medical tourism très développé. Les coûts de santé restent attractifs pour une qualité correcte.`,
      coûtVie: `Le coût de la vie est abordable hors d'Istanbul. L'alimentation de qualité et les transports publics efficaces sont accessibles à prix raisonnable.`,
      social: `La sécurité sociale turque est accessible aux résidents permanents. Le consulat français à Istanbul et les associations d'expatriés offrent un bon réseau de soutien.`
    },
    livingCost: {
      rent: '300-800€/mois',
      food: '150-350€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 28.50 TRY',
    requirements: ['Permis de résidence', 'Assurance santé', 'Justificatifs de revenus', 'Certificat de bonne conduite'],
    image: 'https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];


