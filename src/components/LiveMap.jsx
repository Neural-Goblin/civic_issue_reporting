// src/components/LiveMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import { Eye, Clock, AlertCircle, CheckCircle } from 'lucide-react';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different statuses
const createCustomIcon = (status) => {
  let className = '';
  switch(status) {
    case 'resolved':
      className = 'bg-green-500 text-white p-1 rounded-full';
      break;
    case 'in-progress':
      className = 'bg-blue-500 text-white p-1 rounded-full';
      break;
    default:
      className = 'bg-yellow-500 text-white p-1 rounded-full';
  }

  return L.divIcon({
    html: `<div class="${className}">${getStatusIcon(status)}</div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'resolved': return '✅';
    case 'in-progress': return '🔄';
    default: return '⚠️';
  }
};

const LiveMap = ({ issues, onIssueSelect }) => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Center of India
  const [zoom, setZoom] = useState(5);
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter issues based on selected filters
  useEffect(() => {
    let filtered = issues;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }
    
    setFilteredIssues(filtered);
  }, [issues, statusFilter, categoryFilter]);

  const getIssueCountByStatus = (status) => {
    return issues.filter(issue => issue.status === status).length;
  };

  const getIssueCountByCategory = (category) => {
    return issues.filter(issue => issue.category === category).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
          Live Issues Map
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending ({getIssueCountByStatus('pending')})</option>
              <option value="in-progress">In Progress ({getIssueCountByStatus('in-progress')})</option>
              <option value="resolved">Resolved ({getIssueCountByStatus('resolved')})</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="roads">Roads ({getIssueCountByCategory('roads')})</option>
              <option value="sanitation">Sanitation ({getIssueCountByCategory('sanitation')})</option>
              <option value="water">Water ({getIssueCountByCategory('water')})</option>
              <option value="electricity">Electricity ({getIssueCountByCategory('electricity')})</option>
              <option value="parks">Parks ({getIssueCountByCategory('parks')})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="text-yellow-600 mr-2" size={20} />
            <span className="text-lg font-semibold text-yellow-800">
              {getIssueCountByStatus('pending')}
            </span>
          </div>
          <p className="text-sm text-yellow-600 mt-1">Pending</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="text-blue-600 mr-2" size={20} />
            <span className="text-lg font-semibold text-blue-800">
              {getIssueCountByStatus('in-progress')}
            </span>
          </div>
          <p className="text-sm text-blue-600 mt-1">In Progress</p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="text-green-600 mr-2" size={20} />
            <span className="text-lg font-semibold text-green-800">
              {getIssueCountByStatus('resolved')}
            </span>
          </div>
          <p className="text-sm text-green-600 mt-1">Resolved</p>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center">
            <Eye className="text-gray-600 mr-2" size={20} />
            <span className="text-lg font-semibold text-gray-800">
              {issues.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Total Issues</p>
        </div>
      </div>

      {/* The Map */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Standard">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Plot issues on map */}
          {filteredIssues.map((issue) => (
            issue.location && (
              <Marker
                key={issue.id}
                position={[issue.location.lat, issue.location.lng]}
                icon={createCustomIcon(issue.status)}
                eventHandlers={{
                  click: () => onIssueSelect && onIssueSelect(issue),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.status}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {issue.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Reported by: {issue.reportedBy}
                    </p>
                    {issue.image && (
                      <img 
                        src={issue.image} 
                        alt={issue.title}
                        className="mt-2 rounded-md w-full h-24 object-cover"
                      />
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Resolved</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;