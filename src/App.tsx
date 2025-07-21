import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Layout from './components/Layout/Layout';
import AdminLayout from './components/Admin/AdminLayout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Jobs from './pages/Jobs';
import Assistance from './pages/Assistance';
import CountryServices from './pages/CountryServices';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRequests from './pages/Admin/AdminRequests';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminDocuments from './pages/Admin/AdminDocuments';
import AdminRequestDetail from './pages/Admin/AdminRequestDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="destinations/:id" element={<DestinationDetail />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="assistance" element={<Assistance />} />
              <Route path="services/:countryId" element={<CountryServices />} />
              <Route path="payment" element={<Payment />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="requests" element={
                <AdminProtectedRoute requiredPermission="manage_requests">
                  <AdminRequests />
                </AdminProtectedRoute>
              } />
              <Route path="requests/:id" element={
                <AdminProtectedRoute requiredPermission="manage_requests">
                  <AdminRequestDetail />
                </AdminProtectedRoute>
              } />
              <Route path="users" element={
                <AdminProtectedRoute requiredPermission="manage_users">
                  <AdminUsers />
                </AdminProtectedRoute>
              } />
              <Route path="documents" element={
                <AdminProtectedRoute requiredPermission="manage_documents">
                  <AdminDocuments />
                </AdminProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;