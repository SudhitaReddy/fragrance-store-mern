import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { GmapWraper } from './map-style';

// Fix for default markers in webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple Basic Map Component
export function SimpleLeafletBasicMap({ 
  latitude = 51.505, 
  longitude = -0.09, 
  width = '100%', 
  height = '400px', 
  zoom = 13 
}) {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (error) {
        console.warn('Error removing existing map:', error);
      }
      mapInstanceRef.current = null;
    }

    try {
      // Create map
      const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: zoom,
        maxZoom: 18,
        scrollWheelZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Wait for map to be ready, then add marker
      map.whenReady(() => {
        try {
          // Add marker
          const marker = L.marker([latitude, longitude]).addTo(map);
          marker.bindPopup(`
            <div>
              <strong>Location</strong><br/>
              Latitude: ${latitude}<br/>
              Longitude: ${longitude}
            </div>
          `);
          console.log('Simple basic map marker added');
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      });

      mapInstanceRef.current = map;

      // Force resize
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      console.log('Simple basic map created');

      return () => {
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch (error) {
            console.warn('Error removing map:', error);
          }
          mapInstanceRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating simple map:', error);
    }
  }, [latitude, longitude, zoom]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      />
    </GmapWraper>
  );
}

// Simple Multiple Markers Map
export function SimpleLeafletMultipleMap({ 
  latitude = 51.505, 
  longitude = -0.09, 
  width = '100%', 
  height = '400px', 
  zoom = 13,
  data = []
}) {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (error) {
        console.warn('Error removing existing map:', error);
      }
      mapInstanceRef.current = null;
    }

    try {
      // Create map
      const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: zoom,
        maxZoom: 18,
        scrollWheelZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Wait for map to be ready, then add markers
      map.whenReady(() => {
        try {
          // Add markers
          data.forEach((item, index) => {
            if (item.position && Array.isArray(item.position) && item.position.length === 2) {
              const marker = L.marker(item.position).addTo(map);
              marker.bindPopup(`
                <div>
                  <strong>Location ${index + 1}</strong><br/>
                  Lat: ${item.position[0]}<br/>
                  Lng: ${item.position[1]}
                </div>
              `);
            }
          });
          console.log('Simple multiple map markers added:', data.length);
        } catch (error) {
          console.error('Error adding markers:', error);
        }
      });

      mapInstanceRef.current = map;

      // Force resize
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      console.log('Simple multiple map created');

      return () => {
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch (error) {
            console.warn('Error removing map:', error);
          }
          mapInstanceRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating simple multiple map:', error);
    }
  }, [latitude, longitude, zoom, data]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      />
    </GmapWraper>
  );
}

// Simple Test Map
export function SimpleLeafletTestMap() {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (error) {
        console.warn('Error removing existing map:', error);
      }
      mapInstanceRef.current = null;
    }

    try {
      // Create map
      const map = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
        maxZoom: 18,
        scrollWheelZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Wait for map to be ready, then add marker
      map.whenReady(() => {
        try {
          // Add marker
          const marker = L.marker([51.505, -0.09]).addTo(map);
          marker.bindPopup(`
            <div>
              <strong>Test Location</strong><br/>
              This is a working map!
            </div>
          `);
          console.log('Simple test map marker added');
        } catch (error) {
          console.error('Error adding test marker:', error);
        }
      });

      mapInstanceRef.current = map;

      // Force resize
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      console.log('Simple test map created');

      return () => {
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch (error) {
            console.warn('Error removing map:', error);
          }
          mapInstanceRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error creating simple test map:', error);
    }
  }, []);

  return (
    <div style={{ height: '400px', width: '100%', border: '1px solid #ccc', position: 'relative' }}>
      <h3>Simple Leaflet Test Map</h3>
      <div style={{ height: '350px', width: '100%', position: 'relative' }}>
        <div 
          ref={mapRef} 
          style={{ height: '100%', width: '100%', minHeight: '300px' }}
        />
      </div>
    </div>
  );
}
