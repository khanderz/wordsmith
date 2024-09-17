import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AccountScreen } from '../../views/Account'
import { HomeScreen } from '../../views/Home'

export const BottomNavigationBar = (children: any) => {
  const Tab = createMaterialBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName
          if (route.name === 'My Vocabulary Lists') {
            iconName = focused
              ? 'radio-button-on-outline'
              : 'document-text-outline'
          } else if (route.name === 'Account/Settings') {
            iconName = focused
              ? 'radio-button-on-outline'
              : 'person-circle-outline'
          }
          return <Ionicons name={iconName} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="My Vocabulary Lists" component={HomeScreen} />
      <Tab.Screen name="Account/Settings" component={AccountScreen} />
    </Tab.Navigator>
  )
}
