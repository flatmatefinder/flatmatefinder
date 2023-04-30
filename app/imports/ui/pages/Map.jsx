import React from 'react';
import MapStuff from '../components/map/MapStuff';

const Map = () => (
  <MapStuff
    containerElement={<div style={{ height: '700px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />
);
/* Map */

export default Map;
