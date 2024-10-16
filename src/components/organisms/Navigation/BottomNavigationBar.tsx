import { useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { AccountScreen } from '../../../views/Account'
import { HomeScreen } from '../../../views/Home'

interface BottomBarProps {
  testID: string
}

export const BottomBar = ({ testID }: BottomBarProps) => {
  const [index, setIndex] = useState(0)

  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'account', title: 'Account', icon: 'person-circle-outline' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    account: AccountScreen,
  })

  return (
    <BottomNavigation
      testID={testID}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={({ route, color }) => (
        <Ionicons name={route.icon} size={26} color={color} />
      )}
    />
  )
}
