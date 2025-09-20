// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Filter, Search, AlertCircle, CheckCircle, Clock, MapPin, Eye, Trash2, Download } from 'lucide-react';
import { useIssues } from '../context/IssuesContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { issues, updateIssueStatus, deleteIssue, isLoading } = useIssues();

  const filteredIssues = issues.filter(issue => {
    const matchesTab = activeTab === 'all' || issue.status === activeTab;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    
    return matchesTab && matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'in-progress': return <AlertCircle className="text-blue-500" size={20} />;
      case 'resolved': return <CheckCircle className="text-green-500" size={20} />;
      default: return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getUrgencyBadge = (urgency) => {
    const urgencyClasses = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyClasses[urgency]}`}>
        {urgency}
      </span>
    );
  };

  const handleStatusChange = (issueId, newStatus) => {
    updateIssueStatus(issueId, newStatus);
  };

  const handleDeleteIssue = (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      deleteIssue(issueId);
    }
  };

  const handleViewIssue = (issue) => {
    // Show issue details in a modal or alert
    alert(`Issue Details:\n\nTitle: ${issue.title}\nDescription: ${issue.description}\nCategory: ${issue.category}\nUrgency: ${issue.urgency}\nReported by: ${issue.reportedBy}\nStatus: ${issue.status}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Title', 'Category', 'Urgency', 'Reported By', 'Date', 'Status'],
      ...filteredIssues.map(issue => [
        issue.id,
        issue.title,
        issue.category,
        issue.urgency,
        issue.reportedBy,
        formatDate(issue.createdAt),
        issue.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'civic-issues-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`ml-4 py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              All Issues ({issues.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Pending ({issues.filter(i => i.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'in-progress' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              In Progress ({issues.filter(i => i.status === 'in-progress').length})
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${activeTab === 'resolved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Resolved ({issues.filter(i => i.status === 'resolved').length})
            </button>
          </nav>
        </div>
        
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search issues"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3">
            <select 
              className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="roads">Roads & Infrastructure</option>
              <option value="sanitation">Sanitation & Waste</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity Issues</option>
              <option value="parks">Parks & Public Spaces</option>
              <option value="other">Other</option>
            </select>
            
            <button 
              onClick={exportToCSV}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Download className="mr-2" size={16} />
              Export CSV
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Urgency
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No issues found. {issues.length === 0 ? 'No issues have been reported yet.' : 'Try changing your filters.'}
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {getStatusIcon(issue.status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                          <div className="text-sm text-gray-500">{issue.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{issue.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getUrgencyBadge(issue.urgency)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.reportedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(issue.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                        className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewIssue(issue)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteIssue(issue.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Issue"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(filteredIssues.length > 0) ? 1 : 0}</span> to{' '}
                <span className="font-medium">{filteredIssues.length}</span> of{' '}
                <span className="font-medium">{filteredIssues.length}</span> results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Section - Remove in production */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info (Admin View):</h3>
        <p>Total issues in system: {issues.length}</p>
        <p>Filtered issues: {filteredIssues.length}</p>
        <p>Active tab: {activeTab}</p>
        <p>Search term: "{searchTerm}"</p>
        <p>Selected category: {selectedCategory}</p>
        <div className="mt-2">
          <h4 className="font-medium">All Issues:</h4>
          <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
            {JSON.stringify(issues, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;