import { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: 'qatar',
    name: 'Qatar',
    nameAr: 'قطر',
    flag: '🇶🇦',
    region: 'Golfe Persique',
    description: 'Doha émerge du désert comme un mirage ultramoderne, où l\'architecture audacieuse des gratte-ciel dialogue avec les traditions bédouines. La corniche offre une promenade face aux eaux turquoise du Golfe, tandis que le souk Waqif transporte le visiteur dans un autre temps avec ses échoppes d\'épices et ses fauconniers.',
    highlights: ['Corniche de Doha et ses silhouettes futuristes', 'Souk Waqif, immersion dans l\'Arabie d\'antan', 'Musée d\'Art Islamique et son architecture épurée', 'Désert de Khor Al Adaid, mer de dunes unique au monde'],
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
    description: 'Dubai et Abu Dhabi incarnent le vertige des superlatifs : plus haute tour, plus grand centre commercial, îles artificielles... Pourtant, derrière cette démesure se cache une fascinante dualité. On passe des souks parfumés d\'encens aux galeries d\'art contemporain, des courses de chameaux dans le désert aux marinas luxueuses.',
    highlights: ['Burj Khalifa, ascension vers le toit du monde', 'Mosquée Sheikh Zayed, chef-d\'œuvre de marbre blanc', 'Désert du Liwa et ses dunes orange spectaculaires', 'Souk de l\'or, temple du commerce et des métaux précieux'],
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
    id: 'kuwait',
    name: 'Koweït',
    nameAr: 'الكويت',
    flag: '🇰🇼',
    region: 'Golfe Persique',
    description: 'Kuwait City déploie une élégance discrète entre les tours futuristes et les dhow traditionnels. La capitale cultive son patrimoine avec le souk Mubarakiya, véritable institution où se mêlent senteurs d\'épices et artisanat local. Les tours Koweït symbolisent la renaissance après la guerre, tandis que la grande mosquée impressionne par sa sérénité.',
    highlights: ['Tours Koweït, symbole de la reconstruction', 'Souk Mubarakiya et son ambiance d\'Arabie authentique', 'Grande Mosquée aux somptueux vitraux', 'Plages de la Arabian Gulf Street face aux eaux du Golfe'],
    livingCost: {
      rent: '800-1800€/mois',
      food: '300-500€/mois',
      transport: '100-250€/mois'
    },
    exchangeRate: '1 EUR = 0.34 KWD',
    requirements: ['Visa de travail', 'Certificat médical', 'Diplômes attestés', 'Contrat d\'emploi'],
    image: 'https://images.pexels.com/photos/3414922/pexels-photo-3414922.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'bahrain',
    name: 'Bahreïn',
    nameAr: 'البحرين',
    flag: '🇧🇭',
    region: 'Golfe Persique',
    description: 'Manama, petite perle du Golfe, cultive son charme discret entre modernité et traditions millénaires. L\'archipel fut jadis célèbre pour ses perles naturelles, aujourd\'hui pour son circuit de F1 qui côtoie les sites archéologiques. Le fort de Bahreïn classé à l\'UNESCO témoigne d\'une histoire riche, tandis que l\'Arbre de Vie seul au milieu du désert intrigue les visiteurs.',
    highlights: ['Circuit de Sakhir, temple de la vitesse en plein désert', 'Fort de Bahreïn et son histoire vieille de 5000 ans', 'Arbre de Vie, mystère botanique isolé dans les sables', 'Musée national pour comprendre l\'âme bahreïnie'],
    livingCost: {
      rent: '600-1400€/mois',
      food: '250-400€/mois',
      transport: '80-200€/mois'
    },
    exchangeRate: '1 EUR = 0.42 BHD',
    requirements: ['Permis de travail', 'Visa de résidence', 'Examen médical', 'Certification des diplômes'],
    image: 'https://images.pexels.com/photos/6188071/pexels-photo-6188071.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'oman',
    name: 'Oman',
    nameAr: 'عُمان',
    flag: '🇴🇲',
    region: 'Golfe Persique',
    description: 'Mascate captive par son cadre exceptionnel entre mer d\'arabique et montagnes déchiquetées. Le sultanat a préservé son authenticité mieux qu\'aucun autre pays du Golfe. Ici, les forts majestueux veillent sur des médinas intactes, les wadis offrent des oasis de fraîcheur et le désert de Wahiba Sands déploie ses dunes à perte de vue.',
    highlights: ['Opéra Royal de Mascate, scène lyrique ultramoderne', 'Fort de Nizwa et son souk aux poignards traditionnels', 'Wadi Shab, randonnée aquatique dans un canyon sublime', 'Désert de Wahiba Sands et nuit sous les étoiles'],
    livingCost: {
      rent: '500-1200€/mois',
      food: '200-350€/mois',
      transport: '100-200€/mois'
    },
    exchangeRate: '1 EUR = 0.42 OMR',
    requirements: ['Visa de travail', 'Sponsorship', 'Certificat de santé', 'Diplômes légalisés'],
    image: 'https://images.pexels.com/photos/6327724/pexels-photo-6327724.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'morocco',
    name: 'Maroc',
    nameAr: 'المغرب',
    flag: '🇲🇦',
    region: 'Afrique du Nord',
    description: 'Le Maroc est un pays-continent qui déploie ses paysages comme un livre d\'images : des médinas envoûtantes de Fès et Marrakech aux villages berbères de l\'Atlas, des plages atlantiques aux dunes du Sahara. Chaque ville raconte une histoire différente - l\'andalouse Tanger, la bleue Chefchaouen, l\'impériale Meknès.',
    highlights: ['Place Djemaa el-Fna, spectacle permanent jour et nuit', 'Médina de Fès, dédale mystérieux classé UNESCO', 'Erg Chebbi, lever de soleil sur les dunes du Sahara', 'Vallée des Roses et ses paysages parfumés'],
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
    description: 'La Tunisie déploie sa douceur de vivre méditerranéenne entre mer transparente et histoire millénaire. Tunis la blanche offre l\'équilibre parfait entre sa médina classée UNESCO et la modernité de ses avenues. Au nord, les ruines de Carthage rappellent la grandeur passée, tandis que le sud révèle des paysages surréalistes.',
    highlights: ['Médina de Tunis, dédale de ruelles et d\'artisanat', 'Site de Carthage, promenade dans l\'histoire punique', 'Village de Sidi Bou Saïd aux maisons bleues et blanches', 'Île de Djerba entre traditions juives et plages de sable fin'],
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
    id: 'egypt',
    name: 'Égypte',
    nameAr: 'مصر',
    flag: '🇪🇬',
    region: 'Afrique du Nord',
    description: 'L\'Égypte est un voyage dans le temps, des pyramides de Gizeh qui défient les siècles aux temples colossaux de Louxor. Le Caire, ville-monde vibrante et chaotique, contraste avec la sérénité d\'une felouque sur le Nil. Alexandrie évoque son passé hellénistique, tandis que l\'oasis de Siwa préserve ses traditions berbères.',
    highlights: ['Plateau de Gizeh et ses monuments éternels', 'Temple de Karnak, forêt de colonnes monumentales', 'Croisière sur le Nil, art de vivre égyptien', 'Citadelle du Caire et mosquée de Mohammed Ali'],
    livingCost: {
      rent: '100-300€/mois',
      food: '80-200€/mois',
      transport: '20-80€/mois'
    },
    exchangeRate: '1 EUR = 32.85 EGP',
    requirements: ['Visa de résidence', 'Permis de travail', 'Certificat de santé', 'Diplômes traduits'],
    image: 'https://images.pexels.com/photos/19820376/pexels-photo-19820376.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'turkey',
    name: 'Turquie',
    nameAr: 'تركيا',
    flag: '🇹🇷',
    region: 'Eurasie',
    description: 'Istanbul, pont entre deux continents, résume à elle seule la complexité turque : byzantine, ottomane, moderne. Sainte-Sophie incarne cette superposition d\'histoire et de cultures. Mais la Turquie dépasse largement sa capitale : la Cappadoce et ses cheminées de fée, Pamukkale et ses bassins travertins, Éphèse et ses ruines gréco-romaines.',
    highlights: ['Sainte-Sophie, symbole de la fusion des cultures', 'Grand Bazar, labyrinthe de 4000 boutiques', 'Cappadoce en ballon, ballet aérien au lever du soleil', 'Pamukkale, château de coton aux eaux thermales'],
    livingCost: {
      rent: '300-800€/mois',
      food: '150-350€/mois',
      transport: '50-150€/mois'
    },
    exchangeRate: '1 EUR = 28.50 TRY',
    requirements: ['Permis de résidence', 'Assurance santé', 'Justificatifs de revenus', 'Certificat de bonne conduite'],
    image: 'https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'malaysia',
    name: 'Malaisie',
    nameAr: 'ماليزيا',
    flag: '🇲🇾',
    region: 'Asie du Sud-Est',
    description: 'La Malaisie est un fascinant mélange où se côtoient minarets, temples chinois et églises coloniales. Kuala Lumpur impose ses tours Petronas futuristes devant une jungle primitive. Penang séduit par son patrimoine et sa street food légendaire, tandis que Bornéo offre une biodiversité exceptionnelle.',
    highlights: ['Tours Petronas, icônes de l\'architecture moderne', 'George Town et ses murales street art', 'Cameron Highlands et ses plantations de thé', 'Îles Perhentian, paradis de plongée préservé'],
    livingCost: {
      rent: '300-700€/mois',
      food: '200-400€/mois',
      transport: '80-200€/mois'
    },
    exchangeRate: '1 EUR = 5.15 MYR',
    requirements: ['Programme MM2H', 'Justificatifs financiers', 'Assurance santé', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/3815533/pexels-photo-3815533.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'saudi-arabia',
    name: 'Arabie Saoudite',
    nameAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    region: 'Péninsule Arabique',
    description: 'L\'Arabie Saoudite vit une transformation historique avec la Vision 2030 qui ouvre ce royaume méconnu au monde. Riyad symbolise cette métamorphose avec ses projets futuristes, tandis que les sites d\'Al-Ula révèlent des trésors archéologiques comparables à Pétra. Djeddah la rouge conserve son patrimoine ottoman.',
    highlights: ['Al-Ula et ses tombes nabatéennes sculptées', 'Vieille ville de Djeddah classée UNESCO', 'Projet NEOM, vision futuriste de la ville de demain', 'Riyad, capitale en pleine transformation'],
    livingCost: {
      rent: '400-1000€/mois',
      food: '200-400€/mois',
      transport: '100-250€/mois'
    },
    exchangeRate: '1 EUR = 4.12 SAR',
    requirements: ['Visa de travail', 'Sponsorship', 'Certificat médical', 'Diplômes authentifiés'],
    image: 'https://images.pexels.com/photos/11259857/pexels-photo-11259857.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'algeria',
    name: 'Algérie',
    nameAr: 'الجزائر',
    flag: '🇩🇿',
    region: 'Afrique du Nord',
    description: 'L\'Algérie déploie son immensité comme un continent dans le continent : 2000 km de côte méditerranéenne, le Sahara plus vaste que l\'Europe de l\'Ouest, des montagnes majestueuses. Alger la blanche étage ses maisons ottomanes face à la mer, tandis que le M\'zab révèle une architecture unique classée UNESCO.',
    highlights: ['Casbah d\'Alger, dédale de ruelles et d\'histoire', 'Vallée du M\'zab, chef-d\'œuvre d\'architecture ibadite', 'Tassili n\'Ajjer, galerie d\'art rupestre à ciel ouvert', 'Côte de Kabylie, criques sauvages et eaux turquoise'],
    livingCost: {
      rent: '100-400€/mois',
      food: '80-200€/mois',
      transport: '30-100€/mois'
    },
    exchangeRate: '1 EUR = 148.50 DZD',
    requirements: ['Visa de séjour', 'Justificatifs de revenus', 'Certificat médical', 'Casier judiciaire'],
    image: 'https://images.pexels.com/photos/9254283/pexels-photo-9254283.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];


