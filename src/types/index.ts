export interface User {
  id: string;
  email: string;
  name: string;
  destination?: string;
  joinedAt: string;
}

export interface Destination {
  id: string;
  name: string;
  nameAr: string;
  flag: string;
  region: string;
  description: string;
  highlights: string[];
  livingCost: {
    rent: string;
    food: string;
    transport: string;
  };
  exchangeRate: string;
  requirements: string[];
  image: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
  featured: boolean;
}

export interface AssistanceRequest {
  id: string;
  userId: string;
  type: 'administrative' | 'employment' | 'entrepreneurship' | 'complete';
  destination: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  price: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'paypal';
  name: string;
  description: string;
  icon: string;
  processingTime: string;
  fees?: string;
}

export interface PaymentData {
  services: string[];
  totalAmount: number;
  currency: string;
  country: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  paymentMethod: string;
}

export interface OrderSummary {
  services: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  subtotal: number;
  fees: number;
  total: number;
  currency: string;
  country: string;
}