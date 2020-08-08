import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import Homescreen from '../screens/homescreen-in';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
function BottomTabNavigator({ navigation }) {
    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{activeTintColor:'#0DAF9A'}}>
            <BottomTab.Screen
            component = {Homescreen}
            options={{
                title: 'Home',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='person-outline'/>
            }}
            />
            <BottomTab.Screen
            component = {Homescreen}
            options={{
                title: 'Perfil',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='map-outline'/>
            }}
            />
            <BottomTab.Screen
            component = {Homescreen}
            options={{
                title: 'Hospitais',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='search-outline'/>
            }}
            />
            <BottomTab.Screen
            component = {Homescreen}
            options={{
                title: 'Configurações',
            tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='cog-outline'/>
            }}
            />
        </BottomTab.Navigator>
    )
}

export default BottomTabNavigator;