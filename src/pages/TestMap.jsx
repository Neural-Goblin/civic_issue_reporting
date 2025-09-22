// src/pages/TestMap.jsx
import React from 'react';
import SimpleMap from '../components/SimpleMap';

const TestMap = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Map Test Page</h1>
      <p className="text-gray-600 mb-6">
        This page tests if the map component is working correctly.
      </p>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Simple Map Test</h2>
        <SimpleMap />
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>If the map is blank, check the browser console for errors (F12)</li>
            <li>Ensure Leaflet CSS is properly imported</li>
            <li>Check that the map container has a defined height</li>
            <li>Verify internet connection for loading map tiles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestMap;