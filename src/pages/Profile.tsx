import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Camera, 
  Save, 
  Eye, 
  EyeOff,
  Bell,
  Shield,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+33 6 12 34 56 78',
    destination: 'Qatar',
    bio: 'Ingénieur logiciel passionné par la technologie et la spiritualité.',
    address: 'Paris, France',
    dateOfBirth: '1990-01-15',
    nationality: 'Française',
    maritalStatus: 'Marié(e)',
    children: '2',
    profession: 'Ingénieur Logiciel'
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      name: 'Visa ****1234',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal (ahmed@email.com)',
      isDefault: false
    }
  ]);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    communityUpdates: true,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    alert('Profil mis à jour avec succès !');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    
    setSecurity({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: security.twoFactorEnabled
    });
    alert('Mot de passe modifié avec succès !');
  };

  const handleProfilePhotoUpload = () => {
    // Simulate photo upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      alert('Photo de profil mise à jour !');
    };
    input.click();
  };

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'payment', name: 'Paiements', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Sécurité', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles et préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-green to-brand-sage rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button
                    onClick={handleProfilePhotoUpload}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mt-3">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-brand-green text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                  
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destination souhaitée
                        </label>
                        <select
                          value={profileData.destination}
                          onChange={(e) => setProfileData({...profileData, destination: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        >
                          <option value="Qatar">Qatar</option>
                          <option value="UAE">Émirats Arabes Unis</option>
                          <option value="Saudi Arabia">Arabie Saoudite</option>
                          <option value="Kuwait">Koweït</option>
                          <option value="Bahrain">Bahreïn</option>
                          <option value="Oman">Oman</option>
                          <option value="Morocco">Maroc</option>
                          <option value="Tunisia">Tunisie</option>
                          <option value="Egypt">Égypte</option>
                          <option value="Turkey">Turquie</option>
                          <option value="Malaysia">Malaisie</option>
                          <option value="Algeria">Algérie</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationalité
                        </label>
                        <input
                          type="text"
                          value={profileData.nationality}
                          onChange={(e) => setProfileData({...profileData, nationality: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Situation familiale
                        </label>
                        <select
                          value={profileData.maritalStatus}
                          onChange={(e) => setProfileData({...profileData, maritalStatus: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        >
                          <option value="Célibataire">Célibataire</option>
                          <option value="Marié(e)">Marié(e)</option>
                          <option value="Divorcé(e)">Divorcé(e)</option>
                          <option value="Veuf/Veuve">Veuf/Veuve</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profession
                        </label>
                        <input
                          type="text"
                          value={profileData.profession}
                          onChange={(e) => setProfileData({...profileData, profession: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse actuelle
                      </label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio / Présentation
                      </label>
                      <textarea
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                        placeholder="Parlez-nous de vous, vos motivations pour la Hijra..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      className="w-full md:w-auto"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Sauvegarder les modifications
                    </Button>
                  </form>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Méthodes de paiement</h2>
                    <Button variant="primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une méthode
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <CreditCard className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              {method.expiryDate && (
                                <p className="text-sm text-gray-500">Expire le {method.expiryDate}</p>
                              )}
                              {method.isDefault && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                  Par défaut
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Sécurité des paiements</h4>
                    <p className="text-blue-800 text-sm">
                      Toutes vos informations de paiement sont chiffrées et sécurisées. 
                      Nous utilisons les standards de sécurité les plus élevés pour protéger vos données.
                    </p>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Préférences de notification</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Notifications par email</h4>
                        <p className="text-sm text-gray-500">Recevez des mises à jour par email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications({...notifications, emailNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Notifications SMS</h4>
                        <p className="text-sm text-gray-500">Recevez des alertes importantes par SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={(e) => setNotifications({...notifications, smsNotifications: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Alertes emploi</h4>
                        <p className="text-sm text-gray-500">Nouvelles offres d'emploi correspondant à votre profil</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.jobAlerts}
                          onChange={(e) => setNotifications({...notifications, jobAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Mises à jour communauté</h4>
                        <p className="text-sm text-gray-500">Actualités et événements de la communauté</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.communityUpdates}
                          onChange={(e) => setNotifications({...notifications, communityUpdates: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Emails marketing</h4>
                        <p className="text-sm text-gray-500">Promotions et offres spéciales</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.marketingEmails}
                          onChange={(e) => setNotifications({...notifications, marketingEmails: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                      </label>
                    </div>
                  </div>

                  <Button variant="primary" className="mt-6">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les préférences
                  </Button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité du compte</h2>
                  
                  <div className="space-y-8">
                    {/* Change Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Changer le mot de passe</h3>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe actuel
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={security.currentPassword}
                              onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            value={security.newPassword}
                            onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green"
                          />
                        </div>

                        <Button type="submit" variant="primary" loading={loading}>
                          Changer le mot de passe
                        </Button>
                      </form>
                    </div>

                    {/* Two Factor Authentication */}
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Authentification à deux facteurs</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Ajoutez une couche de sécurité supplémentaire à votre compte
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={security.twoFactorEnabled}
                            onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-green/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
                        </label>
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-semibold text-red-600 mb-4">Zone de danger</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-2">Supprimer le compte</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                        </p>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer mon compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;