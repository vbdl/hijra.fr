import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Send
} from 'lucide-react';
import { AssistanceRequestAdmin, PaymentInfo } from '../../types/admin';
import { paymentService, StripePaymentInfo, PayPalPaymentInfo } from '../../services/paymentService';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AdminRequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<AssistanceRequestAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<StripePaymentInfo | PayPalPaymentInfo | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'internal' | 'client_visible'>('internal');
  const [addingNote, setAddingNote] = useState(false);

  // Mock data - in real app, this would come from API
  const mockRequest: AssistanceRequestAdmin = {
    id: id || '1',
    userId: 'user_123',
    type: 'administrative',
    destination: 'Qatar',
    description: 'Besoin d\'aide pour obtenir un visa de résidence au Qatar. Je travaille dans le secteur IT et j\'ai une offre d\'emploi confirmée.',
    status: 'in-progress',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
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
        name: 'Passeport_Ahmed_Benali.pdf',
        type: 'application/pdf',
        size: 2048000,
        url: '/documents/passeport.pdf',
        uploadedAt: '2024-01-10T11:00:00Z',
        uploadedBy: 'user_123',
        status: 'approved',
        reviewedBy: 'admin_1',
        reviewedAt: '2024-01-10T14:00:00Z',
        reviewNotes: 'Document valide, approuvé'
      },
      {
        id: 'doc_2',
        name: 'Contrat_Travail_Qatar.pdf',
        type: 'application/pdf',
        size: 1536000,
        url: '/documents/contrat.pdf',
        uploadedAt: '2024-01-12T09:30:00Z',
        uploadedBy: 'user_123',
        status: 'pending'
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
      },
      {
        id: 'note_2',
        content: 'Nous avons bien reçu vos documents. Nous procédons actuellement à leur vérification.',
        createdBy: 'admin_1',
        createdAt: '2024-01-12T10:00:00Z',
        type: 'client_visible'
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
    services: ['Visa de résidence', 'Assistance administrative', 'Suivi personnalisé'],
    deadline: '2024-02-10T00:00:00Z'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequest(mockRequest);
      setLoading(false);
    }, 1000);
  }, [id]);

  const fetchPaymentDetails = async () => {
    if (!request?.payment) return;

    setPaymentLoading(true);
    try {
      let details = null;
      if (request.payment.provider === 'stripe') {
        details = await paymentService.getStripePayment(request.payment.transactionId || '');
      } else if (request.payment.provider === 'paypal') {
        details = await paymentService.getPayPalPayment(request.payment.transactionId || '');
      }
      setPaymentDetails(details);
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!request?.payment || !paymentDetails) return;

    const confirmed = window.confirm('Êtes-vous sûr de vouloir rembourser ce paiement ?');
    if (!confirmed) return;

    try {
      let success = false;
      if (request.payment.provider === 'stripe') {
        success = await paymentService.refundStripePayment(request.payment.transactionId || '');
      } else if (request.payment.provider === 'paypal') {
        success = await paymentService.refundPayPalPayment(request.payment.transactionId || '');
      }

      if (success) {
        alert('Remboursement effectué avec succès');
        fetchPaymentDetails(); // Refresh payment details
      } else {
        alert('Erreur lors du remboursement');
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Erreur lors du remboursement');
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setAddingNote(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const note = {
        id: 'note_' + Date.now(),
        content: newNote,
        createdBy: 'admin_1',
        createdAt: new Date().toISOString(),
        type: noteType
      };

      setRequest(prev => prev ? {
        ...prev,
        notes: [...prev.notes, note]
      } : null);

      setNewNote('');
      alert('Note ajoutée avec succès');
    } catch (error) {
      alert('Erreur lors de l\'ajout de la note');
    } finally {
      setAddingNote(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRequest(prev => prev ? {
        ...prev,
        status: newStatus as any,
        updatedAt: new Date().toISOString()
      } : null);

      alert('Statut mis à jour avec succès');
    } catch (error) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!request) {
    return <Navigate to="/admin/requests" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/requests"
            className="flex items-center text-brand-green hover:text-brand-green-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux demandes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Demande #{request.id}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
            {request.status === 'pending' ? 'En attente' : 
             request.status === 'in-progress' ? 'En cours' : 
             request.status === 'completed' ? 'Terminé' : 'Annulé'}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
            {request.priority === 'urgent' ? 'Urgent' :
             request.priority === 'high' ? 'Élevée' :
             request.priority === 'medium' ? 'Moyenne' : 'Faible'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Détails de la demande</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <div>
                  <p className="font-medium text-gray-900">{request.user.name}</p>
                  <p>{request.user.email}</p>
                  {request.user.phone && <p>{request.user.phone}</p>}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{request.destination}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Créé le {new Date(request.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>{request.price}€</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{request.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Services inclus</h3>
              <div className="flex flex-wrap gap-2">
                {request.services.map((service, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {request.deadline && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Échéance</h3>
                <p className="text-gray-700">{new Date(request.deadline).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
          </div>

          {/* Payment Information */}
          {request.payment && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Informations de paiement</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchPaymentDetails}
                    loading={paymentLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                  </Button>
                  {request.payment.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefund}
                    >
                      Rembourser
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Fournisseur</p>
                  <p className="font-medium capitalize">{request.payment.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    paymentService.getPaymentStatusColor(request.payment.status, request.payment.provider)
                  }`}>
                    {paymentService.getPaymentStatusText(request.payment.status, request.payment.provider)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant</p>
                  <p className="font-medium">{request.payment.amount} {request.payment.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Transaction</p>
                  <p className="font-mono text-sm">{request.payment.transactionId}</p>
                </div>
              </div>

              {paymentDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Détails du paiement</h4>
                  {request.payment.provider === 'stripe' && (
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Créé:</span> {new Date((paymentDetails as StripePaymentInfo).created * 1000).toLocaleString('fr-FR')}</p>
                      {(paymentDetails as StripePaymentInfo).payment_method?.card && (
                        <p><span className="text-gray-600">Carte:</span> {(paymentDetails as StripePaymentInfo).payment_method?.card?.brand} ****{(paymentDetails as StripePaymentInfo).payment_method?.card?.last4}</p>
                      )}
                    </div>
                  )}
                  {request.payment.provider === 'paypal' && (
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Créé:</span> {new Date((paymentDetails as PayPalPaymentInfo).create_time).toLocaleString('fr-FR')}</p>
                      <p><span className="text-gray-600">Email:</span> {(paymentDetails as PayPalPaymentInfo).payer?.email_address}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents ({request.documents.length})</h2>
            
            <div className="space-y-4">
              {request.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">
                        {(doc.size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}
                      </p>
                      {doc.reviewNotes && (
                        <p className="text-sm text-gray-500 mt-1">{doc.reviewNotes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'approved' ? 'text-green-600 bg-green-100' :
                      doc.status === 'rejected' ? 'text-red-600 bg-red-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {doc.status === 'approved' ? 'Approuvé' :
                       doc.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </span>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
            
            <div className="space-y-3">
              <select
                value={request.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              >
                <option value="pending">En attente</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>

              <Button variant="primary" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Modifier la demande
              </Button>

              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contacter le client
              </Button>

              <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>

          {/* Add Note */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ajouter une note</h3>
            
            <div className="space-y-4">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as 'internal' | 'client_visible')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              >
                <option value="internal">Note interne</option>
                <option value="client_visible">Visible par le client</option>
              </select>

              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Tapez votre note ici..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
              />

              <Button
                variant="primary"
                className="w-full"
                onClick={handleAddNote}
                loading={addingNote}
                disabled={!newNote.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Ajouter la note
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Historique</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Demande créée</p>
                  <p className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleString('fr-FR')}</p>
                </div>
              </div>

              {request.payment && (
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Paiement reçu</p>
                    <p className="text-xs text-gray-500">{new Date(request.payment.createdAt).toLocaleString('fr-FR')}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 p-1 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Dernière mise à jour</p>
                  <p className="text-xs text-gray-500">{new Date(request.updatedAt).toLocaleString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Notes ({request.notes.length})</h2>
        
        <div className="space-y-4">
          {request.notes.map((note) => (
            <div key={note.id} className={`p-4 rounded-lg border-l-4 ${
              note.type === 'internal' 
                ? 'bg-gray-50 border-gray-400' 
                : 'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  note.type === 'internal' 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'bg-blue-200 text-blue-700'
                }`}>
                  {note.type === 'internal' ? 'Interne' : 'Client'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString('fr-FR')}
                </span>
              </div>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRequestDetail;