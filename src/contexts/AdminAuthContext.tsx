import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types/admin';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin user data
    const storedAdmin = localStorage.getItem('hijra_admin_user');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock admin user data
      const adminData: AdminUser = {
        id: 'admin_1',
        email,
        name: 'Admin User',
        role: 'super_admin',
        permissions: ['manage_users', 'manage_requests', 'manage_documents', 'view_analytics'],
        lastLogin: new Date().toISOString(),
        createdAt: '2024-01-01T00:00:00Z',
      };
      
      setAdminUser(adminData);
      localStorage.setItem('hijra_admin_user', JSON.stringify(adminData));
    } catch (error) {
      throw new Error('Erreur de connexion admin');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('hijra_admin_user');
  };

  const hasPermission = (permission: string) => {
    return adminUser?.permissions.includes(permission) || false;
  };

  const value: AdminAuthContextType = {
    adminUser,
    login,
    logout,
    loading,
    hasPermission,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};