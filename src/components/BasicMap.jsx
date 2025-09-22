// src/components/BasicMap.jsx
import React, { useEffect, useRef } from 'react';

const BasicMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Leaflet dynamically to avoid SSR issues
    const loadMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([20.5937, 78.9629])
        .addTo(map)
        .bindPopup('India!')
        .openPopup();
    };

    loadMap();
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} className="rounded-lg" />;
};

export default BasicMap;