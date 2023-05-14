import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function Maps3() {
    const MyComponent = () => {
        
      
        // Other state variables and logic...
      };
      const [nearbyPlaces, setNearbyPlaces] = useState([]);
      const fetchNearbyPlaces = async (latitude, longitude) => {
        try {
          const apiKey = 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss';
          const radius = 1000; // The radius in meters (adjust as per your requirement)
          const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;
      
          const response = await axios.get(endpoint);
      
          if (response.data && response.data.results) {
            setNearbyPlaces(response.data.results);
          }
        } catch (error) {
          console.error('Error fetching nearby places:', error);
        }
      };
      
      
      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            onRegionChangeComplete={(region) => {
              fetchNearbyPlaces(region.latitude, region.longitude);
            }}
          >
            {nearbyPlaces.map((place) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
                title={place.name}
                description={place.vicinity}
              />
            ))}
          </MapView>
        </View>
      );
      
}

