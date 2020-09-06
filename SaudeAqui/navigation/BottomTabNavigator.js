import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import Homescreen from '../screens/homescreen-in';

import Hospital from '../assets/svg/hospital.svg'
import Perfil from '../assets/svg/perfil.svg'
import Config from '../assets/svg/conf.svg'
import Pesquisa from '../assets/svg/buscar-press.svg'

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
        initialRouteName = {"Home"}
        tabBarOptions={{activeTintColor:'#0DAF9A'
        }}
        >
            <BottomTab.Screen
            name="Home"
            component={Homescreen}
            options={{
                title: "Home",
                tabBarIcon: ({ focused }) => <Pesquisa focused={focused}/>,
            }}
            />
            <BottomTab.Screen
            name="Perfil"
            component={Homescreen}
            options={{
                title: 'Perfil',
                tabBarIcon: ({ focused }) => <Perfil focused={focused}/>,
            }}
            />
            <BottomTab.Screen
            name="Hospitais"
            component={Homescreen}
            options={{
                title: 'Hospitais',
                tabBarIcon: ({ focused }) => <Hospital focused={focused}/>,
            }}
            />
            <BottomTab.Screen
            name="Configurações"
            component={Homescreen}
            options={{
                title: 'Configurações',
                tabBarIcon: ({ focused }) => <Config focused={focused}/>,
            }}
            />
        </BottomTab.Navigator>
    );
}