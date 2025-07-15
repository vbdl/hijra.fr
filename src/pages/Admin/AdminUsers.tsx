import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { UserProfile } from '../../types/admin';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const users: UserProfile[] = [
    {
      id: 'user_123',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      phone: '+33 6 12 34 56 78',
      destination: 'Qatar',
      status: 'active',
      joinedAt: '2024-01-01T00:00:00Z',
      lastActivity: '2024-01-15T10:30:00Z',
      assistanceRequests: 3,
      totalSpent: 1200,
      documents: [],
      notes: [],
      lastPayment: {
        id: 'pi_1234567890',
        provider: 'stripe',
        amount: 500,
        currency: 'EUR',
        date: '2024-01-10T09:45:00Z',
        status: 'completed'
      }
    },
    {
      id: 'user_456',
      name: 'Fatima Zahra',
      email: 'fatima.zahra@email.com',
      destination: 'UAE',
      status: 'active',
      joinedAt: '2024-01-05T00:00:00Z',
      lastActivity: '2024-01-14T15:20:00Z',
      assistanceRequests: 1,
      totalSpent: 300,
      documents: [],
      notes: [],
      lastPayment: {
        id: 'PAYID-123456',
        provider: 'paypal',
        amount: 300,
        currency: 'EUR',
        date: '2024-01-12T14:30:00Z',
        status: 'completed'
      }
    },
    {
      id: 'user_789',
      name: 'Omar Hassan',
      email: 'omar.hassan@email.com',
      phone: '+33 7 98 76 54 32',
      destination: 'Morocco',
      status: 'inactive',
      joinedAt: '2023-12-20T00:00:00Z',
      lastActivity: '2024-01-01T09:00:00Z',
      assistanceRequests: 0,
      totalSpent: 0,
      documents: [],
      notes: [],
      lastPayment: undefined
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'suspended': return 'Suspendu';
      default: return 'Inconnu';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
        <p className="text-gray-600 mt-2">Gérer les profils et l'activité des utilisateurs</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilisateurs actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(users.reduce((sum, u) => sum + u.totalSpent, 0))}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Demandes totales</p>
              <p className="text-2xl font-bold text-purple-600">
                {users.reduce((sum, u) => sum + u.assistanceRequests, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="suspended">Suspendu</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-brand-green text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.destination && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{user.destination}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Inscrit le {new Date(user.joinedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-600 font-medium">Demandes d'assistance</p>
                      <p className="text-2xl font-bold text-blue-700">{user.assistanceRequests}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-600 font-medium">Total dépensé</p>
                      <p className="text-2xl font-bold text-green-700">{formatCurrency(user.totalSpent)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-600 font-medium">Dernière activité</p>
                      <p className="text-sm text-gray-700">
                        {new Date(user.lastActivity).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {user.lastPayment && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-600 font-medium">Dernier paiement</p>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-700">
                            {user.lastPayment.amount} {user.lastPayment.currency} via {user.lastPayment.provider}
                          </span>
                        </div>
                        <p className="text-xs text-green-600">
                          {new Date(user.lastPayment.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir profil
                  </Link>
                  <button className="flex items-center px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contacter
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                    <Ban className="h-4 w-4 mr-2" />
                    Suspendre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun utilisateur trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;