// Map will go here
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import React from 'react';
import MapPin from './MapPin';

const MapStuff = withGoogleMap(() => {
  const mapOptions = {
    mapTypeControl: false,
    minZoom: 11,
    restriction: {
      latLngBounds: {
        north: 30,
        south: 10,
        east: -100,
        west: 200,
      },
    },
  };
  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginTop: '0px',
  };
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 21.483254, lng: -158.097018 }}
      options={mapOptions}
      mapContainerOptions={containerStyle}
    >
      <MapPin selectedUser={this.state.selectedUser} currentUser={this.props.currentUser} />
    </GoogleMap>
  );
});

export default MapStuff;
