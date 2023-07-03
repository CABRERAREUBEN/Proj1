import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', }}>Datadynamix Inc.</Text>
        {/*<Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} /> 
       <Btn bgColor='white' textColor={darkGreen} btnLabel="Maps Nearby" Press={() => props.navigation.navigate("Maps1")} /> */}
        {/* <Btn bgColor='white' textColor={darkGreen} btnLabel="Maps Working" Press={() => props.navigation.navigate("Maps")} />
    <Btn bgColor='white' textColor={darkGreen} btnLabel="Current Location" Press={() => props.navigation.navigate("MapsLocation")} /> */}
        <Btn bgColor='white' textColor={darkGreen} btnLabel="Show On Radius" Press={() => props.navigation.navigate("Maps3")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="QR" Press={() => props.navigation.navigate("QR")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="Authenticator" Press={() => props.navigation.navigate("Authenticator")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="Sample Items" Press={() => props.navigation.navigate("SampleItems")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="QR1" Press={() => props.navigation.navigate("QR1")} />
        <Btn bgColor='white' textColor={darkGreen} btnLabel="Maps4" Press={() => props.navigation.navigate("Maps4")} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Home;
