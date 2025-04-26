// components/LocationPicker.js
import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 6.9271, // Default center (Colombo)
  lng: 79.8612,
};

const LocationPicker = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.geometry.location;
      const lat = location.lat();
      const lng = location.lng();

      const selectedLocation = {
        name: place.name,
        address: place.formatted_address,
        lat,
        lng,
      };

      setMarkerPosition({ lat, lng });
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
      <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged}>
        <input
          type="text"
          placeholder="Search location"
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            padding: '10px',
            width: '100%',
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={14}
        onLoad={map => setMap(map)}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
