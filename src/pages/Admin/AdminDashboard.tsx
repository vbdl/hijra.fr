import React from 'react';
import { 
  Users, 
  FileText, 
  FolderOpen, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AdminStats } from '../../types/admin';

const AdminDashboard: React.FC = () => {
  // Mock data - in real app, this would come from API
  const stats: AdminStats = {
    totalUsers: 1247,
    activeRequests: 89,
    pendingDocuments: 23,
    monthlyRevenue: 45600,
    requestsByStatus: {
      pending: 34,
      inProgress: 55,
      completed: 158
    },
    requestsByDestination: {
      'Qatar': 45,
      'UAE': 38,
      'Morocco': 32,
      'Malaysia': 28,
      'Turkey': 24
    },
    recentActivity: [
      {
        id: '1',
        type: 'request_created',
        description: 'Nouvelle demande d\'assistance pour Qatar',
        timestamp: '2024-01-15T10:30:00Z',
        userId: 'user_123'
      },
      {
        id: '2',
        type: 'document_uploaded',
        description: 'Document passeport uploadé',
        timestamp: '2024-01-15T09:45:00Z',
        requestId: 'req_456'
      },
      {
        id: '3',
        type: 'user_registered',
        description: 'Nouvel utilisateur inscrit',
        timestamp: '2024-01-15T09:15:00Z',
        userId: 'user_789'
      }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request_created': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'document_uploaded': return <FolderOpen className="h-4 w-4 text-green-600" />;
      case 'user_registered': return <Users className="h-4 w-4 text-purple-600" />;
      case 'payment_received': return <DollarSign className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme Hijra.fr</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12% ce mois
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Demandes actives</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeRequests}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-yellow-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            {stats.requestsByStatus.pending} en attente
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents en attente</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingDocuments}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FolderOpen className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-600">
            <Clock className="h-4 w-4 mr-1" />
            Révision requise
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            +8% vs mois dernier
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests by Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demandes par statut</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-gray-700">En attente</span>
              </div>
              <span className="font-semibold">{stats.requestsByStatus.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">En cours</span>
              </div>
              <span className="font-semibold">{stats.requestsByStatus.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Terminées</span>
              </div>
              <span className="font-semibold">{stats.requestsByStatus.completed}</span>
            </div>
          </div>
        </div>

        {/* Requests by Destination */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demandes par destination</h3>
          <div className="space-y-3">
            {Object.entries(stats.requestsByDestination).map(([destination, count]) => (
              <div key={destination} className="flex items-center justify-between">
                <span className="text-gray-700">{destination}</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-brand-green h-2 rounded-full" 
                      style={{ width: `${(count / 45) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(activity.timestamp).toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;