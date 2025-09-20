// src/pages/UserDashboard.jsx
import React from 'react';
import { useIssues } from '../context/IssuesContext';
import { useAuth } from '../context/AuthContext';
import { Clock, AlertCircle, CheckCircle, MapPin, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { issues } = useIssues();
  const { user } = useAuth();

  // Filter issues to show only those reported by the current user
  const userIssues = issues.filter(issue => {
    // Check both userId and userEmail for compatibility
    return issue.userId === user?.id || issue.userEmail === user?.email;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'in-progress': return <AlertCircle className="text-blue-500" size={20} />;
      case 'resolved': return <CheckCircle className="text-green-500" size={20} />;
      default: return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending Review';
      case 'in-progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return 'Unknown Status';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Reported Issues</h1>
        <Link 
          to="/user-dashboard/report"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Report New Issue
        </Link>
      </div>
      
      {userIssues.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <MapPin className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No issues reported yet</h2>
          <p className="text-gray-500 mb-4">Start by reporting your first civic issue!</p>
          <Link 
            to="/user-dashboard/report"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Report Your First Issue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              {issue.image && (
                <img 
                  src={issue.image} 
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
                  <div className="flex items-center">
                    {getStatusIcon(issue.status)}
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {getStatusText(issue.status)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{issue.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="mr-1" size={16} />
                    {formatDate(issue.createdAt)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    issue.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    issue.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.urgency}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 capitalize">{issue.category}</span>
                  <span className="text-xs text-gray-400">ID: {issue.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Debug info - remove in production */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Total issues in system: {issues.length}</p>
        <p>Your user ID: {user?.id}</p>
        <p>Your email: {user?.email}</p>
        <p>Your issues: {userIssues.length}</p>
        <pre className="text-xs mt-2">
          {JSON.stringify(userIssues, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default UserDashboard;