import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Check, 
  X, 
  Clock,
  FileText,
  Image,
  File
} from 'lucide-react';
import { Document } from '../../types/admin';

const AdminDocuments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const documents: Document[] = [
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
      name: 'Diplome_Fatima_Zahra.pdf',
      type: 'application/pdf',
      size: 1536000,
      url: '/documents/diplome.pdf',
      uploadedAt: '2024-01-12T09:30:00Z',
      uploadedBy: 'user_456',
      status: 'pending'
    },
    {
      id: 'doc_3',
      name: 'CV_Omar_Hassan.pdf',
      type: 'application/pdf',
      size: 512000,
      url: '/documents/cv.pdf',
      uploadedAt: '2024-01-13T16:45:00Z',
      uploadedBy: 'user_789',
      status: 'rejected',
      reviewedBy: 'admin_1',
      reviewedAt: '2024-01-13T18:00:00Z',
      reviewNotes: 'Format non conforme, veuillez soumettre à nouveau'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type.includes(typeFilter);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Rejeté';
      case 'pending': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return Check;
      case 'rejected': return X;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleApprove = (docId: string) => {
    console.log('Approving document:', docId);
    // Simulate API call
    setTimeout(() => {
      alert('Document approuvé avec succès');
      // In real app, this would update the document status
    }, 500);
  };

  const handleReject = (docId: string) => {
    console.log('Rejecting document:', docId);
    const reason = prompt('Raison du rejet:');
    if (reason) {
      // Simulate API call
      setTimeout(() => {
        alert('Document rejeté avec succès');
        // In real app, this would update the document status
      }, 500);
    }
  };

  const handleDownload = (doc: Document) => {
    // Simulate file download
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (doc: Document) => {
    // Open document in new tab for preview
    window.open(doc.url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des documents</h1>
        <p className="text-gray-600 mt-2">Réviser et approuver les documents soumis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total documents</p>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approuvés</p>
              <p className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejetés</p>
              <p className="text-2xl font-bold text-red-600">
                {documents.filter(d => d.status === 'rejected').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <X className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un document..."
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
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
          >
            <option value="all">Tous les types</option>
            <option value="pdf">PDF</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>

          <button className="flex items-center justify-center px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''} trouvé{filteredDocuments.length > 1 ? 's' : ''}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDocuments.map((document) => {
            const StatusIcon = getStatusIcon(document.status);
            const FileIcon = getFileIcon(document.type);
            
            return (
              <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <FileIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{document.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {getStatusText(document.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Taille:</span> {formatFileSize(document.size)}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {document.type}
                        </div>
                        <div>
                          <span className="font-medium">Uploadé le:</span> {new Date(document.uploadedAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      {document.reviewNotes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes de révision:</span> {document.reviewNotes}
                          </p>
                          {document.reviewedAt && (
                            <p className="text-xs text-gray-500 mt-1">
                              Révisé le {new Date(document.reviewedAt).toLocaleDateString('fr-FR')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <button 
                      onClick={() => handlePreview(document)}
                      className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </button>
                    <button 
                      onClick={() => handleDownload(document)}
                      className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </button>
                    
                    {document.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(document.id)}
                          className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approuver
                        </button>
                        <button 
                          onClick={() => handleReject(document.id)}
                          className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rejeter
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun document trouvé
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

export default AdminDocuments;