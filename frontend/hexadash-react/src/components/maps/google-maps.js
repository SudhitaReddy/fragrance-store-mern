import React from 'react';
import { GmapWraper } from './map-style';

const GoogleMaps = (property) => {
  const { latitude, longitude, width, height, zoom, mapStyles, place } = property;

  return (
    <GmapWraper width={width} height={height}>
      <div 
        style={{ 
          height: '400px', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #d9d9d9',
          borderRadius: '8px',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
        <h3 style={{ color: '#1890ff', marginBottom: '8px' }}>Google Maps</h3>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Google Maps API key is required to display maps
        </p>
        <div style={{ fontSize: '14px', color: '#999' }}>
          <p>To enable Google Maps:</p>
          <p>1. Get a Google Maps API key from Google Cloud Console</p>
          <p>2. Add REACT_APP_GOOGLE_MAP_KEY to your .env file</p>
          <p>3. Restart the development server</p>
        </div>
        {place && place.length > 0 && (
          <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
            <p>Markers would be displayed here:</p>
            <p>Latitude: {latitude || 'N/A'}, Longitude: {longitude || 'N/A'}</p>
            <p>Zoom: {zoom || 13}</p>
            <p>Places: {place.length} locations</p>
          </div>
        )}
      </div>
    </GmapWraper>
  );
};

export { GoogleMaps };
