import React from 'react';
import LoginPage from './screens/homescreen';
import Homescreen from './screens/homescreen-in';
import Register from './screens/register';
import BottomTabNavigator from './navigation/BottomTabNavigator';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name ='Login' component={LoginPage}/>
      <Stack.Screen name = 'Register' component={Register}/>
      <Stack.Screen name = 'Homescreen' component={Homescreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}