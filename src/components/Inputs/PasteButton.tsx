import * as Clipboard from 'expo-clipboard'
import { ClipboardPasteButtonProps } from 'expo-clipboard'
import { Button } from 'native-base'
import React from 'react'

import { Definition } from '../../types'

type PasteButtonProps = {
  word: Definition['word']
  onPress: () => void
} & ClipboardPasteButtonProps

export const PasteButton = ({ word, onPress, ...props }: PasteButtonProps) => {
  return (
    <Button
      aria-label="paste-button"
      m={1}
      onPress={() => {
        onPress()
      }}
    >
      Paste
    </Button>
  )
}
