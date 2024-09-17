import { useState } from 'react'
import { Appbar } from 'react-native-paper'

interface TopBarProps {
  testID: string
}

export const TopBar = ({ testID }: TopBarProps) => {
  const [visible, setVisible] = useState(false)

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  return (
    <Appbar.Header
      testID={testID}
      // style={{ backgroundColor: '#6200ee', justifyContent: 'space-between' }}
    >
      <Appbar.Content title="Wordsmith" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      <Appbar.Action icon="dots-vertical" onPress={closeMenu} />
    </Appbar.Header>
  )
}
