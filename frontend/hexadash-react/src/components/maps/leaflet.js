import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
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

// Custom component for marker clustering
function MarkerCluster({ data }) {
  const map = useMap();
  const clusterRef = useRef();

  useEffect(() => {
    if (!map || !data || !Array.isArray(data)) {
      return;
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

    // Cleanup
    return () => {
      if (clusterRef.current) {
        try {
          map.removeLayer(clusterRef.current);
          clusterRef.current.clearLayers();
        } catch (error) {
          console.warn('Error cleaning up marker cluster:', error);
        }
        clusterRef.current = null;
      }
    };
  }, [map, data]);

  return null;
}

function LeafletMapBasic(props) {
  const { latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13 } = props;

  const position = [latitude, longitude];
  
  console.log('LeafletMapBasic rendering with:', { latitude, longitude, width, height, zoom });
  
  return (
    <GmapWraper width={width} height={height}>
      <MapContainer 
        center={position} 
        zoom={zoom}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
        scrollWheelZoom={true}
        key={`basic-${latitude}-${longitude}-${zoom}`}
        whenCreated={(map) => {
          console.log('Map created successfully:', map);
          // Force a resize to ensure proper rendering
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
        whenReady={() => {
          console.log('Map is ready');
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div>
              <strong>Location</strong><br/>
              Latitude: {latitude}<br/>
              Longitude: {longitude}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </GmapWraper>
  );
}

function LeafletMapMultipleIcon(props) {
  const { latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13, data = [] } = props;

  const position = [latitude, longitude];
  
  return (
    <GmapWraper width={width} height={height}>
      <MapContainer 
        center={position} 
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key={`multiple-${latitude}-${longitude}-${zoom}-${data.length}`}
        whenCreated={(map) => {
          console.log('Multiple map created successfully:', map);
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((item, index) => {
          if (!item.position || !Array.isArray(item.position) || item.position.length !== 2) {
            return null;
          }
          return (
            <Marker key={item.id || index} position={item.position}>
              <Popup>
                <div>
                  <strong>Location {index + 1}</strong><br/>
                  Lat: {item.position[0]}<br/>
                  Lng: {item.position[1]}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </GmapWraper>
  );
}

function LeafletMapCustomIcon(props) {
  const { latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13, faIcon = 'fa fa-map-marker', data = [] } = props;
  
  const fontAwesomeIcon = L.divIcon({
    html: `<i style="color: #2880CA; font-size: 20px;" class="${faIcon}"></i>`,
    iconSize: [20, 20],
    className: 'custom-div-icon',
  });
  
  const position = [latitude, longitude];
  
  return (
    <GmapWraper width={width} height={height}>
      <MapContainer 
        center={position} 
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key={`custom-${latitude}-${longitude}-${zoom}-${data.length}`}
        whenCreated={(map) => {
          console.log('Custom map created successfully:', map);
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.length > 0 ? (
          data.map((item, index) => {
            if (!item.position || !Array.isArray(item.position) || item.position.length !== 2) {
              return null;
            }
            return (
              <Marker key={item.id || index} position={item.position} icon={fontAwesomeIcon}>
                <Popup>
                  <div>
                    <strong>Custom Icon Location {index + 1}</strong><br/>
                    Lat: {item.position[0]}<br/>
                    Lng: {item.position[1]}
                  </div>
                </Popup>
              </Marker>
            );
          })
        ) : (
          <Marker position={position} icon={fontAwesomeIcon}>
            <Popup>
              <div>
                <strong>Custom Icon Location</strong><br/>
                Latitude: {latitude}<br/>
                Longitude: {longitude}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </GmapWraper>
  );
}

function LeafletMarkerCluster(props) {
  const { latitude = 51.505, longitude = -0.09, width = '100%', height = '400px', zoom = 13, data = [] } = props;

  const position = [latitude, longitude];
  
  return (
    <GmapWraper width={width} height={height}>
      <MapContainer 
        center={position} 
        zoom={zoom} 
        maxZoom={18}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key={`cluster-${latitude}-${longitude}-${zoom}-${data.length}`}
        whenCreated={(map) => {
          console.log('Cluster map created successfully:', map);
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster data={data} />
      </MapContainer>
    </GmapWraper>
  );
}

export { LeafletMapBasic, LeafletMapMultipleIcon, LeafletMapCustomIcon, LeafletMarkerCluster };