export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

export interface AssistanceRequestAdmin extends AssistanceRequest {
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