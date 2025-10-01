export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_T9fEK8Qnc7ltLD',
    priceId: 'price_1SDLuOKdNCA1O6NbJKMAYSyB',
    name: 'Profile Boost',
    description: 'Optimisation de votre CV aux normes internationales et GCC. Optimisation de votre profil Linkedin en langue anglaise.',
    price: 149.00,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9fB2FXbgHybGt',
    priceId: 'price_1SDLrWKdNCA1O6NbtyFee4b9',
    name: 'Muhajir Premium',
    description: 'Accès aux offres d\'emploi premium et au groupe Whatsapp privé. Inclus : une session de coaching par mois. (1h).',
    price: 99.00,
    currency: 'AED',
    mode: 'subscription'
  },
  {
    id: 'prod_T9f7XLE5t9CWnp',
    priceId: 'price_1SDLn9KdNCA1O6NbBv7VX4A4',
    name: 'Inside country - Children visa - Employee sponsor',
    description: 'Visa de résidence pour un enfant, situé dans le territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (Freezone/mainland) ou public (gouvernement). Inclus : Entry permit, status change, visa et emirates ID.',
    price: 2843.30,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9f5Z7x500Hkqf',
    priceId: 'price_1SDLlfKdNCA1O6NbAAgEEJLC',
    name: 'Inside country - Children visa - Investor sponsor (including security deposit)',
    description: 'Visa de résidence pour un enfant, situé dans le territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, status change, visa, emirates ID et deposit obligatoire.',
    price: 5843.30,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9erhzdsgjxrcr',
    priceId: 'price_1SDLXhKdNCA1O6NbDytrebOw',
    name: 'Inside country - Spouse visa - Employee sponsor',
    description: 'Spouse visa, personne située dans le territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (freezone/mainland) ou public (gouvernement). Inclus : Entry permit, status change, visite médicale, visa et emirates ID.',
    price: 3243.30,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9eol1Hr7hSOqC',
    priceId: 'price_1SDLUTKdNCA1O6NbQBELmdey',
    name: 'Inside country - Spouse visa - Investor sponsor (including security deposit)',
    description: 'Spouse visa, personne située dans le territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, status change, visite médicale, visa, emirates ID et deposit obligatoire.',
    price: 6243.30,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9ejNWzNrZ7vDw',
    priceId: 'price_1SDLQHKdNCA1O6NbKquZJjfN',
    name: 'Out of country - Children visa - Employee sponsor',
    description: 'Visa pour un enfant situé hors du territoire des Émirats Arabes Unis, sponsor de type employé du secteur privé (freezone/mainland) ou public (gouvernement).',
    price: 2250.00,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9eZnuRyEubU8G',
    priceId: 'price_1SDLGiKdNCA1O6NbCgY7EEad',
    name: 'Out of country - Children visa - Investor sponsor (including security deposit)',
    description: 'Visa de résidence pour un enfant, situé hors du territoire des Émirats Arabes Unis, sponsor de type Investor. Inclus : Entry permit, visa, emirates ID et deposit obligatoire.',
    price: 5250.00,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9eTMjA6LLItDH',
    priceId: 'price_1SDLA6KdNCA1O6NbnduJT2s6',
    name: 'Out of country - Spouse visa - Employee sponsor - 2600aed',
    description: 'Spouse visa, personne située hors du territoire des Emirats Arabes Unis lors de la demande, sponsor employé du secteur privé (freezone/mainland) ou public (gouvernement). Inclus : Entry permit, visite médicale, visa, emirates ID.',
    price: 2600.00,
    currency: 'AED',
    mode: 'payment'
  },
  {
    id: 'prod_T9dzfAXHQuJe5J',
    priceId: 'price_1SDKhLKdNCA1O6Nbzj567QHF',
    name: 'Out of country - Spouse visa - Investor sponsor (including security deposit)',
    description: 'Spouse visa, personne se situant hors du territoire lors de la demande, sponsor de type investor. Inclus : entry permit, visite médicale, visa, emirates ID et deposit obligatoire.',
    price: 5600.00,
    currency: 'AED',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductsByMode = (mode: 'payment' | 'subscription'): StripeProduct[] => {
  return stripeProducts.filter(product => product.mode === mode);
};