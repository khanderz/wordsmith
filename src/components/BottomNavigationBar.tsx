import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../views/Home';
import { AccountScreen } from '../views/Account';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const BottomNavigationBar = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
    <Tab.Navigator
        screenOptions={({ route}) => ({
            tabBarIcon: ({ focused, color, size}) => {
                let iconName;
                if (route.name === 'My Vocabulary Lists') {
                    iconName = focused ? 'radio-button-on-outline' : 'document-text-outline';
                } else if (route.name === 'Account/Settings') {
                    iconName = focused ? 'radio-button-on-outline' : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
    >  
        <Tab.Screen name="My Vocabulary Lists" component={HomeScreen}  />
        <Tab.Screen name="Account/Settings" component={AccountScreen} />
      </Tab.Navigator>
    )
}