import React from 'react';
import MapView, { Callout, Circle } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {Marker} from 'react-native-maps';
import { Text } from '@rneui/base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default function Maps1() {
  const [pin, setPin] = React.useState({ latitude: 	14.589771,
    longitude:	120.981456,})

    const [region, setRegion] = React.useState({ latitude: 	14.589771,
      longitude:	120.981456,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,})
  return (
    <View style={{marginTop:2, flex:1, flexDirection: 'column'}}>
      <View>
        <Text> Google Maps </Text>
        
      </View>
      <View >
<GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby:"Distance"
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
      }}
      query={{
        key: 'AIzaSyBgoN2DgkLyZ17JsebD40TUt2BXcs3MJss',
        language: 'en',
        components: "country:ph",
        type:"establishment",
        radius: 10000,
        location:`${region.latitude},${region.longitude}`
      }}
      styles={{
        container: {flex:0, position:"absolute", width:"100%", zIndex:1},
        listView:{backgroundColor:"white"}
      }}
    />
      <MapView style={styles.map} 
       initialRegion={{
        latitude: 	14.589771,
        longitude:	120.981456,
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
        <Marker coordinate={{latitude:region.latitude, 
          longitude:region.longitude
          }}>
            <Callout>
        <Text>
          I'm Here
        </Text>
      </Callout>
      
          </Marker>
          <Circle center={ 
      region} 
    radius={1000}/>
       {/* } <Marker
  coordinate={pin} region
    pinColor="black"
    draggable={true}
    onDragStart={(e) =>  {
        console.log("Drag Start", e.nativeEvent.coordinates)
    }}
    onDragEnd={(e) =>  {
      setPin({latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude})
  }}
    >
      <Callout>
        <Text>
          I'm Here
        </Text>
      </Callout>
</Marker> 
    <Circle center={ 
      pin} 
    radius={1000}/> */}
</MapView>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});