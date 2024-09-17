import * as Clipboard from 'expo-clipboard'
import { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper'

import useShareIntent from '../../../lib/hooks/useShareIntent'
import { utils } from '../../../lib/utils'
import { Definition } from '../../../types'
import { AddWordInput } from '../../organisms/Inputs/AddWordInput'

interface TopBarProps {
  testID: string
}

export const TopBar = ({ testID }: TopBarProps) => {
  // hooks
  const { shareIntent, resetShareIntent, text } = useShareIntent()

  // states
  const [inputValue, setInputValue] = useState<Definition['title']>('')

  // copy function
  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync()
    setInputValue(text)
  }

  // lifecycle methods
  useEffect(() => {
    if (text) {
      setInputValue(text)
      resetShareIntent()
    }
  }, [text])

  return (
    <Appbar.Header testID={testID}>
      <Appbar.Content title="Wordsmith" />
      <Appbar.Action
        icon="plus"
        onPress={() => {
          addWord(inputValue ?? '')
          setInputValue('')
        }}
      />
      <Appbar.Action
        icon="clipboard-plus-outline"
        onPress={() => {
          fetchCopiedText()
        }}
      />
    </Appbar.Header>
  )
}
