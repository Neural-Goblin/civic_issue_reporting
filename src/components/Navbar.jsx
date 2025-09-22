// src/components/Navbar.jsx (updated)
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, AlertCircle, Home, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <MapPin size={28} />
            <span>India Civic Issues</span>
          </Link>
          
          <div className="flex space-x-6 items-center">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 ${location.pathname === '/' ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} 
                  className={`flex items-center space-x-1 ${location.pathname.includes('dashboard') ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 opacity-80 hover:opacity-100"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className={`flex items-center space-x-1 ${location.pathname === '/auth' ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
                >
                  <LogIn size={18} />
                  <span>Report Issue</span>
                </Link>
                
// In your Navbar.jsx, add this link:
<Link 
  to="/live-map" 
  className={`flex items-center space-x-1 ${location.pathname === '/live-map' ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
>
  <MapPin size={18} />
  <span>Live Map</span>
</Link>


// Add this with your other navigation links
<Link 
  to="/live-map" 
  className={`flex items-center space-x-1 ${location.pathname === '/live-map' ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
>
  <MapPin size={18} />
  <span>Live Map</span>
</Link>





                <Link 
                  to="/admin-login" 
                  className={`flex items-center space-x-1 ${location.pathname === '/admin-login' ? 'border-b-2 border-white' : 'opacity-80 hover:opacity-100'}`}
                >
                  <AlertCircle size={18} />
                  <span>Admin</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;