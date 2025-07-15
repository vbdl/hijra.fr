export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

export interface PaymentInfo {
  id: string;
  provider: 'stripe' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  amount: number;
  currency: string;
  transactionId?: string;
  paymentMethodId?: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
  refundId?: string;
  refundAmount?: number;
  refundedAt?: string;
  metadata?: Record<string, any>;
}

export interface AssistanceRequestAdmin {
  id: string;
  userId: string;
  type: 'administrative' | 'employment' | 'entrepreneurship' | 'complete';
  destination: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  price: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  documents: Document[];
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes: AdminNote[];
  payment?: PaymentInfo;
  services: string[];
  deadline?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface AdminNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  type: 'internal' | 'client_visible';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  destination?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
  lastActivity: string;
  assistanceRequests: number;
  totalSpent: number;
  documents: Document[];
  notes: AdminNote[];
  lastPayment?: {
    id: string;
    provider: 'stripe' | 'paypal';
    amount: number;
    currency: string;
    date: string;
    status: string;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeRequests: number;
  pendingDocuments: number;
  monthlyRevenue: number;
  requestsByStatus: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  requestsByDestination: Record<string, number>;
  recentActivity: AdminActivity[];
}

export interface AdminActivity {
  id: string;
  type: 'request_created' | 'document_uploaded' | 'user_registered' | 'payment_received';
  description: string;
  timestamp: string;
  userId?: string;
  requestId?: string;
}