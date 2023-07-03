import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, Circle, PermissionsAndroid, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Button, Slider } from '@rneui/base';

export default function Maps3() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
      } else {
        console.log('Location permission denied.');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const initialRadius = 500; // initial radius in meters

  const [radius, setRadius] = useState(initialRadius);
  const [radiusInKilometers, setRadiusInKilometers] = useState(0);

  const metersToKilometers = (meters) => {
    return meters / 1000;
  };

  const kilometersToMeters = (kilometers) => {
    return kilometers * 1000;
  };
  const handleRadiusChange = (value) => {
    setRadius(value);
    const km = metersToKilometers(value);
    setRadiusInKilometers(km);

  };

  const sliderRef = useRef(null)

  const handleReset = () => {
    setRadius(initialRadius);
    sliderRef.current?.setNativeProps({ value: initialRadius });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(initialRegion);
        setCurrentLocation(position.coords);
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);


  useEffect(() => {

    const fetchedMarkers = [
      { id: 1, title: 'Manila City Hall', latitude: 14.599512, longitude: 120.984222 },
      { id: 2, title: 'Cubao, Quezon City', latitude: 14.617290, longitude: 121.059311 },
      { id: 3, title: 'Rizal Park, Manila', latitude: 14.5826, longitude: 120.9787 },
      { id: 4, title: 'Estancia', latitude: 14.6018, longitude: 121.0467 },
      { id: 5, title: 'Bacood Park', latitude: 14.597202, longitude: 121.015961 },
      { id: 6, title: 'Market! Market!', latitude: 14.5504, longitude: 121.0567 },
      { id: 7, title: 'Bonifacio Global City', latitude: 14.5509, longitude: 121.0465 },
      { id: 8, title: 'Venice Grand Canal Mall ', latitude: 14.5315, longitude: 121.0522 },
      { id: 9, title: 'Acacia Estates', latitude: 14.5087, longitude: 121.0728 },
    ];
    setMarkers(fetchedMarkers);
  }, []);

  const renderMarkersWithinRadius = () => {
    if (!currentLocation) {
      return null;
    }

    return markers.map(marker => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        marker.latitude,
        marker.longitude
      );

      if (distance <= radius) {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
          />
        );
      }

      return null;
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };


  const getInitialRegion = () => {
    if (currentLocation) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      };
    }
    // Default initial region if current location is not available
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text>Distance: {radiusInKilometers} KM </Text>
        <Slider
          value={radius}
          minimumValue={500}
          maximumValue={5000}
          step={100}
          allowTouchTrack
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'black' }}
          onValueChange={handleRadiusChange}
          ref={sliderRef}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}
              onPress={handleReset}>Reset</Text>
          </TouchableOpacity>

        </View>
      </View>

      <MapView style={styles.map} initialRegion={getInitialRegion()}>
        {currentLocation && (
          <>
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              pinColor="blue"
              title="Current Location"
            />
            <Circle
              center={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
              }}
              radius={radius}
              strokeColor="rgba(0, 0, 255, 0.5)"
              fillColor="rgba(0, 0, 255, 0.1)"
            />
            {renderMarkersWithinRadius()}
          </>
        )}
      </MapView>
    </View>


  )
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
