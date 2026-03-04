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

function LeafletNativeBasic({ latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13 }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      scrollWheelZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`
      <div>
        <strong>Location</strong><br/>
        Latitude: ${latitude}<br/>
        Longitude: ${longitude}
      </div>
    `);

    mapInstanceRef.current = map;

    // Force resize
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    console.log('Native map created successfully:', map);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
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

function LeafletNativeMultiple({ latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13, data = [] }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      scrollWheelZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

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

    mapInstanceRef.current = map;

    // Force resize
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    console.log('Native multiple map created successfully:', map);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
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

function LeafletNativeCluster({ latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13, data = [] }) {
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  const clusterRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create new map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
      scrollWheelZoom: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create marker cluster group
    const cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
    });
    clusterRef.current = cluster;

    // Add markers to cluster
    data.forEach((item, index) => {
      if (item.position && Array.isArray(item.position) && item.position.length === 2) {
        const marker = L.marker(item.position);
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

    mapInstanceRef.current = map;

    // Force resize
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    console.log('Native cluster map created successfully:', map);

    // Cleanup
    return () => {
      if (clusterRef.current) {
        clusterRef.current.clearLayers();
        clusterRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
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

export { LeafletNativeBasic, LeafletNativeMultiple, LeafletNativeCluster };
