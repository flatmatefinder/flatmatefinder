import React from 'react';
import MapStuff from '../components/map/MapStuff';

const Map = () => (
  <div id="map-page">
    <MapStuff
      containerElement={<div style={{ height: '700px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  </div>
);
/* Map */

export default Map;
