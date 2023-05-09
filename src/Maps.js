import { Slider } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';

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
          container: {flex:0, position:"absolute", width:"85%", zIndex:1,paddingTop:28, paddingLeft:10,  },
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
      {/*<View style={{padding:10}}>
        <Text>Distance: {range} KM </Text>
      <Slider 
      value={25}
      maximumValue={50}
      minimumValue={10}
      step={1}
      allowTouchTrack
      thumbStyle={{height:20,width:20, backgroundColor:'black'}}
      onValueChange={value => setRange(parseInt(value*1)  + '%')}
      
      />
      </View>*/}
      
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
    radius={500}/>
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
