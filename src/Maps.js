import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss'; 
var screenWidth = Dimensions.get('window').width;


const App = () => {
  const [regionCoords, setRegion] = useState({ lat: 14.589771, lng: 120.981456 });
  const [marker, setMarker] = useState({ lat: 14.589771, lng: 120.981456 });

  const onPress = (data, details) => {
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss',
          language: 'en', 
          components: "country:ph",
        type:"establishment",
        radius: 10000,
        }}
        styles={{
          container: {flex:0, position:"absolute", width:"85%", zIndex:1,paddingTop:10, paddingLeft:10,  },
          listView:{backgroundColor:"white"}
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
        fetchDetails={true}
        onPress={onPress}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} 
      />

      <MapView
        style={styles.map}
        region={{
          latitude: regionCoords.lat,
          longitude: regionCoords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} 
        showsUserLocation={false}
        zoomEnabled={true}
        zoomControlEnabled={true}
        followsUserLocation={true}
        // onUserLocationChange={(event) => console.log("this is event",event.nativeEvent)}
        showsUserLocation={true}
        followsUserLocation={true}
        provider="google"
        >
        <Marker coordinate={{ latitude: marker.lat, longitude: marker.lng }}>
        <Callout>
        <Text>
          I'm Here
        </Text>
      </Callout>
          </Marker>
          
      </MapView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;
