// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { IssuesProvider } from './context/IssuesContext';
import IssueReport from './components/IssueReport';
import LiveMapPage from './pages/LiveMapPage';
import TestMap from './pages/TestMap';
import Home from './pages/Home';
import UserAuth from './pages/UserAuth';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/user-dashboard" replace />;
  }
  
  return children;
};

function AppContent() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<UserAuth />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        // In your App.jsx, add this route
<Route 
  path="/user-dashboard/report" 
  element={
    <ProtectedRoute>
      <IssueReport />
    </ProtectedRoute>
  } 
/>
<Route path="/test-map" element={<TestMap />} />

         <Route 
  path="/live-map" 
  element={
    <ProtectedRoute>
      <LiveMapPage />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/live-map" 
  element={
    <ProtectedRoute>
      <LiveMapPage />
    </ProtectedRoute>
  } 
/>


        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <IssuesProvider>
          <AppContent />
        </IssuesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;