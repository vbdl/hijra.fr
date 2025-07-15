import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  MapPin,
  Calendar,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { AssistanceRequestAdmin } from '../../types/admin';
import { paymentService } from '../../services/paymentService';

const AdminRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const requests: AssistanceRequestAdmin[] = [
    {
      id: '1',
      userId: 'user_123',
      type: 'administrative',
      destination: 'Qatar',
      description: 'Besoin d\'aide pour obtenir un visa de résidence au Qatar',
      status: 'in-progress',
      createdAt: '2024-01-10T10:00:00Z',
      price: 500,
      user: {
        id: 'user_123',
        name: 'Ahmed Benali',
        email: 'ahmed.benali@email.com',
        phone: '+33 6 12 34 56 78'
      },
      documents: [
        {
          id: 'doc_1',
          name: 'Passeport.pdf',
          type: 'application/pdf',
          size: 2048000,
          url: '/documents/passeport.pdf',
          uploadedAt: '2024-01-10T11:00:00Z',
          uploadedBy: 'user_123',
          status: 'approved'
        }
      ],
      assignedTo: 'admin_1',
      priority: 'high',
      notes: [
        {
          id: 'note_1',
          content: 'Documents reçus, vérification en cours',
          createdBy: 'admin_1',
          createdAt: '2024-01-10T12:00:00Z',
          type: 'internal'
        }
      ],
      payment: {
        id: 'pi_1234567890',
        provider: 'stripe',
        status: 'completed',
        amount: 500,
        currency: 'EUR',
        transactionId: 'pi_1234567890',
        createdAt: '2024-01-10T09:45:00Z',
        completedAt: '2024-01-10T09:46:00Z'
      },
      services: ['Visa de résidence', 'Assistance administrative'],
      deadline: '2024-02-10T00:00:00Z'
    },
    {
      id: '2',
      userId: 'user_456',
      type: 'employment',
      destination: 'UAE',
      description: 'Assistance pour permis de travail aux Émirats',
      status: 'pending',
      createdAt: '2024-01-12T14:30:00Z',
      price: 300,
      user: {
        id: 'user_456',
        name: 'Fatima Zahra',
        email: 'fatima.zahra@email.com'
      },
      documents: [],
      priority: 'medium',
      notes: [],
      payment: {
        id: 'PAYID-123456',
        provider: 'paypal',
        status: 'completed',
        amount: 300,
        currency: 'EUR',
        transactionId: 'PAYID-123456',
        createdAt: '2024-01-12T14:30:00Z',
        completedAt: '2024-01-12T14:31:00Z'
      },
      services: ['Permis de travail'],
      deadline: '2024-02-15T00:00:00Z'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demandes d'assistance</h1>
        <p className="text-gray-600 mt-2">Gérer et suivre toutes les demandes d'assistance</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher..."
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
            <option value="pending">En attente</option>
            <option value="in-progress">En cours</option>
            <option value="completed">Terminé</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          >
            <option value="all">Toutes les priorités</option>
            <option value="urgent">Urgent</option>
            <option value="high">Élevée</option>
            <option value="medium">Moyenne</option>
            <option value="low">Faible</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredRequests.length} demande{filteredRequests.length > 1 ? 's' : ''} trouvée{filteredRequests.length > 1 ? 's' : ''}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Demande #{request.id}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {request.status === 'pending' ? 'En attente' : 
                         request.status === 'in-progress' ? 'En cours' : 'Terminé'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority === 'urgent' ? 'Urgent' :
                         request.priority === 'high' ? 'Élevée' :
                         request.priority === 'medium' ? 'Moyenne' : 'Faible'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{request.user.name}</p>
                          <p>{request.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{request.destination}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{request.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Type: {request.type}</span>
                      <span>Prix: {request.price}€</span>
                      <span>Documents: {request.documents.length}</span>
                      <span>Notes: {request.notes.length}</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <button className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </button>
                    <button className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ajouter note
                    </button>
                    {request.payment && (
                      <span className="flex items-center">
                        <CreditCard className="h-3 w-3 mr-1" />
                        {request.payment.provider === 'stripe' ? 'Stripe' : 'PayPal'}
                      </span>
                    )}
                  </div>

                  {request.payment && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">
                          Paiement: {request.payment.amount} {request.payment.currency}
                        </span>
                  <Link
                    to={`/admin/requests/${request.id}`}
                    className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                          paymentService.getPaymentStatusColor(request.payment.status, request.payment.provider)
                        }`}>
                  </Link>
                        </span>
                      </div>
                  )}
                  <button className="flex items-center px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Paiement
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune demande trouvée
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

export default AdminRequests;