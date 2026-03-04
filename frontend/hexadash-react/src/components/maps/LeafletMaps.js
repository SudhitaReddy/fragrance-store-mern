import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { GmapWraper } from './map-style';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a robust default icon function
const createDefaultIcon = () => {
  try {
    return new L.Icon.Default();
  } catch (error) {
    console.warn('Error creating default icon, using fallback:', error);
    return L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
};

// Custom hook for Leaflet map management
function useLeafletMap(containerRef, options) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up existing map
    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (error) {
        console.warn('Error removing existing map:', error);
      }
      mapRef.current = null;
    }

    try {
      const map = L.map(containerRef.current, {
        center: options.center || [51.505, -0.09],
        zoom: options.zoom || 13,
        maxZoom: 18,
        scrollWheelZoom: true,
        ...options
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
      
      // Use a more robust ready detection
      const checkMapReady = () => {
        try {
          if (map && map._loaded && map._container) {
            const container = map.getContainer();
            if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
              // Check for required DOM elements
              const mapPane = container.querySelector('.leaflet-pane');
              if (mapPane && mapPane.querySelector('.leaflet-tile-pane')) {
                map.invalidateSize();
                setIsMapReady(true);
                console.log('Map is ready:', map);
                return true;
              }
            }
          }
          return false;
        } catch (error) {
          console.warn('Error checking map ready state:', error);
          return false;
        }
      };

      // Try immediate check
      if (checkMapReady()) {
        return;
      }

      // Use map.whenReady as fallback
      map.whenReady(() => {
        if (checkMapReady()) {
          return;
        }
        // Additional fallback with timeout
        setTimeout(() => {
          if (checkMapReady()) {
            return;
          }
          console.warn('Map ready fallback triggered');
          setIsMapReady(true);
        }, 1000);
      });

      return () => {
        if (mapRef.current) {
          try {
            mapRef.current.remove();
          } catch (error) {
            console.warn('Error removing map in cleanup:', error);
          }
          mapRef.current = null;
          setIsMapReady(false);
        }
      };
    } catch (error) {
      console.error('Error creating map:', error);
      setIsMapReady(false);
    }
  }, [options.center, options.zoom]);

  return { map: mapRef.current, isMapReady };
}

// Basic Map Component
export function LeafletBasicMap({ 
  latitude = 51.505, 
  longitude = -0.09, 
  width = '100%', 
  height = '400px', 
  zoom = 13 
}) {
  const containerRef = useRef();
  const { map, isMapReady } = useLeafletMap(containerRef, {
    center: [latitude, longitude],
    zoom: zoom
  });

  useEffect(() => {
    if (!map || !isMapReady) return;

    // Use a retry mechanism to ensure DOM is ready
    const addMarkerWithRetry = (attempt = 1) => {
      try {
        // Verify map and DOM structure
        if (!map || !map._loaded || !map._container) {
          throw new Error('Map not loaded');
        }

        const container = map.getContainer();
        if (!container || !container.querySelector('.leaflet-pane')) {
          throw new Error('Map pane not ready');
        }

        // Create and add marker
        const marker = L.marker([latitude, longitude], { icon: createDefaultIcon() });
        marker.addTo(map);
        marker.bindPopup(`
          <div>
            <strong>Location</strong><br/>
            Latitude: ${latitude}<br/>
            Longitude: ${longitude}
          </div>
        `);
        console.log('Basic map marker added successfully');
      } catch (error) {
        console.warn(`Error adding marker, attempt ${attempt}:`, error);
        if (attempt < 3) {
          setTimeout(() => addMarkerWithRetry(attempt + 1), 300);
        }
      }
    };

    // Start adding marker
    addMarkerWithRetry();

    return () => {
      // Marker will be cleaned up with the map
    };
  }, [map, isMapReady, latitude, longitude]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }} 
      />
    </GmapWraper>
  );
}

// Multiple Markers Map Component
export function LeafletMultipleMap({ 
  data = [], 
  width = '100%', 
  height = '400px', 
  zoom = 13 
}) {
  const containerRef = useRef();
  const { map, isMapReady } = useLeafletMap(containerRef, {
    center: data.length > 0 ? data[0].position : [51.505, -0.09],
    zoom: zoom
  });

  useEffect(() => {
    if (!map || !isMapReady || !Array.isArray(data)) return;

    const addMarkersWithRetry = (attempt = 1) => {
      try {
        // Verify map and DOM structure
        if (!map || !map._loaded || !map._container) {
          throw new Error('Map not loaded');
        }

        const container = map.getContainer();
        if (!container || !container.querySelector('.leaflet-pane')) {
          throw new Error('Map pane not ready');
        }

        // Add markers
        data.forEach((item, index) => {
          if (item.position && Array.isArray(item.position) && item.position.length === 2) {
            const marker = L.marker(item.position, { icon: createDefaultIcon() });
            marker.addTo(map);
            marker.bindPopup(`
              <div>
                <strong>Location ${index + 1}</strong><br/>
                Lat: ${item.position[0]}<br/>
                Lng: ${item.position[1]}
              </div>
            `);
          }
        });

        console.log('Multiple map markers added successfully');
      } catch (error) {
        console.warn(`Error adding markers, attempt ${attempt}:`, error);
        if (attempt < 3) {
          setTimeout(() => addMarkersWithRetry(attempt + 1), 300);
        }
      }
    };

    // Start adding markers
    addMarkersWithRetry();

    return () => {
      // Markers will be cleaned up with the map
    };
  }, [map, isMapReady, data]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }} 
      />
    </GmapWraper>
  );
}

// Custom Icon Map Component
export function LeafletCustomIconMap({ 
  data = [], 
  faIcon = 'fas fa-map-marker-alt',
  latitude = 51.505, 
  longitude = -0.09, 
  width = '100%', 
  height = '400px', 
  zoom = 13 
}) {
  const containerRef = useRef();
  const { map, isMapReady } = useLeafletMap(containerRef, {
    center: [latitude, longitude],
    zoom: zoom
  });

  useEffect(() => {
    if (!map || !isMapReady) return;

    const addCustomMarkersWithRetry = (attempt = 1) => {
      try {
        // Verify map and DOM structure
        if (!map || !map._loaded || !map._container) {
          throw new Error('Map not loaded');
        }

        const container = map.getContainer();
        if (!container || !container.querySelector('.leaflet-pane')) {
          throw new Error('Map pane not ready');
        }

        // Create custom icon
        const customIcon = L.divIcon({
          html: `<i style="color: #2880CA; font-size: 20px;" class="${faIcon}"></i>`,
          iconSize: [20, 20],
          className: 'custom-div-icon',
        });

        if (Array.isArray(data) && data.length > 0) {
          // Add multiple custom markers
          data.forEach((item, index) => {
            if (item.position && Array.isArray(item.position) && item.position.length === 2) {
              const marker = L.marker(item.position, { icon: customIcon });
              marker.addTo(map);
              marker.bindPopup(`
                <div>
                  <strong>Custom Icon Location ${index + 1}</strong><br/>
                  Lat: ${item.position[0]}<br/>
                  Lng: ${item.position[1]}
                </div>
              `);
            }
          });
        } else {
          // Add single custom marker
          const marker = L.marker([latitude, longitude], { icon: customIcon });
          marker.addTo(map);
          marker.bindPopup(`
            <div>
              <strong>Custom Icon Location</strong><br/>
              Latitude: ${latitude}<br/>
              Longitude: ${longitude}
            </div>
          `);
        }

        console.log('Custom icon map markers added successfully');
      } catch (error) {
        console.warn(`Error adding custom markers, attempt ${attempt}:`, error);
        if (attempt < 3) {
          setTimeout(() => addCustomMarkersWithRetry(attempt + 1), 300);
        }
      }
    };

    // Start adding custom markers
    addCustomMarkersWithRetry();

    return () => {
      // Markers will be cleaned up with the map
    };
  }, [map, isMapReady, data, faIcon, latitude, longitude]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }} 
      />
    </GmapWraper>
  );
}

// Cluster Map Component
export function LeafletClusterMap({ 
  data = [], 
  width = '100%', 
  height = '400px', 
  zoom = 13 
}) {
  const containerRef = useRef();
  const clusterRef = useRef(null);
  const { map, isMapReady } = useLeafletMap(containerRef, {
    center: data.length > 0 ? data[0].position : [51.505, -0.09],
    zoom: zoom
  });

  useEffect(() => {
    if (!map || !isMapReady || !Array.isArray(data)) return;

    const addClusterMarkersWithRetry = (attempt = 1) => {
      try {
        // Verify map and DOM structure
        if (!map || !map._loaded || !map._container) {
          throw new Error('Map not loaded');
        }

        const container = map.getContainer();
        if (!container || !container.querySelector('.leaflet-pane')) {
          throw new Error('Map pane not ready');
        }

        // Create marker cluster group
        const cluster = L.markerClusterGroup({
          chunkedLoading: true,
          maxClusterRadius: 50,
        });
        clusterRef.current = cluster;

        // Add markers to cluster
        data.forEach((item, index) => {
          if (item.position && Array.isArray(item.position) && item.position.length === 2) {
            const marker = L.marker(item.position, { icon: createDefaultIcon() });
            marker.bindPopup(`
              <div>
                <strong>Location ${index + 1}</strong><br/>
                Lat: ${item.position[0]}<br/>
                Lng: ${item.position[1]}
              </div>
            `);
            cluster.addLayer(marker);
          }
        });

        // Add cluster to map
        map.addLayer(cluster);

        console.log('Cluster map markers added successfully:', data.length);
      } catch (error) {
        console.warn(`Error adding cluster markers, attempt ${attempt}:`, error);
        if (attempt < 3) {
          setTimeout(() => addClusterMarkersWithRetry(attempt + 1), 300);
        }
      }
    };

    // Start adding cluster markers
    addClusterMarkersWithRetry();

    return () => {
      if (clusterRef.current) {
        clusterRef.current.clearLayers();
        clusterRef.current = null;
      }
    };
  }, [map, isMapReady, data]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }} 
      />
    </GmapWraper>
  );
}

// Test Map Component
export function LeafletTestMap({ 
  width = '100%', 
  height = '400px' 
}) {
  const containerRef = useRef();
  const { map, isMapReady } = useLeafletMap(containerRef, {
    center: [51.505, -0.09],
    zoom: 13
  });

  useEffect(() => {
    if (!map || !isMapReady) return;

    const addTestMarkerWithRetry = (attempt = 1) => {
      try {
        // Verify map and DOM structure
        if (!map || !map._loaded || !map._container) {
          throw new Error('Map not loaded');
        }

        const container = map.getContainer();
        if (!container || !container.querySelector('.leaflet-pane')) {
          throw new Error('Map pane not ready');
        }

        // Add test marker
        const marker = L.marker([51.505, -0.09], { icon: createDefaultIcon() });
        marker.addTo(map);
        marker.bindPopup(`
          <div>
            <strong>Test Location</strong><br/>
            This is a test marker
          </div>
        `);

        console.log('Test map marker added successfully');
      } catch (error) {
        console.warn(`Error adding test marker, attempt ${attempt}:`, error);
        if (attempt < 3) {
          setTimeout(() => addTestMarkerWithRetry(attempt + 1), 300);
        }
      }
    };

    // Start adding test marker
    addTestMarkerWithRetry();

    return () => {
      // Marker will be cleaned up with the map
    };
  }, [map, isMapReady]);

  return (
    <GmapWraper width={width} height={height}>
      <div 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }} 
      />
    </GmapWraper>
  );
}