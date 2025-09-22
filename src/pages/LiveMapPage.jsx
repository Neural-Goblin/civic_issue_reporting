// src/pages/LiveMapPage.jsx
import React from 'react';
import SimpleLiveMap from '../components/SimpleLiveMap';
import { Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveMapPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <Home size={20} className="mr-1" />
                <span>Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center text-gray-800">
                <MapPin size={20} className="mr-1" />
                <span className="font-semibold">Live Issues Map</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Live Civic Issues Map
            </h1>
            <p className="text-gray-600">
              View all reported issues across India in real-time
            </p>
          </div>

          <SimpleLiveMap />
          
          {/* Info Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              How to Use the Map
            </h2>
            <ul className="list-disc list-inside text-blue-700 space-y-2">
              <li>Click on any marker to see issue details</li>
              <li>Red markers = Pending issues</li>
              <li>Orange markers = In Progress issues</li>
              <li>Green markers = Resolved issues</li>
              <li>Zoom and pan to explore different regions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapPage;