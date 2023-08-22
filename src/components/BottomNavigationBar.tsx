import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../views/Home';
import { AccountScreen } from '../views/Account';


export const BottomNavigationBar = () => {

    const Tab = createMaterialBottomTabNavigator();

    return (
    <Tab.Navigator>  
        <Tab.Screen name="My Vocabulary Lists" component={HomeScreen} />
        <Tab.Screen name="Account/Settings" component={AccountScreen} />
      </Tab.Navigator>
    )
}