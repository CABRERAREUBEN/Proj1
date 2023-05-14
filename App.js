import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login';
import ForgotPassword from  './src/ForgotPassword'
import Maps from  './src/Maps'
import MapsLocation from  './src/MapsLocation'
import Maps1 from './src/Maps1'
import Maps3 from './src/Maps3';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Maps" component={Maps}/>
        <Stack.Screen name="MapsLocation" component={MapsLocation}/>
        <Stack.Screen name="Maps1" component={Maps1}/>
        <Stack.Screen name="Maps3" component={Maps3}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;