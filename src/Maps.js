import { Button, Slider } from '@rneui/base';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text, PermissionsAndroid,} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const GOOGLE_PLACES_API_KEY = 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss'; 
var screenWidth = Dimensions.get('window').width;


const App = () => {
  
  const [regionCoords, setRegion] = React.useState({ latitude: 	14.589771,
    longitude:	120.981456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,})
  const [marker, setMarker] = useState({latitude: 	14.589771,
    longitude:	120.981456,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, });

    const [selectedLocation, setSelectedLocation] = useState(null);
    
    const initialRadius = 10; // initial radius in meters

  const [radius, setRadius] = useState(initialRadius);

  const handleRadiusChange = (value) => {
    setRadius(value);
  };

  const sliderRef = useRef(null)
  const handleReset = () => {
    setRadius(initialRadius);
    sliderRef.current?.setNativeProps({ value: initialRadius });
  };

  
  const onPress = (data, details) => {
    setRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    setMarker({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
  };
  
  const[range, setRange] = useState('25%')
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text> Google Maps </Text>
        
      </View>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss',
          language: 'en', 
          components: "country:ph",
        type:"establishment",
        radius: 1000,
        }}
        styles={{
          container: {flex:0, position:"absolute", width:"85%", zIndex:1,paddingTop:145, paddingLeft:10,  },
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
      <View style={{padding:10}}>
        <Text>Distance: {radius} Meters </Text>
      <Slider 
      value={radius}
      minimumValue={10}
      maximumValue={500}
      step={100}
      allowTouchTrack
      thumbStyle={{height:20,width:20, backgroundColor:'black'}}
      onValueChange={handleRadiusChange}
      ref={sliderRef}
      />
      <View>
      <Button
      title="Reset"
      onPress={handleReset}
      />
      
      
        </View>
      </View>
      
{/* flex:0, position:"absolute", width:"85%", zIndex:1,paddingTop:10, paddingLeft:10,  },
          listView:{backgroundColor:"white"
          
          height:20,width:20, backgroundColor:'black', paddingBottom:50
          */}
      <MapView
        style={styles.map}
        region={{
          latitude: regionCoords.latitude,
          longitude: regionCoords.longitude,
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
          
        <Marker coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}>
        <Callout>
        <Text>
          I'm Here
        </Text>
      </Callout>
          </Marker>
          <Circle center={ 
      regionCoords} 
    radius={radius}
    fillColor="rgba(0, 0, 255, 0.3)"
          strokeColor="blue"
          strokeWidth={2}
          />
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
    height: '97.3%',
  },
});

export default App;
