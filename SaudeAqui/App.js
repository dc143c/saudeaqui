import React from 'react';
import LoginPage from './screens/login';
import Register from './screens/register';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';

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
        <Stack.Screen name = 'Homescreen' component={BottomTabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
 