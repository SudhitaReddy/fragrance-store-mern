import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function SimpleMapTest() {
  const position = [51.505, -0.09];
  
  console.log('SimpleMapTest rendering');
  
  return (
    <div style={{ height: '400px', width: '100%', border: '1px solid #ccc', position: 'relative' }}>
      <h3>Simple Map Test</h3>
      <div style={{ height: '350px', width: '100%', position: 'relative' }}>
        <MapContainer 
          center={position} 
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '300px' }}
          key={`simple-test-${Date.now()}`}
          whenCreated={(map) => {
            console.log('Simple map created:', map);
            setTimeout(() => {
              map.invalidateSize();
            }, 100);
          }}
          whenReady={() => {
            console.log('Simple map is ready');
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <div>
                <strong>Test Location</strong><br/>
                This is a simple map test
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default SimpleMapTest;